import React from 'react'
import {
    Button,
    StyleProp,
    StyleSheet,
    StyleSheetProperties,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../themes/ThemeProvider'
import {FontLucida, FontTahoma, FontUbuntu, FontVerdana} from '../../constants'

interface ButtonProps {
    title: string
    onPress: Function

    gradient?: boolean
    gradientAngle?: number
    gradientColor?: Array<string>
    style?: StyleProp<ViewStyle>
    touchableButtonTextStyle?: StyleProp<TextStyle>

    buttonRight?: React.ReactNode
}
const AuthButton = (props: ButtonProps) => {
    const {themeColors} = useTheme()
    return props.gradient ? (
        <LinearGradient
            useAngle={true}
            angle={props.gradientAngle ?? 184}
            angleCenter={{x: 0.5, y: 0.5}}
            style={[props.style, styles.touchableButton]}
            colors={
                props.gradientColor ?? [
                    themeColors.primary.main[0],
                    themeColors.secondary.main[0],
                ]
            }>
            <Text
                style={[
                    props.touchableButtonTextStyle,
                    styles.touchableButtonText,
                ]}>
                {props.title}
            </Text>
            <View style={styles.iconHolder}>{props.buttonRight}</View>
        </LinearGradient>
    ) : (
        <View style={[props.style, styles.touchableButton]}>
            <Text
                style={[
                    props.touchableButtonTextStyle,
                    styles.touchableButtonText,
                ]}>
                {props.title}
            </Text>
            <View style={styles.iconHolder}>{props.buttonRight}</View>
        </View>
    )
}
const styles = StyleSheet.create({
    touchableButton: {
        borderRadius: 1000,
        overflow: 'hidden',
        width: '100%',
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableButtonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: FontLucida,
        flex: 1,
    },
    iconHolder: {
        marginRight: 15,
    },
})

export default AuthButton
