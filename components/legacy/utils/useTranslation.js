/**
 * Load translations for a given locale
 * @param {string} locale - The locale code (en, pt, de)
 * @returns {Array} Translation array
 */
export function loadTranslations(locale = 'en') {
  try {
    const translations = require(`../translations/locales/${locale}.json`);
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    return require('../translations/locales/en.json');
  }
}

/**
 * Create a translation function for looking up translations by variable name
 * @param {Array} translations - The translation array
 * @returns {Function} Translation lookup function
 */
export function createTranslationFunction(translations) {
  /**
   * Look up a translation by variable name
   * @param {string} variable - The variable name to look up
   * @returns {string} The translated content, or the variable name if not found
   */
  return function t(variable) {
    const item = translations.find(t => t.variable === variable);
    return item?.content || variable;
  };
}

/**
 * Get translation function for a specific locale
 * @param {string} locale - The locale code (en, pt, de)
 * @returns {Function} Translation lookup function
 */
export function getTranslation(locale = 'en') {
  const translations = loadTranslations(locale);
  return createTranslationFunction(translations);
}
