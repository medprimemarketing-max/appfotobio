# Plan de Migración: Backend API → Firestore Directo

## Estado Actual

La app depende de un backend (Cloud Functions en puerto 5001) que expone endpoints REST `/api/*`.
Este backend **no está desplegado**, lo que causa errores `ECONNREFUSED` en desarrollo.

**Objetivo:** Eliminar la dependencia del backend y operar directamente con Firestore desde el frontend,
manteniendo la seguridad mediante Firestore Security Rules.

---

## Resumen de Migración

| Módulo | Estado Actual | Migrar a | Prioridad |
|--------|--------------|----------|-----------|
| AuthContext | `GET /api/user/me` | Firestore `users/{uid}` | COMPLETADO |
| Notas Clínicas | `CRUD /api/notes` | Firestore `users/{uid}/notes` | ALTA |
| Galería de Imágenes | `CRUD /api/notes` (con sufijo `_images`) | Firestore `users/{uid}/images` | ALTA |
| Suscripción | `GET /api/user/subscription` | Firestore `users/{uid}` campo `subscription` | MEDIA |
| Pagos MercadoPago | `POST /api/payments/mercadopago/*` | Mantener en Cloud Functions | BAJA |
| Pagos PayPal | `POST /api/payments/paypal/*` | Mantener en Cloud Functions | BAJA |
| Export Admin | `POST /api/admin/export` | Firestore query directa (admin) | BAJA |
| Idioma usuario | `PUT /api/user/language` | Firestore `users/{uid}` campo `language` | ALTA |

---

## Estructura de Colecciones en Firestore

```
firestore/
├── users/
│   └── {uid}/
│       ├── email: string
│       ├── displayName: string
│       ├── role: "user" | "admin"
│       ├── language: "es" | "en" | "pt"
│       ├── subscription: {
│       │     type: "free" | "premium",
│       │     isActive: boolean,
│       │     expiresAt: timestamp | null
│       │   }
│       ├── createdAt: timestamp
│       ├── updatedAt: timestamp
│       │
│       ├── notes/ (subcolección)
│       │   └── {noteId}/
│       │       ├── pathologyId: string
│       │       ├── content: string
│       │       ├── createdAt: timestamp
│       │       └── updatedAt: timestamp
│       │
│       └── images/ (subcolección)
│           └── {imageId}/
│               ├── pathologyId: string
│               ├── urls: [string]  (URLs externas o data URLs base64)
│               ├── createdAt: timestamp
│               └── updatedAt: timestamp
```

---

## Fases de Migración

### FASE 1 — Notas Clínicas e Imágenes (Prioridad ALTA)

**Archivos a modificar:**
- `src/components/ui/ClinicalNotesSection.jsx`
- `src/components/ui/ImageGallery.jsx`

**Cambios:**

#### 1.1 ClinicalNotesSection.jsx
Reemplazar `apiClient.notes.*` por operaciones Firestore:

```javascript
// ANTES (backend)
apiClient.notes.list(pathologyId)
apiClient.notes.create({ pathology_id, content, images: [] })
apiClient.notes.update(id, { content })
apiClient.notes.delete(id)

// DESPUÉS (Firestore)
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

// Leer notas
const notesRef = collection(db, 'users', user.uid, 'notes');
const q = query(notesRef, where('pathologyId', '==', pathologyId), orderBy('createdAt', 'desc'));
const snapshot = await getDocs(q);

// Crear nota
await addDoc(collection(db, 'users', user.uid, 'notes'), {
  pathologyId, content, createdAt: serverTimestamp(), updatedAt: serverTimestamp()
});

// Actualizar nota
await updateDoc(doc(db, 'users', user.uid, 'notes', noteId), {
  content, updatedAt: serverTimestamp()
});

// Eliminar nota
await deleteDoc(doc(db, 'users', user.uid, 'notes', noteId));
```

#### 1.2 ImageGallery.jsx
Reemplazar la lógica de "nota especial con sufijo `_images`" por subcolección propia:

