/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - user login / helps in authentication flow of the application
 */

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
} from '../../components'
import {
    useTheme,
    useApp,
    usePrompt,
    useUserData,
    useBackendApi,
} from '../../context'
import {
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
} from '../../constants/limits'
import {EMAIL_REGEX} from '../../constants'
import {isEmailBlocked} from '../../utils'
import {SIGN_IN_ROUTE_ENDPOINT} from '../../constants/endPoints'

interface LoginProps {
    navigation: any
}
const Login = (props: LoginProps) => {
    const {themeColors} = useTheme() // theme context api provider...
    const {setShowLoading} = useApp() // loader context api
    const {prompt} = usePrompt() // prompt context api
    const {setLocalUserData} = useUserData() // user data, load user data and many more
    const {makeApiRequestPOST} = useBackendApi() // to make API requests to the backend...

    const [user, setUser] = useState('sobhanbera258@gmail.com') // the username or email id field text...
    const [password, setPassword] = useState('sobhanber') // the password field text...

    /**
     * this is the main login function of the application
     * the checks are as follows...
     * 1. email and password should be present for regular signin option (not by OTP)
     * 2. email should be valid
     * 3. email should not be a temporary mail ID
     * 4. password length should be valid
     * 5. if the user provided an email checking if it is of correct length
     * if all the above checks are passed we could login the user with a api request...
     * some above checks are temporary changed to this
     * 2,3. check if the user text is a type of email the if it is a email check wheather it is a temporary mail if it is then don't continue else continue...
     */
    const LoginUser = () => {
        if (!user) {
            //  * 1. email should be present for regular signin option (not by OTP)
            prompt('Email is required for signing in.')
        } else if (EMAIL_REGEX.test(user) && isEmailBlocked(user)) {
            // 2. email should be valid
            // 3. email should not be a temporary mail ID
            // 2,3. check if the user text is a type of email the if it is a email check wheather it is a temporary mail if it is then don't continue else continue...
            prompt('Account will be blocked if you use this email.')
            // prompt('Enter a valid email ID.')
        } else if (EMAIL_REGEX.test(user) && user.length > MAX_EMAIL_LENGTH) {
            // 5. if the user provided an email checking if it is of correct length
            prompt('Valid email length must be under 320.')
        } else if (!password) {
            // 1. password should be present for regular signin option (not by OTP)
            prompt('Passoword is required for regular signing in.')
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            // 4. password length should be valid
            prompt('SHORT: Password length must be of 8-30 and alphanumeric.')
        } else if (password.length > MAX_PASSWORD_LENGTH) {
            // 4. password length should be valid
            prompt('LONG: Password length must be of 8-30 and alphanumeric.')
        } else {
            // all checks are passed we could login the user if the credentials are correct after
            // making api request to the backend
            makeApiRequestPOST(SIGN_IN_ROUTE_ENDPOINT, {
                user: user,
                password: password,
            })
                .then(res => {
                    const {code} = res.data
                    if (code === 'PROVIDED_INCOMPLETE_DATA') {
                        prompt('Something went wrong in your end.')
                    } else if (res.data.code === 'EMAIL_LENGTH_EXCEED') {
                        prompt(
                            'The account with this detail is blocked/deleted or may be now allowed.',
                        )
                    } else if (
                        res.data.code === 'SHORT_PASSWORD' ||
                        res.data.code === 'PASSWORD_LENGTH_EXCEED'
                    ) {
                        prompt('Wrong password. Please try again.')
                    } else if (res.data.code === 'SIGNIN_FAILED') {
                        prompt('Something went wrong. Please try again.')
                    } else if (res.data.code === 'USER_NOT_FOUND') {
                        prompt('No user account found with this data.')
                    } else if (res.data.code === 'WRONG_PASSWORD') {
                        prompt('Wrong password. Please try again.')
                    } else if (res.data.code === 'USER_ACCOUNT_IS_DISABLED') {
                        prompt(
                            'This account is disabled and not allowed to login.',
                        )
                    } else if (res.data.code === 'SUCCESS') {
                        prompt('User successfully logged in.')
                        setLocalUserData(JSON.stringify(res.data.data))
                    }
                })
                .catch(_err => {
                    prompt('Something went wrong. Please try again.')
                })
        }
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
                    headerTitle="Sign In"
                    goBack
                />

                <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                    <PaddingView padding="extra">
                        <SobyteTextInput
                            value={user}
                            onChangeText={e => setUser(e)}
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
                            onSubmitEditing={() => LoginUser()}
                            secureTextEntry={true}
                            reversedColor
                        />

                        <ScalerAuthButton
                            simpleGradientColor
                            title="Sign In"
                            onPress={() => {
                                Keyboard.dismiss()
                                LoginUser()
                            }}
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
