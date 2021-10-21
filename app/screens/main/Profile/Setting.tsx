import React, {useState} from 'react'
import {ScrollView, ToastAndroid} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    Area,
    AreaTitle,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {useSetting, useTheme, useUserData} from '../../../context'
import {
    AUDIO_QUALITY_STORAGE_KEY,
    BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
    DefaultStatusBarComponent,
    PaddingBottomView,
    SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY,
} from '../../../constants'
import {
    PROFILE_STACK__LANGUAGE_PICKER_SCREEN,
    PROFILE_STACK__SETTINGS_UPDATER_SCREEN,
} from '../../../constants/screens'
import AboutAppDetail from '../../../../app.data.details'

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
        props.navigation.navigate(PROFILE_STACK__SETTINGS_UPDATER_SCREEN, {
            ...dataForSettings,
            title,
        })
    }

    const openMusicLanguageChooser = () => {
        props.navigation.navigate(PROFILE_STACK__LANGUAGE_PICKER_SCREEN)
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

                {/* main settings of the application */}
                <AreaTitle title="Language" />

                {/* component to update the global application language  */}
                <Area
                    title={t('setting:app_language')}
                    description={"Update application's language"}
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
                    }
                />

                <Area
                    title={t('setting:Music Language')}
                    description={
                        'Choose your prefered/primary languages for tracks.'
                    }
                    onPress={() => openMusicLanguageChooser()}
                />

                <AreaTitle title="Data Saving" />
                {/* component to update audio quality throughout the application */}
                <Area
                    title={t('setting:choose_audio_quality')}
                    description={'Choose audio quality for music'}
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
                    }
                />
                {/* component to update image quality throughout the application */}
                <Area
                    title={t('setting:image_optimization')}
                    description={
                        'Choose the image quality to be loaded for songs'
                    }
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
                    }
                />

                <AreaTitle title="Customization" />
                {/* component to update theme throughout the application */}
                <Area
                    title={t('setting:customize_background_theme')}
                    description={
                        'Change global application theme according to your preference'
                    }
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
                    }
                />

                <AreaTitle title="Information" />
                <Area
                    icon={false}
                    disabled
                    title={t('setting:version')}
                    description={AboutAppDetail.version}
                    onPress={() => {}}
                />
                <Area
                    icon={false}
                    title={t('setting:terms_and_conditions')}
                    description={
                        'Information you must know before using this application.'
                    }
                    onPress={() => {}}
                />
                <Area
                    icon={false}
                    title={t('setting:privacy_policy')}
                    description={
                        'Our privacy policies. This is very important for both of us.'
                    }
                    onPress={() => {}}
                />
                <Area
                    title={t('setting:give_feedback')}
                    description={'We are always waiting for your response.'}
                    onPress={() => {}}
                />
                <Area
                    title={t('setting:support')}
                    description={
                        'Any difficulty using the app? Submit a query.'
                    }
                    onPress={() => {}}
                />
                <Area
                    icon={false}
                    title={t('setting:app info about contributors')}
                    description={
                        'Information you must know before using this application.'
                    }
                    onPress={() => {}}
                />

                <AreaTitle title="Danger" />
                {/* danger button for logging out user's account */}
                {/* THIS IS AT THE LAST AND IS LOGOUT BUTTON.... */}
                <Area
                    danger
                    title={t('setting:logout')}
                    description={'User data will be removed from your device.'}
                    onPress={() => logout()}
                />

                <PaddingBottomView />
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
