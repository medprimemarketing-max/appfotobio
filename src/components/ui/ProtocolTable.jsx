import React from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { translateProtocolField } from '@/components/i18n/allProtocolTranslations';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertTriangle, 
  Target, 
  Zap, 
  Timer, 
  Calendar,
  Activity,
  FileText,
  Info
} from 'lucide-react';

const PROTOCOL_COLORS = {
  puntual: 'bg-blue-500',
  ILIB: 'bg-purple-500',
  PDT: 'bg-rose-500',
  transcraneal: 'bg-indigo-500'
};

const EVIDENCE_COLORS = {
  'A': 'bg-emerald-100 text-emerald-800',
  'A-B': 'bg-emerald-100 text-emerald-800',
  'B': 'bg-blue-100 text-blue-800',
  'B-C': 'bg-blue-100 text-blue-800',
  'C': 'bg-amber-100 text-amber-800',
  'C-D': 'bg-amber-100 text-amber-800',
  'D': 'bg-red-100 text-red-800'
};

export default function ProtocolTable({ protocol, type, pathologyId }) {
  const { language, t } = useLanguage();
  
  // Obtener título traducido desde i18n
  const getProtocolTitle = () => {
    switch(type) {
      case 'puntual': return t('protocol.localTitle');
      case 'ILIB': return t('protocol.ilubTitle');
      case 'PDT': return t('protocol.pdtTitle');
      case 'transcraneal': return t('protocol.transcranealTitle');
      default: return type;
    }
  };
  
  const protocolColor = PROTOCOL_COLORS[type] || 'bg-gray-500';

  // Helper para obtener valor traducido - GARANTIZA traducción de TODO
  const getTranslatedValue = (field, originalValue) => {
    if (!originalValue) return originalValue;
    // SIEMPRE traducir, sin excepciones
    return translateProtocolField(pathologyId, type, field, originalValue, language) || originalValue;
  };

  // Construir filas dinámicamente
  const rows = [
    { icon: Target, label: t('protocol.anatomicalZone'), value: getTranslatedValue('zonaAnatomica', protocol.zonaAnatomica) }
  ];

  // Agregar puntos 10/20 solo para protocolos transcraneales
  if (type === 'transcraneal' && protocol.puntos1020) {
    rows.push({ icon: Activity, label: t('protocol.system1020Points'), value: protocol.puntos1020 });
  }

  // Continuar con los demás campos
  rows.push({ icon: Zap, label: t('protocol.wavelength'), value: getTranslatedValue('longitudOnda', protocol.longitudOnda) });

  // Omitir energía para ILIB
  if (type !== 'ILIB') {
    rows.push({ icon: Zap, label: t('protocol.energyPerPoint'), value: getTranslatedValue('energiaPorPunto', protocol.energiaPorPunto) });
  }

  rows.push(
    { icon: Target, label: t('protocol.numberOfPoints'), value: getTranslatedValue('numeroPuntos', protocol.numeroPuntos) },
    { icon: Calendar, label: t('protocol.weeklyFrequency'), value: getTranslatedValue('frecuenciaTratamiento', protocol.frecuenciaTratamiento) },
    { icon: Calendar, label: t('protocol.totalSessions'), value: getTranslatedValue('duracionTotal', protocol.duracionTotal) }
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className={`${protocolColor} px-5 py-3`}>
        <h4 className="text-white font-semibold text-lg">{getProtocolTitle()}</h4>
      </div>

      {/* Tabla de parámetros */}
      <div className="overflow-x-auto">
        <Table>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx} className={idx % 2 === 0 ? 'bg-gray-50/50 dark:bg-slate-900/50' : 'dark:bg-slate-800'}>
                <TableCell className="font-medium text-gray-600 dark:text-gray-300 w-1/3">
                  <div className="flex items-center gap-2">
                    <row.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    {row.label}
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{row.value || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer con evidencia y comentarios */}
      <div className="bg-gray-50 dark:bg-slate-900 px-5 py-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
        {/* Nivel de evidencia */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('protocol.evidenceLevel')}:</span>
          </div>
          <Badge className={`${EVIDENCE_COLORS[protocol.nivelEvidencia] || EVIDENCE_COLORS['D']} dark:bg-opacity-80 border-0 font-bold`}>
            {protocol.nivelEvidencia}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">({getTranslatedValue('tipoEstudio', protocol.tipoEstudio)})</span>
        </div>

        {/* Comentarios clínicos */}
        {protocol.comentarios && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{getTranslatedValue('comentarios', protocol.comentarios)}</p>
            </div>
          </div>
        )}

        {/* Información complementaria / Consideraciones clínicas */}
        {protocol.informacion_complementaria && (
          <div className="bg-blue-100 dark:bg-blue-950/50 rounded-lg p-4 border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h5 className="text-base font-bold text-blue-900 dark:text-blue-100 mb-2">
                  {t('protocol.clinicalConsiderations')}
                </h5>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  {protocol.informacion_complementaria[language] || protocol.informacion_complementaria.es}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}