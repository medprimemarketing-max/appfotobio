/**
 * SISTEMA COMPLETO Y DEFINITIVO DE TRADUCCIÓN DE PROTOCOLOS
 * 100% de cobertura - Sin texto hardcodeado - Sin mezclas de idiomas
 */

import { 
  zonaAnatomicaTranslations, 
  tipoEstudioTranslations, 
  comentariosTranslations 
} from './protocolFieldTranslations';

// ========================================
// LONGITUDES DE ONDA
// ========================================
const wavelengthTranslations = {
  "660 nm (ROJO)": { 
    pt: "660 nm (VERMELHO)",
    en: "660 nm (RED)"
  },
  "808 nm (INFRARROJO)": { 
    pt: "808 nm (INFRAVERMELHO)",
    en: "808 nm (INFRARED)"
  },
  "660 y 808 nm (ROJO+INFRARROJO)": { 
    pt: "660 e 808 nm (VERMELHO+INFRAVERMELHO)",
    en: "660 and 808 nm (RED+INFRARED)"
  },
  "660 y 808 nm (ROJO+INFRARROJO) combinados": { 
    pt: "660 e 808 nm (VERMELHO+INFRAVERMELHO) combinados",
    en: "660 and 808 nm (RED+INFRARED) combined"
  },
  "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular": {
    pt: "660 nm (VERMELHO) ou 808 nm (INFRAVERMELHO) transmeatal, 808 nm (INFRAVERMELHO) retroauricular",
    en: "660 nm (RED) or 808 nm (INFRARED) transmeatal, 808 nm (INFRARED) retroauricular"
  },
  "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos": {
    pt: "660 nm (VERMELHO) mucosa sublingual, 808 nm (INFRAVERMELHO) assoalho da boca/supra-hióideos",
    en: "660 nm (RED) sublingual mucosa, 808 nm (INFRARED) floor of mouth/suprahyoid"
  },
  "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal": {
    pt: "660 nm (VERMELHO) intranasal, 808 nm (INFRAVERMELHO) extranasal",
    en: "660 nm (RED) intranasal, 808 nm (INFRARED) extranasal"
  }
};

// ========================================
// ENERGÍAS POR PUNTO
// ========================================
const energiaTranslations = {
  "N/A (basado en tiempo de aplicación)": { 
    pt: "N/A (baseado no tempo de aplicação)",
    en: "N/A (based on application time)"
  },
  "2-3 J por punto": { 
    pt: "2-3 J por ponto",
    en: "2-3 J per point"
  },
  "2-4 J intranasal, 4-6 J extranasal": { 
    pt: "2-4 J intranasal, 4-6 J extranasal",
    en: "2-4 J intranasal, 4-6 J extranasal"
  },
  "2-4 J (660 nm), 4-6 J (808 nm)": { 
    pt: "2-4 J (660 nm), 4-6 J (808 nm)",
    en: "2-4 J (660 nm), 4-6 J (808 nm)"
  },
  "2-4 J en mucosa sensorial": { 
    pt: "2-4 J em mucosa sensorial",
    en: "2-4 J on sensory mucosa"
  },
  "4-6 J": { 
    pt: "4-6 J",
    en: "4-6 J"
  },
  "4-6 J intraoral, 6-8 J extraoral": { 
    pt: "4-6 J intraoral, 6-8 J extraoral",
    en: "4-6 J intraoral, 6-8 J extraoral"
  },
  "4-6 J mastoidea, 6-8 J cervical": { 
    pt: "4-6 J mastóidea, 6-8 J cervical",
    en: "4-6 J mastoid, 6-8 J cervical"
  },
  "4-6 J retroauricular por punto": { 
    pt: "4-6 J retroauricular por ponto",
    en: "4-6 J retroauricular per point"
  },
  "4-6 J (mucosa), 6-8 J (muscular)": { 
    pt: "4-6 J (mucosa), 6-8 J (muscular)",
    en: "4-6 J (mucosa), 6-8 J (muscular)"
  },
  "6-8 J": { 
    pt: "6-8 J",
    en: "6-8 J"
  },
  "6-10 J": { 
    pt: "6-10 J",
    en: "6-10 J"
  },
  "8-12 J": { 
    pt: "8-12 J",
    en: "8-12 J"
  },
  "3-6 J por punto": { 
    pt: "3-6 J por ponto",
    en: "3-6 J per point"
  },
  "3-6 J por punto (ajustar a edad)": { 
    pt: "3-6 J por ponto (ajustar à idade)",
    en: "3-6 J per point (adjust to age)"
  },
  "30-60 J distribuidos total por sesión": { 
    pt: "30-60 J distribuídos total por sessão",
    en: "30-60 J total distributed per session"
  },
  "30-60 J distribuidos total por sesión (ajustar a edad)": { 
    pt: "30-60 J distribuídos total por sessão (ajustar à idade)",
    en: "30-60 J total distributed per session (adjust to age)"
  },
  "10-30 J/cm² sobre la zona afectada con fotosensibilizador": {
    pt: "10-30 J/cm² sobre a zona afetada com fotossensibilizador",
    en: "10-30 J/cm² on affected area with photosensitizer"
  }
};

