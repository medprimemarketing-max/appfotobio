import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getPathologyById, getCategoryColor, getCategoryName } from '@/components/data/pathologies';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { getTranslatedName, getTranslatedDescription, getTranslatedPrecautions } from '@/components/i18n/pathologyTranslations';
import ProtocolTable from '@/components/ui/ProtocolTable';
import ClinicalNotesSection from '@/components/ui/ClinicalNotesSection';
import AnatomicalSchemas from '@/components/ui/AnatomicalSchemas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Info, 
  FileText, 
  Target,
  Zap,
  Brain,
  Droplet,
  Sparkles,
  MessageCircle, AudioWaveform, Mic, UtensilsCrossed, Ear, Baby,
  Flower2, Puzzle, MessageSquareOff, Smile, Skull, EarOff,
  Droplets, Scissors, Flame, Sun, Navigation, Lock,
  Dumbbell, Stethoscope, Frown, Wind, Moon, CloudRain, BookOpen,
  BrainCircuit, Hand, Activity, HeartPulse, Accessibility,
  CircleDot, Volume2, ArrowUpFromLine, Lightbulb, HeartCrack,
  FileQuestion
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  MessageCircle, AudioWaveform, Mic, UtensilsCrossed, Ear, Baby,
  Flower2, Puzzle, Brain, MessageSquareOff, Smile, Skull, EarOff,
  Zap, Droplets, Scissors, Flame, Droplet, Sun, Navigation, Lock,
  Dumbbell, Stethoscope, Frown, Wind, Moon, CloudRain, BookOpen,
  BrainCircuit, Hand, Activity, HeartPulse, Accessibility, AlertTriangle,
  CircleDot, Volume2, ArrowUpFromLine, Lightbulb, HeartCrack
};

const PROTOCOL_ORDER = ['puntual', 'ILIB', 'PDT', 'transcraneal'];

export default function Patologia() {
  const { user, isLoading: authLoading } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeProtocol, setActiveProtocol] = useState(null);
  
  // Leer el ID de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const pathologyId = urlParams.get('id');
  
  const pathology = useMemo(() => {
    return pathologyId ? getPathologyById(pathologyId) : null;
  }, [pathologyId]);
  
  // Scroll to top cuando cambia la patología
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathologyId]);
  
  // Verificación de autenticación
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate(createPageUrl('Acceso'), { replace: true });
    }
  }, [authLoading, user, navigate]);

  // Mostrar loader solo mientras carga autenticación
  if (authLoading) {
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

  // Si no hay usuario después de cargar, mostrar loader mientras redirige
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-violet-600 dark:text-violet-300" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{t('common.redirecting')}</p>
        </div>
      </div>
    );
  }

  // Si no se encontró la patología, mostrar error
  if (!pathology) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('pathology.notFound')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t('pathology.notFoundMessage')}</p>
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[pathology.icono] || FileQuestion;
  const categoryColor = getCategoryColor(pathology.categoria);
  const categoryName = getCategoryName(pathology.categoria);
  const availableProtocols = PROTOCOL_ORDER.filter(p => pathology.protocolos?.[p]);

  // Inicializar protocolo activo con el primero disponible
  useEffect(() => {
    if (availableProtocols.length > 0 && !activeProtocol) {
      setActiveProtocol(availableProtocols[0]);
    }
  }, [availableProtocols, activeProtocol]);

  const evidenceColors = {
    'A': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'A-B': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'B': 'bg-blue-100 text-blue-800 border-blue-300',
    'B-C': 'bg-blue-100 text-blue-800 border-blue-300',
    'C': 'bg-amber-100 text-amber-800 border-amber-300',
    'C-D': 'bg-amber-100 text-amber-800 border-amber-300',
    'D': 'bg-red-100 text-red-800 border-red-300'
  };

  const isExperimental = ['C-D', 'D'].includes(pathology.nivelEvidenciaGlobal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors">
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${categoryColor}dd 0%, ${categoryColor}99 100%)` }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navegación */}
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToPathologies')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-white/20 text-white border-0">{categoryName}</Badge>
                <Badge className={`${evidenceColors[pathology.nivelEvidenciaGlobal]} border`}>
                  {t('pathology.evidence')} {pathology.nivelEvidenciaGlobal}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {getTranslatedName(pathology.id, language)}
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-3xl">
                {getTranslatedDescription(pathology.id, language)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerta experimental */}
        {isExperimental && (
          <Alert className="mb-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-200">{t('pathology.experimentalProtocol')}</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              {t('pathology.experimentalWarning')}
            </AlertDescription>
          </Alert>
        )}

        {/* Advertencias */}
        {getTranslatedPrecautions(pathology.id, language) && (
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-200">{t('pathology.precautions')}</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              {getTranslatedPrecautions(pathology.id, language)}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs de protocolos */}
        <Tabs defaultValue={availableProtocols[0] || 'info'} className="space-y-6" onValueChange={setActiveProtocol}>
          <div className="flex justify-center mb-6">
            <TabsList className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-1 h-auto flex-wrap inline-flex">
              {availableProtocols.map(protocol => (
                <TabsTrigger
                  key={protocol}
                  value={protocol}
                  className="data-[state=active]:bg-violet-100 dark:data-[state=active]:bg-violet-900 data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-300 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 hover:scale-105 transition-all"
                >
                  {protocol === 'puntual' && <Target className="w-4 h-4 mr-2" />}
                  {protocol === 'ILIB' && <Droplet className="w-4 h-4 mr-2" />}
                  {protocol === 'PDT' && <Sparkles className="w-4 h-4 mr-2" />}
                  {protocol === 'transcraneal' && <Brain className="w-4 h-4 mr-2" />}
                  {t(`pathology.${protocol}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {availableProtocols.map(protocol => (
            <TabsContent key={protocol} value={protocol}>
              <ProtocolTable 
                protocol={pathology.protocolos[protocol]} 
                type={protocol}
                pathologyId={pathology.id}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Esquemas Anatómicos Oficiales */}
        <div className="mt-8">
          <AnatomicalSchemas pathologyId={pathology.id} activeProtocol={activeProtocol} />
        </div>

        {/* Notas Clínicas */}
        <div className="mt-8">
          <ClinicalNotesSection pathologyId={pathology.id} />
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <strong>{t('common.importantNotice')}</strong> {t('common.protocolsDisclaimer')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}