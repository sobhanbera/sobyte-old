import React, {useState} from 'react'
import {Dimensions, ScrollView, Text, ToastAndroid, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    Area,
    BottomSheet,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {useSetting, useTheme, useUserData} from '../../../context'
import globalStyles from '../../../styles/global.styles'
import {
    AUDIO_QUALITY_STORAGE_KEY,
    BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
    DefaultStatusBarComponent,
    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
} from '../../../constants'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {setSetting, changeLanguage} = useSetting()
    const {logout} = useUserData()

    const [languageVisible, setLanguageVisible] = useState<boolean>(false)
    const [audioQualityVisible, setAudioQualityVisible] =
        useState<boolean>(false)
    const [imageQualityVisible, setImageQualityVisible] =
        useState<boolean>(false)
    const [backgroundThemeVisible, setBackgroundThemeVisible] =
        useState<boolean>(false)

    const [customImageQuality, setCustomImageQuality] = useState<string>('')

    // function which toasts a message that some settings could only work on next app launch...
    function willWorkOnNextLaunch() {
        ToastAndroid.show(
            'Setting saved but will work on next launch.',
            ToastAndroid.LONG,
        )
    }

    return (
        <GradientBackground uniformColor>
            <DefaultStatusBarComponent
                backgroundColor={themeColors.surfacelight[0]}
            />
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

                <Area
                    icon
                    spacing
                    onPress={() => setBackgroundThemeVisible(true)}>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:customize_background_theme')}
                    </Text>
                </Area>

                {/* THIS IS AT THE LAST AND IS LOGOUT BUTTON.... */}
                <Area icon spacing onPress={() => logout()} danger>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:logout')}
                    </Text>
                </Area>
            </ScrollView>

            <BottomSheet
                isVisible={languageVisible}
                setVisible={setLanguageVisible}
                buttons={[
                    {
                        text: t('setting:default_app_language'), // default - english
                        onPress: () => changeLanguage('en'),
                    },
                    {
                        text: t('common:langs:english'), // english language
                        onPress: () => changeLanguage('en'),
                    },
                    {
                        text: t('common:langs:bengali'), // bengali language
                        onPress: () => {
                            changeLanguage('bn')
                        },
                    },
                    {
                        text: t('common:langs:hindi'), // hindi language
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
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'extreme')
                        },
                    },
                    {
                        text: t('setting:good'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'good')
                        },
                    },
                    {
                        text: t('setting:poor'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'poor')
                        },
                    },
                    {
                        text: t('setting:auto'),
                        onPress: () => {
                            setSetting(AUDIO_QUALITY_STORAGE_KEY, 'auto')
                        },
                    },
                ]}
            />

            <BottomSheet
                startingTextAlign
                isVisible={imageQualityVisible}
                setVisible={setImageQualityVisible}
                buttons={[
                    {
                        text: t('setting:extreme'),
                        extraText: '720px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '720',
                            )
                        },
                    },
                    {
                        text: t('setting:very_high_quality'),
                        extraText: '512px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '512',
                            )
                        },
                    },
                    {
                        text: t('setting:high_quality'),
                        extraText: '420px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '420',
                            )
                        },
                    },
                    {
                        text: t('setting:medium_quality'),
                        extraText: '300px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '300',
                            )
                        },
                    },
                    {
                        text: t('setting:low_quality'),
                        extraText: '200px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '200',
                            )
                        },
                    },
                    {
                        text: t('setting:clear_quality'),
                        extraText: '120px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '120',
                            )
                        },
                    },
                    {
                        text: t('setting:blurred_quality'),
                        extraText: '60px',
                        onPress: () => {
                            setSetting(
                                SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                '60',
                            )
                        },
                    },
                    {
                        text: customImageQuality,
                        onPress: () => {
                            if (
                                Number(customImageQuality) >= 60 &&
                                Number(customImageQuality) <= 720
                            ) {
                                setSetting(
                                    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                    customImageQuality,
                                )
                                setImageQualityVisible(false)
                            } else
                                ToastAndroid.show(
                                    t(
                                        'sentences:valid_number_above_60_below_720',
                                    ),
                                    ToastAndroid.SHORT,
                                )
                        },
                        type: 'input',
                        placeholder: 'Enter Custom Image Quality',
                        setText: setCustomImageQuality,
                        inputProps: {},
                        extraText: '90px',
                        errorText:
                            Number(customImageQuality) >= 512
                                ? t('sentences:increase_image_quality_warning')
                                : '',
                    },
                ]}
            />

            <BottomSheet
                isVisible={backgroundThemeVisible}
                setVisible={setBackgroundThemeVisible}
                extraFunction={willWorkOnNextLaunch}
                buttons={[
                    {
                        text: t('setting:random'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                '',
                            ),
                    },
                    {
                        text: t('setting:bisman'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'bisman',
                            ),
                    },
                    {
                        text: t('setting:flamingo'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'flamingo',
                            ),
                    },
                    {
                        text: t('setting:phoenix'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'phoenix',
                            ),
                    },
                    {
                        text: t('setting:emerald'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'emerald',
                            ),
                    },
                    {
                        text: t('setting:canary'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'canary',
                            ),
                    },
                    {
                        text: t('setting:celeste'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'celeste',
                            ),
                    },
                    {
                        text: t('setting:graphite'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'graphite',
                            ),
                    },
                    {
                        text: t('setting:disco'),
                        onPress: () =>
                            setSetting(
                                BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
                                'disco',
                            ),
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Setting

/**
 * // these gradient colors arrays must be of length 8 not >8 not <8 exactly =8
 * blueGradient: string[] // blue gradient colors, application_code_name - bisman
 * pinkGradient: string[] // pink gradient colors, application_code_name - flamingo
 * redGradient: string[] // red gradient colors, application_code_name - phoenix
 * greenGradient: string[] // green gradient colors, application_code_name - emerald
 * yellowGradient: string[] // yellow gradient colors, application_code_name - canary
 * cyanGradient: string[] // cyan gradient colors, application_code_name - celeste
 * greyGradient: string[] // grey gradient colors, application_code_name - graphite
 * mixGradient: string[] // mix gradient colors, application_code_name - disco
 */
