import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en';

//import Backend from 'i18next-http-backend';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en,
	fr: {
		translation: {
			"Welcome to React": "Bienvenue à React et react-i18next"
		}
	}
};

i18n
	// load translation using http
	//    -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
	// learn more: https://github.com/i18next/i18next-http-backend
	// want your translations to be loaded from a professional CDN?
	//    => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
//	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		resources,
		fallbackLng: 'en',
		debug: true,

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		}
	});


export default i18n;