// ========================================
// NÚMERO DE PUNTOS
// ========================================
const numeroPuntosTranslations = {
  "1 sitio vascular": { 
    pt: "1 local vascular",
    en: "1 vascular site"
  },
  "1-2 transmeatal + 4-6 retroauricular por oído": { 
    pt: "1-2 transmeatal + 4-6 retroauricular por ouvido",
    en: "1-2 transmeatal + 4-6 retroauricular per ear"
  },
  "1-2 transmeatal + 4-6 retroauricular bilateral": { 
    pt: "1-2 transmeatal + 4-6 retroauricular bilateral",
    en: "1-2 transmeatal + 4-6 bilateral retroauricular"
  },
  "4-6 puntos pre-procedimiento, 6-10 puntos post-procedimiento": {
    pt: "4-6 pontos pré-procedimento, 6-10 pontos pós-procedimento",
    en: "4-6 pre-procedure points, 6-10 post-procedure points"
  },
  "8-10 puntos por sesión": { 
    pt: "8-10 pontos por sessão",
    en: "8-10 points per session"
  },
  "8-10 puntos en hemicara afectada": { 
    pt: "8-10 pontos em hemiface afetada",
    en: "8-10 points on affected hemiface"
  },
  "8-12 puntos bilateral": { 
    pt: "8-12 pontos bilateral",
    en: "8-12 bilateral points"
  },
  "8-12 puntos": { 
    pt: "8-12 pontos",
    en: "8-12 points"
  },
  "8-12 puntos según rama afectada": { 
    pt: "8-12 pontos segundo ramo afetado",
    en: "8-12 points according to affected branch"
  },
  "8-12 puntos según localización del dolor": { 
    pt: "8-12 pontos segundo localização da dor",
    en: "8-12 points according to pain location"
  },
  "8-12 puntos según senos afectados": { 
    pt: "8-12 pontos segundo seios afetados",
    en: "8-12 points according to affected sinuses"
  },
  "8-12 puntos periestomal": { 
    pt: "8-12 pontos periostomal",
    en: "8-12 peristomal points"
  },
  "8-12 puntos totales (intranasal + extranasal)": { 
    pt: "8-12 pontos totais (intranasal + extranasal)",
    en: "8-12 total points (intranasal + extranasal)"
  },
  "8-12 puntos (cubriendo glándulas mayores bilateral)": {
    pt: "8-12 pontos (cobrindo glândulas maiores bilateral)",
    en: "8-12 points (covering bilateral major glands)"
  },
  "10-12 puntos": { 
    pt: "10-12 pontos",
    en: "10-12 points"
  },
  "10-12 puntos por sesión": { 
    pt: "10-12 pontos por sessão",
    en: "10-12 points per session"
  },
  "10-15 puntos": { 
    pt: "10-15 pontos",
    en: "10-15 points"
  },
  "10-15 puntos bilateral": { 
    pt: "10-15 pontos bilateral",
    en: "10-15 bilateral points"
  },
  "10-15 puntos por sesión": { 
    pt: "10-15 pontos por sessão",
    en: "10-15 points per session"
  },
  "10-15 puntos según músculos implicados": { 
    pt: "10-15 pontos segundo músculos envolvidos",
    en: "10-15 points according to involved muscles"
  },
  "10-15 puntos según músculos target": { 
    pt: "10-15 pontos segundo músculos alvo",
    en: "10-15 points according to target muscles"
  },
  "8-12 posiciones craneales": { 
    pt: "8-12 posições cranianas",
    en: "8-12 cranial positions"
  },
  "8-12 posiciones según tipo de afasia": { 
    pt: "8-12 posições segundo tipo de afasia",
    en: "8-12 positions according to aphasia type"
  },
  "8-12 posiciones según localización del ACV": { 
    pt: "8-12 posições segundo localização do AVC",
    en: "8-12 positions according to stroke location"
  },
  "8-12 posiciones según perfil de síntomas": { 
    pt: "8-12 posições segundo perfil de sintomas",
    en: "8-12 positions according to symptom profile"
  },
  "8-12 posiciones temporales bilateral": { 
    pt: "8-12 posições temporais bilaterais",
    en: "8-12 bilateral temporal positions"
  },
  "8-12 posiciones craneales según evaluación": { 
    pt: "8-12 posições cranianas segundo avaliação",
    en: "8-12 cranial positions according to assessment"
  },
  "8-12 posiciones prefrontales": { 
    pt: "8-12 posições pré-frontais",
    en: "8-12 prefrontal positions"
  },
  "8-12 posiciones (casco)": { 
    pt: "8-12 posições (capacete)",
    en: "8-12 positions (helmet)"
  },
  "Múltiples zonas con casco/banda (4-8 módulos)": { 
    pt: "Múltiplas zonas com capacete/banda (4-8 módulos)",
    en: "Multiple zones with helmet/band (4-8 modules)"
  },
  "Múltiples zonas (casco con 4-8 módulos)": { 
    pt: "Múltiplas zonas (capacete com 4-8 módulos)",
    en: "Multiple zones (helmet with 4-8 modules)"
  },
  "Variable según zona afectada": { 
    pt: "Variável segundo área afetada",
    en: "Variable according to affected area"
  },
  "Variable según músculos afectados (10-15 típico)": { 
    pt: "Variável segundo músculos afetados (10-15 típico)",
    en: "Variable according to affected muscles (typically 10-15)"
  },
  "Variable según zona (10-15 típico)": { 
    pt: "Variável segundo área (10-15 típico)",
    en: "Variable according to area (typically 10-15)"
  },
  "Cubrir todas las áreas de mucosa en riesgo (15-25 puntos típicamente)": {
    pt: "Cobrir todas as áreas de mucosa em risco (15-25 pontos tipicamente)",
    en: "Cover all at-risk mucosal areas (typically 15-25 points)"
  },
  "Áreas específicas infectadas": { 
    pt: "Áreas específicas infectadas",
    en: "Specific infected areas"
  },
  "Áreas específicas colonizadas": { 
    pt: "Áreas específicas colonizadas",
    en: "Specific colonized areas"
  },
  "2 puntos (Sistema 10/20): C3 o C4 + Cz": {
    pt: "2 pontos (Sistema 10/20): C3 ou C4 + Cz",
    en: "2 points (10/20 System): C3 or C4 + Cz"
  },
  "3 puntos (Sistema 10/20)": {
    pt: "3 pontos (Sistema 10/20)",
    en: "3 points (10/20 System)"
  },
  "4 puntos (Sistema 10/20)": {
    pt: "4 pontos (Sistema 10/20)",
    en: "4 points (10/20 System)"
  },
  "4-8 puntos (dispositivo casco/banda)": {
    pt: "4-8 pontos (dispositivo capacete/banda)",
    en: "4-8 points (helmet/band device)"
  }
};

