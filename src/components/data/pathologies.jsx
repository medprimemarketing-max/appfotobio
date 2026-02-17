/**
 * CATÁLOGO DE PATOLOGÍAS Y PROTOCOLOS DE FOTOBIOMODULACIÓN
 * 
 * ACTUALIZADO con estructura optimizada:
 * - Longitudes de onda: SOLO 660 nm (ROJO) y 808 nm (INFRARROJO)
 * - Sin potencia, sin modalidad, sin densidad de energía
 * - ILIB agregado en patologías inflamatorias/inmunológicas
 * 
 * NOTA IMPORTANTE: Los valores de dosimetría son ORIENTATIVOS.
 * Esta app NO sustituye la formación académica ni las guías oficiales.
 * Se recomienda revisar la evidencia periódicamente.
 * 
 * Niveles de Evidencia:
 * A = Guías clínicas o múltiples ECA/metaanálisis robustos
 * B = Algunos ECA o estudios controlados con limitaciones
 * C = Series de casos, estudios piloto, evidencia preliminar
 * D = Extrapolación teórica, evidencia muy limitada o reportes de casos aislados
 */

export const CATEGORIES = {
  VOZ: { name: "Voz", color: "#8B5CF6", bgClass: "bg-violet-500" },
  DEGLUCION: { name: "Deglución", color: "#F97316", bgClass: "bg-orange-500" },
  AUDICION: { name: "Audición", color: "#3B82F6", bgClass: "bg-blue-500" },
  LENGUAJE: { name: "Lenguaje", color: "#10B981", bgClass: "bg-emerald-500" },
  NEUROCOGNITIVO: { name: "Neurocognitivo", color: "#EC4899", bgClass: "bg-pink-500" },
  DOLOR: { name: "Dolor", color: "#EF4444", bgClass: "bg-red-500" },
  MOTRICIDAD_OROFACIAL: { name: "Motricidad Orofacial", color: "#06B6D4", bgClass: "bg-cyan-500" },
  ONCOLOGICO: { name: "Oncológico", color: "#F59E0B", bgClass: "bg-amber-500" },
  RESPIRATORIO: { name: "Respiratorio/ORL", color: "#84CC16", bgClass: "bg-lime-500" },
  SISTEMICO: { name: "Sistémico", color: "#6366F1", bgClass: "bg-indigo-500" }
};

