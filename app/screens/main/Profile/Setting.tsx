import React, {useState} from 'react'
import {ScrollView, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    Area,
    BottomSheet,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {useSetting, useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'
import {
    AUDIO_QUALITY_STORAGE_KEY,
    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
} from '../../../constants'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {setSetting, changeLanguage} = useSetting()

    const [languageVisible, setLanguageVisible] = useState(false)
    const [audioQualityVisible, setAudioQualityVisible] = useState(false)
    const [imageQualityVisible, setImageQualityVisible] = useState(false)

    return (
        <GradientBackground uniformColor>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderMain
                    navigation={props.navigation}
                    title={t('setting:settings')}
                    color={themeColors.white[0] + 'DD'}
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

                <Area icon spacing onPress={() => setImageQualityVisible(true)}>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:image_optimization')}
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

            <BottomSheet
                isVisible={imageQualityVisible}
                setVisible={setImageQualityVisible}
                buttons={[
                    {
                        text: t('setting:extreme') + ' - 720px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '720',
                            )
                        },
                    },
                    {
                        text: t('setting:very_high_quality') + ' - 512px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '512',
                            )
                        },
                    },
                    {
                        text: t('setting:high_quality') + ' - 420px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '420',
                            )
                        },
                    },
                    {
                        text: t('setting:medium_quality') + ' - 300px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '300',
                            )
                        },
                    },
                    {
                        text: t('setting:low_quality') + ' - 200px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '200',
                            )
                        },
                    },
                    {
                        text: t('setting:clear_quality') + ' - 120px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '120',
                            )
                        },
                    },
                    {
                        text: t('setting:blured_quality') + ' - 60px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '60',
                            )
                        },
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Setting