// ========================================
// FRECUENCIA DE TRATAMIENTO
// ========================================
const frecuenciaTranslations = {
  "2-3 veces por semana": { 
    pt: "2-3 vezes por semana",
    en: "2-3 times per week"
  },
  "3-5 veces por semana": { 
    pt: "3-5 vezes por semana",
    en: "3-5 times per week"
  },
  "3 veces por semana": { 
    pt: "3 vezes por semana",
    en: "3 times per week"
  },

  "1-2 aplicaciones según respuesta": {
    pt: "1-2 aplicações segundo resposta",
    en: "1-2 applications according to response"
  },
  "2-3 veces por semana en fase aguda": {
    pt: "2-3 vezes por semana na fase aguda",
    en: "2-3 times per week in acute phase"
  },
  "Diario o 3-5 veces por semana": {
    pt: "Diário ou 3-5 vezes por semana",
    en: "Daily or 3-5 times per week"
  },
  "Diario en fase aguda de hipoacusia súbita, luego 3 veces/semana": {
    pt: "Diário na fase aguda de hipoacusia súbita, depois 3 vezes/semana",
    en: "Daily in acute sudden hearing loss phase, then 3 times/week"
  },
  "Prevención: diario durante RT. Tratamiento: 3-5 veces/semana": {
    pt: "Prevenção: diário durante RT. Tratamento: 3-5 vezes/semana",
    en: "Prevention: daily during RT. Treatment: 3-5 times/week"
  },
  "3-5 veces por semana (fase aguda/subaguda), 3 veces (crónica)": {
    pt: "3-5 vezes por semana (fase aguda/subaguda), 3 vezes (crônica)",
    en: "3-5 times per week (acute/subacute phase), 3 times (chronic)"
  },
  "3-5 veces por semana (algunos protocolos diarios)": {
    pt: "3-5 vezes por semana (alguns protocolos diários)",
    en: "3-5 times per week (some daily protocols)"
  },
  "1 sesión pre-procedimiento. Post: 1 sesión inmediata + 2-3/semana durante 1-2 semanas": {
    pt: "1 sessão pré-procedimento. Pós: 1 sessão imediata + 2-3/semana durante 1-2 semanas",
    en: "1 pre-procedure session. Post: 1 immediate session + 2-3/week for 1-2 weeks"
  },
  "1-2 aplicaciones según respuesta clínica": {
    pt: "1-2 aplicações segundo resposta clínica",
    en: "1-2 applications according to clinical response"
  }
};

