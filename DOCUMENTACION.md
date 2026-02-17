# APP FOTOBIO - Documentacion del Proyecto

## Descripcion General

**APP FOTOBIO** es una aplicacion clinica de referencia para fonoaudiologos que proporciona protocolos de tratamiento basados en evidencia para **fotobiomodulacion (FBM/PBM)** aplicada a diversas patologias del habla, audicion, deglucion y motricidad orofacial.

- **Plataforma:** React SPA sobre Base44 Backend
- **Version:** 0.0.0
- **Idiomas soportados:** Espanol (ES), Portugues (PT), Ingles (EN)

---

## Stack Tecnologico

| Categoria | Tecnologia |
|-----------|-----------|
| Frontend | React 18.2 + Vite 6.1 |
| Estilos | Tailwind CSS 3.4 + CSS Variables |
| Componentes UI | Radix UI (shadcn/ui) + Lucide Icons |
| Animaciones | Framer Motion 11.16 |
| Formularios | React Hook Form + Zod |
| Estado servidor | TanStack React Query 5 |
| Routing | React Router DOM 6.26 |
| Backend | Base44 SDK 0.8 |
| PDF/Export | jsPDF + HTML2Canvas |
| Graficos | Recharts 2.15 |
| 3D | Three.js 0.171 |
| Pagos | Stripe |
| Internacionalizacion | Sistema i18n personalizado |

---

## Estructura del Proyecto

```
APP FOTOBIO/
├── src/
│   ├── pages/                              # Paginas (rutas automaticas)
│   │   ├── Acceso.jsx                      # Login (pagina principal)
│   │   ├── Dashboard.jsx                   # Listado de patologias con busqueda
│   │   ├── Patologia.jsx                   # Vista detallada de protocolos
│   │   ├── AcercaDe.jsx                    # Pagina Acerca De / Referencias
│   │   ├── IniciarSesion.jsx               # Redireccion a Acceso
│   │   └── ExportarStandalone.jsx          # Exportacion (solo admin)
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthContext.jsx             # Contexto de autenticacion
│   │   ├── data/
│   │   │   └── pathologies.jsx             # Base de datos de patologias (1531 lineas)
│   │   ├── i18n/                           # Sistema de internacionalizacion
│   │   │   ├── LanguageContext.jsx          # Estado de idioma
│   │   │   ├── translations.jsx            # Traducciones generales
│   │   │   ├── pathologyTranslations.jsx   # Traducciones de patologias
│   │   │   ├── protocolTranslations.jsx    # Traducciones de protocolos
│   │   │   ├── allProtocolTranslations.jsx # Sistema completo de traducciones
│   │   │   ├── protocolFieldTranslations.jsx
│   │   │   └── LanguageConsistencyChecker.jsx
│   │   ├── theme/
│   │   │   └── ThemeContext.jsx             # Modo oscuro/claro
│   │   └── ui/                             # Componentes reutilizables (~50)
│   │       ├── PathologyCard.jsx           # Tarjeta de patologia
│   │       ├── ProtocolTable.jsx           # Tabla de parametros
│   │       ├── ClinicalNotesSection.jsx    # Notas clinicas del usuario
│   │       ├── AnatomicalSchemas.jsx       # Esquemas anatomicos
│   │       ├── ImageGallery.jsx            # Galeria de imagenes
│   │       └── [componentes shadcn/ui]
│   │
│   ├── api/
│   │   └── base44Client.js                 # Cliente SDK Base44
│   ├── lib/
│   │   ├── AuthContext.jsx                 # Auth provider Base44
│   │   ├── query-client.js                 # Config React Query
│   │   ├── NavigationTracker.jsx           # Tracking de URL
│   │   └── utils.js                        # Utilidades
│   ├── hooks/
│   │   └── use-mobile.jsx                  # Deteccion mobile
│   ├── utils/
│   │   └── index.ts                        # createPageUrl
│   │
│   ├── App.jsx                             # Componente principal + rutas
│   ├── Layout.jsx                          # Layout global (navbar/footer)
│   ├── main.jsx                            # Entry point ReactDOM
│   ├── index.css                           # Estilos base Tailwind
│   └── pages.config.js                     # Config de rutas auto-generada
│
├── functions/                              # Funciones backend (cloud)
├── index.html                              # HTML entry point
├── vite.config.js                          # Configuracion Vite
├── tailwind.config.js                      # Configuracion Tailwind
├── package.json                            # Dependencias y scripts
└── README.md                               # Setup basico Base44
```

---

## Rutas de la Aplicacion

| Ruta | Pagina | Descripcion |
|------|--------|-------------|
| `/` | Acceso | Login / pantalla inicial |
| `/Dashboard` | Dashboard | Listado de patologias con busqueda y filtros |
| `/Patologia?id=X` | Patologia | Vista detallada de protocolo por patologia |
| `/AcercaDe` | AcercaDe | Informacion, disclaimers y referencias cientificas |
| `/ExportarStandalone` | ExportarStandalone | Exportar app como ZIP offline (solo admin) |

---

## Modelo de Datos

### Patologias (`pathologies.jsx`)

Cada patologia contiene:

- **Info basica:** id, nombre (multiidioma), icono, categoria
- **Categoria:** VOZ, DEGLUCION, AUDICION, LENGUAJE, NEUROCOGNITIVO, DOLOR, MOTRICIDAD_OROFACIAL, ONCOLOGICO, RESPIRATORIO, SISTEMICO
- **Nivel de evidencia:** A (alto) / B / C / D (teorico)

### Protocolos (por patologia)

Cada patologia puede tener multiples modalidades de tratamiento:

| Modalidad | Descripcion |
|-----------|-------------|
| `puntual` | Tratamiento local por puntos (660nm rojo + 808nm infrarrojo) |
| `ILIB` | Tratamiento sistemico intraluminal (vascular) |
| `PDT` | Terapia fotodinamica |
| `transcraneal` | Tratamiento transcraneal con puntos EEG 10/20 |

Parametros de cada protocolo:
- Zonas anatomicas
- Longitudes de onda (660nm, 808nm)
- Energia por punto (Joules)
- Numero de puntos
- Frecuencia de sesiones (por semana)
- Duracion total del tratamiento
- Precauciones y nivel de evidencia

---

## Funcionalidades Principales

### 1. Autenticacion
- Login con usuario/contrasena via Base44
- Sesion almacenada en localStorage
- Verificacion automatica al cargar la app
- Acceso restringido por roles (admin para exportacion)

### 2. Busqueda y Navegacion de Protocolos
- Vista grid/lista en Dashboard
- Busqueda por texto (normalizada, sin acentos)
- Filtrado por 10 categorias de patologias
- Codificacion por color segun categoria
- Badges de nivel de evidencia

### 3. Vista Detallada de Protocolos
- Multiples modalidades de tratamiento por patologia
- Zonas anatomicas con esquemas visuales
- Parametros de dosimetria
- Precauciones clinicas
- Referencias de estudios

### 4. Notas Clinicas
- Notas por patologia (CRUD completo)
- Persistencia via entidades Base44
- Indexadas por usuario
- Soporte para imagenes adjuntas

### 5. Internacionalizacion (i18n)
- 3 idiomas: Espanol, Portugues, Ingles
- Traducciones de UI, patologias y campos de protocolo
- Persistencia de preferencia en localStorage

### 6. Modo Oscuro
- Toggle claro/oscuro en navbar
- Basado en CSS variables
- Persistido en localStorage

### 7. Exportacion Standalone
- Solo para administradores
- Genera ZIP con Express + SQLite para uso offline

### 8. Diseno Responsivo
- Mobile-first con Tailwind
- Navbar adaptativa
- Botones touch-friendly

---

## Categorias y Colores

| Categoria | Color | Hex |
|-----------|-------|-----|
| VOZ | Purpura | #8B5CF6 |
| DEGLUCION | Naranja | #F97316 |
| AUDICION | Azul | #3B82F6 |
| LENGUAJE | Esmeralda | #10B981 |
| NEUROCOGNITIVO | Rosa | #EC4899 |
| DOLOR | Rojo | #EF4444 |
| MOTRICIDAD_OROFACIAL | Cyan | #06B6D4 |
| ONCOLOGICO | Ambar | #F59E0B |
| RESPIRATORIO | Lima | #84CC16 |
| SISTEMICO | Indigo | #6366F1 |

---

## Niveles de Evidencia

| Nivel | Significado | Color |
|-------|-------------|-------|
| A / A-B | Alta confianza (meta-analisis, RCTs) | Esmeralda |
| B / B-C | Confianza moderada | Azul |
| C / C-D | Evidencia preliminar | Ambar |
| D | Teorico / evidencia limitada | Rojo |

---

## Integracion con Base44

### Funciones Backend Utilizadas
- `authLogin` - Autenticacion de usuario
- `authMe` - Verificacion de sesion actual
- `authLogout` - Cierre de sesion
- `setPreferredLanguage` - Guardar preferencia de idioma
- `updateClinicalNote` - Actualizar notas con log de auditoria
- `exportStandalone` - Generar ZIP standalone

### Entidades
- `ClinicalNote` - Notas clinicas del usuario (filtradas por pathology_id y user_identifier)

---

## Scripts de Desarrollo

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (localhost:5173)
npm run build        # Build de produccion
npm run preview      # Preview del build
npm run lint         # Verificar calidad de codigo
npm run lint:fix     # Corregir problemas de lint
npm run typecheck    # Verificacion de tipos
```

### Variables de Entorno (`.env.local`)

```
VITE_BASE44_APP_ID=<app-id>
VITE_BASE44_APP_BASE_URL=<backend-url>
```

---

## Estadisticas del Proyecto

| Metrica | Valor |
|---------|-------|
| Archivos fuente | 86 JSX/JS |
| Patologias en BD | 100+ |
| Idiomas | 3 |
| Componentes UI | 50+ |
| Categorias de patologia | 10 |
| Tipos de protocolo | 4 |
| Dependencias npm | 79 |
| Dependencias dev | 19 |

---

## Arquitectura de Providers

```
QueryClientProvider
  └── Base44AuthProvider (lib/AuthContext.jsx)
        └── AuthProvider (components/auth/AuthContext.jsx)
              └── LanguageProvider
                    └── ThemeProvider
                          └── BrowserRouter
                                └── Layout
                                      └── Routes (pages)
```

---

## Consideraciones Importantes

- Los protocolos son **orientativos**, no sustituyen el juicio clinico
- Se requiere **formacion en Fotobiomodulacion** para usar los protocolos
- No reemplaza la formacion medica ni las guias oficiales
- Requiere evaluacion individualizada del paciente
- Se recomienda revision periodica de la literatura (evidencia en evolucion)

---

## Posibles Mejoras Futuras

1. Migrar patologias a base de datos backend (actualmente hardcoded en JS)
2. Subida y almacenamiento de imagenes clinicas
3. Exportacion PDF de protocolos individuales
4. Colaboracion multi-usuario en casos
5. Busqueda avanzada con filtros combinados
6. Templates personalizables de protocolos
7. Dashboard de analiticas de uso
8. App nativa mobile (React Native)
9. Modo offline con Service Workers
10. Integracion con sistemas de Historia Clinica Electronica (HCE)