```javascript
// Leer imágenes de una patología
const imagesRef = collection(db, 'users', user.uid, 'images');
const q = query(imagesRef, where('pathologyId', '==', pathologyId));
const snapshot = await getDocs(q);

// Guardar/actualizar imágenes
// Un documento por patología con array de URLs
```

---

### FASE 2 — Idioma y Perfil de Usuario (Prioridad ALTA)

**Archivos a modificar:**
- `src/components/i18n/LanguageContext.jsx` (actualmente usa localStorage)
- `src/api/apiClient.js` (endpoint `user.updateLanguage`)

**Cambios:**
```javascript
// Guardar idioma en Firestore además de localStorage
import { doc, updateDoc } from 'firebase/firestore';
await updateDoc(doc(db, 'users', user.uid), { language: lang });
```

Esto permite que el idioma se sincronice entre dispositivos.

---

### FASE 3 — Suscripción (Prioridad MEDIA)

**Archivos a modificar:**
- `src/pages/Suscripcion.jsx`

**Cambios:**
```javascript
// ANTES
apiClient.user.subscription()

// DESPUÉS - Leer desde el documento del usuario
const userDoc = await getDoc(doc(db, 'users', user.uid));
const subscription = userDoc.data().subscription;
```

**Nota:** La suscripción se lee de Firestore, pero la **activación** tras un pago
debe seguir siendo server-side (Cloud Functions) para evitar manipulación del cliente.

---

### FASE 4 — Pagos (Prioridad BAJA - Mantener en Cloud Functions)

**Archivos que NO se migran:**
- `src/components/payments/MercadoPagoButton.jsx`
- `src/components/payments/PayPalButton.jsx`

**Razón:** Los pagos requieren:
- Claves secretas (API keys de MercadoPago/PayPal) que NO deben estar en el frontend
- Validación server-side de transacciones
- Webhooks para confirmar pagos

**Acción:** Estos se implementarán cuando se desplieguen las Cloud Functions.
Por ahora, se pueden deshabilitar los botones de pago o mostrar "Próximamente".

---

### FASE 5 — Export Admin (Prioridad BAJA)

**Archivos a modificar:**
- `src/components/StandaloneExport.jsx`

**Cambios:** Consultar directamente Firestore con permisos de admin:
```javascript
// Solo si user.role === 'admin'
const usersSnapshot = await getDocs(collection(db, 'users'));
// Iterar y exportar...
```

---

## Firestore Security Rules (Actualizar)

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Perfil de usuario - solo el dueño puede leer/escribir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Notas clínicas - solo el dueño
      match /notes/{noteId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      // Imágenes - solo el dueño
      match /images/{imageId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Admin: lectura de todos los usuarios (para export)
    match /users/{userId} {
      allow read: if request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Archivos a Eliminar Post-Migración

Una vez completada toda la migración:

- `src/api/apiClient.js` — Ya no se necesita
- `src/api/base44Client.js` — Legado, no se usa
- `src/lib/AuthContext.jsx` — Duplicado del de `components/auth/`
- Proxy en `vite.config.js` — Eliminar configuración `/api`

---

## Orden de Ejecución Recomendado

1. **FASE 1** — Migrar notas clínicas e imágenes a Firestore
2. **FASE 2** — Sincronizar idioma con Firestore
3. Actualizar Firestore Security Rules
4. **FASE 3** — Migrar lectura de suscripción
5. Eliminar proxy de Vite y archivos obsoletos
6. **FASE 4 y 5** — Implementar cuando se necesiten pagos y export

---

## Dependencias Técnicas

- `firebase` v10.12.0 (ya instalado)
- `firebase/firestore` (ya importado en config)
- No se requieren nuevas dependencias

---

## Riesgos y Consideraciones

| Riesgo | Mitigación |
|--------|------------|
| Datos sensibles en frontend | Firestore Rules restringen acceso por usuario |
| Manipulación de suscripción | Activación solo via Cloud Functions (server-side) |
| Imágenes en base64 muy grandes | Considerar migrar a Firebase Storage en el futuro |
| Límite de escrituras Firestore | Plan gratuito: 20K escrituras/día (suficiente para inicio) |
| Lectura de datos admin | Protegido por regla de role === 'admin' |