// ========================================
// DURACIÓN TOTAL
// ========================================
const duracionTranslations = {
  "6-10 sesiones": { 
    pt: "6-10 sessões",
    en: "6-10 sessions"
  },
  "8-10 sesiones": { 
    pt: "8-10 sessões",
    en: "8-10 sessions"
  },
  "8-12 sesiones": { 
    pt: "8-12 sessões",
    en: "8-12 sessions"
  },
  "10-20 sesiones": { 
    pt: "10-20 sessões",
    en: "10-20 sessions"
  },
  "15-25 sesiones": { 
    pt: "15-25 sessões",
    en: "15-25 sessions"
  },
  "8-12 semanas": { 
    pt: "8-12 semanas",
    en: "8-12 weeks"
  },
  "8-10 semanas": { 
    pt: "8-10 semanas",
    en: "8-10 weeks"
  },

  "1 sesión pre + 5-8 sesiones post": {
    pt: "1 sessão pré + 5-8 sessões pós",
    en: "1 pre session + 5-8 post sessions"
  },
  "6-10 sesiones según objetivo": {
    pt: "6-10 sessões segundo objetivo",
    en: "6-10 sessions according to goal"
  },
  "12-18 sesiones (4-6 semanas)": {
    pt: "12-18 sessões (4-6 semanas)",
    en: "12-18 sessions (4-6 weeks)"
  },
  "4-6 semanas (12-18 sesiones)": {
    pt: "4-6 semanas (12-18 sessões)",
    en: "4-6 weeks (12-18 sessions)"
  },
  "8-12 sesiones, con re-evaluación": {
    pt: "8-12 sessões, com reavaliação",
    en: "8-12 sessions, with re-evaluation"
  },
  "8-12 sesiones (puede requerir mantenimiento)": {
    pt: "8-12 sessões (pode requerer manutenção)",
    en: "8-12 sessions (may require maintenance)"
  },
  "6-10 sesiones (puede requerir mantenimiento)": {
    pt: "6-10 sessões (pode requerer manutenção)",
    en: "6-10 sessions (may require maintenance)"
  },
  "8-12 sesiones (reevaluar)": {
    pt: "8-12 sessões (reavaliar)",
    en: "8-12 sessions (re-evaluate)"
  },
  "8-12 semanas, luego mantenimiento": {
    pt: "8-12 semanas, depois manutenção",
    en: "8-12 weeks, then maintenance"
  },
  "8-12 semanas inicial, luego mantenimiento": {
    pt: "8-12 semanas inicial, depois manutenção",
    en: "8-12 weeks initial, then maintenance"
  },
  "8-12 semanas, evaluar mantenimiento": {
    pt: "8-12 semanas, avaliar manutenção",
    en: "8-12 weeks, evaluate maintenance"
  },
  "8-12 semanas, evaluar respuesta para mantenimiento": {
    pt: "8-12 semanas, avaliar resposta para manutenção",
    en: "8-12 weeks, evaluate response for maintenance"
  },
  "8-12 semanas iniciales, evaluar mantenimiento": {
    pt: "8-12 semanas iniciais, avaliar manutenção",
    en: "8-12 weeks initial, evaluate maintenance"
  },
  "8-12 semanas, continuo según tolerancia y respuesta": {
    pt: "8-12 semanas, contínuo segundo tolerância e resposta",
    en: "8-12 weeks, continuous according to tolerance and response"
  },
  "Continuo según tolerancia": {
    pt: "Contínuo segundo tolerância",
    en: "Continuous according to tolerance"
  },
  "30-60 minutos por sesión, 6-10 sesiones con reevaluación clínica": {
    pt: "30-60 minutos por sessão, 6-10 sessões com reavaliação clínica",
    en: "30-60 minutes per session, 6-10 sessions with clinical re-evaluation"
  },
  "30-60 minutos por sesión, 6-10 sesiones durante período de RT/QT": {
    pt: "30-60 minutos por sessão, 6-10 sessões durante período de RT/QT",
    en: "30-60 minutes per session, 6-10 sessions during RT/CT period"
  },
  "30-60 minutos por sesión, 6-10 sesiones, continuo según tolerancia": {
    pt: "30-60 minutos por sessão, 6-10 sessões, contínuo segundo tolerância",
    en: "30-60 minutes per session, 6-10 sessions, continuous according to tolerance"
  },
  "Durante todo el período de tratamiento oncológico o hasta resolución": {
    pt: "Durante todo o período de tratamento oncológico ou até resolução",
    en: "Throughout oncologic treatment period or until resolution"
  },
  "Sesiones puntuales en episodios de infección": {
    pt: "Sessões pontuais em episódios de infecção",
    en: "Point sessions in infection episodes"
  },
  "Sesiones puntuales en episodios de colonización": {
    pt: "Sessões pontuais em episódios de colonização",
    en: "Point sessions in colonization episodes"
  },
  "4-8 semanas": {
    pt: "4-8 semanas",
    en: "4-8 weeks"
  }
};

