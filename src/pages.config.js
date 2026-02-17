/**
 * pages.config.js - Page routing configuration
 *
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 *
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 */
import Acceso from './pages/Acceso';
import AcercaDe from './pages/AcercaDe';
import Dashboard from './pages/Dashboard';
import IniciarSesion from './pages/IniciarSesion';
import Patologia from './pages/Patologia';
import ExportarStandalone from './pages/ExportarStandalone';
import Registro from './pages/Registro';
import RecuperarPassword from './pages/RecuperarPassword';
import Suscripcion from './pages/Suscripcion';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Acceso": Acceso,
    "AcercaDe": AcercaDe,
    "Dashboard": Dashboard,
    "IniciarSesion": IniciarSesion,
    "Patologia": Patologia,
    "ExportarStandalone": ExportarStandalone,
    "Registro": Registro,
    "RecuperarPassword": RecuperarPassword,
    "Suscripcion": Suscripcion,
}

export const pagesConfig = {
    mainPage: "Acceso",
    Pages: PAGES,
    Layout: __Layout,
};
