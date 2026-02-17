import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import JSZip from 'npm:jszip@3.10.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { session_token } = await req.json();
        
        // Validar sesión custom
        if (!session_token) {
            return Response.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Verificar sesión en la base de datos
        const sessions = await base44.asServiceRole.entities.AppSession.filter({ session_token });
        
        if (!sessions || sessions.length === 0) {
            return Response.json({ error: 'Invalid session' }, { status: 401 });
        }

        const session = sessions[0];
        
        // Verificar expiración
        if (new Date(session.expires_at) < new Date()) {
            return Response.json({ error: 'Session expired' }, { status: 401 });
        }

        // Obtener usuario
        const users = await base44.asServiceRole.entities.AppUser.filter({ id: session.user_id });
        
        if (!users || users.length === 0) {
            return Response.json({ error: 'User not found' }, { status: 401 });
        }

        const user = users[0];

        if (user.role !== 'admin') {
            return Response.json({ error: 'Admin access required' }, { status: 403 });
        }

        const zip = new JSZip();

        // package.json
        zip.file('package.json', JSON.stringify({
            "name": "fbm-fonoaudiologia-standalone",
            "version": "1.0.0",
            "description": "FBM Fonoaudiología - Standalone Application",
            "type": "module",
            "scripts": {
                "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
                "dev:server": "nodemon server/index.js",
                "dev:client": "vite",
                "build": "vite build",
                "preview": "vite preview",
                "start": "node server/index.js",
                "db:init": "node server/init-db.js"
            },
            "dependencies": {
                "@radix-ui/react-accordion": "^1.2.3",
                "@radix-ui/react-alert-dialog": "^1.1.6",
                "@radix-ui/react-dropdown-menu": "^2.1.6",
                "@radix-ui/react-label": "^2.1.2",
                "@radix-ui/react-slot": "^1.1.2",
                "@radix-ui/react-tabs": "^1.1.3",
                "@tanstack/react-query": "^5.84.1",
                "bcryptjs": "^2.4.3",
                "better-sqlite3": "^9.4.0",
                "class-variance-authority": "^0.7.1",
                "clsx": "^2.1.1",
                "cors": "^2.8.5",
                "date-fns": "^3.6.0",
                "express": "^4.18.2",
                "framer-motion": "^11.16.4",
                "lodash": "^4.17.21",
                "lucide-react": "^0.475.0",
                "moment": "^2.30.1",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-markdown": "^9.0.1",
                "react-router-dom": "^6.26.0",
                "sonner": "^2.0.1",
                "tailwind-merge": "^3.0.2",
                "tailwindcss-animate": "^1.0.7",
                "uuid": "^9.0.1"
            },
            "devDependencies": {
                "@vitejs/plugin-react": "^4.2.1",
                "autoprefixer": "^10.4.16",
                "concurrently": "^8.2.2",
                "nodemon": "^3.0.2",
                "postcss": "^8.4.32",
                "tailwindcss": "^3.4.0",
                "vite": "^5.0.8"
            },
            "engines": {
                "node": ">=18.0.0"
            }
        }, null, 2));

        // README.md
        zip.file('README.md', `# FBM Fonoaudiología - Standalone

Aplicación standalone de protocolos de Fotobiomodulación, completamente offline.

## Requisitos
- Node.js v18.0.0+
- npm v9.0.0+

## Instalación

\`\`\`bash
npm install
\`\`\`

## Configuración

\`\`\`bash
cp .env.example .env
npm run db:init
\`\`\`

Usuario admin por defecto:
- Username: \`admin\`
- Password: \`admin123\`

## Ejecución

### Desarrollo
\`\`\`bash
npm run dev
\`\`\`
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Producción
\`\`\`bash
npm run build
npm start
\`\`\`

## Estructura

\`\`\`
.
├── server/           # Backend Express + SQLite
├── src/              # Frontend React
├── database.sqlite   # Base de datos local
└── package.json      # Dependencias
\`\`\`

## Base de Datos

SQLite local con tablas:
- \`app_users\`: Usuarios
- \`app_sessions\`: Sesiones
- \`clinical_notes\`: Notas clínicas

## API Endpoints

- \`POST /api/auth/login\` - Login
- \`POST /api/auth/logout\` - Logout
- \`GET /api/auth/me\` - Usuario actual
- \`GET /api/notes/:pathologyId\` - Notas
- \`POST /api/notes\` - Crear nota
- \`PUT /api/notes/:id\` - Actualizar nota
- \`DELETE /api/notes/:id\` - Eliminar nota

---

⚠️ Se requiere formación en Fotobiomodulación para usar estos protocolos.
`);

        // .env.example
        zip.file('.env.example', `NODE_ENV=development
PORT=3000
VITE_API_URL=http://localhost:3000
DATABASE_PATH=./database.sqlite
SESSION_EXPIRES_DAYS=7
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
DEFAULT_ADMIN_EMAIL=admin@fbm.local
`);

        // .gitignore
        zip.file('.gitignore', `node_modules/
dist/
database.sqlite
*.db
.env
.env.local
*.log
.DS_Store
.vscode/
`);

        // vite.config.js
        zip.file('vite.config.js', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
`);

        // tailwind.config.js
        zip.file('tailwind.config.js', `export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
};
`);

        // postcss.config.js
        zip.file('postcss.config.js', `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);

        // server/index.js
        zip.file('server/index.js', `import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(\`🚀 Server: http://localhost:\${PORT}\`);
});
`);

        // server/db.js
        zip.file('server/db.js', `import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../database.sqlite');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

export default db;
`);

        // server/init-db.js
        zip.file('server/init-db.js', `import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../database.sqlite');

if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

db.exec(\`
  CREATE TABLE app_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    preferred_language TEXT DEFAULT 'es',
    is_active INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active',
    created_date TEXT DEFAULT (datetime('now')),
    updated_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE app_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    created_date TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE
  );

  CREATE TABLE clinical_notes (
    id TEXT PRIMARY KEY,
    pathology_id TEXT NOT NULL,
    user_identifier TEXT NOT NULL,
    content TEXT NOT NULL,
    images TEXT DEFAULT '[]',
    created_date TEXT DEFAULT (datetime('now')),
    updated_date TEXT DEFAULT (datetime('now')),
    created_by TEXT
  );

  CREATE INDEX idx_sessions_token ON app_sessions(session_token);
  CREATE INDEX idx_notes_pathology_user ON clinical_notes(pathology_id, user_identifier);
\`);

const adminId = crypto.randomUUID();
const adminPasswordHash = bcrypt.hashSync('admin123', 10);

db.prepare(\`
  INSERT INTO app_users (id, username, email, password_hash, role)
  VALUES (?, 'admin', 'admin@fbm.local', ?, 'admin')
\`).run(adminId, adminPasswordHash);

console.log('✅ Database initialized!');
console.log('   Username: admin');
console.log('   Password: admin123');
db.close();
`);

        // server/routes/auth.js
        zip.file('server/routes/auth.js', `import express from 'express';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import db from '../db.js';

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });

    const user = db.prepare('SELECT * FROM app_users WHERE username = ? AND is_active = 1').get(username);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const sessionToken = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    db.prepare(\`INSERT INTO app_sessions (id, user_id, session_token, expires_at)
      VALUES (?, ?, ?, ?)\`).run(crypto.randomUUID(), user.id, sessionToken, expiresAt.toISOString());

    res.json({
      session_token: sessionToken,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/me', (req, res) => {
  try {
    const { session_token } = req.body;
    if (!session_token) return res.status(401).json({ error: 'No token' });

    const session = db.prepare(\`SELECT s.*, u.* FROM app_sessions s
      JOIN app_users u ON s.user_id = u.id
      WHERE s.session_token = ? AND s.expires_at > datetime('now')\`).get(session_token);

    if (!session) return res.status(401).json({ error: 'Invalid session' });

    res.json({
      id: session.user_id,
      username: session.username,
      email: session.email,
      role: session.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    const { session_token } = req.body;
    if (session_token) db.prepare('DELETE FROM app_sessions WHERE session_token = ?').run(session_token);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
`);

        // server/routes/notes.js
        zip.file('server/routes/notes.js', `import express from 'express';
import db from '../db.js';

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const session = db.prepare(\`SELECT s.*, u.* FROM app_sessions s
    JOIN app_users u ON s.user_id = u.id
    WHERE s.session_token = ? AND s.expires_at > datetime('now')\`).get(token);

  if (!session) return res.status(401).json({ error: 'Invalid session' });

  req.user = { id: session.user_id, username: session.username, email: session.email, role: session.role };
  next();
};

router.get('/:pathologyId', authenticate, (req, res) => {
  try {
    const userIdentifier = req.user.email || req.user.username;
    const notes = db.prepare(\`SELECT * FROM clinical_notes 
      WHERE pathology_id = ? AND user_identifier = ? ORDER BY created_date DESC\`)
      .all(req.params.pathologyId, userIdentifier);

    res.json(notes.map(n => ({ ...n, images: JSON.parse(n.images || '[]') })));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, (req, res) => {
  try {
    const { pathology_id, content, images = [] } = req.body;
    const userIdentifier = req.user.email || req.user.username;
    const id = crypto.randomUUID();

    db.prepare(\`INSERT INTO clinical_notes (id, pathology_id, user_identifier, content, images, created_by)
      VALUES (?, ?, ?, ?, ?, ?)\`).run(id, pathology_id, userIdentifier, content.trim(), JSON.stringify(images), req.user.username);

    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticate, (req, res) => {
  try {
    const { content } = req.body;
    const userIdentifier = req.user.email || req.user.username;
    const note = db.prepare('SELECT * FROM clinical_notes WHERE id = ?').get(req.params.id);

    if (!note) return res.status(404).json({ error: 'Not found' });
    if (note.user_identifier !== userIdentifier) return res.status(403).json({ error: 'Forbidden' });

    db.prepare(\`UPDATE clinical_notes SET content = ?, updated_date = datetime('now') WHERE id = ?\`)
      .run(content.trim(), req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticate, (req, res) => {
  try {
    const userIdentifier = req.user.email || req.user.username;
    const note = db.prepare('SELECT * FROM clinical_notes WHERE id = ?').get(req.params.id);

    if (!note) return res.status(404).json({ error: 'Not found' });
    if (note.user_identifier !== userIdentifier) return res.status(403).json({ error: 'Forbidden' });

    db.prepare('DELETE FROM clinical_notes WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
`);

        // index.html
        zip.file('index.html', `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FBM Fonoaudiología</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

        // src/main.jsx
        zip.file('src/main.jsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`);

        // src/App.jsx
        zip.file('src/App.jsx', `import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './Layout';

// Import pages (you'll need to copy all your pages here)
import Acceso from './pages/Acceso';
import Dashboard from './pages/Dashboard';
// ... other imports

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout><Acceso /></Layout>} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                {/* Add other routes */}
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
`);

        // src/index.css (COPIAR CONTENIDO COMPLETO DE globals.css)
        const globalsCss = await Deno.readTextFile('globals.css');
        zip.file('src/index.css', globalsCss);
        
        // Copiar TODOS los archivos del proyecto
        console.log('Copying pages...');
        const pagesDir = Deno.readDir('pages');
        for await (const entry of pagesDir) {
            if (entry.isFile && entry.name.endsWith('.js')) {
                const content = await Deno.readTextFile(`pages/${entry.name}`);
                zip.file(`src/pages/${entry.name}x`, content); // .jsx
            }
        }
        
        console.log('Copying components...');
        async function copyDirRecursive(dirPath, zipPath) {
            for await (const entry of Deno.readDir(dirPath)) {
                const fullPath = `${dirPath}/${entry.name}`;
                const zipFilePath = `${zipPath}/${entry.name}`;
                
                if (entry.isDirectory) {
                    await copyDirRecursive(fullPath, zipFilePath);
                } else if (entry.isFile && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
                    const content = await Deno.readTextFile(fullPath);
                    zip.file(entry.name.endsWith('.js') ? `${zipFilePath}x` : zipFilePath, content);
                }
            }
        }
        
        await copyDirRecursive('components', 'src/components');
        
        console.log('Copying Layout...');
        const layoutContent = await Deno.readTextFile('layout.js');
        zip.file('src/Layout.jsx', layoutContent);
        
        console.log('Copying pathologies data...');
        const pathologiesData = await Deno.readTextFile('components/data/pathologies.js');
        zip.file('src/components/data/pathologies.js', pathologiesData);
        
        console.log('Copying translations...');
        const translationsData = await Deno.readTextFile('components/i18n/translations.js');
        zip.file('src/components/i18n/translations.js', translationsData);

        // Generate ZIP
        console.log('Generating ZIP...');
        const zipBlob = await zip.generateAsync({ type: 'uint8array' });

        return new Response(zipBlob, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="fbm-standalone.zip"',
            },
        });
    } catch (error) {
        console.error('Export error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});