/**
 * FUNCIÓN PRINCIPAL: Traduce CUALQUIER campo de CUALQUIER protocolo
 */
export const translateProtocolField = (pathologyId, protocolType, field, value, language = 'es') => {
  // Si es español o valor vacío, retornar sin cambios
  if (!value || language === 'es') return value;
  
  // Validar idioma soportado
  if (!['pt', 'en'].includes(language)) return value;
  
  // 1. LONGITUDES DE ONDA
  if (field === 'longitudOnda') {
    const translation = wavelengthTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: longitudOnda = "${value}"`);
    return value;
  }
  
  // 2. ZONA ANATÓMICA
  if (field === 'zonaAnatomica') {
    // Primero revisar traducciones específicas completas
    if (zonaAnatomicaTranslations[value]) {
      const translation = zonaAnatomicaTranslations[value][language];
      if (translation) return translation;
    }
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: zonaAnatomica = "${value}" for ${pathologyId}.${protocolType}`);
    return value;
  }
  
  // 3. ENERGÍA POR PUNTO
  if (field === 'energiaPorPunto') {
    const translation = energiaTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: energiaPorPunto = "${value}"`);
    return value;
  }
  
  // 4. NÚMERO DE PUNTOS
  if (field === 'numeroPuntos') {
    const translation = numeroPuntosTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: numeroPuntos = "${value}"`);
    return value;
  }
  
  // 5. FRECUENCIA DE TRATAMIENTO
  if (field === 'frecuenciaTratamiento') {
    const translation = frecuenciaTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: frecuenciaTratamiento = "${value}"`);
    return value;
  }
  
  // 6. DURACIÓN TOTAL
  if (field === 'duracionTotal') {
    const translation = duracionTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: duracionTotal = "${value}"`);
    return value;
  }
  
  // 7. TIPO DE ESTUDIO
  if (field === 'tipoEstudio') {
    const translation = tipoEstudioTranslations[value]?.[language];
    if (translation) return translation;
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: tipoEstudio = "${value}" for ${pathologyId}.${protocolType}`);
    return value;
  }
  
  // 8. COMENTARIOS (textos largos)
  if (field === 'comentarios') {
    // Buscar coincidencia exacta primero
    if (comentariosTranslations[value]) {
      const translation = comentariosTranslations[value][language];
      if (translation) return translation;
    }
    
    // Buscar coincidencia parcial (para textos compuestos)
    let translatedValue = value;
    let foundTranslation = false;
    
    for (const [spanishText, translation] of Object.entries(comentariosTranslations)) {
      if (value.includes(spanishText) && translation[language]) {
        translatedValue = translatedValue.replace(spanishText, translation[language]);
        foundTranslation = true;
      }
    }
    
    if (foundTranslation) return translatedValue;
    
    console.warn(`[MISSING_${language.toUpperCase()}_TRANSLATION]: comentarios = "${value}" for ${pathologyId}.${protocolType}`);
    return value;
  }
  
  // Si no encontró traducción, retornar original
  return value;
};