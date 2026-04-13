export function loadCountries(locale = 'en') {
  try {
    const countries = require(`../translations/langs/lists/countries-${locale}.json`);
    return countries;
  } catch (error) {
    console.error(`Failed to load countries for locale: ${locale}`, error);
    // Fallback to English
    return require('../translations/langs/lists/countries-en.json');
  }
}

export function loadCountriesSectionText(locale = 'en') {
  try {
    const sectionText = require(`../translations/langs/lists/countries-section-text.json`);
    // Find the object matching the locale's lang_code
    const localeText = sectionText.find(item => item.lang_code === locale);
    return localeText || sectionText.find(item => item.lang_code === 'en'); // Fallback to English
  } catch (error) {
    console.error(`Failed to load countries section text for locale: ${locale}`, error);
    return null;
  }
}

export function loadCountryContent(locale, langCodeLocal) {
  try {
    const content = require(`../translations/langs/countries/${locale}/${langCodeLocal}.json`);
    // Convert array to object for easy lookup by variable
    const contentObj = {};
    content.forEach(item => {
      contentObj[item.variable] = item.content;
    });
    return contentObj;
  } catch (error) {
    console.error(`Failed to load country content for ${locale}/${langCodeLocal}:`, error);
    return null;
  }
}

export function getAllCountrySlugs() {
  const locales = ['en', 'es', 'fr', 'pt'];
  const allSlugs = [];

  locales.forEach(locale => {
    try {
      const countries = require(`../translations/langs/lists/countries-${locale}.json`);
      countries.forEach(country => {
        allSlugs.push({
          slug: country.slug,
          locale: locale,
          lang_code_local: country.lang_code_local,
        });
      });
    } catch (error) {
      console.error(`Failed to load countries for ${locale}:`, error);
    }
  });

  return allSlugs;
}

export function getCountryBySlug(slug) {
  const locales = ['en', 'es', 'fr', 'pt'];

  for (const locale of locales) {
    try {
      const countries = require(`../translations/langs/lists/countries-${locale}.json`);
      const country = countries.find(c => c.slug === slug);
      if (country) {
        return { ...country, locale };
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

export function getNext4Countries(locale, currentLangCodeLocal) {
  try {
    const countries = require(`../translations/langs/lists/countries-${locale}.json`);
    const currentIndex = countries.findIndex(c => c.lang_code_local === currentLangCodeLocal);

    if (currentIndex === -1) {
      return countries.slice(0, 4);
    }

    const next4 = [];
    const totalCountries = countries.length;

    for (let i = 1; i <= 4; i++) {
      const nextIndex = (currentIndex + i) % totalCountries;
      next4.push(countries[nextIndex]);
    }

    return next4;
  } catch (error) {
    console.error(`Failed to get next 4 countries for ${locale}:`, error);
    return [];
  }
}
