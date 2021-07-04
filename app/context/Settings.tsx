import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-community/async-storage'

import {
    THEME_STORAGE_KEY,
    AUDIO_QUALITY_STORAGE_KEY,
    LANGUAGE_CODE_STORAGE_KEY,
    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
} from '../constants'

type ThemeType = 'd' | 'l' | 'c'
type AudioQualityType = 'e' | 'g' | 'p' | 'a'
type ImageQualityType = '420' | '300' | '200' | '120' | '60'

type LanguageType = 'en' | 'hi'

interface SettingsProviderContextProps {
    theme: ThemeType
    audioQuality: AudioQualityType //extreme, good, poor, auto
    language: LanguageType // language code this is available in i18n.js
    imageQuality: ImageQualityType
    setSetting: Function

    changeLanguage: Function
}
const SettingsProviderContext =
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
    }

    const getAllSettings = async () => {
        await AsyncStorage.multiGet(
            [
                THEME_STORAGE_KEY,
                LANGUAGE_CODE_STORAGE_KEY,
                AUDIO_QUALITY_STORAGE_KEY,
                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
            ],
            (_err, response: any) => {
                setTheme(response[0][1] || 'd')
                setLanguage(response[1][1] || 'en')
                setAudioQuality(response[2][1] || 'a')
                setImageQuality(response[3][1] || '200')
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
