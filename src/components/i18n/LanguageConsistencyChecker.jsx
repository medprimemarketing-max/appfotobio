import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

/**
 * LANGUAGE CONSISTENCY CHECKER
 * Detecta automáticamente texto en español/portugués cuando el idioma seleccionado es inglés
 * y viceversa - para evitar mezcla de idiomas en la UI
 */

const LANGUAGE_PATTERNS = {
  es: [
    // Palabras y frases comunes en español
    /\bPrecauciones\b/,
    /\bEnsayos?\b/,
    /\bAplicación\b/,
    /\bNúmero de\b/,
    /\bsesión\b/,
    /\bsesiones\b/,
    /\bveces por semana\b/,
    /\bImágenes\b/,
    /\bEsquemas Anatómicos\b/,
    /\bEvidencia científica\b/,
    /\bMecanismos Generales\b/,
    /\bDolor Crónico\b/,
    /\bDeglución\b/,
    /\bOncológico\b/,
    /\bNeurológico\b/,
    /\bProtocolo\b/
  ],
  pt: [
    // Palabras y frases comunes en portugués
    /\bPrecauções\b/,
    /\bEnsaios?\b/,
    /\bAplicação\b/,
    /\bNúmero de\b/,
    /\bsessão\b/,
    /\bsessões\b/,
    /\bvezes por semana\b/,
    /\bImagens\b/,
    /\bEsquemas Anatômicos\b/,
    /\bEvidência científica\b/,
    /\bMecanismos Gerais\b/,
    /\bDor Crônica\b/,
    /\bDeglutição\b/,
    /\bOncológico\b/,
    /\bNeurológico\b/,
    /\bProtocolo\b/
  ],
  en: [
    // Palabras comunes en inglés (para detectar cuando está en ES o PT)
    /\bPrecautions\b/,
    /\bTrials?\b/,
    /\bApplication\b/,
    /\bNumber of\b/,
    /\bsession\b/,
    /\bsessions\b/,
    /\btimes per week\b/,
    /\bImages\b/,
    /\bAnatomical Schemes\b/,
    /\bScientific Evidence\b/,
    /\bGeneral Mechanisms\b/,
    /\bChronic Pain\b/,
    /\bSwallowing\b/,
    /\bOncologic\b/,
    /\bNeurologic\b/,
    /\bProtocol\b/
  ]
};

export default function LanguageConsistencyChecker({ enabled = true }) {
  const { language } = useLanguage();

  useEffect(() => {
    if (!enabled || process.env.NODE_ENV === 'production') return;

    const checkLanguageConsistency = () => {
      // Obtener todo el texto visible en el DOM
      const bodyText = document.body.innerText;
      const violations = [];

      // Si el idioma es inglés, buscar palabras en español o portugués
      if (language === 'en') {
        LANGUAGE_PATTERNS.es.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'Spanish', text: match[0], pattern: pattern.source });
          }
        });
        
        LANGUAGE_PATTERNS.pt.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'Portuguese', text: match[0], pattern: pattern.source });
          }
        });
      }

      // Si el idioma es español, buscar palabras en inglés o portugués
      if (language === 'es') {
        LANGUAGE_PATTERNS.en.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'English', text: match[0], pattern: pattern.source });
          }
        });
        
        LANGUAGE_PATTERNS.pt.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'Portuguese', text: match[0], pattern: pattern.source });
          }
        });
      }

      // Si el idioma es portugués, buscar palabras en español o inglés
      if (language === 'pt') {
        LANGUAGE_PATTERNS.es.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'Spanish', text: match[0], pattern: pattern.source });
          }
        });
        
        LANGUAGE_PATTERNS.en.forEach(pattern => {
          const match = bodyText.match(pattern);
          if (match) {
            violations.push({ language: 'English', text: match[0], pattern: pattern.source });
          }
        });
      }

      // Reportar violaciones en consola
      if (violations.length > 0) {
        console.group(`⚠️ LANGUAGE CONSISTENCY VIOLATIONS (${violations.length} found)`);
        console.log(`Current language: ${language.toUpperCase()}`);
        violations.forEach(v => {
          console.warn(`Mixed language detected: "${v.text}" (${v.language}) found in ${language.toUpperCase()} mode`);
        });
        console.groupEnd();
      } else {
        console.log(`✅ Language consistency check passed for ${language.toUpperCase()} mode`);
      }
    };

    // Ejecutar después de que el DOM se haya actualizado
    const timeoutId = setTimeout(checkLanguageConsistency, 1000);

    return () => clearTimeout(timeoutId);
  }, [language, enabled]);

  // Este componente no renderiza nada
  return null;
}