export const PATHOLOGIES = [
  {
    id: "disfagia",
    nombre: "Disfagia",
    icono: "UtensilsCrossed",
    categoria: "DEGLUCION",
    descripcionBreve: "Dificultad para deglutir por causas neurológicas, estructurales u oncológicas. La FBM puede mejorar función muscular, reducir fibrosis post-RT y promover neuroplasticidad.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Evaluar riesgo de aspiración. La FBM es coadyuvante, no reemplaza rehabilitación deglutoria.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Base de lengua, pilares faríngeos, región suprahioidea, músculos cervicales anteriores, laringe",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J intraoral, 6-8 J extraoral",
        numeroPuntos: "10-15 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "12-18 sesiones (4-6 semanas)",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, estudios clínicos pequeños, extrapolado de mucositis y rehabilitación deglutoria",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica y/o médica. En disfagia post-RT, iniciar tempranamente. En origen neurológico, considerar tPBM complementario.",
        informacion_complementaria: {
          es: "Determinar previamente el objetivo terapéutico para ajustar la dosimetría (por ejemplo: potenciar tono y fuerza lingual o favorecer relajación muscular). Considerar las características neurológicas del paciente y los objetivos funcionales. En caso de buscar bioinhibición, considerar dosimetrías superiores a 4 J; para bioestimulación, rangos entre 1 y 4 J. En pacientes con sarcopenia asociada al envejecimiento, ajustar la dosimetría según las características musculares. Se recomienda aplicar fotobiomodulación antes y/o durante ejercicios de rehabilitación funcional para potenciar la respuesta terapéutica. En modalidad sistémica, utilizar únicamente con indicación médica. La aplicación transcraneal puede realizarse mientras el paciente ejecuta la deglución, según tolerancia y objetivo clínico.",
          en: "Determine the therapeutic objective beforehand to adjust dosimetry (e.g., enhance tongue tone and strength or promote muscle relaxation). Consider the patient's neurological characteristics and functional objectives. If seeking bioinhibition, consider dosimetries above 4 J; for biostimulation, ranges between 1 and 4 J. In patients with sarcopenia associated with aging, adjust dosimetry according to muscle characteristics. It is recommended to apply photobiomodulation before and/or during functional rehabilitation exercises to enhance therapeutic response. In systemic modality, use only with medical indication. Transcranial application can be performed while the patient executes swallowing, according to tolerance and clinical objective.",
          pt: "Determinar previamente o objetivo terapêutico para ajustar a dosimetria (por exemplo: potencializar tônus e força lingual ou favorecer relaxamento muscular). Considerar as características neurológicas do paciente e os objetivos funcionais. Em caso de buscar bioinibição, considerar dosimetrias superiores a 4 J; para bioestimulação, faixas entre 1 e 4 J. Em pacientes com sarcopenia associada ao envelhecimento, ajustar a dosimetria segundo as características musculares. Recomenda-se aplicar fotobiomodulação antes e/ou durante exercícios de reabilitação funcional para potencializar a resposta terapêutica. Em modalidade sistêmica, utilizar unicamente com indicação médica. A aplicação transcraniana pode ser realizada enquanto o paciente executa a deglutição, segundo tolerância e objetivo clínico."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en disfagia oncológica o con compromiso inflamatorio sistémico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza rehabilitación fonoaudiológica ni tratamiento médico."
      },
      transcraneal: {
        zonaAnatomica: "Corteza motora primaria (área representación orofaríngea)",
        puntos1020: "Cz – C3 – C4",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de estudios en ACV y neurorehabilitación",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica y/o médica. Para disfagia de origen neurológico central. Combinar siempre con estimulación periférica y rehabilitación deglutoria convencional.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "mucositis-oral",
    nombre: "Mucositis Oral",
    icono: "Droplets",
    categoria: "ONCOLOGICO",
    descripcionBreve: "Inflamación y ulceración de mucosa oral por quimio/radioterapia. La FBM tiene alta evidencia en prevención y tratamiento según guías MASCC/ISOO.",
    nivelEvidenciaGlobal: "A",
    advertencias: "Coordinar con equipo oncológico. Iniciar preventivamente antes de radioterapia si es posible.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Mucosa oral completa: labios, mucosa yugal, lengua, piso de boca, paladar blando, orofaringe accesible",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "2-3 J por punto",
        numeroPuntos: "Cubrir todas las áreas de mucosa en riesgo (15-25 puntos típicamente)",
        frecuenciaTratamiento: "Prevención: diario durante RT. Tratamiento: 3-5 veces/semana",
        duracionTotal: "Durante todo el período de tratamiento oncológico o hasta resolución",
        nivelEvidencia: "A",
        tipoEstudio: "Múltiples ensayos clínicos aleatorizados, metaanálisis, guías MASCC/ISOO",
        comentarios: "Parámetros adaptados a partir de guías clínicas y revisiones sistemáticas recientes en fotobiomodulación para este cuadro. Aun así, se recomienda revisar periódicamente la literatura y las guías actualizadas. Evidencia sólida para prevención y reducción de severidad.",
        informacion_complementaria: {
          es: "Identificar la zona anatómica comprometida y ajustar la dosimetría según la extensión y severidad de la mucositis. En muchos casos, la mucosa solo tolera bajas dosimetrías (1 J) aplicadas mediante técnica puntual sin contacto, especialmente en pacientes con dolor intenso. Se recomienda aplicar escala EVA antes de iniciar y monitorizar la disminución progresiva del dolor. La sesión puede finalizar cuando el paciente presenta reducción significativa del dolor y logra deglutir saliva o alimentos fríos. El tratamiento debe coordinarse siempre con el equipo de oncología y contar con indicación médica. La terapia fotodinámica solo debe considerarse si el paciente tolera la aplicación del fotosensibilizador.",
          en: "Identify the compromised anatomical zone and adjust dosimetry according to the extension and severity of mucositis. In many cases, the mucosa only tolerates low dosimetries (1 J) applied through non-contact point technique, especially in patients with intense pain. It is recommended to apply the VAS scale before starting and monitor the progressive pain reduction. The session can end when the patient presents significant pain reduction and is able to swallow saliva or cold foods. Treatment should always be coordinated with the oncology team and have medical indication. Photodynamic therapy should only be considered if the patient tolerates the photosensitizer application.",
          pt: "Identificar a zona anatômica comprometida e ajustar a dosimetria segundo a extensão e severidade da mucosite. Em muitos casos, a mucosa só tolera baixas dosimetrias (1 J) aplicadas mediante técnica pontual sem contato, especialmente em pacientes com dor intensa. Recomenda-se aplicar escala EVA antes de iniciar e monitorizar a diminuição progressiva da dor. A sessão pode finalizar quando o paciente apresenta redução significativa da dor e consegue deglutir saliva ou alimentos frios. O tratamento deve ser sempre coordenado com a equipe de oncologia e contar com indicação médica. A terapia fotodinâmica só deve ser considerada se o paciente tolerar a aplicação do fotossensibilizador."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones durante período de RT/QT",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario durante RT/QT. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza manejo oncológico ni terapia fonoaudiológica."
      },
      PDT: {
        zonaAnatomica: "Áreas de mucositis infectada, ulceraciones colonizadas",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "10-30 J/cm² sobre la zona afectada con fotosensibilizador",
        numeroPuntos: "Áreas específicas infectadas",
        frecuenciaTratamiento: "1-2 aplicaciones según respuesta clínica",
        duracionTotal: "Sesiones puntuales en episodios de infección",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, estudios piloto en PDT antimicrobiana",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico. Terapia fotodinámica como adyuvante en mucositis infectada. Pre-incubación del fotosensibilizador (azul de metileno 0.01-0.02% u otro equivalente) 3-5 min. Requiere manejo entrenado y supervisión oncológica."
      }
    }
  },
  {
    id: "xerostomia",
    nombre: "Xerostomía",
    icono: "Sun",
    categoria: "ONCOLOGICO",
    descripcionBreve: "Sequedad bucal, frecuente post-radioterapia HNC. La FBM puede estimular regeneración de glándulas salivales.",
    nivelEvidenciaGlobal: "B",
    advertencias: "Resultados variables según grado de daño glandular. Mejor pronóstico si se inicia temprano.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Glándulas parótidas (intra y extraoral), submandibulares, piso de boca",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-12 puntos por sesión (cubriendo glándulas mayores bilateral)",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones (puede requerir mantenimiento)",
        nivelEvidencia: "B",
        tipoEstudio: "Ensayos clínicos con mejora en flujo y síntomas, tamaños muestrales modestos",
        comentarios: "Parámetros adaptados a partir de estudios clínicos y revisiones sistemáticas recientes en fotobiomodulación para este cuadro. Aun así, se recomienda revisar periódicamente la literatura y las guías actualizadas. Iniciar durante o inmediatamente después de RT para mejores resultados. Medir flujo salival pre/post.",
        informacion_complementaria: {
          es: "Se sugiere iniciar la aplicación sobre las glándulas parótidas y evaluar la respuesta salival antes de irradiar otras glándulas. No siempre es necesario irradiar todas las glándulas salivales. Limpiar la zona previamente y solicitar retroalimentación constante del paciente, ya que el efecto puede ser inmediato. El número de puntos puede variar, comenzando desde 6 puntos, ajustable según respuesta clínica. Considerar la etiología de la xerostomía; en patologías autoinmunes o crónicas puede ser necesario mantener el tratamiento en el tiempo y aumentar la dosimetría en presencia de tejido glandular fibrótico.",
          en: "It is suggested to start application on the parotid glands and evaluate salivary response before irradiating other glands. It is not always necessary to irradiate all salivary glands. Clean the area beforehand and request constant patient feedback, as the effect can be immediate. The number of points may vary, starting from 6 points, adjustable according to clinical response. Consider the etiology of xerostomia; in autoimmune or chronic pathologies it may be necessary to maintain treatment over time and increase dosimetry in the presence of fibrotic glandular tissue.",
          pt: "Sugere-se iniciar a aplicação sobre as glândulas parótidas e avaliar a resposta salivar antes de irradiar outras glândulas. Nem sempre é necessário irradiar todas as glândulas salivares. Limpar a zona previamente e solicitar retroalimentação constante do paciente, já que o efeito pode ser imediato. O número de pontos pode variar, começando desde 6 pontos, ajustável segundo resposta clínica. Considerar a etiologia da xerostomia; em patologias autoimunes ou crônicas pode ser necessário manter o tratamento no tempo e aumentar a dosimetria na presença de tecido glandular fibrótico."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario post-RT. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza manejo oncológico ni terapia fonoaudiológica."
      }
    }
  },
  {
    id: "dtm",
    nombre: "Disfunción Temporomandibular (DTM)",
    icono: "Skull",
    categoria: "DOLOR",
    descripcionBreve: "Dolor y disfunción de ATM y músculos masticatorios. La FBM tiene buena evidencia para reducir dolor y mejorar apertura oral.",
    nivelEvidenciaGlobal: "B",
    advertencias: "Evaluar etiología. Puede requerir manejo interdisciplinario (odontología, kinesiología).",
    protocolos: {
      puntual: {
        zonaAnatomica: "ATM bilateral, maseteros, temporal anterior, pterigoideos (intraoral si es posible), puntos gatillo",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-8 J",
        numeroPuntos: "8-12 puntos bilateral",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones",
        nivelEvidencia: "B",
        tipoEstudio: "Metaanálisis y múltiples ECA con mejora en dolor y apertura oral",
        comentarios: "Parámetros adaptados a partir de estudios clínicos y revisiones sistemáticas recientes en fotobiomodulación para este cuadro. Aun así, se recomienda revisar periódicamente la literatura y las guías actualizadas. Buena evidencia para dolor y mejora de apertura oral. Combinar con ejercicios y manejo de hábitos parafuncionales.",
        informacion_complementaria: {
          es: "Indagar la presencia de dolor en puntos gatillo y monitorizar la respuesta analgésica, idealmente logrando que la sesión finalice sin dolor residual. La aplicación puede realizarse sobre la articulación temporomandibular o la musculatura asociada, tanto en reposo como durante la ejecución de funciones específicas (apertura, cierre, masticación), según objetivo terapéutico.",
          en: "Investigate the presence of pain in trigger points and monitor the analgesic response, ideally achieving that the session ends without residual pain. Application can be performed on the temporomandibular joint or associated musculature, both at rest and during the execution of specific functions (opening, closing, chewing), according to therapeutic objective.",
          pt: "Indagar a presença de dor em pontos gatilho e monitorizar a resposta analgésica, idealmente alcançando que a sessão finalize sem dor residual. A aplicação pode ser realizada sobre a articulação temporomandibular ou a musculatura associada, tanto em repouso como durante a execução de funções específicas (abertura, fechamento, mastigação), segundo objetivo terapêutico."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos antiinflamatorios",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en DTM con inflamación persistente o dolor crónico. Beneficios esperables: efecto antioxidante sistémico, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza terapia fonoaudiológica ni tratamiento médico."
      }
    }
  },
  {
    id: "neuralgia-trigeminal",
    nombre: "Neuralgia Trigeminal",
    icono: "AlertTriangle",
    categoria: "DOLOR",
    descripcionBreve: "Dolor neuropático severo en territorio del nervio trigémino. La FBM puede modular dolor y regeneración neural.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "Dolor muy severo requiere manejo multidisciplinario. FBM es coadyuvante. No reemplaza tratamiento farmacológico/quirúrgico.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Trayectos de V1/V2/V3, puntos gatillo musculares, región preauricular/retroauricular, ganglio de Gasser (proyección)",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-10 J",
        numeroPuntos: "8-12 puntos según rama afectada",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones, con re-evaluación",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA pequeños y revisiones sistemáticas",
        comentarios: "Parámetros adaptados a partir de estudios clínicos recientes en fotobiomodulación para neuralgia trigeminal. Se recomienda revisar periódicamente la literatura actualizada. Puede reducir frecuencia e intensidad de crisis. Combinar con manejo farmacológico.",
        informacion_complementaria: {
          es: "Aplicar escala EVA antes y durante la intervención para monitorizar la respuesta analgésica. Si el paciente no tolera la técnica puntual con contacto, se recomienda utilizar técnica sin contacto y ajustar la dosimetría en consecuencia. La respuesta clínica debe guiar la progresión del tratamiento.\n\nAdemás de considerar las trayectorias clásicas de las ramas V1, V2 y V3 del nervio trigémino, se recomienda evaluar y tratar también las ramas terminales accesorias de cada división, dado su rol en la perpetuación del dolor neuropático periférico.\n\nA nivel del ganglio trigeminal, puede ser necesario utilizar una dosimetría ligeramente superior a la aplicada en ramas periféricas, considerando la profundidad anatómica y la mayor densidad neuronal, siempre ajustando según tolerancia clínica del paciente.",
          en: "Apply VAS scale before and during the intervention to monitor the analgesic response. If the patient does not tolerate the point technique with contact, it is recommended to use non-contact technique and adjust dosimetry accordingly. The clinical response should guide treatment progression.\n\nIn addition to considering the classic pathways of the V1, V2, and V3 branches of the trigeminal nerve, it is recommended to also evaluate and treat the accessory terminal branches of each division, given their role in the perpetuation of peripheral neuropathic pain.\n\nAt the trigeminal ganglion level, it may be necessary to use slightly higher dosimetry than that applied to peripheral branches, considering the anatomical depth and greater neuronal density, always adjusting according to the patient's clinical tolerance.",
          pt: "Aplicar escala EVA antes e durante a intervenção para monitorizar a resposta analgésica. Se o paciente não tolera a técnica pontual com contato, recomenda-se utilizar técnica sem contato e ajustar a dosimetria consequentemente. A resposta clínica deve guiar a progressão do tratamento.\n\nAlém de considerar as trajetórias clássicas dos ramos V1, V2 e V3 do nervo trigêmeo, recomenda-se avaliar e tratar também os ramos terminais acessórios de cada divisão, dado seu papel na perpetuação da dor neuropática periférica.\n\nAo nível do gânglio trigeminal, pode ser necessário utilizar uma dosimetria ligeiramente superior à aplicada em ramos periféricos, considerando a profundidade anatômica e a maior densidade neuronal, sempre ajustando segundo tolerância clínica do paciente."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en neuralgia con dolor crónico refractario. Beneficios esperables: efecto antioxidante sistémico, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza tratamiento farmacológico ni médico."
      },
      transcraneal: {
        zonaAnatomica: "Corteza somatosensorial (representación facial) y corteza motora",
        puntos1020: "T3 – T4 – Cz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de neuromodulación del dolor",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento médico. Para componente central del dolor en neuralgia trigeminal. Complemento a FBM periférica.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "analgesia",
    nombre: "Analgesia (Dolor Orofacial/Cefálico)",
    icono: "Zap",
    categoria: "DOLOR",
    descripcionBreve: "Manejo del dolor en región orofacial y cefálica. La FBM tiene efecto analgésico, antiinflamatorio y de modulación neural.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "Descartar causas tratables específicas. Usar como parte de manejo multimodal del dolor.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Puntos gatillo, trayectos nerviosos, músculos contracturados, articulaciones afectadas, zonas dolorosas específicas",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-10 J",
        numeroPuntos: "8-12 puntos según localización del dolor",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones (reevaluar)",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, extrapolación de analgesia en dolor musculoesquelético",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia convencional. Efecto acumulativo. Combinar con otras modalidades de manejo del dolor crónico.",
        informacion_complementaria: {
          es: "Identificar previamente el sitio anatómico generador del dolor y adecuar la aplicación de fotobiomodulación a dicha localización. Se recomienda aplicar escala EVA antes y durante la sesión, buscando idealmente finalizar la intervención sin dolor o con una disminución clínicamente significativa del mismo. La respuesta analgésica debe guiar la continuidad, ajuste de dosimetría y frecuencia de aplicación.",
          en: "Previously identify the anatomical site generating the pain and adapt the photobiomodulation application to that location. It is recommended to apply the VAS scale before and during the session, ideally aiming to finish the intervention without pain or with a clinically significant reduction. The analgesic response should guide the continuity, dosimetry adjustment and application frequency.",
          pt: "Identificar previamente o local anatômico gerador da dor e adequar a aplicação de fotobiomodulação a essa localização. Recomenda-se aplicar a escala EVA antes e durante a sessão, buscando idealmente finalizar a intervenção sem dor ou com uma diminuição clinicamente significativa da mesma. A resposta analgésica deve guiar a continuidade, ajuste de dosimetria e frequência de aplicação."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en dolor crónico orofacial con componente inflamatorio sistémico. Beneficios esperables: efecto antioxidante sistémico, control sistémico de la inflamación, mejora de parámetros sanguíneos. Uso como coadyuvante complementario. No reemplaza terapia convencional."
      }
    }
  },
  {
    id: "otalgia",
    nombre: "Otalgia",
    icono: "Volume2",
    categoria: "DOLOR",
    descripcionBreve: "Dolor de oído de diversas etiologías (neuropática, miofascial, referida). La FBM puede tener efecto analgésico y antiinflamatorio local.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Descartar causas tratables específicas (otitis, patología ATM, etc.). FBM es coadyuvante sintomático.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Región periauricular, mastoides, ATM si corresponde, puntos gatillo cervicales",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-10 J",
        numeroPuntos: "8-12 puntos",
        frecuenciaTratamiento: "2-3 veces por semana en fase aguda",
        duracionTotal: "8-12 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, extrapolación analgésica",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia convencional. Siempre investigar y tratar causa subyacente. FBM para alivio sintomático.",
        informacion_complementaria: {
          es: "La aplicación puede realizarse de forma extracanal y, en casos seleccionados, intracanal, utilizando luz roja o infrarroja. Dosimetría sugerida: alrededor de 6 J, ajustable según respuesta clínica. Es fundamental aplicar escala EVA antes y al finalizar la sesión, idealmente logrando ausencia de dolor al término de la intervención. Realizar otoscopía previa y contar con indicación médica antes del tratamiento. La frecuencia de aplicación debe ajustarse según la persistencia o recurrencia del dolor.",
          en: "Application can be performed extracanal and, in selected cases, intracanal, using red or infrared light. Suggested dosimetry: around 6 J, adjustable according to clinical response. It is essential to apply VAS scale before and at the end of the session, ideally achieving absence of pain at the end of the intervention. Perform prior otoscopy and have medical indication before treatment. Application frequency should be adjusted according to pain persistence or recurrence.",
          pt: "A aplicação pode ser realizada de forma extracanal e, em casos selecionados, intracanal, utilizando luz vermelha ou infravermelha. Dosimetria sugerida: ao redor de 6 J, ajustável segundo resposta clínica. É fundamental aplicar escala EVA antes e ao finalizar a sessão, idealmente alcançando ausência de dor ao término da intervenção. Realizar otoscopia prévia e contar com indicação médica antes do tratamento. A frequência de aplicação deve ser ajustada segundo a persistência ou recorrência da dor."
        }
      }
    }
  },
  {
    id: "paralisis-facial",
    nombre: "Parálisis Facial",
    icono: "Frown",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Parálisis del nervio facial (Bell o central). La FBM puede acelerar regeneración nerviosa y mejorar función muscular.",
    nivelEvidenciaGlobal: "B",
    advertencias: "Iniciar precozmente. No usar TENS sobre nervio facial en fase de reinervación por riesgo de sincinesias. En parálisis central, considerar tPBM. Derivar a neurología si no hay recuperación.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Ramas del VII en hemicara afectada (frontal, cigomático, bucal, mandibular), puntos motores musculares clave, región mastoidea",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "8-12 J",
        numeroPuntos: "8-10 puntos en hemicara afectada",
        frecuenciaTratamiento: "3 veces por semana",
        duracionTotal: "4-6 semanas (12-18 sesiones)",
        nivelEvidencia: "B",
        tipoEstudio: "Revisiones sistemáticas y ECA pequeños con mejoría en escalas House-Brackmann/Sunnybrook",
        comentarios: "Parámetros adaptados a partir de estudios clínicos y revisiones sistemáticas recientes en fotobiomodulación para parálisis facial. Se recomienda revisar periódicamente la literatura actualizada. Combinar con ejercicios faciales. Mejor pronóstico si se inicia en primeras 2 semanas. No usar electroestimulación en fase de reinervación.",
        informacion_complementaria: {
          es: "Para una dosimetría adecuada, deben considerarse las características musculares tanto de la hemicara afectada como de la no afectada. Es importante trabajar ambos lados con el objetivo de favorecer la estonía y el equilibrio muscular facial. En zonas con aumento de tensión muscular, se sugiere utilizar 9 J por punto para disminuir el tono muscular, con una distancia aproximada de 1 cm entre puntos, utilizando luz roja e infrarroja. En casos de hipotonía, se recomienda bioestimular con aproximadamente 4 J por punto para favorecer el aumento del tono y el desempeño muscular. En presencia de dolor, se deben irradiar las zonas dolorosas y aplicar una escala EVA previa a la intervención. Posterior a la aplicación de láser, o de manera simultánea, se recomienda iniciar ejercicios miofuncionales faciales.",
          en: "For adequate dosimetry, the muscular characteristics of both the affected and unaffected hemiface must be considered. It is important to work both sides with the objective of favoring estony and facial muscle balance. In areas with increased muscle tension, it is suggested to use 9 J per point to decrease muscle tone, with an approximate distance of 1 cm between points, using red and infrared light. In cases of hypotonia, it is recommended to biostimulate with approximately 4 J per point to favor the increase in tone and muscle performance. In the presence of pain, painful areas should be irradiated and a VAS scale applied prior to intervention. After laser application, or simultaneously, it is recommended to initiate facial myofunctional exercises.",
          pt: "Para uma dosimetria adequada, devem ser consideradas as características musculares tanto da hemiface afetada como da não afetada. É importante trabalhar ambos os lados com o objetivo de favorecer a estonia e o equilíbrio muscular facial. Em zonas com aumento de tensão muscular, sugere-se utilizar 9 J por ponto para diminuir o tônus muscular, com uma distância aproximada de 1 cm entre pontos, utilizando luz vermelha e infravermelha. Em casos de hipotonia, recomenda-se bioestimular com aproximadamente 4 J por ponto para favorecer o aumento do tônus e o desempenho muscular. Na presença de dor, devem-se irradiar as zonas dolorosas e aplicar uma escala EVA prévia à intervenção. Posterior à aplicação de laser, ou de maneira simultânea, recomenda-se iniciar exercícios miofuncionais faciais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos neuroprotectores",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario para acelerar regeneración neural. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación. Uso como coadyuvante complementario. No reemplaza rehabilitación fonoaudiológica ni tratamiento médico."
      },
      transcraneal: {
        zonaAnatomica: "Corteza motora facial (representación unilateral según hemisferio afectado)",
        puntos1020: "C3 (lado izquierdo) / C4 (lado derecho) – Cz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "2 puntos (Sistema 10/20): C3 o C4 + Cz",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "C",
        tipoEstudio: "Extrapolación de estudios en ACV",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica y/o médica. Para parálisis facial de origen central. Combinar con FBM periférica.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "tinnitus",
    nombre: "Tinnitus",
    icono: "Ear",
    categoria: "AUDICION",
    descripcionBreve: "Percepción de sonido sin fuente externa. La FBM puede mejorar microcirculación coclear y modular actividad neural auditiva.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Resultados heterogéneos en la literatura. Informar al paciente sobre expectativas realistas. Beneficio potencial a corto plazo, evidencia limitada y controvertida.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Transmeatal: conducto auditivo externo. Retroauricular: región mastoidea",
        longitudOnda: "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular",
        energiaPorPunto: "4-6 J retroauricular por punto",
        numeroPuntos: "1-2 transmeatal + 4-6 retroauricular por oído",
        frecuenciaTratamiento: "Diario o 3-5 veces por semana",
        duracionTotal: "10-20 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Ensayos clínicos con resultados mixtos, evidencia heterogénea",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia convencional. Beneficio potencial a corto plazo, evidencia limitada y controvertida. Mayor respuesta en tinnitus reciente. Combinar con terapia de habituación si corresponde.",
        informacion_complementaria: {
          es: "Puede considerarse la inclusión de un punto intracanal de 9 J como parte del abordaje terapéutico. Es relevante informar al paciente sobre la efectividad variable del tratamiento y la importancia de completar el total de sesiones sugeridas para evaluar resultados. Se recomienda realizar evaluación audiológica completa, incluyendo acufenometría o tinnitometría, para determinar la idoneidad del paciente para la terapia. Esta evaluación debe repetirse posterior al total de sesiones. En este abordaje no se incluye aplicación sistémica, considerando la evidencia disponible y el enfoque terapéutico definido.\n\nEl tinnitus presenta una alta sensibilidad a la frecuencia de las sesiones de fotobiomodulación. Se recomienda no menos de dos sesiones semanales, siendo ideal una frecuencia de tres sesiones por semana, con el objetivo de lograr un efecto terapéutico acumulativo suficiente que permita modular la hiperexcitabilidad neuronal y los mecanismos periféricos y centrales involucrados.",
          en: "The inclusion of a 9 J intracanal point can be considered as part of the therapeutic approach. It is relevant to inform the patient about the variable effectiveness of treatment and the importance of completing the total suggested sessions to evaluate results. It is recommended to perform a complete audiological evaluation, including acuphenometry or tinnitometry, to determine the patient's suitability for therapy. This evaluation should be repeated after the total sessions. In this approach, systemic application is not included, considering the available evidence and the defined therapeutic approach.\n\nTinnitus presents a high sensitivity to the frequency of photobiomodulation sessions. No less than two weekly sessions are recommended, with an ideal frequency of three sessions per week, with the objective of achieving a sufficient cumulative therapeutic effect that allows modulation of neuronal hyperexcitability and the peripheral and central mechanisms involved.",
          pt: "Pode-se considerar a inclusão de um ponto intracanal de 9 J como parte da abordagem terapêutica. É relevante informar ao paciente sobre a efetividade variável do tratamento e a importância de completar o total de sessões sugeridas para avaliar resultados. Recomenda-se realizar avaliação audiológica completa, incluindo acufenometria ou zumbidometria, para determinar a idoneidade do paciente para a terapia. Esta avaliação deve ser repetida posterior ao total de sessões. Nesta abordagem não se inclui aplicação sistêmica, considerando a evidência disponível e o enfoque terapêutico definido.\n\nO zumbido apresenta uma alta sensibilidade à frequência das sessões de fotobiomodulação. Recomenda-se não menos de duas sessões semanais, sendo ideal uma frequência de três sessões por semana, com o objetivo de alcançar um efeito terapêutico cumulativo suficiente que permita modular a hiperexcitabilidade neuronal e os mecanismos periféricos e centrais envolvidos."
        }
      },
      transcraneal: {
        zonaAnatomica: "Corteza auditiva temporal bilateral",
        puntos1020: "T3 – T4 – Cz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-10 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Estudios piloto experimentales",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia convencional. Para tinnitus con componente central.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "hipoacusia",
    nombre: "Hipoacusia",
    icono: "EarOff",
    categoria: "AUDICION",
    descripcionBreve: "Pérdida auditiva sensorioneural. La FBM transmeatal puede mejorar microcirculación coclear, especialmente en hipoacusia súbita.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Resultados variables. Mayor potencial en hipoacusia súbita tratada precozmente. Evidencia limitada y controvertida.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Transmeatal: conducto auditivo externo. Retroauricular: región mastoidea bilateral",
        longitudOnda: "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular",
        energiaPorPunto: "4-6 J retroauricular por punto",
        numeroPuntos: "1-2 transmeatal + 4-6 retroauricular bilateral",
        frecuenciaTratamiento: "Diario en fase aguda de hipoacusia súbita, luego 3 veces/semana",
        duracionTotal: "15-25 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Ensayos clínicos con resultados mixtos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando tratamiento médico convencional. Mejor pronóstico en hipoacusia súbita reciente. En crónica, resultados limitados.",
        informacion_complementaria: {
          es: "Se recomienda realizar exámenes auditivos previos al tratamiento para objetivar la línea base terapéutica y repetir la evaluación posterior a la intervención con fotobiomodulación.\n\nActualmente se encuentra en evaluación la aplicación de fotobiomodulación transcraneal como complemento terapéutico en hipoacusia, particularmente dirigida a regiones corticales asociadas al procesamiento auditivo central.\n\nEn la medida que se disponga de resultados clínicos consistentes y evidencia suficiente, se considerará la incorporación de un protocolo transcraneal orientado al lóbulo temporal, dada su participación en la percepción y procesamiento auditivo.",
          en: "It is recommended to perform hearing tests prior to treatment to objectify the therapeutic baseline and repeat the evaluation after the photobiomodulation intervention.\n\nTranscranial photobiomodulation application is currently being evaluated as a therapeutic complement in hearing loss, particularly directed to cortical regions associated with central auditory processing.\n\nAs consistent clinical results and sufficient evidence become available, the incorporation of a transcranial protocol oriented to the temporal lobe will be considered, given its participation in auditory perception and processing.",
          pt: "Recomenda-se realizar exames auditivos prévios ao tratamento para objetivar a linha de base terapêutica e repetir a avaliação posterior à intervenção com fotobiomodulação.\n\nAtualmente encontra-se em avaliação a aplicação de fotobiomodulação transcraniana como complemento terapêutico na hipoacusia, particularmente dirigida a regiões corticais associadas ao processamento auditivo central.\n\nNa medida em que se disponha de resultados clínicos consistentes e evidência suficiente, será considerada a incorporação de um protocolo transcraniano orientado ao lobo temporal, dada sua participação na percepção e processamento auditivo."
        }
      }
    }
  },
  {
    id: "trastornos-vestibulares",
    nombre: "Trastornos Vestibulares",
    icono: "Navigation",
    categoria: "AUDICION",
    descripcionBreve: "Alteraciones del equilibrio. La FBM transmeatal y transcraneal podría modular función vestibular.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Evidencia limitada. La rehabilitación vestibular convencional es el tratamiento principal.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Región mastoidea, trayecto del nervio vestibular, músculos cervicales posteriores",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J mastoidea, 6-8 J cervical",
        numeroPuntos: "8-10 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-10 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos y extrapolación de tinnitus/cervicogénico",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando rehabilitación vestibular convencional. Ajustar siempre a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "Se recomienda realizar la aplicación de fotobiomodulación posterior a una evaluación vestibular completa, que permita establecer un diagnóstico preciso.\n\nUna vez definido el cuadro clínico y en el contexto de terapia vestibular, la fotobiomodulación puede utilizarse como apoyo para mejorar el estado funcional del oído interno.\n\nResultados preliminares sugieren que la enfermedad de Ménière presenta una buena respuesta a la fotobiomodulación, posiblemente asociada a la modulación de procesos inflamatorios y a la disminución de la presión endolinfática.",
          en: "It is recommended to perform photobiomodulation application after a complete vestibular evaluation, which allows establishing an accurate diagnosis.\n\nOnce the clinical condition is defined and in the context of vestibular therapy, photobiomodulation can be used as support to improve the functional state of the inner ear.\n\nPreliminary results suggest that Ménière's disease presents a good response to photobiomodulation, possibly associated with the modulation of inflammatory processes and the decrease in endolymphatic pressure.",
          pt: "Recomenda-se realizar a aplicação de fotobiomodulação posterior a uma avaliação vestibular completa, que permita estabelecer um diagnóstico preciso.\n\nUma vez definido o quadro clínico e no contexto de terapia vestibular, a fotobiomodulação pode ser utilizada como apoio para melhorar o estado funcional do ouvido interno.\n\nResultados preliminares sugerem que a doença de Ménière apresenta uma boa resposta à fotobiomodulação, possivelmente associada à modulação de processos inflamatórios e à diminuição da pressão endolinfática."
        }
      },
      transcraneal: {
        zonaAnatomica: "Corteza vestibular (temporal-parietal bilateral)",
        puntos1020: "T3 – T4 – P3 – P4",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "4 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica de neuromodulación",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando rehabilitación vestibular. Sin estudios específicos. Basado en principios de neuromodulación general.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "frenectomia",
    nombre: "Pre y Post Frenectomía Sublingual",
    icono: "Scissors",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "FBM como coadyuvante en cirugía de frenillo. Puede reducir dolor, inflamación y acelerar cicatrización.",
    nivelEvidenciaGlobal: "C",
    advertencias: "Coordinar con cirujano. No reemplaza controles post-quirúrgicos.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Mucosa sublingual y borde ventral de lengua (pre). Bordes de incisión + piso de boca/suprahioideos (post)",
        longitudOnda: "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos",
        energiaPorPunto: "2-4 J (660 nm), 4-6 J (808 nm)",
        numeroPuntos: "4-6 puntos pre-procedimiento, 6-10 puntos post-procedimiento",
        frecuenciaTratamiento: "1 sesión pre-procedimiento. Post: 1 sesión inmediata + 2-3/semana durante 1-2 semanas",
        duracionTotal: "1 sesión pre + 5-8 sesiones post",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, extrapolación de PBM en cirugía oral y mucositis",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando controles post-quirúrgicos. Pre-quirúrgico: bioestimulación. Post-quirúrgico: analgesia, antiinflamatorio, cicatrización.",
        informacion_complementaria: {
          es: "La dosimetría debe ajustarse considerando las características del tejido y la edad del paciente, diferenciando entre recién nacidos, lactantes y niños.\n\nLa fotobiomodulación puede utilizarse como apoyo para manejo del dolor y optimización de la cicatrización.\n\nSe recomienda aplicar una escala EVA para valoración del dolor antes y durante la sesión, adaptando la intervención según la respuesta del paciente.",
          en: "Dosimetry should be adjusted considering tissue characteristics and patient age, differentiating between newborns, infants, and children.\n\nPhotobiomodulation can be used as support for pain management and healing optimization.\n\nIt is recommended to apply a VAS scale for pain assessment before and during the session, adapting the intervention according to the patient's response.",
          pt: "A dosimetria deve ser ajustada considerando as características do tecido e a idade do paciente, diferenciando entre recém-nascidos, lactentes e crianças.\n\nA fotobiomodulação pode ser utilizada como apoio para manejo da dor e otimização da cicatrização.\n\nRecomenda-se aplicar uma escala EVA para valoração da dor antes e durante a sessão, adaptando a intervenção segundo a resposta do paciente."
        }
      }
    }
  },
  {
    id: "trastornos-miofuncionales",
    nombre: "Trastornos Miofuncionales Orofaciales",
    icono: "Smile",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Alteraciones del equilibrio muscular orofacial. La FBM puede optimizar función muscular y acelerar resultados de terapia miofuncional.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "La terapia miofuncional sigue siendo el tratamiento principal.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Músculos periorales, orbicular de labios, maseteros, suprahioideos, según diagnóstico específico",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "10-15 puntos según músculos implicados",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA en dolor miofascial y DTM, extrapolación a función miofuncional",
        comentarios: "Parámetros adaptados de estudios en miositis/dolor miofascial orofacial. Para uso específico en 'performance muscular' fonoaudiológica, la evidencia es limitada (extrapolación). Se recomienda como adyuvante a la terapia miofuncional. Puede acelerar ganancia de tono y coordinación. Útil en respiradores orales, deglución atípica.",
        informacion_complementaria: {
          es: "Considerar el perfil de tono muscular del paciente previo a la aplicación de fotobiomodulación.\n\nLa selección de dosimetría debe ajustarse según presencia de hipotonía o hipertonía, definiendo si el objetivo terapéutico es bioestimular o bioinhibir el tejido.\n\nLa fotobiomodulación debe integrarse siempre como complemento a la terapia miofuncional activa.",
          en: "Consider the patient's muscle tone profile prior to photobiomodulation application.\n\nDosimetry selection should be adjusted according to the presence of hypotonia or hypertonia, defining whether the therapeutic objective is to biostimulate or bioinhibit the tissue.\n\nPhotobiomodulation should always be integrated as a complement to active myofunctional therapy.",
          pt: "Considerar o perfil de tônus muscular do paciente prévio à aplicação de fotobiomodulação.\n\nA seleção de dosimetria deve ser ajustada segundo presença de hipotonia ou hipertonia, definindo se o objetivo terapêutico é bioestimular ou bioinibir o tecido.\n\nA fotobiomodulação deve ser integrada sempre como complemento à terapia miofuncional ativa."
        }
      }
    }
  },
  {
    id: "performance-muscular",
    nombre: "Performance Muscular Orofacial",
    icono: "Dumbbell",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Optimización de rendimiento muscular orofacial y cervical. La FBM puede mejorar función mitocondrial y reducir fatiga.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Usar como complemento a ejercicios específicos. Evidencia por extrapolación.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Grupos musculares objetivo según función a optimizar (masticación, deglución, habla)",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "10-15 puntos según músculos target",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de estudios de rendimiento deportivo",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Ajustar siempre a la realidad clínica del paciente. Aplicar antes de ejercicios para potenciar respuesta. Útil en rehabilitación post-quirúrgica."
      },
      transcraneal: {
        zonaAnatomica: "Corteza motora primaria (representación orofacial bilateral)",
        puntos1020: "Cz – C3 – C4",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "4-8 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica de entrenamiento atlético",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. Para potenciar rendimiento muscular orofacial. Sin estudios específicos en motricidad orofacial. Basado en extrapolación de neuroplasticidad."
      }
    }
  },
  {
    id: "trismo",
    nombre: "Trismo",
    icono: "Lock",
    categoria: "DOLOR",
    descripcionBreve: "Limitación de apertura oral. La FBM puede reducir fibrosis y contractura muscular, especialmente post-RT.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "Combinar con ejercicios de estiramiento. En trismo post-RT, manejo prolongado.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Músculos masticatorios: maseteros, temporal, pterigoideos (intraoral), ATM",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "6-8 J",
        numeroPuntos: "10-15 puntos bilateral",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones (puede requerir mantenimiento)",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA en dolor miofascial y DTM, ensayos clínicos en trismo post-RT con tamaños muestrales modestos",
        comentarios: "Parámetros adaptados a partir de estudios clínicos recientes en DTM y trismo post-radioterapia. Se recomienda revisar periódicamente la literatura actualizada. Combinar con dispositivos de estiramiento (TheraBite). Medir apertura oral pre/post.",
        informacion_complementaria: {
          es: "Se priorizan los puntos extraorales para favorecer la comodidad del paciente. Se sugiere medir la apertura oral antes de la aplicación del láser y repetir la medición posterior a la intervención, idealmente combinando la fotobiomodulación con ejercicios de apertura mandibular. Es importante corroborar las zonas de dolor para considerarlas dentro de los puntos de irradiación y aplicar escalas de dolor, como la EVA, para seguimiento objetivo.",
          en: "Extraoral points are prioritized to favor patient comfort. It is suggested to measure oral opening before laser application and repeat the measurement after the intervention, ideally combining photobiomodulation with mandibular opening exercises. It is important to corroborate pain zones to consider them within the irradiation points and apply pain scales, such as VAS, for objective follow-up.",
          pt: "Priorizam-se os pontos extraorais para favorecer o conforto do paciente. Sugere-se medir a abertura oral antes da aplicação do laser e repetir a medição posterior à intervenção, idealmente combinando a fotobiomodulação com exercícios de abertura mandibular. É importante corroborar as zonas de dor para considerá-las dentro dos pontos de irradiação e aplicar escalas de dor, como a EVA, para seguimento objetivo."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en trismo post-RT con fibrosis. Beneficios esperables: efecto antioxidante sistémico, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza terapia fonoaudiológica ni tratamiento médico."
      }
    }
  },
  {
    id: "disfonias",
    nombre: "Disfonías",
    icono: "Mic",
    categoria: "VOZ",
    descripcionBreve: "Alteraciones de la voz por disfunción laríngea. La FBM puede reducir inflamación, edema de cuerdas vocales y promover regeneración tisular en lesiones benignas.",
    nivelEvidenciaGlobal: "C-D",
    advertencias: "Descartar patología maligna antes de aplicar. No usar en lesiones sospechosas sin diagnóstico ORL.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Músculos extrínsecos laríngeos (suprahioideos, infrahioideos), región cricotiroidea, maseteros si hay tensión asociada",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "10-12 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "C-D",
        tipoEstudio: "Series de casos, extrapolado de PBM en laringe y DTM; no hay guías fuertes",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Útil en nódulos, edema de Reinke, laringitis crónica. Combinar con terapia vocal.",
        informacion_complementaria: {
          es: "Ajustar la dosimetría según el objetivo terapéutico: reducción de edema, mejora del desempeño muscular o regulación del tono. Considerar las características de los pliegues vocales y, en adultos mayores, la condición vascular asociada. Diferenciar si se trata de una hiperfunción o hipofunción vocal para definir el enfoque terapéutico. Evitar irradiar directamente sobre la glándula tiroides, dado que la fotobiomodulación puede influir en la producción hormonal tiroidea. Zona anatómica sugerida: ángulo tiroideo, considerada área anatómica segura. La aplicación puede realizarse antes de los ejercicios de fonación o durante vocalizaciones específicas, según tolerancia del paciente.\n\nDe manera experimental, se ha explorado la aplicación de fotobiomodulación en la región de la escotadura laríngea, con el objetivo de aproximar la irradiación a los pliegues vocales y al borde libre de las cuerdas vocales.\n\nEsta aplicación debe considerarse experimental y utilizarse exclusivamente bajo criterio clínico informado, como complemento a la terapia fonoaudiológica convencional.",
          en: "Adjust dosimetry according to the therapeutic objective: edema reduction, muscle performance improvement, or tone regulation. Consider vocal fold characteristics and, in older adults, associated vascular condition. Differentiate whether it is vocal hyperfunction or hypofunction to define the therapeutic approach. Avoid irradiating directly on the thyroid gland, since photobiomodulation can influence thyroid hormone production. Suggested anatomical zone: thyroid angle, considered a safe anatomical area. Application can be performed before phonation exercises or during specific vocalizations, according to patient tolerance.\n\nExperimentally, the application of photobiomodulation in the region of the thyroid notch has been explored, with the objective of bringing the irradiation closer to the vocal folds and the free edge of the vocal cords.\n\nThis application should be considered experimental and used exclusively under informed clinical criteria, as a complement to conventional speech therapy.",
          pt: "Ajustar a dosimetria segundo o objetivo terapêutico: redução de edema, melhora do desempenho muscular ou regulação do tônus. Considerar as características das pregas vocais e, em idosos, a condição vascular associada. Diferenciar se se trata de uma hiperfunção ou hipofunção vocal para definir o enfoque terapêutico. Evitar irradiar diretamente sobre a glândula tireoide, dado que a fotobiomodulação pode influenciar na produção hormonal tireoidiana. Zona anatômica sugerida: ângulo tireóideo, considerada área anatômica segura. A aplicação pode ser realizada antes dos exercícios de fonação ou durante vocalizações específicas, segundo tolerância do paciente.\n\nDe maneira experimental, tem-se explorado a aplicação de fotobiomodulação na região da incisura laríngea, com o objetivo de aproximar a irradiação às pregas vocais e à borda livre das cordas vocais.\n\nEsta aplicação deve ser considerada experimental e utilizada exclusivamente sob critério clínico informado, como complemento à terapia fonoaudiológica convencional."
        }
      }
    }
  },
  {
    id: "disartria",
    nombre: "Disartria",
    icono: "MessageCircle",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Trastorno motor del habla caracterizado por debilidad, lentitud o incoordinación de la musculatura del habla. La FBM puede mejorar la función neuromuscular y reducir fatiga en músculos orofaciales.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Los protocolos varían según etiología (ACV, Parkinson, ELA, etc.). Individualizar según evaluación.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Músculos faciales, labios, lengua, velo del paladar, musculatura cervical anterior según evaluación",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "10-15 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de estudios en función muscular orofacial",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Combinar siempre con terapia fonoaudiológica convencional. En etiología neurodegenerativa, considerar tPBM complementario.",
        informacion_complementaria: {
          es: "La estimulación transcraneana puede realizarse de manera simultánea a la ejecución de acciones motoras funcionales. La aplicación puntual de láser puede realizarse antes de la terapia funcional orofacial y de la estimulación del habla, con el objetivo de optimizar la respuesta neuromuscular. Se recomienda realizar una evaluación previa para determinar las zonas a irradiar, considerando que no se irradian zonas sin un objetivo terapéutico claro. La dosimetría dependerá de las características neurológicas del paciente, particularmente si el compromiso neuromuscular se manifiesta como hipertonía o hipotonía.",
          en: "Transcranial stimulation can be performed simultaneously with the execution of functional motor actions. Focal laser application can be performed before orofacial functional therapy and speech stimulation, with the objective of optimizing neuromuscular response. It is recommended to perform a prior evaluation to determine the areas to be irradiated, considering that areas without a clear therapeutic objective are not irradiated. Dosimetry will depend on the patient's neurological characteristics, particularly whether neuromuscular involvement manifests as hypertonia or hypotonia.",
          pt: "A estimulação transcraniana pode ser realizada de maneira simultânea à execução de ações motoras funcionais. A aplicação pontual de laser pode ser realizada antes da terapia funcional orofacial e da estimulação da fala, com o objetivo de otimizar a resposta neuromuscular. Recomenda-se realizar uma avaliação prévia para determinar as zonas a irradiar, considerando que não se irradiam zonas sem um objetivo terapêutico claro. A dosimetria dependerá das características neurológicas do paciente, particularmente se o comprometimento neuromuscular se manifesta como hipertonia ou hipotonia."
        }
      },
      transcraneal: {
        zonaAnatomica: "Corteza motora primaria (área representación orofacial)",
        puntos1020: "Cz – C3 – C4",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de estudios en neurorehabilitación motora",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Para disartrias de origen neurológico central. Combinar con terapia fonoaudiológica convencional.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "tsh",
    nombre: "Trastornos del Habla",
    icono: "AudioWaveform",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Trastornos de fluidez y sincronía del habla, incluyendo tartamudez. La FBM transcraneal puede modular circuitos neurales involucrados en el control temporal del habla.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evidencia muy limitada. Usar como coadyuvante experimental con consentimiento informado.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza prefrontal bilateral y área motora suplementaria",
        puntos1020: "F3 – F4 – Fz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica, reportes anecdóticos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Para trastornos del habla relacionados con sincronía y fluidez. Integrar siempre con terapia de fluidez convencional.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "apraxia-habla",
    nombre: "Apraxia del Habla",
    icono: "Brain",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Trastorno de la programación motora del habla. La FBM puede favorecer neuroplasticidad en áreas de planificación motora.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Diferenciar de disartria. La terapia fonoaudiológica intensiva es el tratamiento principal.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza frontal izquierda y área motora",
        puntos1020: "F3 – C3 – Fz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de neurorehabilitación del habla",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Para apraxia del habla. Combinar siempre con terapia de apraxia intensiva (PROMPT, ReST, etc.).",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "retraso-lenguaje",
    nombre: "Retraso del Lenguaje",
    icono: "Baby",
    categoria: "LENGUAJE",
    descripcionBreve: "Desarrollo del lenguaje por debajo de lo esperado para la edad. La tPBM podría favorecer neuroplasticidad en áreas del lenguaje.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Protocolo experimental. Priorizar intervención fonoaudiológica basada en evidencia. Uso con consentimiento informado parental.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza del lenguaje hemisferio dominante",
        puntos1020: "F3 – T3 – Fz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto (ajustar a edad)",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica de neuroplasticidad",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Para dislexia infantil. Sin evidencia directa. Siempre como complemento a terapia convencional del lenguaje.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "afasia",
    nombre: "Afasia",
    icono: "MessageSquareOff",
    categoria: "LENGUAJE",
    descripcionBreve: "Trastorno del lenguaje adquirido, típicamente post-ACV. La tPBM puede potenciar neuroplasticidad y recuperación lingüística.",
    nivelEvidenciaGlobal: "C",
    advertencias: "La FBM es coadyuvante. La terapia del lenguaje intensiva sigue siendo el tratamiento principal.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza del lenguaje hemisferio dominante (frontal-temporal izquierda)",
        puntos1020: "F3 – C3 – T3",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "3-6 J por punto",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "C",
        tipoEstudio: "Pilotos y estudios en ACV/tPBM",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia del lenguaje intensiva. Para afasia post-ACV. Mejores resultados cuando se combina con terapia del lenguaje intensiva. Iniciar lo antes posible post-ACV.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos neuroprotectores",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario post-ACV con afasia. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación. Uso como coadyuvante complementario. No reemplaza terapia del lenguaje ni tratamiento médico."
      }
    }
  },
  {
    id: "cea",
    nombre: "Condición del Espectro Autista (CEA)",
    icono: "Puzzle",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Condición del neurodesarrollo. La tPBM se investiga como potencial modulador de conectividad cerebral y función mitocondrial.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Protocolo experimental. No es tratamiento curativo. Usar como potencial coadyuvante con consentimiento informado. Respetar neurodiversidad. Uso experimental, no estándar.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza prefrontal y motora central bilateral",
        puntos1020: "F3 – F4 – Fz – Cz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "4 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Ensayos piloto y en curso, muestras pequeñas",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando intervención conductual y fonoaudiológica. Para trastornos del espectro autista. Algunos estudios reportan mejoras en comunicación y conducta. Resultados variables. Siempre complementario a intervención conductual y fonoaudiológica.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "tdah",
    nombre: "TDAH",
    icono: "Zap",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Trastorno por Déficit de Atención e Hiperactividad. La tPBM se investiga como potencial modulador de función prefrontal.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Protocolo experimental. No reemplaza tratamiento establecido (conductual, farmacológico). Consentimiento informado. Uso experimental, no estándar.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza prefrontal bilateral",
        puntos1020: "Fz – F3 – F4",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Ensayos piloto y en curso, muestras pequeñas",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento establecido. Para TDAH. Algunos estudios muestran mejoras en atención sostenida. Resultados preliminares. Siempre como complemento al tratamiento establecido.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "dislexia",
    nombre: "Dislexia Infantil",
    icono: "BookOpen",
    categoria: "LENGUAJE",
    descripcionBreve: "Trastorno específico del aprendizaje de la lectura. La tPBM podría modular áreas de procesamiento del lenguaje.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evidencia muy limitada. La intervención fonoaudiológica/psicopedagógica es el tratamiento principal. Uso experimental, no estándar.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza temporal-parietal izquierda (hemisferio dominante)",
        puntos1020: "T3 – T5 – P3",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica, ensayos piloto en curso",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando intervención específica de lectura. Para dislexia infantil. Sin evidencia directa. Basado en principios de neuroplasticidad. Siempre complementario a intervención específica de lectura.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      }
    }
  },
  {
    id: "estimulacion-cognitiva",
    nombre: "Estimulación Cognitiva",
    icono: "Lightbulb",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Potenciación de funciones cognitivas. La tPBM puede mejorar metabolismo cerebral y rendimiento cognitivo.",
    nivelEvidenciaGlobal: "D",
    advertencias: "No es 'potenciador cognitivo' mágico. Efectos modestos y variables. Usar con expectativas realistas. Uso experimental, no estándar.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza prefrontal y motora central bilateral",
        puntos1020: "F3 – F4 – Fz – Cz",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "4 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas",
        nivelEvidencia: "D",
        tipoEstudio: "Ensayos piloto en sujetos sanos, muestras pequeñas",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. Para estimulación cognitiva. Puede mejorar atención, memoria de trabajo y velocidad de procesamiento. Efectos transitorios, mantenimiento puede ser necesario.",
        informacion_complementaria: {
          es: "Estudios recientes han observado un aumento significativo de factores neuroprotectores asociados a la fotobiomodulación transcraneal, incluyendo efectos sobre la función mitocondrial y la reducción de procesos neurodegenerativos.\n\nEstos efectos se potencian cuando la irradiación se acompaña de ejercicios de estimulación cognitiva, realizados durante o inmediatamente después de la sesión, favoreciendo mecanismos de plasticidad cerebral y optimización del rendimiento cognitivo.",
          en: "Recent studies have observed a significant increase in neuroprotective factors associated with transcranial photobiomodulation, including effects on mitochondrial function and reduction of neurodegenerative processes.\n\nThese effects are enhanced when irradiation is accompanied by cognitive stimulation exercises, performed during or immediately after the session, favoring mechanisms of brain plasticity and optimization of cognitive performance.",
          pt: "Estudos recentes observaram um aumento significativo de fatores neuroprotetores associados à fotobiomodulação transcraniana, incluindo efeitos sobre a função mitocondrial e a redução de processos neurodegenerativos.\n\nEstes efeitos são potencializados quando a irradiação é acompanhada de exercícios de estimulação cognitiva, realizados durante ou imediatamente após a sessão, favorecendo mecanismos de plasticidade cerebral e otimização do desempenho cognitivo."
        }
      }
    }
  },
  {
    id: "demencias",
    nombre: "Demencias",
    icono: "BrainCircuit",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Deterioro cognitivo progresivo (MCI, Alzheimer). La tPBM puede mejorar función mitocondrial cerebral y potencialmente enlentecer deterioro.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "No es tratamiento curativo. Puede ser coadyuvante para calidad de vida. Mejores resultados en etapas iniciales (MCI, demencia leve).",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza prefrontal, temporal, parietal (aplicación multifocal con dispositivo tipo casco)",
        puntos1020: "F3 – F4 – Fz – Cz",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "4-8 puntos (dispositivo casco/banda)",
        frecuenciaTratamiento: "3-5 veces por semana (algunos protocolos diarios)",
        duracionTotal: "8-12 semanas inicial, luego mantenimiento",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA y pilotos en MCI y Alzheimer leve con mejora en cognición y funcionalidad, aún con tamaños muestrales limitados",
        comentarios: "Parámetros adaptados a partir de estudios clínicos recientes. Aun así, se recomienda revisar periódicamente la literatura. Para demencias tipo Alzheimer y deterioro cognitivo leve. Estudios muestran mejoras en cognición y funcionalidad. Mejores resultados en etapas tempranas. No reemplaza tratamiento farmacológico ni medidas no farmacológicas. Dispositivos de uso domiciliario disponibles.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en demencias con estrés oxidativo sistémico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza tratamiento farmacológico ni rehabilitación cognitiva."
      }
    }
  },
  {
    id: "parkinson",
    nombre: "Enfermedad de Parkinson",
    icono: "Hand",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Enfermedad neurodegenerativa con síntomas motores y no motores. La tPBM puede proteger neuronas dopaminérgicas y mejorar síntomas.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "No reemplaza medicación. Es coadyuvante. Puede mejorar síntomas motores y no motores.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza motora y prefrontal bilateral (aplicación multifocal con dispositivo tipo casco)",
        puntos1020: "Cz – Fz – F3 – F4",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "4-8 puntos (dispositivo casco/banda)",
        frecuenciaTratamiento: "3-5 veces por semana (algunos protocolos diarios)",
        duracionTotal: "8-12 semanas, luego mantenimiento",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA y pilotos positivos con mejora en síntomas motores, cognición, ánimo y fatiga, aún con limitaciones en tamaños muestrales",
        comentarios: "Parámetros adaptados a partir de estudios clínicos recientes. Aun así, se recomienda revisar periódicamente la literatura. Para enfermedad de Parkinson. Estudios muestran mejoras en marcha, equilibrio, habla y cognición. No reemplaza fármacos antiparkinsonianos ni rehabilitación convencional. Tratamiento de mantenimiento recomendado.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos neuroprotectores",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en Parkinson con estrés oxidativo sistémico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza fármacos antiparkinsonianos ni rehabilitación."
      },
      puntual: {
        zonaAnatomica: "Región cervical posterior, músculos faciales y cervicales afectados por rigidez",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-8 J",
        numeroPuntos: "10-12 puntos",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos, extrapolación",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico y siempre complementando terapia fonoaudiológica. Complemento a tPBM para rigidez y disartria. Combinar con terapia fonoaudiológica. Ajustar a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "Luego de la aplicación de láser, el tejido muscular suele presentar relajación y disminución del tono muscular. Posteriormente, se recomienda realizar ejercicios terapéuticos orientados a estiramiento, exactitud articulatoria, fortalecimiento lingual y apertura oral, entre otros. La sesión puede finalizar nuevamente con láser si el terapeuta lo considera pertinente o si persiste rigidez muscular significativa. En estos pacientes también es posible aplicar fotobiomodulación a nivel de glándulas salivales con el objetivo de disminuir la sialorrea y mejorar la calidad de vida. En caso de dolor neuropático asociado, puede utilizarse aplicación puntual y sistémica según criterio clínico.",
          en: "After laser application, muscle tissue usually presents relaxation and decreased muscle tone. Subsequently, it is recommended to perform therapeutic exercises oriented to stretching, articulatory accuracy, lingual strengthening and oral opening, among others. The session can end again with laser if the therapist considers it pertinent or if significant muscle rigidity persists. In these patients it is also possible to apply photobiomodulation at the level of salivary glands with the objective of decreasing sialorrhea and improving quality of life. In case of associated neuropathic pain, focal and systemic application can be used according to clinical criteria.",
          pt: "Após a aplicação de laser, o tecido muscular costuma apresentar relaxamento e diminuição do tônus muscular. Posteriormente, recomenda-se realizar exercícios terapêuticos orientados ao alongamento, exatidão articulatória, fortalecimento lingual e abertura oral, entre outros. A sessão pode finalizar novamente com laser se o terapeuta considera pertinente ou se persiste rigidez muscular significativa. Nestes pacientes também é possível aplicar fotobiomodulação ao nível das glândulas salivares com o objetivo de diminuir a sialorréia e melhorar a qualidade de vida. Em caso de dor neuropática associada, pode-se utilizar aplicação pontual e sistêmica segundo critério clínico."
        }
      }
    }
  },
  {
    id: "esclerosis-multiple",
    nombre: "Esclerosis Múltiple",
    icono: "Activity",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Enfermedad desmielinizante. La tPBM puede tener efecto neuroprotector y antiinflamatorio.",
    nivelEvidenciaGlobal: "C-D",
    advertencias: "Evidencia preliminar. No reemplaza tratamiento modificador de enfermedad. Coordinar con neurología.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza motora, prefrontal y parietal",
        puntos1020: "Cz – Fz – Pz",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "3 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas, evaluar mantenimiento",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto muy preliminares",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento médico y rehabilitación. Para esclerosis múltiple. Puede mejorar fatiga y algunos síntomas cognitivos, ánimo. No reemplaza fármacos ni rehabilitación. Personalizar según fase de enfermedad.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos antiinflamatorios",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en EM con procesos inflamatorios sistémicos y condiciones autoinmunes. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación. Uso como coadyuvante complementario. No reemplaza tratamiento modificador de enfermedad ni rehabilitación."
      },
      puntual: {
        zonaAnatomica: "Músculos espásticos o fatigados, región periférica según síntomas",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-8 J",
        numeroPuntos: "Variable según zona afectada",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico. Para fatiga muscular y espasticidad leve. Complemento a rehabilitación. Ajustar a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "Se recomienda complementar las terapias convencionales con fotobiomodulación.\n\nEn el caso de estimulación transcraneana, es fundamental aplicar en zonas cerebrales asociadas a procesos de desmielinización, donde exista inflamación y daño de la mielina.\n\nLa aplicación puntual y sistémica puede considerarse en presencia de dolor neuropático.\n\nEn aplicaciones focales musculares, cuando el objetivo sea disminuir el tono muscular, la dosimetría debe orientarse a un efecto bioinhibitorio.",
          en: "It is recommended to complement conventional therapies with photobiomodulation.\n\nIn the case of transcranial stimulation, it is essential to apply in brain areas associated with demyelination processes, where there is inflammation and myelin damage.\n\nFocal and systemic application can be considered in the presence of neuropathic pain.\n\nIn focal muscle applications, when the objective is to decrease muscle tone, dosimetry should be oriented towards a bioinhibitory effect.",
          pt: "Recomenda-se complementar as terapias convencionais com fotobiomodulação.\n\nNo caso de estimulação transcraniana, é fundamental aplicar em zonas cerebrais associadas a processos de desmielinização, onde exista inflamação e dano da mielina.\n\nA aplicação pontual e sistêmica pode ser considerada na presença de dor neuropática.\n\nEm aplicações focais musculares, quando o objetivo seja diminuir o tônus muscular, a dosimetria deve ser orientada a um efeito bioinibidor."
        }
      }
    }
  },
  {
    id: "ela",
    nombre: "Esclerosis Lateral Amiotrófica (ELA)",
    icono: "HeartPulse",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Enfermedad de motoneurona. La FBM puede potencialmente enlentecer progresión y mejorar calidad de vida.",
    nivelEvidenciaGlobal: "C-D",
    advertencias: "Enfermedad terminal. FBM es paliativa/coadyuvante. No hay evidencia de curación. Manejo multidisciplinario esencial.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza motora primaria y prefrontal bilateral",
        puntos1020: "Cz – C3 – C4 – Fz",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "4 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas, continuo según tolerancia y respuesta",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto muy preliminares",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando cuidados paliativos. Para esclerosis lateral amiotrófica (ELA). Algunos reportes de enlentecimiento de progresión. No reemplaza cuidados paliativos ni medidas de soporte. Siempre como parte de manejo integral multidisciplinario.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones, continuo según tolerancia",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en ELA con estrés oxidativo sistémico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación. Uso como coadyuvante complementario. No reemplaza cuidados paliativos ni medidas de soporte."
      },
      puntual: {
        zonaAnatomica: "Músculos bulbares (para habla/deglución), músculos cervicales y faciales",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "10-15 puntos",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "Continuo según tolerancia",
        nivelEvidencia: "D",
        tipoEstudio: "Series de casos, extrapolación",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando cuidados paliativos. Para mantener función bulbar el mayor tiempo posible. Combinar con tPBM y terapia fonoaudiológica paliativa.",
        informacion_complementaria: {
          es: "La dosimetría variará según el objetivo terapéutico planteado. Para analgesia en casos de dolor muscular, pueden utilizarse entre 4 y 6 J por punto, evaluando antes, durante y después mediante escala EVA. Este abordaje puede ser útil, por ejemplo, en mordeduras de labios y lengua. Cuando el objetivo es disminuir el tono muscular en zonas de compensación, se sugiere utilizar entre 6 y 9 J. En zonas de hipotonía, se recomienda bioestimular con múltiples puntos de aproximadamente 4 J. Posteriormente, es fundamental realizar terapia miofuncional orofacial, deglutoria y del habla para potenciar el efecto del láser y favorecer el logro de los objetivos terapéuticos. En estos pacientes, la fotobiomodulación también puede ser útil para la reparación tisular, por ejemplo en lesiones por presión asociadas al uso de VMNI, y para disminuir la producción de saliva, contribuyendo a mejorar la calidad de vida.",
          en: "Dosimetry will vary according to the therapeutic objective set. For analgesia in cases of muscle pain, between 4 and 6 J per point can be used, evaluating before, during and after using VAS scale. This approach can be useful, for example, in lip and tongue bites. When the objective is to decrease muscle tone in compensation zones, it is suggested to use between 6 and 9 J. In hypotonia zones, it is recommended to biostimulate with multiple points of approximately 4 J. Subsequently, it is essential to perform orofacial myofunctional, swallowing and speech therapy to enhance the effect of the laser and favor the achievement of therapeutic objectives. In these patients, photobiomodulation can also be useful for tissue repair, for example in pressure injuries associated with NPPV use, and to decrease saliva production, contributing to improving quality of life.",
          pt: "A dosimetria variará segundo o objetivo terapêutico estabelecido. Para analgesia em casos de dor muscular, podem ser utilizados entre 4 e 6 J por ponto, avaliando antes, durante e depois mediante escala EVA. Esta abordagem pode ser útil, por exemplo, em mordidas de lábios e língua. Quando o objetivo é diminuir o tônus muscular em zonas de compensação, sugere-se utilizar entre 6 e 9 J. Em zonas de hipotonia, recomenda-se bioestimular com múltiplos pontos de aproximadamente 4 J. Posteriormente, é fundamental realizar terapia miofuncional orofacial, deglutória e da fala para potencializar o efeito do laser e favorecer o alcance dos objetivos terapêuticos. Nestes pacientes, a fotobiomodulação também pode ser útil para a reparação tissular, por exemplo em lesões por pressão associadas ao uso de VMNI, e para diminuir a produção de saliva, contribuindo para melhorar a qualidade de vida."
        }
      }
    }
  },
  {
    id: "paralisis-cerebral",
    nombre: "Parálisis Cerebral",
    icono: "Accessibility",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Trastorno del movimiento por lesión cerebral temprana. La tPBM puede favorecer neuroplasticidad.",
    nivelEvidenciaGlobal: "C-D",
    advertencias: "Resultados variables. Mejor respuesta en niños con mayor potencial plástico. Siempre como complemento a rehabilitación.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza motora y prefrontal bilateral",
        puntos1020: "Cz – Fz – C3 – C4",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión (ajustar a edad)",
        numeroPuntos: "4 puntos (Sistema 10/20)",
        frecuenciaTratamiento: "3-5 veces por semana",
        duracionTotal: "8-12 semanas, evaluar respuesta para mantenimiento",
        nivelEvidencia: "C-D",
        tipoEstudio: "Series de casos, estudios piloto muy preliminares",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando rehabilitación. Para parálisis cerebral. Puede mejorar tono, control motor y algunas funciones cognitivas. No reemplaza rehabilitación convencional. Individualizar según perfil.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en PC con estrés oxidativo. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación. Uso como coadyuvante complementario. No reemplaza rehabilitación convencional."
      },
      puntual: {
        zonaAnatomica: "Músculos espásticos o hipotónicos, según evaluación específica",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "Variable según zona (10-15 típico)",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico. Puede ayudar a modular tono muscular. Se considera adyuvante. Combinar con terapia convencional."
      }
    }
  },
  {
    id: "acv",
    nombre: "Accidente Cerebrovascular (ACV)",
    icono: "HeartCrack",
    categoria: "NEUROCOGNITIVO",
    descripcionBreve: "Lesión cerebral vascular. La tPBM puede acelerar recuperación y potenciar neuroplasticidad post-ACV.",
    nivelEvidenciaGlobal: "B-C",
    advertencias: "Iniciar lo antes posible post-ACV. No reemplaza rehabilitación convencional. Coordinar con equipo neurológico.",
    protocolos: {
      transcraneal: {
        zonaAnatomica: "Corteza perilesional hemisferio afectado (según localización del ACV)",
        puntos1020: "C3 (si lesión izquierda) / C4 (si lesión derecha) – Cz",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO) combinados",
        energiaPorPunto: "30-60 J distribuidos total por sesión",
        numeroPuntos: "2 puntos (Sistema 10/20): C3 o C4 + Cz",
        frecuenciaTratamiento: "3-5 veces por semana (fase aguda/subaguda), 3 veces (crónica)",
        duracionTotal: "8-12 semanas iniciales, evaluar mantenimiento",
        nivelEvidencia: "B-C",
        tipoEstudio: "ECA y pilotos positivos con mejora en recuperación motora y del lenguaje, aún con limitaciones en tamaños muestrales",
        comentarios: "Parámetros adaptados a partir de estudios clínicos recientes. Aun así, se recomienda revisar periódicamente la literatura. Para accidente cerebrovascular (ACV). Buena evidencia para recuperación motora y del lenguaje. No reemplaza rehabilitación convencional. Iniciar lo antes posible. Combinar con terapia intensiva.",
        informacion_complementaria: {
          es: "Cuando el objetivo terapéutico de la fotobiomodulación transcraneal es favorecer procesos de neuroplasticidad, tales como aumento de conectividad sináptica, densidad dendrítica o eficiencia de redes neuronales, se recomienda acompañar la irradiación con actividades funcionales específicas asociadas a la región cerebral estimulada.\n\nLa evidencia sugiere que la activación funcional simultánea o inmediatamente posterior a la estimulación lumínica potencia los mecanismos dependientes de actividad neuronal, favoreciendo procesos de aprendizaje, reorganización cortical y consolidación de redes funcionales.",
          en: "When the therapeutic objective of transcranial photobiomodulation is to favor neuroplasticity processes, such as increased synaptic connectivity, dendritic density or efficiency of neuronal networks, it is recommended to accompany irradiation with specific functional activities associated with the stimulated brain region.\n\nEvidence suggests that simultaneous or immediately subsequent functional activation to light stimulation enhances mechanisms dependent on neuronal activity, favoring learning processes, cortical reorganization and consolidation of functional networks.",
          pt: "Quando o objetivo terapêutico da fotobiomodulação transcraniana é favorecer processos de neuroplasticidade, tais como aumento de conectividade sináptica, densidade dendrítica ou eficiência de redes neuronais, recomenda-se acompanhar a irradiação com atividades funcionais específicas associadas à região cerebral estimulada.\n\nA evidência sugere que a ativação funcional simultânea ou imediatamente posterior à estimulação lumínica potencializa os mecanismos dependentes de atividade neuronal, favorecendo processos de aprendizagem, reorganização cortical e consolidação de redes funcionais."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos neuroprotectores",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario post-ACV. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza rehabilitación convencional."
      },
      puntual: {
        zonaAnatomica: "Músculos afectados por paresia (facial, orofaríngeos)",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "6-8 J",
        numeroPuntos: "Variable según músculos afectados (10-15 típico)",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "8-12 sesiones",
        nivelEvidencia: "C",
        tipoEstudio: "Series de casos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante. Utilizar con criterio clínico. Complemento a tPBM para función muscular local (deglución, habla). Ajustar a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "La dosimetría debe definirse en función de la clínica neurológica del usuario, considerando si presenta hipotonía o hipertonía predominante.\n\nLa fotobiomodulación puede utilizarse como apoyo en trastornos sensoriales y motores, adaptando los parámetros según fase evolutiva y respuesta clínica del paciente.",
          en: "Dosimetry should be defined based on the user's neurological clinical presentation, considering whether they present predominant hypotonia or hypertonia.\n\nPhotobiomodulation can be used as support in sensory and motor disorders, adapting parameters according to evolutionary phase and patient's clinical response.",
          pt: "A dosimetria deve ser definida em função da clínica neurológica do usuário, considerando se apresenta hipotonia ou hipertonia predominante.\n\nA fotobiomodulação pode ser utilizada como apoio em transtornos sensoriais e motores, adaptando os parâmetros segundo fase evolutiva e resposta clínica do paciente."
        }
      }
    }
  },
  {
    id: "sialorrea",
    nombre: "Sialorrea",
    icono: "Droplet",
    categoria: "MOTRICIDAD_OROFACIAL",
    descripcionBreve: "Exceso de saliva o incapacidad de manejarla. La FBM podría modular función glandular, aunque evidencia es limitada.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evaluar causa (neurológica vs. local). El tratamiento principal depende de etiología. Sin guías; extrapolación.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Glándulas salivales mayores (parótida, submandibular) y posibles puntos neuromodulatorios",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-10 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de xerostomía y disfunción salival; no hay guías",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia convencional. Protocolo experimental. En Parkinson, combinar con tPBM. Considerar otras intervenciones establecidas.",
        informacion_complementaria: {
          es: "En casos de sialorrea, la fotobiomodulación puede orientarse a la modulación funcional de las glándulas salivales, particularmente parótidas.\n\nLa dosimetría debe ajustarse según las características del paciente. En casos de hipersecreción marcada, puede considerarse una dosimetría mayor, por ejemplo entre 12 a 13 puntos de 9 J en región parotídea, siempre bajo criterio clínico.\n\nIdealmente se recomienda realizar una sialometría previa a la intervención, repetirla posterior a la aplicación de láser y comparar resultados para objetivar cambios en el flujo salival.\n\nSe sugiere iniciar la intervención por glándula parótida, dado su mayor impacto funcional sobre la producción salival total.",
          en: "In cases of sialorrhea, photobiomodulation can be oriented to the functional modulation of salivary glands, particularly parotids.\n\nDosimetry should be adjusted according to patient characteristics. In cases of marked hypersecretion, a higher dosimetry may be considered, for example between 12 to 13 points of 9 J in the parotid region, always under clinical criteria.\n\nIdeally, it is recommended to perform a sialometry prior to the intervention, repeat it after laser application, and compare results to objectify changes in salivary flow.\n\nIt is suggested to start the intervention with the parotid gland, given its greater functional impact on total salivary production.",
          pt: "Em casos de sialorreia, a fotobiomodulação pode ser orientada à modulação funcional das glândulas salivares, particularmente parótidas.\n\nA dosimetria deve ser ajustada segundo as características do paciente. Em casos de hipersecreção marcada, pode-se considerar uma dosimetria maior, por exemplo entre 12 a 13 pontos de 9 J na região parotídea, sempre sob critério clínico.\n\nIdealmente recomenda-se realizar uma sialometria prévia à intervenção, repeti-la posterior à aplicação de laser e comparar resultados para objetivar mudanças no fluxo salivar.\n\nSugere-se iniciar a intervenção pela glândula parótida, dado seu maior impacto funcional sobre a produção salivar total."
        }
      }
    }
  },
  {
    id: "coadyuvante-erge",
    nombre: "Coadyuvante en Tratamiento de ERGE",
    icono: "Flame",
    categoria: "DEGLUCION",
    descripcionBreve: "FBM como potencial coadyuvante en reflujo gastroesofágico cuando afecta deglución y voz.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evidencia muy limitada. El tratamiento principal es médico/gastroenterológico.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Región laríngea, esfínter esofágico superior (proyección cervical)",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-12 puntos",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación teórica, sin estudios directos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia médica convencional. Sin evidencia directa para ERGE. Puede ayudar en síntomas laríngeos asociados (laringitis por reflujo).",
        informacion_complementaria: {
          es: "Aplicación local a nivel laríngeo, especialmente en la región de los pliegues vocales. La irradiación puede realizarse a nivel del ángulo tiroideo o sobre las láminas del cartílago tiroides, con el objetivo de disminuir inflamación y eritema cordal. El uso de fotobiomodulación es coadyuvante y debe integrarse al manejo médico y fonoaudiológico del reflujo gastroesofágico.\n\nDe forma experimental, se ha utilizado fotobiomodulación en la región epigástrica, bajo el proceso xifoideo, aplicando tres puntos con una dosimetría de 6 J en longitud de onda infrarroja.\n\nResultados preliminares han mostrado una respuesta favorable en el control de síntomas asociados a la enfermedad por reflujo gastroesofágico, siempre como complemento al tratamiento médico convencional.",
          en: "Local application at the laryngeal level, especially in the region of the vocal folds. Irradiation can be performed at the level of the thyroid angle or on the thyroid cartilage laminae, with the objective of reducing inflammation and cord erythema. The use of photobiomodulation is adjuvant and should be integrated into the medical and speech therapy management of gastroesophageal reflux.\n\nExperimentally, photobiomodulation has been used in the epigastric region, below the xiphoid process, applying three points with a dosimetry of 6 J in infrared wavelength.\n\nPreliminary results have shown a favorable response in controlling symptoms associated with gastroesophageal reflux disease, always as a complement to conventional medical treatment.",
          pt: "Aplicação local a nível laríngeo, especialmente na região das pregas vocais. A irradiação pode ser realizada ao nível do ângulo tireóideo ou sobre as lâminas da cartilagem tireóide, com o objetivo de diminuir inflamação e eritema cordal. O uso de fotobiomodulação é coadjuvante e deve ser integrado ao manejo médico e fonoaudiológico do refluxo gastroesofágico.\n\nDe forma experimental, tem-se utilizado fotobiomodulação na região epigástrica, abaixo do processo xifóide, aplicando três pontos com uma dosimetria de 6 J em comprimento de onda infravermelho.\n\nResultados preliminares mostraram uma resposta favorável no controle de sintomas associados à doença do refluxo gastroesofágico, sempre como complemento ao tratamento médico convencional."
        }
      }
    }
  },

  {
    id: "coadyuvante-rinitis",
    nombre: "Coadyuvante en Tratamiento de Rinitis",
    icono: "Wind",
    categoria: "RESPIRATORIO",
    descripcionBreve: "FBM intranasal como potencial coadyuvante antiinflamatorio en rinitis alérgica o crónica.",
    nivelEvidenciaGlobal: "C-D",
    advertencias: "No reemplaza tratamiento médico. Usar sondas apropiadas para aplicación intranasal.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Mucosa nasal (intranasal), región palatina, puntos paranasales externos",
        longitudOnda: "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal",
        energiaPorPunto: "2-4 J intranasal, 4-6 J extranasal",
        numeroPuntos: "8-12 puntos totales (intranasal + extranasal)",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "C-D",
        tipoEstudio: "Pequeños estudios en dolor/fisiología nasal, sin guías robustas",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento médico convencional. Puede ser útil como coadyuvante. Ajustar siempre a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "La fotobiomodulación aplicada a nivel nasal puede contribuir a la modulación del proceso inflamatorio de la mucosa, favoreciendo la disminución de la congestión y la percepción subjetiva de alivio sintomático.\n\nDurante la aplicación se recomienda mantener una comunicación activa con el paciente, consultando de forma periódica si percibe mejoría o alivio sintomático, con el fin de ajustar la intervención según la respuesta individual.\n\nLa respuesta clínica puede variar según el tipo de rinitis (alérgica, no alérgica, mixta) y las características anatómicas del paciente.",
          en: "Photobiomodulation applied at the nasal level can contribute to the modulation of the inflammatory process of the mucosa, favoring the reduction of congestion and subjective perception of symptomatic relief.\n\nDuring application, it is recommended to maintain active communication with the patient, periodically inquiring if they perceive improvement or symptomatic relief, in order to adjust the intervention according to individual response.\n\nClinical response may vary according to the type of rhinitis (allergic, non-allergic, mixed) and the patient's anatomical characteristics.",
          pt: "A fotobiomodulação aplicada a nível nasal pode contribuir para a modulação do processo inflamatório da mucosa, favorecendo a diminuição da congestão e a percepção subjetiva de alívio sintomático.\n\nDurante a aplicação recomenda-se manter uma comunicação ativa com o paciente, consultando de forma periódica se percebe melhoria ou alívio sintomático, com o fim de ajustar a intervenção segundo a resposta individual.\n\nA resposta clínica pode variar segundo o tipo de rinite (alérgica, não alérgica, mista) e as características anatômicas do paciente."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos antiinflamatorios",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en rinitis con compromiso inflamatorio e inmunológico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza tratamiento médico."
      }
    }
  },
  {
    id: "coadyuvante-sinusitis",
    nombre: "Coadyuvante en Tratamiento de Sinusitis",
    icono: "CloudRain",
    categoria: "RESPIRATORIO",
    descripcionBreve: "FBM como potencial coadyuvante antiinflamatorio en sinusitis.",
    nivelEvidenciaGlobal: "D",
    advertencias: "El tratamiento principal es médico. Descartar complicaciones.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Proyección de senos paranasales (frontal, maxilar, etmoidal)",
        longitudOnda: "808 nm (INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-12 puntos según senos afectados",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación antiinflamatoria, sin estudios directos",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento médico convencional. Siempre con tratamiento médico. Puede ayudar a reducir inflamación. Ajustar a la realidad clínica.",
        informacion_complementaria: {
          es: "Durante la aplicación de láser nasal, se recomienda consultar de forma constante al paciente respecto a la percepción de alivio o mejoría sintomática. Idealmente, el abordaje debe realizarse en coordinación con el equipo médico, permitiendo una evaluación objetiva del estado del paciente antes y después del tratamiento con láser (Rx pre y post, cuando corresponda).",
          en: "During nasal laser application, it is recommended to constantly consult the patient regarding the perception of relief or symptomatic improvement. Ideally, the approach should be carried out in coordination with the medical team, allowing an objective evaluation of the patient's condition before and after laser treatment (pre and post X-ray, when appropriate).",
          pt: "Durante a aplicação de laser nasal, recomenda-se consultar de forma constante ao paciente a respeito da percepção de alívio ou melhoria sintomática. Idealmente, a abordagem deve ser realizada em coordenação com a equipe médica, permitindo uma avaliação objetiva do estado do paciente antes e depois do tratamento com laser (Rx pré e pós, quando corresponder)."
        }
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos antiinflamatorios",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en sinusitis con procesos inflamatorios de mucosas ORL. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza tratamiento médico."
      }
    }
  },
  {
    id: "sahos",
    nombre: "SAHOS",
    icono: "Moon",
    categoria: "RESPIRATORIO",
    descripcionBreve: "Síndrome de Apnea-Hipoapnea Obstructiva del Sueño. La FBM podría mejorar tono muscular de vía aérea superior.",
    nivelEvidenciaGlobal: "D",
    advertencias: "El tratamiento principal es CPAP u otras intervenciones establecidas. FBM es experimental. No reemplaza CPAP ni cirugía.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Musculatura faríngea, base de lengua, paladar blando, músculos suprahioideos, músculos respiratorios accesorios",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J (mucosa), 6-8 J (muscular)",
        numeroPuntos: "10-15 puntos",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación; sin guías robustas. No reemplaza CPAP ni cirugía",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. No reemplaza CPAP ni cirugía. Protocolo experimental. Combinar con terapia miofuncional para SAHOS. Monitorear con polisomnografía.",
        informacion_complementaria: {
          es: "En pacientes con SAHOS, se sugiere aplicar fotobiomodulación en las zonas anatómicas indicadas como complemento a la intervención fonoaudiológica tradicional, con el objetivo de impactar positivamente en la calidad de vida del paciente.\n\nLa fotobiomodulación no reemplaza las terapias convencionales, sino que actúa como coadyuvante dentro de un abordaje interdisciplinario.\n\nSe recomienda contar con una evaluación objetiva previa a la intervención, idealmente mediante polisomnografía, y realizar una reevaluación posterior para comparar resultados y determinar la efectividad clínica del abordaje.",
          en: "In patients with OSAHS, it is suggested to apply photobiomodulation in the indicated anatomical areas as a complement to traditional speech therapy intervention, with the objective of positively impacting the patient's quality of life.\n\nPhotobiomodulation does not replace conventional therapies but acts as an adjuvant within an interdisciplinary approach.\n\nIt is recommended to have an objective evaluation prior to the intervention, ideally through polysomnography, and perform a subsequent reevaluation to compare results and determine the clinical effectiveness of the approach.",
          pt: "Em pacientes com SAHOS, sugere-se aplicar fotobiomodulação nas zonas anatômicas indicadas como complemento à intervenção fonoaudiológica tradicional, com o objetivo de impactar positivamente na qualidade de vida do paciente.\n\nA fotobiomodulação não substitui as terapias convencionais, mas atua como coadjuvante dentro de uma abordagem interdisciplinar.\n\nRecomenda-se contar com uma avaliação objetiva prévia à intervenção, idealmente mediante polissonografia, e realizar uma reavaliação posterior para comparar resultados e determinar a efetividade clínica da abordagem."
        }
      }
    }
  },
  {
    id: "coadyuvante-otitis",
    nombre: "Coadyuvante en Tratamiento de Otitis Media",
    icono: "Stethoscope",
    categoria: "AUDICION",
    descripcionBreve: "FBM como potencial coadyuvante antiinflamatorio en otitis media.",
    nivelEvidenciaGlobal: "D",
    advertencias: "El tratamiento principal es médico. Descartar complicaciones. No usar en otitis complicada.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Región periauricular, mastoides, conducto auditivo (con precaución)",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-12 puntos",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Reportes aislados, extrapolación antiinflamatoria; soporte para inflamación local",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando tratamiento médico convencional. Protocolo experimental. Siempre con tratamiento médico concomitante."
      },
      ILIB: {
        zonaAnatomica: "Vascular sistémica (arteria radial)",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "N/A (basado en tiempo de aplicación)",
        numeroPuntos: "1 sitio vascular",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica",
        nivelEvidencia: "C-D",
        tipoEstudio: "Estudios piloto, extrapolación de efectos sistémicos antiinflamatorios",
        comentarios: "FBM Sistémica / ILIB como adyuvante complementario en otitis media con inflamación persistente y compromiso inmunológico. Beneficios esperables: efecto antioxidante sistémico, mejora de la oxigenación en sangre y tejidos, control sistémico de la inflamación, mejora de parámetros sanguíneos y microcirculación. Uso como coadyuvante complementario. No reemplaza tratamiento médico."
      },
      PDT: {
        zonaAnatomica: "Conducto auditivo externo en caso de colonización/infección",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "10-30 J/cm² sobre la zona afectada con fotosensibilizador",
        numeroPuntos: "Áreas específicas infectadas",
        frecuenciaTratamiento: "1-2 aplicaciones según respuesta",
        duracionTotal: "Sesiones puntuales en episodios de infección",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de PDT antimicrobiana en otras mucosas",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. Terapia fotodinámica experimental como adyuvante en otitis infectada refractaria. Pre-incubación del fotosensibilizador (azul de metileno 0.01-0.02%) 3-5 min. Requiere manejo entrenado y supervisión médica."
      }
    }
  },
  {
    id: "ostomias",
    nombre: "Ostomías (Traqueostomía/Gastrostomía)",
    icono: "CircleDot",
    categoria: "SISTEMICO",
    descripcionBreve: "Cuidado periostoma y rehabilitación de funciones. La FBM puede mejorar cicatrización y función local.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evitar irradiar directamente sobre estomas abiertos. Enfocarse en tejido periostoma y rehabilitación funcional.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Tejido periostoma, músculos adyacentes según objetivo rehabilitador",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "4-6 J",
        numeroPuntos: "8-12 puntos periestomal",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones según objetivo",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de cicatrización, reportes aislados; soporte para inflamación/cicatrización local",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. Para mejorar salud tisular periostoma. En traqueostomía, considerar rehabilitación foniatría concomitante.",
        informacion_complementaria: {
          es: "En pacientes con ostomías, la fotobiomodulación puede utilizarse como coadyuvante para disminuir procesos inflamatorios locales y dolor periestomal, utilizando preferentemente luz roja.\n\nEn presencia de lesiones con sospecha de origen fúngico, se sugiere considerar terapia fotodinámica como estrategia complementaria, siempre en coordinación con el equipo tratante.\n\nLa intervención debe realizarse de manera interdisciplinaria, manteniendo coordinación directa con el equipo de enfermería responsable del manejo de la ostomía, respetando protocolos de cuidado y bioseguridad.",
          en: "In patients with ostomies, photobiomodulation can be used as an adjuvant to reduce local inflammatory processes and peristomal pain, preferably using red light.\n\nIn the presence of lesions with suspected fungal origin, it is suggested to consider photodynamic therapy as a complementary strategy, always in coordination with the treating team.\n\nThe intervention should be performed in an interdisciplinary manner, maintaining direct coordination with the nursing team responsible for ostomy management, respecting care and biosafety protocols.",
          pt: "Em pacientes com ostomias, a fotobiomodulação pode ser utilizada como coadjuvante para diminuir processos inflamatórios locais e dor periostomal, utilizando preferencialmente luz vermelha.\n\nNa presença de lesões com suspeita de origem fúngica, sugere-se considerar terapia fotodinâmica como estratégia complementar, sempre em coordenação com a equipe tratante.\n\nA intervenção deve ser realizada de maneira interdisciplinar, mantendo coordenação direta com a equipe de enfermagem responsável pelo manejo da ostomia, respeitando protocolos de cuidado e biossegurança."
        }
      },
      PDT: {
        zonaAnatomica: "Áreas de colonización bacteriana periostoma",
        longitudOnda: "660 nm (ROJO)",
        energiaPorPunto: "10-30 J/cm² sobre la zona afectada con fotosensibilizador",
        numeroPuntos: "Áreas específicas colonizadas",
        frecuenciaTratamiento: "1-2 aplicaciones según respuesta",
        duracionTotal: "Sesiones puntuales en episodios de colonización",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de PDT antimicrobiana",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico. PDT experimental como adyuvante en colonización bacteriana periostomía. Pre-incubación 3-5 min. Requiere manejo entrenado. Protocolo experimental."
      }
    }
  },
  {
    id: "estimulacion-gustativa-olfativa",
    nombre: "Estimulación Gustativa y Olfativa",
    icono: "Flower2",
    categoria: "SISTEMICO",
    descripcionBreve: "Rehabilitación de alteraciones del gusto y olfato (disgeusia, anosmia). La FBM puede promover regeneración de receptores y neuronas sensoriales.",
    nivelEvidenciaGlobal: "D",
    advertencias: "Evidencia emergente, especialmente post-COVID. Resultados variables.",
    protocolos: {
      puntual: {
        zonaAnatomica: "Dorso y bordes laterales de lengua (papilas gustativas), región palatina, mucosa nasal anterior (si se trabaja olfato)",
        longitudOnda: "660 y 808 nm (ROJO+INFRARROJO)",
        energiaPorPunto: "2-4 J en mucosa sensorial",
        numeroPuntos: "10-15 puntos por sesión",
        frecuenciaTratamiento: "2-3 veces por semana",
        duracionTotal: "6-10 sesiones",
        nivelEvidencia: "D",
        tipoEstudio: "Extrapolación de PBM en xerostomía y mucosa nasal",
        comentarios: "Protocolo con evidencia preliminar / uso adyuvante o experimental. Utilizar con criterio clínico y siempre complementando terapia convencional. Protocolo en desarrollo. Combinar con entrenamiento olfatorio estructurado. Ajustar siempre a la realidad clínica del paciente.",
        informacion_complementaria: {
          es: "La dosimetría seleccionada dependerá del perfil sensorial del paciente, particularmente de la presencia de hipersensibilidad o hiposensibilidad gustativa.\n\nEn casos de hipersensibilidad se sugiere utilizar puntos de mayor energía (aproximadamente 9 J por punto). En casos de hiposensibilidad se recomienda una dosimetría menor, entre 2 a 4 J por punto, aplicada en zonas de mucosa oral.\n\nSe sugiere realizar una evaluación inicial del gusto y/o del olfato antes de la aplicación, repetir la evaluación posterior a la intervención con fotobiomodulación y comparar resultados para objetivar cambios funcionales.\n\nLa cantidad y distribución de puntos puede variar según la anatomía oral del usuario.",
          en: "The selected dosimetry will depend on the patient's sensory profile, particularly the presence of gustatory hypersensitivity or hyposensitivity.\n\nIn cases of hypersensitivity, it is suggested to use points with higher energy (approximately 9 J per point). In cases of hyposensitivity, a lower dosimetry is recommended, between 2 to 4 J per point, applied in oral mucosa areas.\n\nIt is suggested to perform an initial evaluation of taste and/or smell before the application, repeat the evaluation after the photobiomodulation intervention, and compare results to objectify functional changes.\n\nThe quantity and distribution of points may vary according to the user's oral anatomy.",
          pt: "A dosimetria selecionada dependerá do perfil sensorial do paciente, particularmente da presença de hipersensibilidade ou hiposensibilidade gustativa.\n\nEm casos de hipersensibilidade sugere-se utilizar pontos de maior energia (aproximadamente 9 J por ponto). Em casos de hiposensibilidade recomenda-se uma dosimetria menor, entre 2 a 4 J por ponto, aplicada em zonas de mucosa oral.\n\nSugere-se realizar uma avaliação inicial do gosto e/ou do olfato antes da aplicação, repetir a avaliação posterior à intervenção com fotobiomodulação e comparar resultados para objetivar mudanças funcionais.\n\nA quantidade e distribuição de pontos pode variar segundo a anatomia oral do usuário."
        }
      }
    }
  }
];

export const getPathologyById = (id) => {
  return PATHOLOGIES.find(p => p.id === id);
};

export const getPathologiesByCategory = (category) => {
  return PATHOLOGIES.filter(p => p.categoria === category);
};

export const getCategoryColor = (categoryKey) => {
  return CATEGORIES[categoryKey]?.color || "#6B7280";
};

export const getCategoryBgClass = (categoryKey) => {
  return CATEGORIES[categoryKey]?.bgClass || "bg-gray-500";
};

export const getCategoryName = (categoryKey) => {
  return CATEGORIES[categoryKey]?.name || categoryKey;
};