import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import Entypo from 'react-native-vector-icons/Entypo'

import {
    Area,
    BottomSheet,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {usePrompt, useSetting, useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'
import {LANGUAGE_CODE_STORAGE_KEY} from '../../../constants'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {setSetting, theme, audioQuality, language} = useSetting()

    const [themeVisible, setThemeVisible] = useState(false)
    const [audioQualityVisible, setAudioQualityVisible] = useState(false)
    const [languageVisible, setLanguageVisible] = useState(false)

    return (
        <GradientBackground>
            <View>
                <HeaderMain
                    navigation={props.navigation}
                    title="Settings"
                    color={themeColors.white[0]}
                    backgroundColor={themeColors.background[0] + '80'}
                />

                <Area>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:choose_audio_quality')}
                    </Text>
                    <Entypo name="chevron-thin-right" size={20} color="grey" />
                </Area>
            </View>

            <BottomSheet
                isVisible={languageVisible}
                setVisible={setLanguageVisible}
                buttons={[
                    {
                        text: t('common:langs:english'),
                        onPress: () =>
                            setSetting(LANGUAGE_CODE_STORAGE_KEY, 'en'),
                    },
                    {
                        text: t('common:langs:hindi'),
                        onPress: () => {
                            console.log('a')
                        },
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Setting
