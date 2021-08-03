import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'

import {
    THEME_STORAGE_KEY,
    AUDIO_QUALITY_STORAGE_KEY,
    LANGUAGE_CODE_STORAGE_KEY,
    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
    DEFAULT_IMAGE_QUALITY,
    BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
} from '../constants'
import {
    ImageQualityType,
    ThemeType,
    AudioQualityType,
    LanguageType,
} from '../interfaces'

interface SettingsProviderContextProps {
    theme: ThemeType
    audioQuality: AudioQualityType //extreme, good, poor, auto
    language: LanguageType // language code this is available in i18n.js
    imageQuality: ImageQualityType
    setSetting(key: string, value: string): any

    changeLanguage(language: LanguageType): any
}
export const SettingsProviderContext =
    React.createContext<SettingsProviderContextProps>({
        theme: 'd',
        audioQuality: 'a',
        language: 'en',
        imageQuality: '200',
        setSetting: (_key: string, _value: string) => {},
        changeLanguage: (_langCode: LanguageType) => {},
    })

interface Props {
    children?: React.ReactChild
}
const SettingsProvider = (props: Props) => {
    const {i18n} = useTranslation()
    const [theme, setTheme] = useState<ThemeType>('d')
    const [audioQuality, setAudioQuality] = useState<AudioQualityType>('g')
    const [language, setLanguage] = useState<LanguageType>('en')
    const [imageQuality, setImageQuality] = useState<ImageQualityType>('200')

    const changeLanguage = async (languageCode: LanguageType) => {
        await i18n.changeLanguage(languageCode, async (_err, _t) => {
            setLanguage(languageCode)
            await AsyncStorage.setItem(LANGUAGE_CODE_STORAGE_KEY, languageCode)
        })
    }

    const setSetting = async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value)
        getAllSettings()
    }

    const getAllSettings = async () => {
        await AsyncStorage.multiGet(
            [
                THEME_STORAGE_KEY,
                LANGUAGE_CODE_STORAGE_KEY,
                AUDIO_QUALITY_STORAGE_KEY,
                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
            ],
            (_err, response: any) => {
                setTheme(response[0][1] || 'd')
                setLanguage(response[1][1] || 'en')
                setAudioQuality(response[2][1] || 'a')
                setImageQuality(response[3][1] || DEFAULT_IMAGE_QUALITY)
                console.log(response)
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
        imageQuality,
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
