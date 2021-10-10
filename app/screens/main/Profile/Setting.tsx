import React, {useState} from 'react'
import {ScrollView, Text, ToastAndroid} from 'react-native'
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

    const [customImageQuality, setCustomImageQuality] = useState<string>('')

    // function which toasts a message that some settings could only work on next app launch...
    function willWorkOnNextLaunch() {
        ToastAndroid.show(
            'Setting saved but will work on next launch.',
            ToastAndroid.LONG,
        )
    }

    const openSettingsUpdater = (dataForSettings: any, title: string) => {
        props.navigation.navigate('settingsupdater', {
            ...dataForSettings,
            title,
        })
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

                {/* component to update the global application language  */}
                <Area
                    icon
                    spacing
                    onPress={() =>
                        openSettingsUpdater(
                            {
                                buttons: [
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
                                ],
                            },
                            t('setting:app_language'),
                        )
                    }>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:app_language')}
                    </Text>
                </Area>

                {/* component to update audio quality throughout the application */}
                <Area
                    icon
                    spacing
                    onPress={() =>
                        openSettingsUpdater(
                            {
                                buttons: [
                                    {
                                        text: t('setting:extreme'),
                                        onPress: () => {
                                            setSetting(
                                                AUDIO_QUALITY_STORAGE_KEY,
                                                'extreme',
                                            )
                                        },
                                    },
                                    {
                                        text: t('setting:good'),
                                        onPress: () => {
                                            setSetting(
                                                AUDIO_QUALITY_STORAGE_KEY,
                                                'good',
                                            )
                                        },
                                    },
                                    {
                                        text: t('setting:poor'),
                                        onPress: () => {
                                            setSetting(
                                                AUDIO_QUALITY_STORAGE_KEY,
                                                'poor',
                                            )
                                        },
                                    },
                                    {
                                        text: t('setting:auto'),
                                        onPress: () => {
                                            setSetting(
                                                AUDIO_QUALITY_STORAGE_KEY,
                                                'auto',
                                            )
                                        },
                                    },
                                ],
                            },
                            t('setting:choose_audio_quality'),
                        )
                    }>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:choose_audio_quality')}
                    </Text>
                </Area>

                {/* component to update image quality throughout the application */}
                <Area
                    icon
                    spacing
                    onPress={() =>
                        openSettingsUpdater(
                            {
                                buttons: [
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
                                                Number(customImageQuality) >=
                                                    60 &&
                                                Number(customImageQuality) <=
                                                    720
                                            ) {
                                                setSetting(
                                                    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
                                                    customImageQuality,
                                                )
                                            } else
                                                ToastAndroid.show(
                                                    t(
                                                        'sentences:valid_number_above_60_below_720',
                                                    ),
                                                    ToastAndroid.SHORT,
                                                )
                                        },
                                        type: 'input',
                                        placeholder:
                                            'Enter Custom Image Quality',
                                        setText: setCustomImageQuality,
                                        inputProps: {},
                                        extraText: '90px',
                                        errorText:
                                            Number(customImageQuality) >= 512
                                                ? t(
                                                      'sentences:increase_image_quality_warning',
                                                  )
                                                : '',
                                    },
                                ],
                            },
                            t('setting:choose_audio_quality'),
                        )
                    }>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:image_optimization')}
                    </Text>
                </Area>

                {/* component to update theme throughout the application */}
                <Area
                    icon
                    spacing
                    onPress={() =>
                        openSettingsUpdater(
                            {
                                extraFunction: willWorkOnNextLaunch,
                                buttons: [
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
                                ],
                            },
                            t('setting:choose_audio_quality'),
                        )
                    }>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:customize_background_theme')}
                    </Text>
                </Area>

                {/* danger button for logging out user's account */}
                {/* THIS IS AT THE LAST AND IS LOGOUT BUTTON.... */}
                <Area icon spacing onPress={() => logout()} danger>
                    <Text style={globalStyles.areaTitle}>
                        {t('setting:logout')}
                    </Text>
                </Area>
            </ScrollView>
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
