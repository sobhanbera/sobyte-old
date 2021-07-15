import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import locale from 'react-native-locale-detector'
import AsyncStorage from '@react-native-community/async-storage'

import en from './en.json'
import hi from './hi.json'

import {LANGUAGE_CODE_STORAGE_KEY} from '../constants'

/**
 * locale system language detector
 */
const languageDetector = {
    init: Function.prototype,
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: async callback => {
        const savedDataJSON = await AsyncStorage.getItem(
            LANGUAGE_CODE_STORAGE_KEY,
        )
        const lng = savedDataJSON ? savedDataJSON : null
        const selectLanguage = lng || locale
        callback(selectLanguage)
    },
    cacheUserLanguage: () => {},
}

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        react: {
            useSuspense: false,
        },
        resources: {en, hi},

        ns: ['common'],
        defaultNS: 'common',

        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        },
    })

export default i18n
