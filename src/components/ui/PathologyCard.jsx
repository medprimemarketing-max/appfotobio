import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getCategoryColor, getCategoryName } from '../data/pathologies';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { getTranslatedName } from '@/components/i18n/pathologyTranslations';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  MessageCircle, AudioWaveform, Mic, UtensilsCrossed, Ear, Baby,
  Flower2, Puzzle, Brain, MessageSquareOff, Smile, Skull, EarOff,
  Zap, Droplets, Scissors, Flame, Droplet, Sun, Navigation, Lock,
  Dumbbell, Stethoscope, Frown, Wind, Moon, CloudRain, BookOpen,
  BrainCircuit, Hand, Activity, HeartPulse, Accessibility, AlertTriangle,
  CircleDot, Volume2, ArrowUpFromLine, Lightbulb, HeartCrack, ArrowRight,
  FileQuestion
} from 'lucide-react';

const iconMap = {
  MessageCircle, AudioWaveform, Mic, UtensilsCrossed, Ear, Baby,
  Flower2, Puzzle, Brain, MessageSquareOff, Smile, Skull, EarOff,
  Zap, Droplets, Scissors, Flame, Droplet, Sun, Navigation, Lock,
  Dumbbell, Stethoscope, Frown, Wind, Moon, CloudRain, BookOpen,
  BrainCircuit, Hand, Activity, HeartPulse, Accessibility, AlertTriangle,
  CircleDot, Volume2, ArrowUpFromLine, Lightbulb, HeartCrack
};

export default function PathologyCard({ pathology, index }) {
  const { language, t } = useLanguage();
  const Icon = iconMap[pathology.icono] || FileQuestion;
  const categoryColor = getCategoryColor(pathology.categoria);
  const categoryName = t(`categories.${pathology.categoria}`);
  
  const evidenceColors = {
    'A': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'A-B': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'B': 'bg-blue-100 text-blue-800 border-blue-300',
    'B-C': 'bg-blue-100 text-blue-800 border-blue-300',
    'C': 'bg-amber-100 text-amber-800 border-amber-300',
    'C-D': 'bg-amber-100 text-amber-800 border-amber-300',
    'D': 'bg-red-100 text-red-800 border-red-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Link to={createPageUrl(`Patologia?id=${pathology.id}`)}>
        <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:border-violet-400 dark:hover:border-violet-500 hover:scale-[1.02] transition-all duration-300 overflow-hidden h-full">
          {/* Barra de color superior */}
          <div 
            className="h-1.5 w-full group-hover:h-2.5 transition-all duration-300"
            style={{ backgroundColor: categoryColor }}
          />
          
          <div className="p-5">
            {/* Icono */}
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3"
              style={{ backgroundColor: `${categoryColor}15` }}
            >
              <Icon 
                className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
                style={{ color: categoryColor }}
              />
            </div>

            {/* Nombre */}
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 line-clamp-2 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors duration-300">
              {getTranslatedName(pathology.id, language)}
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge 
                variant="outline" 
                className="text-xs font-medium px-2 py-0.5"
                style={{ 
                  borderColor: categoryColor,
                  color: categoryColor,
                  backgroundColor: `${categoryColor}10`
                }}
              >
                {categoryName}
              </Badge>
              <Badge 
                variant="outline"
                className={`text-xs font-bold px-2 py-0.5 ${evidenceColors[pathology.nivelEvidenciaGlobal] || evidenceColors['D']}`}
              >
                {t('pathology.evidence')} {pathology.nivelEvidenciaGlobal}
              </Badge>
            </div>
          </div>

          {/* Hover effect arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <ArrowRight className="w-5 h-5 text-violet-500" />
          </div>
          
          {/* Glow effect on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at top left, ${categoryColor}, transparent 70%)`
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}