import React from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'
import {FontLucida, FontTahoma, FontUbuntu, FontVerdana} from '../../constants'

interface ButtonProps {
    title: string
    onPress: Function

    gradient?: boolean
    gradientAngle?: number
    gradientColor?: Array<string>
    simpleGradientColor?: boolean
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
                props.simpleGradientColor
                    ? [themeColors.primary.main[0], themeColors.primary.main[0]]
                    : props.gradientColor ?? [
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
            {props.buttonRight && (
                <View style={styles.iconHolder}>{props.buttonRight}</View>
            )}
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
        fontSize: 19,
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
