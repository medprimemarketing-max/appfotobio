import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { getPathologyById } from '@/components/data/pathologies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Image as ImageIcon, 
  ZoomIn, 
  MapPin,
  Info,
  Construction,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

// Imagen oficial de FBM Sistémica (ILIB)
const ILIB_SCHEMA = {
  url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/cf29a6ee7_ILIB.png',
  title: { 
    es: 'FBM Sistémica (ILIB) - Aplicación en Arteria Radial',
    en: 'Systemic PBM (ILIB) - Radial Artery Application',
    pt: 'FBM Sistêmica (ILIB) - Aplicação em Artéria Radial' 
  },
  description: { 
    es: 'Aplicación intravascular en arteria radial de la muñeca. Técnica sistémica para efectos antioxidantes, mejora de oxigenación sanguínea, control de inflamación sistémica y mejora de microcirculación.',
    en: 'Intravascular application at wrist radial artery. Systemic technique for antioxidant effects, improved blood oxygenation, systemic inflammation control, and improved microcirculation.',
    pt: 'Aplicação intravascular em artéria radial do pulso. Técnica sistêmica para efeitos antioxidantes, melhora da oxigenação sanguínea, controle de inflamação sistêmica e melhora da microcirculação.'
  },
  zones: { 
    es: 'Vascular sistémica - Arteria radial',
    en: 'Systemic vascular - Radial artery',
    pt: 'Vascular sistêmica - Artéria radial' 
  }
};

// Imagen oficial de Terapia Fotodinámica (PDT)
const PDT_SCHEMA = {
  url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/4b086c3f7_PDT.png',
  title: { 
    es: 'Terapia Fotodinámica (PDT) - Aplicación con Fotosensibilizador',
    en: 'Photodynamic Therapy (PDT) - Application with Photosensitizer',
    pt: 'Terapia Fotodinâmica (PDT) - Aplicação com Fotossensibilizador' 
  },
  description: { 
    es: 'Aplicación de terapia fotodinámica antimicrobiana sobre áreas infectadas o colonizadas. Requiere pre-incubación de fotosensibilizador (azul de metileno 0.01-0.02%) durante 3-5 minutos antes de la irradiación.',
    en: 'Antimicrobial photodynamic therapy application on infected or colonized areas. Requires photosensitizer pre-incubation (methylene blue 0.01-0.02%) for 3-5 minutes before irradiation.',
    pt: 'Aplicação de terapia fotodinâmica antimicrobiana sobre áreas infectadas ou colonizadas. Requer pré-incubação de fotossensibilizador (azul de metileno 0.01-0.02%) durante 3-5 minutos antes da irradiação.'
  },
  zones: { 
    es: 'Áreas específicas infectadas o colonizadas',
    en: 'Specific infected or colonized areas',
    pt: 'Áreas específicas infectadas ou colonizadas' 
  }
};

// Esquemas anatómicos transcraneales (sistema 10-20) por patología
const TRANSCRANEAL_SCHEMAS = {
  'acv': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/166095cfd_ACV1.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/6afb1a4e4_ACVI2.png' }
  ],
  'afasia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/65b6b0ff7_AFASIA.png' }
  ],
  'apraxia-habla': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/aee0be4f0_APRAXIA.png' }
  ],
  'cea': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/b6a7be1c8_CEA.png' }
  ],
  'demencias': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/3521d4269_DEMENCIA.png' }
  ],
  'disartria': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/83a370921_Disartria.png' }
  ],
  'disfagia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/e5080c1ec_disfagia.png' }
  ],
  'dislexia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/1c6766dcf_DISLEXIA.png' }
  ],
  'ela': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/dc84818df_ELA.png' }
  ],
  'esclerosis-multiple': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/835a50ef8_esclerosismultiple1.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/365c292f8_esclerosismultiple2.png' }
  ],
  'estimulacion-cognitiva': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/e8f383ab3_ESTIMULACINCONGNITIVA.png' }
  ],
  'neuralgia-trigeminal': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/fe187ac29_neuralgia1.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/d5aee52c1_neuralgia2.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/d9e2d7dd6_neuralgia3.png' }
  ],
  'paralisis-cerebral': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/e259fd21a_PARALISISCEREBRAL.png' }
  ],
  'paralisis-facial': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/1ccdcaf1c_PARALISIS.png' }
  ],
  'parkinson': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/60928ca50_PARKINSON.png' }
  ],
  'performance-muscular': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/72976c243_PerformanceMuscularOrofacial.png' }
  ],
  'retraso-lenguaje': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/5e1f11616_Puntostranscranealesretrasodellenguaje.jpeg' }
  ],
  'tdah': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/0c8aad299_TDAH.png' }
  ],
  'tinnitus': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/d4c34d5f1_tinnitus1.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/0ff3f653f_tinnitus2.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/91643596e_tinnitus3.png' }
  ],
  'tsh': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/cba314bf9_TRANSTORNOSDELHABLA.png' }
  ],
  'trastornos-vestibulares': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/3e4a342cc_VESTIBULAR1.png' },
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/af499892a_VESTIBULAR2.png' }
  ]
};

