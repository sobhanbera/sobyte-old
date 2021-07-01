import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    Area,
    BottomSheet,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {usePrompt, useSetting, useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'
import {AUDIO_QUALITY_STORAGE_KEY} from '../../../constants'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {setSetting, theme, audioQuality, language, changeLanguage} =
        useSetting()

    const [themeVisible, setThemeVisible] = useState(false)
    const [audioQualityVisible, setAudioQualityVisible] = useState(false)
    const [languageVisible, setLanguageVisible] = useState(false)

    return (
        <GradientBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderMain
                    navigation={props.navigation}
                    title={t('setting:settings')}
                    color={themeColors.white[0]}
                />

                <Area icon spacing onPress={() => setLanguageVisible(true)}>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:app_language')}
                    </Text>
                </Area>

                <Area icon spacing onPress={() => setAudioQualityVisible(true)}>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:choose_audio_quality')}
                    </Text>
                </Area>
            </ScrollView>

            <BottomSheet
                isVisible={languageVisible}
                setVisible={setLanguageVisible}
                buttons={[
                    {
                        text: t('setting:default_app_language'),
                        onPress: () => changeLanguage('en'),
                    },
                    {
                        text: t('common:langs:english'),
                        onPress: () => changeLanguage('en'),
                    },
                    {
                        text: t('common:langs:hindi'),
                        onPress: () => {
                            changeLanguage('hi')
                        },
                    },
                ]}
            />

            <BottomSheet
                isVisible={audioQualityVisible}
                setVisible={setAudioQualityVisible}
                buttons={[
                    {
                        text: t('setting:extreme'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'e')
                        },
                    },
                    {
                        text: t('setting:good'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'g')
                        },
                    },
                    {
                        text: t('setting:poor'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'p')
                        },
                    },
                    {
                        text: t('setting:auto'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'a')
                        },
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Setting
