import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'

import {
    THEME_STORAGE_KEY,
    AUDIO_QUALITY_STORAGE_KEY,
    LANGUAGE_CODE_STORAGE_KEY,
} from '../constants'

type ThemeType = 'd' | 'l' | 'c'
type AudioQualityType = 'e' | 'g' | 'p' | 'a'
type LanguageType = 'en' | 'hi'

interface SettingsProviderContextProps {
    theme: ThemeType
    audioQuality: AudioQualityType //extreme, good, poor, auto
    language: LanguageType // language code this is available in i18n.js
    setSetting: Function

    changeLanguage: Function
}
const SettingsProviderContext =
    React.createContext<SettingsProviderContextProps>({
        theme: 'd',
        audioQuality: 'a',
        language: 'en',
        setSetting: (key: string, value: string) => {},
        changeLanguage: (langCode: LanguageType) => {},
    })

interface Props {
    children?: React.ReactChild
}
const SettingsProvider = (props: Props) => {
    const {i18n} = useTranslation()
    const [theme, setTheme] = useState<ThemeType>('d')
    const [audioQuality, setAudioQuality] = useState<AudioQualityType>('g')
    const [language, setLanguage] = useState<LanguageType>('en')

    const changeLanguage = async (languageCode: LanguageType) => {
        await i18n.changeLanguage(languageCode, async (err, t) => {
            setLanguage(languageCode)
            await AsyncStorage.setItem(LANGUAGE_CODE_STORAGE_KEY, languageCode)
        })
    }

    const setSetting = async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value)
    }

    const getAllSettings = async () => {
        await AsyncStorage.multiGet(
            [
                THEME_STORAGE_KEY,
                LANGUAGE_CODE_STORAGE_KEY,
                AUDIO_QUALITY_STORAGE_KEY,
            ],
            (
                error,
                result: [
                    [string, ThemeType],
                    [string, LanguageType],
                    [string, AudioQualityType],
                ],
            ) => {
                setTheme(result[0][1] || 'd')
                setLanguage(result[1][1] || 'en')
                setAudioQuality(result[2][1] || 'a')
                console.log(result)
            },
        )
    }

    useEffect(() => {
        getAllSettings()
    }, [])

    const settingValues = {
        theme,
        audioQuality,
        language,
        setSetting,

        changeLanguage,
    }
    return (
        <SettingsProviderContext.Provider value={settingValues}>
            {props.children}
        </SettingsProviderContext.Provider>
    )
}

export default SettingsProvider
export const useSetting = () => React.useContext(SettingsProviderContext)
