/**
 * Traducciones de patologías y protocolos clínicos
 * Estructura: pathologyTranslations[pathologyId][language]
 */

export const pathologyTranslations = {
  disfagia: {
    es: {
      name: "Disfagia",
      description: "Dificultad para deglutir por causas neurológicas, estructurales u oncológicas. La FBM puede mejorar función muscular, reducir fibrosis post-RT y promover neuroplasticidad.",
      precautions: "Evaluar riesgo de aspiración. La FBM es coadyuvante, no reemplaza rehabilitación deglutoria."
    },
    en: {
      name: "Dysphagia",
      description: "Difficulty swallowing due to neurological, structural, or oncological causes. PBM can improve muscle function, reduce post-RT fibrosis, and promote neuroplasticity.",
      precautions: "Assess aspiration risk. PBM is adjunctive and does not replace swallowing rehabilitation."
    },
    pt: {
      name: "Disfagia",
      description: "Dificuldade para deglutir por causas neurológicas, estruturais ou oncológicas. A FBM pode melhorar a função muscular, reduzir fibrose pós-RT e promover neuroplasticidade.",
      precautions: "Avaliar risco de aspiração. A FBM é coadjuvante e não substitui a reabilitação da deglutição."
    }
  },
  "mucositis-oral": {
    es: {
      name: "Mucositis Oral",
      description: "Inflamación y ulceración de mucosa oral por quimio/radioterapia. La FBM tiene alta evidencia en prevención y tratamiento según guías MASCC/ISOO.",
      precautions: "Coordinar con equipo oncológico. Iniciar preventivamente antes de radioterapia si es posible."
    },
    en: {
      name: "Oral Mucositis",
      description: "Inflammation and ulceration of oral mucosa due to chemo/radiotherapy. PBM has high evidence in prevention and treatment according to MASCC/ISOO guidelines.",
      precautions: "Coordinate with oncology team. Start preventively before radiotherapy if possible."
    },
    pt: {
      name: "Mucosite Oral",
      description: "Inflamação e ulceração da mucosa oral por quimio/radioterapia. A FBM tem alta evidência na prevenção e tratamento segundo diretrizes MASCC/ISOO.",
      precautions: "Coordenar com equipe oncológica. Iniciar preventivamente antes da radioterapia, se possível."
    }
  },
  xerostomia: {
    es: {
      name: "Xerostomía",
      description: "Sequedad bucal, frecuente post-radioterapia HNC. La FBM puede estimular regeneración de glándulas salivales.",
      precautions: "Resultados variables según grado de daño glandular. Mejor pronóstico si se inicia temprano."
    },
    en: {
      name: "Xerostomia",
      description: "Dry mouth, common post-radiotherapy HNC. PBM can stimulate salivary gland regeneration.",
      precautions: "Variable results depending on degree of glandular damage. Better prognosis if started early."
    },
    pt: {
      name: "Xerostomia",
      description: "Boca seca, frequente pós-radioterapia HNC. A FBM pode estimular regeneração das glândulas salivares.",
      precautions: "Resultados variáveis segundo grau de dano glandular. Melhor prognóstico se iniciado precocemente."
    }
  },
  dtm: {
    es: {
      name: "Disfunción Temporomandibular (DTM)",
      description: "Dolor y disfunción de ATM y músculos masticatorios. La FBM tiene buena evidencia para reducir dolor y mejorar apertura oral.",
      precautions: "Evaluar etiología. Puede requerir manejo interdisciplinario (odontología, kinesiología)."
    },
    en: {
      name: "Temporomandibular Dysfunction (TMD)",
      description: "Pain and dysfunction of TMJ and masticatory muscles. PBM has good evidence for reducing pain and improving mouth opening.",
      precautions: "Evaluate etiology. May require interdisciplinary management (dentistry, kinesiology)."
    },
    pt: {
      name: "Disfunção Temporomandibular (DTM)",
      description: "Dor e disfunção da ATM e músculos mastigatórios. A FBM tem boa evidência para reduzir dor e melhorar abertura oral.",
      precautions: "Avaliar etiologia. Pode requerer manejo interdisciplinar (odontologia, fisioterapia)."
    }
  },
  "neuralgia-trigeminal": {
    es: {
      name: "Neuralgia Trigeminal",
      description: "Dolor neuropático severo en territorio del nervio trigémino. La FBM puede modular dolor y regeneración neural.",
      precautions: "Dolor muy severo requiere manejo multidisciplinario. FBM es coadyuvante. No reemplaza tratamiento farmacológico/quirúrgico."
    },
    en: {
      name: "Trigeminal Neuralgia",
      description: "Severe neuropathic pain in trigeminal nerve territory. PBM can modulate pain and neural regeneration.",
      precautions: "Very severe pain requires multidisciplinary management. PBM is adjunctive. Does not replace pharmacological/surgical treatment."
    },
    pt: {
      name: "Neuralgia Trigeminal",
      description: "Dor neuropática severa no território do nervo trigêmeo. A FBM pode modular dor e regeneração neural.",
      precautions: "Dor muito severa requer manejo multidisciplinar. FBM é coadjuvante. Não substitui tratamento farmacológico/cirúrgico."
    }
  },
  analgesia: {
    es: {
      name: "Analgesia (Dolor Orofacial/Cefálico)",
      description: "Manejo del dolor en región orofacial y cefálica. La FBM tiene efecto analgésico, antiinflamatorio y de modulación neural.",
      precautions: "Descartar causas tratables específicas. Usar como parte de manejo multimodal del dolor."
    },
    en: {
      name: "Analgesia (Orofacial/Cephalic Pain)",
      description: "Pain management in orofacial and cephalic region. PBM has analgesic, anti-inflammatory, and neural modulation effects.",
      precautions: "Rule out specific treatable causes. Use as part of multimodal pain management."
    },
    pt: {
      name: "Analgesia (Dor Orofacial/Cefálica)",
      description: "Manejo da dor na região orofacial e cefálica. A FBM tem efeito analgésico, anti-inflamatório e de modulação neural.",
      precautions: "Descartar causas tratáveis específicas. Usar como parte do manejo multimodal da dor."
    }
  },
  otalgia: {
    es: {
      name: "Otalgia",
      description: "Dolor de oído de diversas etiologías (neuropática, miofascial, referida). La FBM puede tener efecto analgésico y antiinflamatorio local.",
      precautions: "Descartar causas tratables específicas (otitis, patología ATM, etc.). FBM es coadyuvante sintomático."
    },
    en: {
      name: "Otalgia",
      description: "Ear pain of various etiologies (neuropathic, myofascial, referred). PBM may have local analgesic and anti-inflammatory effects.",
      precautions: "Rule out specific treatable causes (otitis, TMJ pathology, etc.). PBM is symptomatic adjuvant."
    },
    pt: {
      name: "Otalgia",
      description: "Dor de ouvido de diversas etiologias (neuropática, miofascial, referida). A FBM pode ter efeito analgésico e anti-inflamatório local.",
      precautions: "Descartar causas tratáveis específicas (otite, patologia ATM, etc.). FBM é coadjuvante sintomático."
    }
  },
  "paralisis-facial": {
    es: {
      name: "Parálisis Facial",
      description: "Parálisis del nervio facial (Bell o central). La FBM puede acelerar regeneración nerviosa y mejorar función muscular.",
      precautions: "Iniciar precozmente. No usar TENS sobre nervio facial en fase de reinervación por riesgo de sincinesias. En parálisis central, considerar tPBM. Derivar a neurología si no hay recuperación."
    },
    en: {
      name: "Facial Paralysis",
      description: "Facial nerve paralysis (Bell's or central). PBM can accelerate nerve regeneration and improve muscle function.",
      precautions: "Start early. Do not use TENS on facial nerve during reinnervation phase due to synkinesis risk. For central paralysis, consider tPBM. Refer to neurology if no recovery."
    },
    pt: {
      name: "Paralisia Facial",
      description: "Paralisia do nervo facial (Bell ou central). A FBM pode acelerar regeneração neural e melhorar função muscular.",
      precautions: "Iniciar precocemente. Não usar TENS sobre nervo facial na fase de reinervação por risco de sincinesias. Em paralisia central, considerar tPBM. Encaminhar à neurologia se não houver recuperação."
    }
  },
  tinnitus: {
    es: {
      name: "Tinnitus",
      description: "Percepción de sonido sin fuente externa. La FBM puede mejorar microcirculación coclear y modular actividad neural auditiva.",
      precautions: "Resultados heterogéneos en la literatura. Informar al paciente sobre expectativas realistas. Beneficio potencial a corto plazo, evidencia limitada y controvertida."
    },
    en: {
      name: "Tinnitus",
      description: "Perception of sound without external source. PBM can improve cochlear microcirculation and modulate auditory neural activity.",
      precautions: "Heterogeneous results in literature. Inform patient about realistic expectations. Potential short-term benefit, limited and controversial evidence."
    },
    pt: {
      name: "Zumbido",
      description: "Percepção de som sem fonte externa. A FBM pode melhorar microcirculação coclear e modular atividade neural auditiva.",
      precautions: "Resultados heterogêneos na literatura. Informar ao paciente sobre expectativas realistas. Benefício potencial a curto prazo, evidência limitada e controversa."
    }
  },
  hipoacusia: {
    es: {
      name: "Hipoacusia",
      description: "Pérdida auditiva sensorioneural. La FBM transmeatal puede mejorar microcirculación coclear, especialmente en hipoacusia súbita.",
      precautions: "Resultados variables. Mayor potencial en hipoacusia súbita tratada precozmente. Evidencia limitada y controvertida."
    },
    en: {
      name: "Hearing Loss",
      description: "Sensorineural hearing loss. Transmeatal PBM can improve cochlear microcirculation, especially in sudden hearing loss.",
      precautions: "Variable results. Greater potential in sudden hearing loss treated early. Limited and controversial evidence."
    },
    pt: {
      name: "Hipoacusia",
      description: "Perda auditiva sensorioneural. A FBM transmeatal pode melhorar microcirculação coclear, especialmente na hipoacusia súbita.",
      precautions: "Resultados variáveis. Maior potencial na hipoacusia súbita tratada precocemente. Evidência limitada e controversa."
    }
  },
  "trastornos-vestibulares": {
    es: {
      name: "Trastornos Vestibulares",
      description: "Alteraciones del equilibrio. La FBM transmeatal y transcraneal podría modular función vestibular.",
      precautions: "Evidencia limitada. La rehabilitación vestibular convencional es el tratamiento principal."
    },
    en: {
      name: "Vestibular Disorders",
      description: "Balance alterations. Transmeatal and transcranial PBM could modulate vestibular function.",
      precautions: "Limited evidence. Conventional vestibular rehabilitation is the main treatment."
    },
    pt: {
      name: "Transtornos Vestibulares",
      description: "Alterações do equilíbrio. A FBM transmeatal e transcraniana poderia modular função vestibular.",
      precautions: "Evidência limitada. A reabilitação vestibular convencional é o tratamento principal."
    }
  },
  frenectomia: {
    es: {
      name: "Pre y Post Frenectomía Sublingual",
      description: "FBM como coadyuvante en cirugía de frenillo. Puede reducir dolor, inflamación y acelerar cicatrización.",
      precautions: "Coordinar con cirujano. No reemplaza controles post-quirúrgicos."
    },
    en: {
      name: "Pre and Post Sublingual Frenectomy",
      description: "PBM as adjuvant in frenulum surgery. Can reduce pain, inflammation, and accelerate healing.",
      precautions: "Coordinate with surgeon. Does not replace post-surgical follow-ups."
    },
    pt: {
      name: "Pré e Pós Frenectomia Sublingual",
      description: "FBM como coadjuvante em cirurgia de freio lingual. Pode reduzir dor, inflamação e acelerar cicatrização.",
      precautions: "Coordenar com cirurgião. Não substitui controles pós-cirúrgicos."
    }
  },
  "trastornos-miofuncionales": {
    es: {
      name: "Trastornos Miofuncionales Orofaciales",
      description: "Alteraciones del equilibrio muscular orofacial. La FBM puede optimizar función muscular y acelerar resultados de terapia miofuncional.",
      precautions: "La terapia miofuncional sigue siendo el tratamiento principal."
    },
    en: {
      name: "Orofacial Myofunctional Disorders",
      description: "Alterations of orofacial muscle balance. PBM can optimize muscle function and accelerate myofunctional therapy results.",
      precautions: "Myofunctional therapy remains the main treatment."
    },
    pt: {
      name: "Transtornos Miofuncionais Orofaciais",
      description: "Alterações do equilíbrio muscular orofacial. A FBM pode otimizar função muscular e acelerar resultados da terapia miofuncional.",
      precautions: "A terapia miofuncional continua sendo o tratamento principal."
    }
  },
  "performance-muscular": {
    es: {
      name: "Performance Muscular Orofacial",
      description: "Optimización de rendimiento muscular orofacial y cervical. La FBM puede mejorar función mitocondrial y reducir fatiga.",
      precautions: "Usar como complemento a ejercicios específicos. Evidencia por extrapolación."
    },
    en: {
      name: "Orofacial Muscular Performance",
      description: "Optimization of orofacial and cervical muscle performance. PBM can improve mitochondrial function and reduce fatigue.",
      precautions: "Use as complement to specific exercises. Evidence by extrapolation."
    },
    pt: {
      name: "Performance Muscular Orofacial",
      description: "Otimização do desempenho muscular orofacial e cervical. A FBM pode melhorar função mitocondrial e reduzir fadiga.",
      precautions: "Usar como complemento a exercícios específicos. Evidência por extrapolação."
    }
  },
  trismo: {
    es: {
      name: "Trismo",
      description: "Limitación de apertura oral. La FBM puede reducir fibrosis y contractura muscular, especialmente post-RT.",
      precautions: "Combinar con ejercicios de estiramiento. En trismo post-RT, manejo prolongado."
    },
    en: {
      name: "Trismus",
      description: "Limited mouth opening. PBM can reduce fibrosis and muscle contracture, especially post-RT.",
      precautions: "Combine with stretching exercises. In post-RT trismus, prolonged management."
    },
    pt: {
      name: "Trismo",
      description: "Limitação de abertura oral. A FBM pode reduzir fibrose e contratura muscular, especialmente pós-RT.",
      precautions: "Combinar com exercícios de alongamento. No trismo pós-RT, manejo prolongado."
    }
  },
  disfonias: {
    es: {
      name: "Disfonías",
      description: "Alteraciones de la voz por disfunción laríngea. La FBM puede reducir inflamación, edema de cuerdas vocales y promover regeneración tisular en lesiones benignas.",
      precautions: "Descartar patología maligna antes de aplicar. No usar en lesiones sospechosas sin diagnóstico ORL."
    },
    en: {
      name: "Dysphonia",
      description: "Voice alterations due to laryngeal dysfunction. PBM can reduce inflammation, vocal fold edema, and promote tissue regeneration in benign lesions.",
      precautions: "Rule out malignant pathology before applying. Do not use on suspicious lesions without ENT diagnosis."
    },
    pt: {
      name: "Disfonias",
      description: "Alterações da voz por disfunção laríngea. A FBM pode reduzir inflamação, edema de pregas vocais e promover regeneração tissular em lesões benignas.",
      precautions: "Descartar patologia maligna antes de aplicar. Não usar em lesões suspeitas sem diagnóstico ORL."
    }
  },
  disartria: {
    es: {
      name: "Disartria",
      description: "Trastorno motor del habla caracterizado por debilidad, lentitud o incoordinación de la musculatura del habla. La FBM puede mejorar la función neuromuscular y reducir fatiga en músculos orofaciales.",
      precautions: "Los protocolos varían según etiología (ACV, Parkinson, ELA, etc.). Individualizar según evaluación."
    },
    en: {
      name: "Dysarthria",
      description: "Motor speech disorder characterized by weakness, slowness, or incoordination of speech musculature. PBM can improve neuromuscular function and reduce fatigue in orofacial muscles.",
      precautions: "Protocols vary according to etiology (stroke, Parkinson's, ALS, etc.). Individualize according to assessment."
    },
    pt: {
      name: "Disartria",
      description: "Transtorno motor da fala caracterizado por fraqueza, lentidão ou incoordenação da musculatura da fala. A FBM pode melhorar a função neuromuscular e reduzir fadiga em músculos orofaciais.",
      precautions: "Os protocolos variam segundo etiologia (AVC, Parkinson, ELA, etc.). Individualizar segundo avaliação."
    }
  },
  tsh: {
    es: {
      name: "Trastornos del Habla",
      description: "Trastornos de fluidez y sincronía del habla, incluyendo tartamudez. La FBM transcraneal puede modular circuitos neurales involucrados en el control temporal del habla.",
      precautions: "Evidencia muy limitada. Usar como coadyuvante experimental con consentimiento informado."
    },
    en: {
      name: "Speech Disorders",
      description: "Fluency and synchrony speech disorders, including stuttering. Transcranial PBM can modulate neural circuits involved in temporal speech control.",
      precautions: "Very limited evidence. Use as experimental adjuvant with informed consent."
    },
    pt: {
      name: "Transtornos da Fala",
      description: "Transtornos de fluência e sincronia da fala, incluindo gagueira. A FBM transcraniana pode modular circuitos neurais envolvidos no controle temporal da fala.",
      precautions: "Evidência muito limitada. Usar como coadjuvante experimental com consentimento informado."
    }
  },
  "apraxia-habla": {
    es: {
      name: "Apraxia del Habla",
      description: "Trastorno de la programación motora del habla. La FBM puede favorecer neuroplasticidad en áreas de planificación motora.",
      precautions: "Diferenciar de disartria. La terapia fonoaudiológica intensiva es el tratamiento principal."
    },
    en: {
      name: "Apraxia of Speech",
      description: "Motor speech programming disorder. PBM can favor neuroplasticity in motor planning areas.",
      precautions: "Differentiate from dysarthria. Intensive speech therapy is the main treatment."
    },
    pt: {
      name: "Apraxia da Fala",
      description: "Transtorno da programação motora da fala. A FBM pode favorecer neuroplasticidade em áreas de planejamento motor.",
      precautions: "Diferenciar da disartria. A terapia fonoaudiológica intensiva é o tratamento principal."
    }
  },
  "retraso-lenguaje": {
    es: {
      name: "Retraso del Lenguaje",
      description: "Desarrollo del lenguaje por debajo de lo esperado para la edad. La tPBM podría favorecer neuroplasticidad en áreas del lenguaje.",
      precautions: "Protocolo experimental. Priorizar intervención fonoaudiológica basada en evidencia. Uso con consentimiento informado parental."
    },
    en: {
      name: "Language Delay",
      description: "Language development below expected for age. tPBM could favor neuroplasticity in language areas.",
      precautions: "Experimental protocol. Prioritize evidence-based speech therapy intervention. Use with parental informed consent."
    },
    pt: {
      name: "Atraso de Linguagem",
      description: "Desenvolvimento da linguagem abaixo do esperado para a idade. A tPBM poderia favorecer neuroplasticidade em áreas da linguagem.",
      precautions: "Protocolo experimental. Priorizar intervenção fonoaudiológica baseada em evidência. Uso com consentimento informado parental."
    }
  },
  afasia: {
    es: {
      name: "Afasia",
      description: "Trastorno del lenguaje adquirido, típicamente post-ACV. La tPBM puede potenciar neuroplasticidad y recuperación lingüística.",
      precautions: "La FBM es coadyuvante. La terapia del lenguaje intensiva sigue siendo el tratamiento principal."
    },
    en: {
      name: "Aphasia",
      description: "Acquired language disorder, typically post-stroke. tPBM can enhance neuroplasticity and linguistic recovery.",
      precautions: "PBM is adjunctive. Intensive language therapy remains the main treatment."
    },
    pt: {
      name: "Afasia",
      description: "Transtorno de linguagem adquirido, tipicamente pós-AVC. A tPBM pode potencializar neuroplasticidade e recuperação linguística.",
      precautions: "A FBM é coadjuvante. A terapia de linguagem intensiva continua sendo o tratamento principal."
    }
  },
  cea: {
    es: {
      name: "Condición del Espectro Autista (CEA)",
      description: "Condición del neurodesarrollo. La tPBM se investiga como potencial modulador de conectividad cerebral y función mitocondrial.",
      precautions: "Protocolo experimental. No es tratamiento curativo. Usar como potencial coadyuvante con consentimiento informado. Respetar neurodiversidad. Uso experimental, no estándar."
    },
    en: {
      name: "Autism Spectrum Condition (ASC)",
      description: "Neurodevelopmental condition. tPBM is investigated as potential modulator of brain connectivity and mitochondrial function.",
      precautions: "Experimental protocol. Not curative treatment. Use as potential adjuvant with informed consent. Respect neurodiversity. Experimental use, not standard."
    },
    pt: {
      name: "Condição do Espectro Autista (CEA)",
      description: "Condição do neurodesenvolvimento. A tPBM é investigada como potencial modulador de conectividade cerebral e função mitocondrial.",
      precautions: "Protocolo experimental. Não é tratamento curativo. Usar como potencial coadjuvante com consentimento informado. Respeitar neurodiversidade. Uso experimental, não padrão."
    }
  },
  tdah: {
    es: {
      name: "TDAH",
      description: "Trastorno por Déficit de Atención e Hiperactividad. La tPBM se investiga como potencial modulador de función prefrontal.",
      precautions: "Protocolo experimental. No reemplaza tratamiento establecido (conductual, farmacológico). Consentimiento informado. Uso experimental, no estándar."
    },
    en: {
      name: "ADHD",
      description: "Attention Deficit Hyperactivity Disorder. tPBM is investigated as potential modulator of prefrontal function.",
      precautions: "Experimental protocol. Does not replace established treatment (behavioral, pharmacological). Informed consent. Experimental use, not standard."
    },
    pt: {
      name: "TDAH",
      description: "Transtorno do Déficit de Atenção e Hiperatividade. A tPBM é investigada como potencial modulador de função pré-frontal.",
      precautions: "Protocolo experimental. Não substitui tratamento estabelecido (comportamental, farmacológico). Consentimento informado. Uso experimental, não padrão."
    }
  },
  dislexia: {
    es: {
      name: "Dislexia Infantil",
      description: "Trastorno específico del aprendizaje de la lectura. La tPBM podría modular áreas de procesamiento del lenguaje.",
      precautions: "Evidencia muy limitada. La intervención fonoaudiológica/psicopedagógica es el tratamiento principal. Uso experimental, no estándar."
    },
    en: {
      name: "Childhood Dyslexia",
      description: "Specific reading learning disorder. tPBM could modulate language processing areas.",
      precautions: "Very limited evidence. Speech therapy/psychopedagogical intervention is the main treatment. Experimental use, not standard."
    },
    pt: {
      name: "Dislexia Infantil",
      description: "Transtorno específico da aprendizagem da leitura. A tPBM poderia modular áreas de processamento da linguagem.",
      precautions: "Evidência muito limitada. A intervenção fonoaudiológica/psicopedagógica é o tratamento principal. Uso experimental, não padrão."
    }
  },
  "estimulacion-cognitiva": {
    es: {
      name: "Estimulación Cognitiva",
      description: "Potenciación de funciones cognitivas. La tPBM puede mejorar metabolismo cerebral y rendimiento cognitivo.",
      precautions: "No es 'potenciador cognitivo' mágico. Efectos modestos y variables. Usar con expectativas realistas. Uso experimental, no estándar."
    },
    en: {
      name: "Cognitive Stimulation",
      description: "Enhancement of cognitive functions. tPBM can improve brain metabolism and cognitive performance.",
      precautions: "Not a magical 'cognitive enhancer'. Modest and variable effects. Use with realistic expectations. Experimental use, not standard."
    },
    pt: {
      name: "Estimulação Cognitiva",
      description: "Potencialização de funções cognitivas. A tPBM pode melhorar metabolismo cerebral e desempenho cognitivo.",
      precautions: "Não é 'potencializador cognitivo' mágico. Efeitos modestos e variáveis. Usar com expectativas realistas. Uso experimental, não padrão."
    }
  },
  demencias: {
    es: {
      name: "Demencias",
      description: "Deterioro cognitivo progresivo (MCI, Alzheimer). La tPBM puede mejorar función mitocondrial cerebral y potencialmente enlentecer deterioro.",
      precautions: "No es tratamiento curativo. Puede ser coadyuvante para calidad de vida. Mejores resultados en etapas iniciales (MCI, demencia leve)."
    },
    en: {
      name: "Dementia",
      description: "Progressive cognitive decline (MCI, Alzheimer's). tPBM can improve brain mitochondrial function and potentially slow decline.",
      precautions: "Not curative treatment. May be adjuvant for quality of life. Better results in early stages (MCI, mild dementia)."
    },
    pt: {
      name: "Demências",
      description: "Deterioração cognitiva progressiva (MCI, Alzheimer). A tPBM pode melhorar função mitocondrial cerebral e potencialmente retardar deterioração.",
      precautions: "Não é tratamento curativo. Pode ser coadjuvante para qualidade de vida. Melhores resultados em etapas iniciais (MCI, demência leve)."
    }
  },
  parkinson: {
    es: {
      name: "Enfermedad de Parkinson",
      description: "Enfermedad neurodegenerativa con síntomas motores y no motores. La tPBM puede proteger neuronas dopaminérgicas y mejorar síntomas.",
      precautions: "No reemplaza medicación. Es coadyuvante. Puede mejorar síntomas motores y no motores."
    },
    en: {
      name: "Parkinson's Disease",
      description: "Neurodegenerative disease with motor and non-motor symptoms. tPBM can protect dopaminergic neurons and improve symptoms.",
      precautions: "Does not replace medication. Is adjunctive. Can improve motor and non-motor symptoms."
    },
    pt: {
      name: "Doença de Parkinson",
      description: "Doença neurodegenerativa com sintomas motores e não motores. A tPBM pode proteger neurônios dopaminérgicos e melhorar sintomas.",
      precautions: "Não substitui medicação. É coadjuvante. Pode melhorar sintomas motores e não motores."
    }
  },
  "esclerosis-multiple": {
    es: {
      name: "Esclerosis Múltiple",
      description: "Enfermedad desmielinizante. La tPBM puede tener efecto neuroprotector y antiinflamatorio.",
      precautions: "Evidencia preliminar. No reemplaza tratamiento modificador de enfermedad. Coordinar con neurología."
    },
    en: {
      name: "Multiple Sclerosis",
      description: "Demyelinating disease. tPBM can have neuroprotective and anti-inflammatory effects.",
      precautions: "Preliminary evidence. Does not replace disease-modifying treatment. Coordinate with neurology."
    },
    pt: {
      name: "Esclerose Múltipla",
      description: "Doença desmielinizante. A tPBM pode ter efeito neuroprotetor e anti-inflamatório.",
      precautions: "Evidência preliminar. Não substitui tratamento modificador da doença. Coordenar com neurologia."
    }
  },
  ela: {
    es: {
      name: "Esclerosis Lateral Amiotrófica (ELA)",
      description: "Enfermedad de motoneurona. La FBM puede potencialmente enlentecer progresión y mejorar calidad de vida.",
      precautions: "Enfermedad terminal. FBM es paliativa/coadyuvante. No hay evidencia de curación. Manejo multidisciplinario esencial."
    },
    en: {
      name: "Amyotrophic Lateral Sclerosis (ALS)",
      description: "Motor neuron disease. PBM can potentially slow progression and improve quality of life.",
      precautions: "Terminal disease. PBM is palliative/adjunctive. No evidence of cure. Multidisciplinary management essential."
    },
    pt: {
      name: "Esclerose Lateral Amiotrófica (ELA)",
      description: "Doença do neurônio motor. A FBM pode potencialmente retardar progressão e melhorar qualidade de vida.",
      precautions: "Doença terminal. FBM é paliativa/coadjuvante. Não há evidência de cura. Manejo multidisciplinar essencial."
    }
  },
  "paralisis-cerebral": {
    es: {
      name: "Parálisis Cerebral",
      description: "Trastorno del movimiento por lesión cerebral temprana. La tPBM puede favorecer neuroplasticidad.",
      precautions: "Resultados variables. Mejor respuesta en niños con mayor potencial plástico. Siempre como complemento a rehabilitación."
    },
    en: {
      name: "Cerebral Palsy",
      description: "Movement disorder due to early brain injury. tPBM can favor neuroplasticity.",
      precautions: "Variable results. Better response in children with greater plastic potential. Always as complement to rehabilitation."
    },
    pt: {
      name: "Paralisia Cerebral",
      description: "Transtorno do movimento por lesão cerebral precoce. A tPBM pode favorecer neuroplasticidade.",
      precautions: "Resultados variáveis. Melhor resposta em crianças com maior potencial plástico. Sempre como complemento à reabilitação."
    }
  },
  acv: {
    es: {
      name: "Accidente Cerebrovascular (ACV)",
      description: "Lesión cerebral vascular. La tPBM puede acelerar recuperación y potenciar neuroplasticidad post-ACV.",
      precautions: "Iniciar lo antes posible post-ACV. No reemplaza rehabilitación convencional. Coordinar con equipo neurológico."
    },
    en: {
      name: "Stroke (CVA)",
      description: "Vascular brain injury. tPBM can accelerate recovery and enhance post-stroke neuroplasticity.",
      precautions: "Start as soon as possible post-stroke. Does not replace conventional rehabilitation. Coordinate with neurology team."
    },
    pt: {
      name: "Acidente Vascular Cerebral (AVC)",
      description: "Lesão cerebral vascular. A tPBM pode acelerar recuperação e potencializar neuroplasticidade pós-AVC.",
      precautions: "Iniciar o mais breve possível pós-AVC. Não substitui reabilitação convencional. Coordenar com equipe neurológica."
    }
  },
  sialorrea: {
    es: {
      name: "Sialorrea",
      description: "Exceso de saliva o incapacidad de manejarla. La FBM podría modular función glandular, aunque evidencia es limitada.",
      precautions: "Evaluar causa (neurológica vs. local). El tratamiento principal depende de etiología. Sin guías; extrapolación."
    },
    en: {
      name: "Sialorrhea",
      description: "Excess saliva or inability to manage it. PBM could modulate glandular function, although evidence is limited.",
      precautions: "Evaluate cause (neurological vs. local). Main treatment depends on etiology. No guidelines; extrapolation."
    },
    pt: {
      name: "Sialorreia",
      description: "Excesso de saliva ou incapacidade de manejá-la. A FBM poderia modular função glandular, embora evidência seja limitada.",
      precautions: "Avaliar causa (neurológica vs. local). O tratamento principal depende da etiologia. Sem diretrizes; extrapolação."
    }
  },
  "coadyuvante-erge": {
    es: {
      name: "Coadyuvante en Tratamiento de ERGE",
      description: "FBM como potencial coadyuvante en reflujo gastroesofágico cuando afecta deglución y voz.",
      precautions: "Evidencia muy limitada. El tratamiento principal es médico/gastroenterológico."
    },
    en: {
      name: "Adjuvant in GERD Treatment",
      description: "PBM as potential adjuvant in gastroesophageal reflux when affecting swallowing and voice.",
      precautions: "Very limited evidence. Main treatment is medical/gastroenterological."
    },
    pt: {
      name: "Coadjuvante no Tratamento de DRGE",
      description: "FBM como potencial coadjuvante no refluxo gastroesofágico quando afeta deglutição e voz.",
      precautions: "Evidência muito limitada. O tratamento principal é médico/gastroenterológico."
    }
  },

  "coadyuvante-rinitis": {
    es: {
      name: "Coadyuvante en Tratamiento de Rinitis",
      description: "FBM intranasal como potencial coadyuvante antiinflamatorio en rinitis alérgica o crónica.",
      precautions: "No reemplaza tratamiento médico. Usar sondas apropiadas para aplicación intranasal."
    },
    en: {
      name: "Adjuvant in Rhinitis Treatment",
      description: "Intranasal PBM as potential anti-inflammatory adjuvant in allergic or chronic rhinitis.",
      precautions: "Does not replace medical treatment. Use appropriate probes for intranasal application."
    },
    pt: {
      name: "Coadjuvante no Tratamento de Rinite",
      description: "FBM intranasal como potencial coadjuvante anti-inflamatório na rinite alérgica ou crônica.",
      precautions: "Não substitui tratamento médico. Usar sondas apropriadas para aplicação intranasal."
    }
  },
  "coadyuvante-sinusitis": {
    es: {
      name: "Coadyuvante en Tratamiento de Sinusitis",
      description: "FBM como potencial coadyuvante antiinflamatorio en sinusitis.",
      precautions: "El tratamiento principal es médico. Descartar complicaciones."
    },
    en: {
      name: "Adjuvant in Sinusitis Treatment",
      description: "PBM as potential anti-inflammatory adjuvant in sinusitis.",
      precautions: "Main treatment is medical. Rule out complications."
    },
    pt: {
      name: "Coadjuvante no Tratamento de Sinusite",
      description: "FBM como potencial coadjuvante anti-inflamatório na sinusite.",
      precautions: "O tratamento principal é médico. Descartar complicações."
    }
  },
  sahos: {
    es: {
      name: "SAHOS",
      description: "Síndrome de Apnea-Hipoapnea Obstructiva del Sueño. La FBM podría mejorar tono muscular de vía aérea superior.",
      precautions: "El tratamiento principal es CPAP u otras intervenciones establecidas. FBM es experimental. No reemplaza CPAP ni cirugía."
    },
    en: {
      name: "OSAHS",
      description: "Obstructive Sleep Apnea-Hypopnea Syndrome. PBM could improve upper airway muscle tone.",
      precautions: "Main treatment is CPAP or other established interventions. PBM is experimental. Does not replace CPAP or surgery."
    },
    pt: {
      name: "SAHOS",
      description: "Síndrome da Apneia-Hipopneia Obstrutiva do Sono. A FBM poderia melhorar tônus muscular da via aérea superior.",
      precautions: "O tratamento principal é CPAP ou outras intervenções estabelecidas. FBM é experimental. Não substitui CPAP nem cirurgia."
    }
  },
  "coadyuvante-otitis": {
    es: {
      name: "Coadyuvante en Tratamiento de Otitis Media",
      description: "FBM como potencial coadyuvante antiinflamatorio en otitis media.",
      precautions: "El tratamiento principal es médico. Descartar complicaciones. No usar en otitis complicada."
    },
    en: {
      name: "Adjuvant in Otitis Media Treatment",
      description: "PBM as potential anti-inflammatory adjuvant in otitis media.",
      precautions: "Main treatment is medical. Rule out complications. Do not use in complicated otitis."
    },
    pt: {
      name: "Coadjuvante no Tratamento de Otite Média",
      description: "FBM como potencial coadjuvante anti-inflamatório na otite média.",
      precautions: "O tratamento principal é médico. Descartar complicações. Não usar em otite complicada."
    }
  },
  ostomias: {
    es: {
      name: "Ostomías (Traqueostomía/Gastrostomía)",
      description: "Cuidado periostoma y rehabilitación de funciones. La FBM puede mejorar cicatrización y función local.",
      precautions: "Evitar irradiar directamente sobre estomas abiertos. Enfocarse en tejido periostoma y rehabilitación funcional."
    },
    en: {
      name: "Ostomies (Tracheostomy/Gastrostomy)",
      description: "Peristomal care and functional rehabilitation. PBM can improve healing and local function.",
      precautions: "Avoid irradiating directly on open stomas. Focus on peristomal tissue and functional rehabilitation."
    },
    pt: {
      name: "Ostomias (Traqueostomia/Gastrostomia)",
      description: "Cuidado periostoma e reabilitação de funções. A FBM pode melhorar cicatrização e função local.",
      precautions: "Evitar irradiar diretamente sobre ostomas abertas. Focar em tecido periostoma e reabilitação funcional."
    }
  },
  "estimulacion-gustativa-olfativa": {
    es: {
      name: "Estimulación Gustativa y Olfativa",
      description: "Rehabilitación de alteraciones del gusto y olfato (disgeusia, anosmia). La FBM puede promover regeneración de receptores y neuronas sensoriales.",
      precautions: "Evidencia emergente, especialmente post-COVID. Resultados variables."
    },
    en: {
      name: "Gustatory and Olfactory Stimulation",
      description: "Rehabilitation of taste and smell alterations (dysgeusia, anosmia). PBM can promote receptor and sensory neuron regeneration.",
      precautions: "Emerging evidence, especially post-COVID. Variable results."
    },
    pt: {
      name: "Estimulação Gustativa e Olfativa",
      description: "Reabilitação de alterações do gosto e olfato (disgeusia, anosmia). A FBM pode promover regeneração de receptores e neurônios sensoriais.",
      precautions: "Evidência emergente, especialmente pós-COVID. Resultados variáveis."
    }
  }
};

// Helper para obtener el nombre traducido
export const getTranslatedName = (pathologyId, language = 'es') => {
  return pathologyTranslations[pathologyId]?.[language]?.name || pathologyId;
};

// Helper para obtener la descripción traducida
export const getTranslatedDescription = (pathologyId, language = 'es') => {
  return pathologyTranslations[pathologyId]?.[language]?.description || '';
};

// Helper para obtener las precauciones traducidas
export const getTranslatedPrecautions = (pathologyId, language = 'es') => {
  return pathologyTranslations[pathologyId]?.[language]?.precautions || '';
};