// Esquemas anatómicos oficiales adhoc por patología para APLICACIÓN PUNTUAL
const PUNTUAL_SCHEMAS = {
  'analgesia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/5c357336d_Analgesiadolorfacial.png' }
  ],
  'coadyuvante-erge': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/8c7822904_CoadyuvanteERGE.png' }
  ],
  'coadyuvante-rinitis': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/074f940a2_Rinitis.png' }
  ],
  'disfagia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/1a8ccf120_Disfagia.png' }
  ],
  'disfonias': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/9682ef11e_Disfonia.png' }
  ],
  'dtm': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/a34ee2096_Disfunciontemporomandibular.png' }
  ],
  'mucositis-oral': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/9b7b96489_Mucositis.png' }
  ],
  'neuralgia-trigeminal': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/f421e025f_Neuralgiatrigeminal.png' }
  ],
  'otalgia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/e208dbcd8_Otalgia.png' }
  ],
  'xerostomia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/dc74f9085_Xerostomia.png' }
  ],
  'parkinson': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/fb2a6cc53_Parkinson.png' }
  ],
  'disartria': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/ab70c0937_Disartria.png' }
  ],
  'trismo': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/07a0d44ad_Trismo.png' }
  ],
  'trastornos-vestibulares': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/a2ef24ead_Trastornosvestibulares.png' }
  ],
  'tinnitus': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/3aec6f0de_Tinnitus.png' }
  ],
  'hipoacusia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/4a0472920_Hipoacusia.png' }
  ],
  'paralisis-facial': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/6dc86bc02_Paralisisfacial.png' }
  ],
  'coadyuvante-sinusitis': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/010d67514_Sinusitis.png' }
  ],
  'ela': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/8c3d2181d_ELA.png' }
  ],
  'estimulacion-gustativa-olfativa': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/44fd2d98c_EstimulacionGustativa.png' }
  ],
  'ostomias': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/5b6b3c381_Ostomias.png' }
  ],
  'sialorrea': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/e792c6013_Sialorrea.png' }
  ],
  'sahos': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/9b1c85930_Sahos.png' }
  ],
  'frenectomia': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/950920870_preypostfrenectoma.png' }
  ],
  'trastornos-miofuncionales': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/90cb97673_Trastornosmiofuncionalesorofaciales.png' }
  ],
  'coadyuvante-otitis': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/4f89fcb00_Coadyuvanteentratamientodeotitismedia.png' }
  ],
  'performance-muscular': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/b124f132e_Performancemuscular.png' }
  ],
  'esclerosis-multiple': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/d945ded60_Esclerosismultiple.png' }
  ],
  'paralisis-cerebral': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/420178798_Paralsiscerebral.png' }
  ],
  'acv': [
    { url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695aea19cf3cdb2e2f1e1a6f/cd8539f55_ACV.png' }
  ]
};

