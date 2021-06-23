import React from 'react'
import {
    Animated,
    StyleProp,
    StyleSheet,
    StyleSheetProperties,
    TouchableOpacity,
} from 'react-native'

interface ScalerProps {
    buttonStyle?: StyleProp<any>
    children?: React.ReactNode
    containerStyle?: StyleProp<any>
    scale?: number
    touchableOpacity?: number
    onPress?: Function
    onLongPress?: Function
    center?: boolean
}
export default function Scaler(props: ScalerProps) {
    const animation = new Animated.Value(0)
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, props.scale ?? 0.9],
    })

    const onPressIn = () =>
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

    const onPressOut = () =>
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start()

    return (
        <Animated.View
            style={[
                styles.containerStyle,
                props.containerStyle,
                {transform: [{scale}]},
            ]}>
            {props.onPress && props.onLongPress ? (
                <TouchableOpacity
                    style={[
                        props.center ? styles.buttonStyle : {},
                        props.buttonStyle,
                    ]}
                    activeOpacity={props.touchableOpacity ?? 0.85}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => props.onPress()}
                    onLongPress={() => props.onLongPress()}>
                    {props.children}
                </TouchableOpacity>
            ) : props.onPress ? (
                <TouchableOpacity
                    style={[
                        props.center ? styles.buttonStyle : {},
                        props.buttonStyle,
                    ]}
                    activeOpacity={props.touchableOpacity ?? 0.85}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => props.onPress()}>
                    {props.children}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[
                        props.center ? styles.buttonStyle : {},
                        props.buttonStyle,
                    ]}
                    activeOpacity={props.touchableOpacity ?? 0.85}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}>
                    {props.children}
                </TouchableOpacity>
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        overflow: 'hidden',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
