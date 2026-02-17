import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PATHOLOGIES, CATEGORIES, getCategoryColor } from '@/components/data/pathologies';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import PathologyCard from '@/components/ui/PathologyCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Zap, Filter, X, LayoutGrid, List, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [redirectChecked, setRedirectChecked] = useState(false);

  // Función para normalizar texto (sin tildes, sin mayúsculas)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Verificar autenticación
  useEffect(() => {
    if (isLoading) return;
    
    if (!redirectChecked) {
      setRedirectChecked(true);
      
      if (!user) {
        navigate(createPageUrl('Acceso'), { replace: true });
      }
    }
  }, [isLoading, user, redirectChecked, navigate]);

  // Mostrar loader mientras carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-violet-600 dark:text-violet-300" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, mostrar nada mientras redirige
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-violet-600 dark:text-violet-300" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  const filteredPathologies = useMemo(() => {
    return PATHOLOGIES.filter(p => {
      const normalizedSearch = normalizeText(searchTerm);
      const matchesSearch = normalizedSearch === '' ||
                           normalizeText(p.nombre).includes(normalizedSearch) ||
                           normalizeText(p.descripcionBreve).includes(normalizedSearch);
      const matchesCategory = !selectedCategory || p.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    PATHOLOGIES.forEach(p => {
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 overflow-hidden transition-colors">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t('login.title')}
              </h1>
              </div>
              <p className="text-lg text-violet-100 mb-8">
              {t('dashboard.clinicalProtocols')}
              </p>

            {/* Barra de búsqueda */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder={t('dashboard.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/95 dark:bg-slate-800/95 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 backdrop-blur border-0 shadow-xl rounded-xl focus:ring-2 focus:ring-white/50 dark:focus:ring-slate-600"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filtros y contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros de categoría */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('dashboard.filterByCategory')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={!selectedCategory ? "bg-gray-900 text-white" : ""}
            >
              {t('dashboard.all')} ({PATHOLOGIES.length})
            </Button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="transition-all"
                style={selectedCategory === key ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: selectedCategory === key ? 'white' : cat.color }}
                />
                {t(`categories.${key}`)} ({categoryCounts[key] || 0})
              </Button>
            ))}
          </div>
        </div>

        {/* Admin: Export button */}
        {user?.role === 'admin' && (
          <div className="mb-6">
            <Button
              onClick={() => navigate(createPageUrl('ExportarStandalone'))}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar App Standalone
            </Button>
          </div>
        )}

        {/* Controles de vista */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {filteredPathologies.length} {filteredPathologies.length !== 1 ? t('dashboard.pathologiesFound') : t('dashboard.pathologyFound')}
          </p>
          <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid de patologías */}
        <AnimatePresence mode="wait">
          {filteredPathologies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{t('dashboard.noResults')}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t('dashboard.tryOtherTerms')}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-3"
              }
            >
              {filteredPathologies.map((pathology, index) => (
                <PathologyCard
                  key={pathology.id}
                  pathology={pathology}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}