import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useTranslation} from 'react-i18next'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {AuthButton, Scaler} from '../../components'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {T_C_PrivacyPolicy} from '../../components'
import {DEFAULT_ICON_SIZE} from '../../constants'

interface IntroProps {
    navigation: any
}
const Intro = (props: IntroProps) => {
    const {themeColors} = useTheme()
    const {t} = useTranslation()

    return (
        <LinearGradient
            angle={315}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={{width: '100%', flex: 1}}
            colors={themeColors.backgroundgradient}
        >
            <View style={styles.wrapper}>
                <View>
                    <Scaler onPress={() => {}} scale={1}>
                        <Image
                            style={styles.appLogo}
                            source={require('../../assets/images/logo_name.png')}
                        />
                    </Scaler>
                    <Text style={[globalStyles.whiteText, styles.detailsText]}>
                        {t('appSlogan')}
                    </Text>
                </View>

                <View>
                    <View style={styles.buttonHolder}>
                        <Scaler
                            onPress={() =>
                                props.navigation.navigate('Register')
                            }
                            touchableOpacity={0.95}
                            scale={0.97}
                            center
                            containerStyle={globalStyles.circle}
                        >
                            <AuthButton
                                buttonRight={
                                    <Icon
                                        name="login"
                                        size={DEFAULT_ICON_SIZE}
                                        color={'white'}
                                    />
                                }
                                style={styles.button}
                                gradient
                                title="Register for free"
                                onPress={() => {
                                    console.log('EE')
                                }}
                            />
                        </Scaler>
                        <Scaler
                            onPress={() => props.navigation.navigate('Login')}
                            touchableOpacity={0.95}
                            scale={0.97}
                            center
                            containerStyle={globalStyles.circle}
                        >
                            <AuthButton
                                buttonRight={
                                    <Icon
                                        name="alternate-email"
                                        size={DEFAULT_ICON_SIZE}
                                        color={'white'}
                                    />
                                }
                                style={styles.button}
                                gradient
                                simpleGradientColor
                                gradientAngle={4}
                                title="Login with Email"
                                onPress={() => {
                                    console.log('EE')
                                }}
                            />
                        </Scaler>
                    </View>

                    <T_C_PrivacyPolicy padding={10} />
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    appLogo: {
        width: 111.71, // real width - 782, multiple - 7
        height: 36.5, // real height - 255.5, multiple - 7
        marginVertical: 22,
    },
    detailsText: {
        fontSize: 55,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonHolder: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 150,
    },
    button: {
        marginVertical: 10,
    },

    privacyHolder: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    privacyAndTCText: {
        color: '#afafaf',
        fontFamily: 'Ubuntu Light',
        textAlign: 'center',
        // lineHeight: 22,
        fontSize: 14,
    },
    privacyKeyWords: {
        textDecorationLine: 'underline',
    },
})

export default Intro
