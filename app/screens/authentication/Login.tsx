import React, {useState} from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {
    Header,
    PaddingView,
    SobyteTextInput,
    ScalerAuthButton,
    SobyteAlertBox,
} from '../../components'

import {useTheme, useApp, useUserData, useBackendApi} from '../../context'

interface LoginProps {
    navigation: any
}
const Login = (props: LoginProps) => {
    const {themeColors} = useTheme()
    const {setShowLoading} = useApp()
    const {} = useUserData()
    const {} = useBackendApi()

    const [visible, setVisibility] = useState(false)

    const [email, setEmail] = useState('')

    const LoginUser = () => {
        console.log('USER REGISTRATION STARTED...')
        setVisibility(true)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                angle={320}
                angleCenter={{x: 0.5, y: 0.5}}
                useAngle={true}
                style={{width: '100%', flex: 1}}
                colors={themeColors.backgroundgradient}>
                <SobyteAlertBox
                    visible={visible}
                    setVisibility={setVisibility}
                    onlyConfirmButton
                />

                <Header
                    navigation={props.navigation}
                    headerTitle="Sign In"
                    goBack
                />

                <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                    <PaddingView padding="extra">
                        <SobyteTextInput
                            value={email}
                            onChangeText={e => setEmail(e)}
                            keyboardType="email-address"
                            placeholder="Email"
                            autoCompleteType="email"
                            autoFocus
                            secureTextEntry={false}
                            returnKeyType="go"
                        />

                        <ScalerAuthButton
                            simpleGradientColor
                            title="Get OTP"
                            onPress={() => LoginUser()}
                            gradient
                            scale={0.95}
                        />
                    </PaddingView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default Login
