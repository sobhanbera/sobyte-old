import React, {useCallback, useEffect, useRef, useState} from 'react'
import {KeyboardAvoidingView, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
    Header,
    PaddingView,
    SobyteTextInput,
    ScalerAuthButton,
} from '../../components'

import {useTheme} from '../../themes/ThemeProvider'
import {Lrc, parseLrc, useLrc} from 'react-native-lrc'

interface RegisterProps {
    navigation: any
}
const Register = (props: RegisterProps) => {
    const {themeColors} = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const lineRenderer = useCallback(
        ({lrcLine: {millisecond, content}, index, active}) => (
            <Text
                style={{
                    textAlign: 'center',
                    color: active ? 'green' : 'inherit',
                }}>
                {content}
            </Text>
        ),
        [],
    )

    const onCurrentLineChange = useCallback(
        ({lrcLine: {millisecond, content}, index}) =>
            console.log(index, millisecond, content),
        [],
    )
    const adf = useLrc('[00:00:00] Line1 [00:01:00] Line2 [00:02:00] Line3')
    useEffect(() => {
        console.log(
            parseLrc('[00:00:00] Line1 [00:01:00] Line2 [00:02:00] Line3'),
            adf,
        )
    }, [])

    return (
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
            <LinearGradient
                angle={0}
                angleCenter={{x: 0.5, y: 0.5}}
                useAngle={true}
                style={{width: '100%', flex: 1}}
                colors={themeColors.backgroundgradient}>
                <Header
                    navigation={props.navigation}
                    headerTitle="Sign Up"
                    goBack
                    transparency={'00'}
                />

                <PaddingView padding="extra">
                    <SobyteTextInput
                        value={email}
                        onChangeText={e => setEmail(e)}
                        keyboardType="email-address"
                    />
                    <SobyteTextInput
                        value={password}
                        onChangeText={e => setPassword(e)}
                        textContentType="password"
                        keyboardType="visible-password"
                    />
                    <ScalerAuthButton
                        simpleGradientColor
                        title="Sign Up"
                        onPress={() => {}}
                        gradient
                        scale={0.95}
                    />
                </PaddingView>

                <Lrc
                    style={{height: 500}}
                    lrc={'[00:00:00] Line1 [00:01:00] Line2 [00:02:00] Line3'}
                    currentTime={340}
                    lineHeight={16}
                    lineRenderer={lineRenderer}
                    onCurrentLineChange={onCurrentLineChange}
                    activeLineHeight={20}
                    autoScrollAfterUserScroll={false}
                />
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Register
