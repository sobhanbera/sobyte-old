import React from 'react'
import {StyleProp, TextStyle, ViewStyle, View} from 'react-native'

import {AuthButton, Scaler} from '../'
import globalStyles from '../../styles/global.styles'

interface ScalerAuthButtonProps {
    title: string
    buttonOnPress?: Function
    gradient?: boolean
    gradientAngle?: number
    gradientColor?: Array<string>
    simpleGradientColor?: boolean
    style?: StyleProp<ViewStyle>
    touchableButtonTextStyle?: StyleProp<TextStyle>
    buttonRight?: React.ReactNode

    buttonStyle?: StyleProp<any>
    children?: React.ReactNode
    containerStyle?: StyleProp<any>
    scale?: number
    touchableOpacity?: number
    onPress: Function
    onLongPress?: Function
    center?: boolean

    navigation?: any
}
const ScalerAuthButton: React.FC<ScalerAuthButtonProps> = props => {
    return (
        <View style={globalStyles.scalerAuthButtonHolder}>
            <Scaler
                buttonStyle={props.buttonStyle}
                containerStyle={props.containerStyle}
                scale={props.scale}
                touchableOpacity={props.touchableOpacity}
                onPress={props.onPress}
                onLongPress={props.onLongPress}
                center={props.center}
            >
                <AuthButton
                    simpleGradientColor={props.simpleGradientColor}
                    title={props.title}
                    onPress={() =>
                        props.buttonOnPress ? props.buttonOnPress() : {}
                    }
                    gradient={props.gradient}
                    gradientAngle={props.gradientAngle}
                    gradientColor={props.gradientColor}
                    style={props.style}
                    touchableButtonTextStyle={props.touchableButtonTextStyle}
                    buttonRight={props.buttonRight}
                />
            </Scaler>
        </View>
    )
}

export default ScalerAuthButton