export default function AnatomicalSchemas({ pathologyId, activeProtocol }) {
  const { language, t } = useLanguage();
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Construir array de esquemas basado SOLO en la modalidad activa
  let schemas = [];
  
  // REGLA CRÍTICA: Solo mostrar imagen si corresponde a la modalidad activa
  if (activeProtocol === 'ILIB') {
    schemas = [ILIB_SCHEMA];
  } else if (activeProtocol === 'PDT') {
    schemas = [PDT_SCHEMA];
  } else if (activeProtocol === 'transcraneal') {
    // Agregar esquemas transcraneales si existen para esta patología
    const transcranealSchemas = TRANSCRANEAL_SCHEMAS[pathologyId] || [];
    schemas = transcranealSchemas.map(schema => ({
      url: schema.url,
      title: { 
        es: 'Esquema Transcraneal - Sistema 10/20',
        en: 'Transcranial Scheme - 10/20 System',
        pt: 'Esquema Transcraniano - Sistema 10/20' 
      },
      description: { 
        es: 'Localización de puntos de aplicación según el sistema internacional 10/20 para fotobiomodulación transcraneal (tFBM).',
        en: 'Location of application points according to the international 10/20 system for transcranial photobiomodulation (tPBM).',
        pt: 'Localização de pontos de aplicação segundo o sistema internacional 10/20 para fotobiomodulação transcraniana (tFBM).'
      },
      zones: { 
        es: 'Corteza cerebral - Sistema 10/20',
        en: 'Cerebral cortex - 10/20 System',
        pt: 'Córtex cerebral - Sistema 10/20' 
      }
    }));
  } else if (activeProtocol === 'puntual') {
    // Agregar esquemas puntuales si existen para esta patología
    const puntualSchemas = PUNTUAL_SCHEMAS[pathologyId] || [];
    schemas = puntualSchemas.map(schema => ({
      url: schema.url,
      title: { 
        es: 'Esquema Anatómico - Aplicación Puntual FBM',
        en: 'Anatomical Scheme - Focal PBM Application',
        pt: 'Esquema Anatômico - Aplicação Pontual FBM' 
      },
      description: { 
        es: 'Imagen referencial de zonas de aplicación. La cantidad de puntos puede variar según la anatomía del paciente o zona de dolor.',
        en: 'Reference image of application zones. The number of points may vary according to patient anatomy or pain area.',
        pt: 'Imagem referencial de zonas de aplicação. A quantidade de pontos pode variar segundo a anatomia do paciente ou zona de dor.'
      },
      zones: { 
        es: 'Aplicación puntual - Zonas específicas',
        en: 'Focal application - Specific zones',
        pt: 'Aplicação pontual - Zonas específicas' 
      }
    }));
  }
  
  const hasSchemas = schemas.length > 0;
  
  // Carousel controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Card className="border-gray-200 dark:border-slate-700 shadow-sm dark:bg-slate-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b border-gray-200 dark:border-slate-700">
        <CardTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {{
            es: 'Imágenes / Esquemas Anatómicos de Aplicación FBM',
            en: 'Images / Anatomical PBM Application Schemes',
            pt: 'Imagens / Esquemas Anatômicos de Aplicação FBM'
          }[language]}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {!hasSchemas ? (
          // Marcador temporal para patologías sin esquema específico
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-2xl flex items-center justify-center shadow-sm">
              <Construction className="w-10 h-10 text-amber-600 dark:text-amber-300" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {{
                  es: 'Imagen anatómica específica en preparación',
                  en: 'Specific anatomical image in preparation',
                  pt: 'Imagem anatômica específica em preparação'
                }[language]}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                {{
                  es: 'Estamos desarrollando esquemas anatómicos adhoc para esta patología, con marcaje claro de zonas de aplicación FBM, coherentes con el protocolo específico.',
                  en: 'We are developing specific anatomical schemes for this pathology, with clear marking of PBM application zones, consistent with the specific protocol.',
                  pt: 'Estamos desenvolvendo esquemas anatômicos adhoc para esta patologia, com marcação clara de zonas de aplicação FBM, coerentes com o protocolo específico.'
                }[language]}
              </p>
              <div className="pt-2">
                <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                  {{
                    es: 'No se muestran imágenes genéricas - Solo material específico',
                    en: 'No generic images shown - Specific material only',
                    pt: 'Não se mostram imagens genéricas - Apenas material específico'
                  }[language]}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Galería de esquemas con carrusel para múltiples imágenes */}
            {schemas.length === 1 ? (
              // Vista única para una sola imagen
              <div className="border-2 border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all">
                <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {schemas[0].title[language]}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {schemas[0].zones[language]}
                  </Badge>
                </div>

                <div className="relative aspect-video bg-gray-100 group cursor-pointer">
                  <img
                    src={schemas[0].url}
                    alt={schemas[0].title[language]}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x450/e5e7eb/6b7280?text=Esquema+Anatómico';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="w-full bg-white text-gray-900 hover:bg-gray-100"
                          >
                            <ZoomIn className="w-4 h-4 mr-2" />
                            {{
                              es: 'Ver en tamaño completo / Alta resolución',
                              en: 'View full size / High resolution',
                              pt: 'Ver em tamanho completo / Alta resolução'
                            }[language]}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                          <DialogHeader className="p-6 pb-4">
                            <DialogTitle className="text-xl">
                              {schemas[0].title[language]}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="px-6 pb-6 overflow-auto">
                            <img 
                              src={schemas[0].url} 
                              alt={schemas[0].title[language]} 
                              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                              style={{ imageRendering: 'high-quality' }}
                            />
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong className="text-gray-900">
                                  {{
                                    es: 'Descripción: ',
                                    en: 'Description: ',
                                    pt: 'Descrição: '
                                  }[language]}
                                </strong>
                                {schemas[0].description[language]}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {schemas[0].description[language]}
                  </p>
                </div>
              </div>
            ) : (
              // Carrusel para múltiples imágenes
              <div className="border-2 border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      {schemas[0].title[language]}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {schemas[0].zones[language]}
                    </Badge>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800 border-0">
                    {selectedIndex + 1} / {schemas.length}
                  </Badge>
                </div>

                <div className="relative">
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {schemas.map((schema, idx) => (
                        <div key={idx} className="flex-[0_0_100%] min-w-0">
                          <div className="relative aspect-video bg-gray-100">
                            <img
                              src={schema.url}
                              alt={`${schema.title[language]} - ${idx + 1}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x450/e5e7eb/6b7280?text=Esquema+Anatómico';
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controles del carrusel */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    onClick={scrollPrev}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    onClick={scrollNext}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  {/* Indicadores de puntos */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {schemas.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === selectedIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                      />
                    ))}
                  </div>
                </div>

                <div className="px-4 py-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {schemas[selectedIndex]?.description[language]}
                  </p>
                  
                  {/* Botón de zoom */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full mt-3"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        {{
                          es: 'Ver en tamaño completo',
                          en: 'View full size',
                          pt: 'Ver em tamanho completo'
                        }[language]}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] p-0">
                      <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="text-xl">
                          {schemas[selectedIndex]?.title[language]} - {selectedIndex + 1} / {schemas.length}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="px-6 pb-6 overflow-auto">
                        <img 
                          src={schemas[selectedIndex]?.url} 
                          alt={schemas[selectedIndex]?.title[language]} 
                          className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                          style={{ imageRendering: 'high-quality' }}
                        />
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong className="text-gray-900">
                              {language === 'pt' ? 'Descrição: ' : 'Descripción: '}
                            </strong>
                            {schemas[selectedIndex]?.description[language]}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}

            {/* Nota de uso profesional */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">
                {{
                  es: 'Esquemas anatómicos adhoc específicos por patología. Material de referencia clínica con marcaje preciso de zonas de aplicación FBM coherentes con cada protocolo terapéutico.',
                  en: 'Specific anatomical schemes per pathology. Clinical reference material with precise marking of PBM application zones consistent with each therapeutic protocol.',
                  pt: 'Esquemas anatômicos adhoc específicos por patologia. Material de referência clínica com marcação precisa de zonas de aplicação FBM coerentes com cada protocolo terapêutico.'
                }[language]}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}