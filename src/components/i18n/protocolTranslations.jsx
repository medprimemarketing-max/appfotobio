/**
 * Traducciones de protocolos clínicos
 * Mapea los valores en español a sus equivalentes en otros idiomas
 */

export const protocolTranslations = {
  // Longitudes de onda
  wavelengths: {
    es: {
      "660 nm (ROJO)": "660 nm (ROJO)",
      "808 nm (INFRARROJO)": "808 nm (INFRARROJO)",
      "660 y 808 nm (ROJO+INFRARROJO)": "660 y 808 nm (ROJO+INFRARROJO)",
      "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular": "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular",
      "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos": "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos",
      "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal": "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal"
    },
    en: {
      "660 nm (ROJO)": "660 nm (RED)",
      "808 nm (INFRARROJO)": "808 nm (INFRARED)",
      "660 y 808 nm (ROJO+INFRARROJO)": "660 and 808 nm (RED+INFRARED)",
      "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular": "660 nm (RED) or 808 nm (INFRARED) transmeatal, 808 nm (INFRARED) retroauricular",
      "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos": "660 nm (RED) sublingual mucosa, 808 nm (INFRARED) floor of mouth/suprahyoid",
      "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal": "660 nm (RED) intranasal, 808 nm (INFRARED) extranasal"
    },
    pt: {
      "660 nm (ROJO)": "660 nm (VERMELHO)",
      "808 nm (INFRARROJO)": "808 nm (INFRAVERMELHO)",
      "660 y 808 nm (ROJO+INFRARROJO)": "660 e 808 nm (VERMELHO+INFRAVERMELHO)",
      "660 nm (ROJO) o 808 nm (INFRARROJO) transmeatal, 808 nm (INFRARROJO) retroauricular": "660 nm (VERMELHO) ou 808 nm (INFRAVERMELHO) transmeatal, 808 nm (INFRAVERMELHO) retroauricular",
      "660 nm (ROJO) mucosa sublingual, 808 nm (INFRARROJO) piso de boca/suprahioideos": "660 nm (VERMELHO) mucosa sublingual, 808 nm (INFRAVERMELHO) assoalho da boca/supra-hióideos",
      "660 nm (ROJO) intranasal, 808 nm (INFRARROJO) extranasal": "660 nm (VERMELHO) intranasal, 808 nm (INFRAVERMELHO) extranasal"
    }
  },

  // Energía N/A
  naEnergy: {
    es: "N/A (basado en tiempo de aplicación)",
    en: "N/A (based on application time)",
    pt: "N/A (baseado no tempo de aplicação)"
  }
};

// Helper para traducir longitudes de onda
export const translateWavelength = (wavelength, language = 'es') => {
  if (!wavelength) return wavelength;
  return protocolTranslations.wavelengths[language]?.[wavelength] || wavelength;
};

// Helper para traducir energía
export const translateEnergy = (energy, language = 'es') => {
  if (!energy) return energy;
  if (energy === protocolTranslations.naEnergy.es) {
    return protocolTranslations.naEnergy[language];
  }
  return energy;
};