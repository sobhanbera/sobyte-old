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
} from '../../components'

import {useTheme, useApp} from '../../context'

const lrcString = `[ti: I still love you]
    [ar:Wang Leehom]
    [al: full firepower, new song + selection]
    [by:Ouyang Peng]
    [00:01.17]Twinkle and twinkling, leaving traces of time 
    [00:07.29]The center of gravity of my world is still you
    [00:13.37]Year after year, it flies by in a blink of an eye
    [00:20.29]The only thing that never changes is constant change
    [00:27.14]I don’t look like myself before, and you don’t look like you
    [00:33.36]But in my eyes your smile is still beautiful
    [00:39.53]This time I can only go forward one direction clockwise
    [00:46.12]I don’t know how long it will take, so I have to let you know
    [00:51.82]I still love you, is the only way out
    [00:57.36]I still cherish every moment of happiness
    [01:04.65]Every breath, every movement, every expression
    [01:11.43]I will still love you in the end
    [01:18.08]Still love you, still love you 
    [01:25.58]I don’t look like myself before, and you don’t look like you
    [01:31.52]But in my eyes your smile is still beautiful
    [01:37.61]This time I can only go forward one direction clockwise
    [01:44.42]I don’t know how long it will take, so I have to let you know
    [01:50.18]I still love you, is the only way out
    [01:55.65]I still cherish every moment of happiness
    [02:02.84]Every breath, every movement, every expression
    [02:09.77]I will still love you in the end`

interface RegisterProps {
    navigation: any
}
const Register = (props: RegisterProps) => {
    const {themeColors} = useTheme()
    const {setShowLoading, setAlertTitle, Alert} = useApp()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    const RegisterNewUser = () => {
        console.log('USER REGISTRATION STARTED...')
        Alert(() => {
            console.log('asdf')
        }).show()
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                angle={320}
                angleCenter={{x: 0.5, y: 0.5}}
                useAngle={true}
                style={{width: '100%', flex: 1}}
                colors={themeColors.backgroundgradient}>
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
