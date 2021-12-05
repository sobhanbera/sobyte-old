import React, {useState} from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FeatherIcon from 'react-native-vector-icons/Feather'

import {
    Header,
    PaddingView,
    SobyteTextInput,
    ScalerAuthButton,
    SobyteAlertBox,
} from '../../components'

import {useTheme, useApp} from '../../context'

interface RegisterProps {
    navigation: any
}
const Register = (props: RegisterProps) => {
    const {themeColors} = useTheme()
    const {setShowLoading} = useApp()
    const [visible, setVisibility] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    const RegisterNewUser = () => {
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
                    headerTitle="Sign Up"
                    goBack
                    rightIconsList={[
                        <FeatherIcon
                            name={hidePassword ? 'eye' : 'eye-off'}
                            size={20}
                            color={themeColors.white[0]}
                            onPress={() => setHidePassword(hide => !hide)}
                        />,
                    ]}
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
                        <SobyteTextInput
                            value={password}
                            onChangeText={e => setPassword(e)}
                            placeholder="Password"
                            returnKeyType="go"
                            onSubmitEditing={() => RegisterNewUser()}
                            secureTextEntry={true}
                            reversedColor
                        />
                        <ScalerAuthButton
                            simpleGradientColor
                            title="Sign Up"
                            onPress={() => RegisterNewUser()}
                            gradient
                            scale={0.95}
                        />
                    </PaddingView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default Register
