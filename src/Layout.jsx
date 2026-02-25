import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { LanguageProvider, useLanguage } from '@/components/i18n/LanguageContext';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeContext';

import LanguageConsistencyChecker from '@/components/i18n/LanguageConsistencyChecker';
import ErrorBoundary from '@/components/ErrorBoundary';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Zap, User, LogOut, Info, LayoutDashboard, Menu, Moon, Sun, Globe } from 'lucide-react';

function LayoutContent({ children, currentPageName }) {
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Redirigir a Dashboard si está en AcercaDe y acaba de entrar
  React.useEffect(() => {
    if (user && currentPageName === 'AcercaDe' && window.location.pathname === '/') {
      navigate(createPageUrl('Dashboard'), { replace: true });
    }
  }, [user, currentPageName, navigate]);
  
  // Páginas que no necesitan navegación
  const noNavPages = [];
  const showNav = user;

  const handleLogout = () => {
    logout();
    navigate(createPageUrl('Acceso'));
  };

  if (!showNav) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 backdrop-blur bg-white/95 dark:bg-slate-800/95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white hidden sm:block">FBM Fonoaudiología</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <Link to={createPageUrl('Dashboard')}>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {t('dashboard.title')}
                </Button>
              </Link>
              <Link to={createPageUrl('AcercaDe')}>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <Info className="w-4 h-4 mr-2" />
                  {t('about.title')}
                </Button>
              </Link>

              {/* Botón selector de idioma */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white gap-2">
                    <Globe className="w-4 h-4" />
                    {t('login.selectLanguage')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => changeLanguage('es')} className="cursor-pointer">
                    <span className="mr-2">🇪🇸</span>
                    Español
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer">
                    <span className="mr-2">🇺🇸</span>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('pt')} className="cursor-pointer">
                    <span className="mr-2">🇧🇷</span>
                    Português
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              {/* Toggle Theme */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span className="sm:inline">Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span className="sm:inline">Oscuro</span>
                  </>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-600 dark:text-violet-300" />
                    </div>
                    <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">{user?.username || user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user?.username || user?.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('common.activeSession')}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link to={createPageUrl('Dashboard')}>
                    <DropdownMenuItem className="cursor-pointer md:hidden">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {t('dashboard.title')}
                    </DropdownMenuItem>
                  </Link>
                  <Link to={createPageUrl('AcercaDe')}>
                    <DropdownMenuItem className="cursor-pointer md:hidden">
                      <Info className="w-4 h-4 mr-2" />
                      {t('about.title')}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  
                  {/* Idioma en móvil */}
                  <div className="md:hidden px-3 py-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('login.selectLanguage')}</p>
                    <div className="flex gap-2">
                      <Button
                        variant={language === 'es' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => changeLanguage('es')}
                        className={language === 'es' ? 'bg-violet-600 hover:bg-violet-700 flex-1' : 'flex-1'}
                      >
                        🇪🇸
                      </Button>
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => changeLanguage('en')}
                        className={language === 'en' ? 'bg-violet-600 hover:bg-violet-700 flex-1' : 'flex-1'}
                      >
                        🇺🇸
                      </Button>
                      <Button
                        variant={language === 'pt' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => changeLanguage('pt')}
                        className={language === 'pt' ? 'bg-violet-600 hover:bg-violet-700 flex-1' : 'flex-1'}
                      >
                        🇧🇷
                      </Button>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="md:hidden" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('common.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            {/* Aviso de formación requerida */}
            <div className="w-full bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 text-center">
                {{
                  es: '⚠️ Se requiere formación en Fotobiomodulación para el uso de estos protocolos',
                  en: '⚠️ Photobiomodulation training is required to use these protocols',
                  pt: '⚠️ É necessária formação em Fotobiomodulação para o uso destes protocolos'
                }[language]}
              </p>
            </div>

            {/* Footer info existente */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{t('login.title')} {t('login.subtitle')}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
                <p>Flga. Carolina Henríquez • Flgo. Joel Valenzuela</p>
                <p className="text-xs mt-1">{t('login.protocolsOrientation')}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <LayoutContent currentPageName={currentPageName}>
            {children}
          </LayoutContent>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}