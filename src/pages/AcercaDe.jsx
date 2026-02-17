import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Zap, 
  Users, 
  BookOpen, 
  AlertTriangle,
  ExternalLink,
  GraduationCap,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AcercaDe() {
  const { user, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [redirectChecked, setRedirectChecked] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-violet-600" />
          </div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, mostrar loader mientras redirige
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-violet-600" />
          </div>
          <p className="text-gray-600">{t('common.redirecting')}</p>
        </div>
      </div>
    );
  }

  // Evidencia científica organizada por áreas clínicas
  const evidenciaClinica = {
    mecanismosGenerales: {
      color: 'bg-indigo-500',
      referencias: [
        {
          titulo: {
            es: 'Mecanismos antiinflamatorios de la FBM',
            en: 'Anti-inflammatory Mechanisms of PBM',
            pt: 'Mecanismos anti-inflamatórios da FBM'
          }[language],
          descripcion: 'Hamblin MR, et al. (2018). Mechanisms and applications of the anti-inflammatory effects of photobiomodulation. AIMS Biophys.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/30906747/'
        },
        {
          titulo: {
            es: 'Fundamentos de la terapia láser de bajo nivel',
            en: 'Fundamentals of Low-Level Laser Therapy',
            pt: 'Fundamentos da terapia a laser de baixo nível'
          }[language],
          descripcion: 'Chung H, et al. (2012). The nuts and bolts of low-level laser (light) therapy. Ann Biomed Eng.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22045511/'
        },
        {
          titulo: {
            es: 'Mecanismos propuestos de FBM',
            en: 'Proposed Mechanisms of PBM',
            pt: 'Mecanismos propostos de FBM'
          }[language],
          descripcion: 'De Freitas LF, Hamblin MR (2016). Proposed mechanisms of photobiomodulation or low-level light therapy. IEEE J Sel Top Quantum Electron.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/28070154/'
        },
        {
          titulo: 'WALT - World Association for Photobiomodulation Therapy',
          descripcion: {
            es: 'Directrices de dosimetría para fotobiomodulación',
            en: 'Dosimetry Guidelines for Photobiomodulation',
            pt: 'Diretrizes de dosimetria para fotobiomodulação'
          }[language],
          url: 'https://waltza.co.za/'
        }
      ]
    },
    dolorOrofacial: {
      color: 'bg-blue-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en DTM y dolor orofacial',
            en: 'PBM in TMD and Orofacial Pain',
            pt: 'FBM em DTM e dor orofacial'
          }[language],
          descripcion: {
            es: 'Revisión sistemática sobre efectos de FBM en DTM',
            en: 'Systematic review on PBM effects in TMD',
            pt: 'Revisão sistemática sobre efeitos de FBM em DTM'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31248242/'
        },
        {
          titulo: {
            es: 'Manejo del dolor miofascial con FBM',
            en: 'Myofascial Pain Management with PBM',
            pt: 'Manejo da dor miofascial com FBM'
          }[language],
          descripcion: {
            es: 'Efectos de FBM en dolor muscular orofacial',
            en: 'PBM effects on orofacial muscle pain',
            pt: 'Efeitos de FBM em dor muscular orofacial'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31130260/'
        },
        {
          titulo: {
            es: 'FBM en trastornos temporomandibulares',
            en: 'PBM in Temporomandibular Disorders',
            pt: 'FBM em distúrbios temporomandibulares'
          }[language],
          descripcion: {
            es: 'Evidencia clínica en DTM',
            en: 'Clinical evidence in TMD',
            pt: 'Evidência clínica em DTM'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29192645/'
        }
      ]
    },
    oncologico: {
      color: 'bg-green-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en mucositis oral',
            en: 'PBM in Oral Mucositis',
            pt: 'FBM em mucosite oral'
          }[language],
          descripcion: 'Zecha JA, et al. (2016). Low-level laser therapy/photobiomodulation in the management of side effects of chemoradiation therapy in head and neck cancer. Support Care Cancer.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/26621413/'
        },
        {
          titulo: {
            es: 'Prevención de mucositis con FBM',
            en: 'PBM for Prevention of Oral Mucositis',
            pt: 'Prevenção de mucosite com FBM'
          }[language],
          descripcion: {
            es: 'Eficacia en prevención y reducción de severidad',
            en: 'Efficacy in prevention and severity reduction',
            pt: 'Eficácia na prevenção e redução de severidade'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31389142/'
        },
        {
          titulo: {
            es: 'FBM en xerostomía post-radioterapia',
            en: 'PBM in Post-Radiotherapy Xerostomia',
            pt: 'FBM em xerostomia pós-radioterapia'
          }[language],
          descripcion: {
            es: 'Efectos en función salival post-RT',
            en: 'Effects on salivary function post-RT',
            pt: 'Efeitos na função salivar pós-RT'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29659235/'
        },
        {
          titulo: {
            es: 'Trismo post-radioterapia',
            en: 'Post-Radiotherapy Trismus',
            pt: 'Trismo pós-radioterapia'
          }[language],
          descripcion: {
            es: 'FBM en limitación de apertura oral',
            en: 'PBM in mouth opening limitation',
            pt: 'FBM na limitação de abertura oral'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29252045/'
        }
      ]
    },
    neurocognitivoDemencia: {
      color: 'bg-orange-500',
      referencias: [
        {
          titulo: {
            es: 'FBM transcraneal en deterioro cognitivo',
            en: 'Transcranial PBM in Cognitive Decline',
            pt: 'FBM transcraniano em declínio cognitivo'
          }[language],
          descripcion: 'Salehpour F, et al. (2019). Transcranial photobiomodulation for major depressive disorder and cognitive impairment. Front Neurosci.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/31105515/'
        },
        {
          titulo: {
            es: 'tFBM en Alzheimer y demencias',
            en: 'tPBM in Alzheimer\'s and Dementia',
            pt: 'tFBM em Alzheimer e demências'
          }[language],
          descripcion: {
            es: 'Mejoras en cognición y funcionalidad',
            en: 'Improvements in cognition and functionality',
            pt: 'Melhoras em cognição e funcionalidade'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31270568/'
        },
        {
          titulo: {
            es: 'Efectos neuroprotectores de tFBM',
            en: 'Neuroprotective Effects of tPBM',
            pt: 'Efeitos neuroprotetores de tFBM'
          }[language],
          descripcion: {
            es: 'Mecanismos de neuroprotección',
            en: 'Neuroprotection mechanisms',
            pt: 'Mecanismos de neuroproteção'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31704941/'
        },
        {
          titulo: {
            es: 'FBM en función cognitiva',
            en: 'PBM in Cognitive Function',
            pt: 'FBM em função cognitiva'
          }[language],
          descripcion: {
            es: 'Memoria y velocidad de procesamiento',
            en: 'Memory and processing speed',
            pt: 'Memória e velocidade de processamento'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/32314712/'
        }
      ]
    },
    parkinson: {
      color: 'bg-yellow-500',
      referencias: [
        {
          titulo: {
            es: 'FBM transcraneal en Parkinson',
            en: 'Transcranial PBM in Parkinson\'s',
            pt: 'FBM transcraniano em Parkinson'
          }[language],
          descripcion: {
            es: 'Mejoras en síntomas motores y cognitivos',
            en: 'Improvements in motor and cognitive symptoms',
            pt: 'Melhoras em sintomas motores e cognitivos'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/33408848/'
        },
        {
          titulo: {
            es: 'tFBM en marcha y equilibrio',
            en: 'tPBM in Gait and Balance',
            pt: 'tFBM em marcha e equilíbrio'
          }[language],
          descripcion: {
            es: 'Efectos en función motora',
            en: 'Effects on motor function',
            pt: 'Efeitos na função motora'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/32772676/'
        }
      ]
    },
    orl: {
      color: 'bg-red-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en rinitis y sinusitis',
            en: 'PBM in Rhinitis and Sinusitis',
            pt: 'FBM em rinite e sinusite'
          }[language],
          descripcion: {
            es: 'Efectos antiinflamatorios en mucosas ORL',
            en: 'Anti-inflammatory effects on ENT mucosas',
            pt: 'Efeitos anti-inflamatórios em mucosas ORL'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29203372/'
        },
        {
          titulo: {
            es: 'FBM en patología ORL',
            en: 'PBM in ENT Pathology',
            pt: 'FBM em patologia ORL'
          }[language],
          descripcion: {
            es: 'Aplicaciones en otorrinolaringología',
            en: 'Applications in otorhinolaryngology',
            pt: 'Aplicações em otorrinolaringologia'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/28439943/'
        },
        {
          titulo: {
            es: 'FBM en inflamación ORL',
            en: 'PBM in ENT Inflammation',
            pt: 'FBM em inflamação ORL'
          }[language],
          descripcion: {
            es: 'Reducción de inflamación nasal',
            en: 'Reduction of nasal inflammation',
            pt: 'Redução de inflamação nasal'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/31630791/'
        }
      ]
    },
    neuromotorParalisis: {
      color: 'bg-purple-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en parálisis facial',
            en: 'PBM in Facial Paralysis',
            pt: 'FBM em paralisia facial'
          }[language],
          descripcion: {
            es: 'Mejora en recuperación motora facial',
            en: 'Improvement in facial motor recovery',
            pt: 'Melhora na recuperação motora facial'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/27894693/'
        },
        {
          titulo: {
            es: 'FBM en recuperación neuromotora',
            en: 'PBM in Neuromotor Recovery',
            pt: 'FBM em recuperação neuromotora'
          }[language],
          descripcion: {
            es: 'Efectos en regeneración neural',
            en: 'Effects on neural regeneration',
            pt: 'Efeitos na regeneração neural'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29503394/'
        }
      ]
    },
    tinnitus: {
      color: 'bg-cyan-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en tinnitus',
            en: 'PBM in Tinnitus',
            pt: 'FBM em zumbido'
          }[language],
          descripcion: {
            es: 'Efectos en acúfenos y tinnitus',
            en: 'Effects on tinnitus',
            pt: 'Efeitos em acufenos e zumbido'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/25046178/'
        },
        {
          titulo: {
            es: 'Manejo de tinnitus con FBM',
            en: 'Tinnitus Management with PBM',
            pt: 'Manejo de zumbido com FBM'
          }[language],
          descripcion: {
            es: 'Resultados en tinnitus subjetivo',
            en: 'Results in subjective tinnitus',
            pt: 'Resultados em zumbido subjetivo'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/26868602/'
        }
      ]
    },
    deglucionDisfagia: {
      color: 'bg-emerald-500',
      referencias: [
        {
          titulo: {
            es: 'FBM en disfagia',
            en: 'PBM in Dysphagia',
            pt: 'FBM em disfagia'
          }[language],
          descripcion: {
            es: 'Efectos en función deglutoria',
            en: 'Effects on swallowing function',
            pt: 'Efeitos na função de deglutição'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/29589813/'
        },
        {
          titulo: {
            es: 'Rehabilitación deglutoria con FBM',
            en: 'Swallowing Rehabilitation with PBM',
            pt: 'Reabilitação de deglutição com FBM'
          }[language],
          descripcion: {
            es: 'FBM como coadyuvante en disfagia',
            en: 'PBM as adjuvant in dysphagia',
            pt: 'FBM como coadjuvante em disfagia'
          }[language],
          url: 'https://pubmed.ncbi.nlm.nih.gov/26834164/'
        }
      ]
    },
    dolorCronicoSistemico: {
      color: 'bg-pink-500',
      referencias: [
        {
          titulo: {
            es: 'FBM transcraneal en dolor crónico',
            en: 'Transcranial PBM in Chronic Pain',
            pt: 'FBM transcraniano em dor crônica'
          }[language],
          descripcion: 'Hamilton C, et al. (2018). Transcranial photobiomodulation and chronic pain. Neural Regen Res.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/30128101/'
        },
        {
          titulo: {
            es: 'FBM en isquemia miocárdica',
            en: 'PBM in Myocardial Ischemia',
            pt: 'FBM em isquemia miocárdica'
          }[language],
          descripcion: 'Liebert A, et al. (2019). A role for photobiomodulation in the prevention of myocardial ischemic reperfusion injury. Photomed Laser Surg.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/31120367/'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToHome')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('about.title')}
            </h1>
            <p className="text-violet-100">
              {t('login.title')} {t('login.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Autores */}
        <Card className="border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 border-b border-gray-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              {t('about.authors')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Flga. Carolina Henríquez</h3>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Flgo. Joel Valenzuela</h3>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Flga. Pracelis Lajara</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Revisión Inglés</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Propósito */}
        <Card className="border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-b border-gray-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {t('about.purpose')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {t('about.purposeText1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('about.purposeText2')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('about.purposeText3')}
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-amber-200 dark:border-amber-800">
            <CardTitle className="flex items-center gap-2 text-lg text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              {t('about.importantDeclaration')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-amber-900 dark:text-amber-100">
            <p>
              <strong>{t('about.notReplace')}</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('about.notReplace1')}</li>
              <li>{t('about.notReplace2')}</li>
              <li>{t('about.notReplace3')}</li>
              <li>{t('about.notReplace4')}</li>
              <li>{t('about.notReplace5')}</li>
            </ul>
            <p className="mt-4">
              {t('about.orientativeProtocols')}
            </p>
            <p>
              {t('about.reviewLiterature')}
            </p>
          </CardContent>
        </Card>

        {/* Evidencia Científica Unificada por Áreas Clínicas */}
        <Card className="border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-gray-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {t('about.scientificEvidence')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Mecanismos Generales */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.mecanismosGenerales.color} rounded-full`}></span>
                  {{
                    es: 'Mecanismos Generales de FBM',
                    en: 'General Mechanisms of PBM',
                    pt: 'Mecanismos Gerais de FBM'
                  }[language]}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.mecanismosGenerales.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dolor Orofacial / DTM */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.dolorOrofacial.color} rounded-full`}></span>
                  {t('about.painOrofacial')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.dolorOrofacial.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oncológico */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.oncologico.color} rounded-full`}></span>
                  {t('about.oncological')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.oncologico.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neurocognitivo / Demencia */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.neurocognitivoDemencia.color} rounded-full`}></span>
                  {t('about.neurocognitive')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.neurocognitivoDemencia.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parkinson */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.parkinson.color} rounded-full`}></span>
                  {t('about.parkinson')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.parkinson.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORL */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.orl.color} rounded-full`}></span>
                  {t('about.orl')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.orl.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neuromotor / Parálisis Facial */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.neuromotorParalisis.color} rounded-full`}></span>
                  {t('about.neuromotor')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.neuromotorParalisis.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tinnitus */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.tinnitus.color} rounded-full`}></span>
                  {t('about.tinnitus')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.tinnitus.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deglución / Disfagia */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.deglucionDisfagia.color} rounded-full`}></span>
                  {t('about.swallowing')}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.deglucionDisfagia.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dolor Crónico Sistémico */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 ${evidenciaClinica.dolorCronicoSistemico.color} rounded-full`}></span>
                  {{
                    es: 'Dolor Crónico Sistémico',
                    en: 'Systemic Chronic Pain',
                    pt: 'Dor Crônica Sistêmica'
                  }[language]}
                </h4>
                <div className="space-y-3 ml-5">
                  {evidenciaClinica.dolorCronicoSistemico.referencias.map((ref, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ref.titulo}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{ref.descripcion}</p>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 mt-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('about.seeReference')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Niveles de evidencia */}
        <Card className="border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {t('about.evidenceLevels')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded font-bold text-sm">A</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('about.evidenceA')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-bold text-sm">B</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('about.evidenceB')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded font-bold text-sm">C</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('about.evidenceC')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded font-bold text-sm">D</span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{t('about.evidenceD')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 py-4">
          © 2026 {t('about.copyright')}
        </p>
      </div>
    </div>
  );
}