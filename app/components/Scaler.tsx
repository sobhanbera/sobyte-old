import React from 'react'
import {
    Animated,
    StyleProp,
    StyleSheet,
    StyleSheetProperties,
    TouchableOpacity,
} from 'react-native'

export interface ScalerProps {
    buttonStyle?: StyleProp<any>
    children?: React.ReactNode
    containerStyle?: StyleProp<any>
    scale?: number
    touchableOpacity?: number
    onLongPress?: Function
    onPress?: Function
}

export default function Scaler(props: ScalerProps) {
    const animation = new Animated.Value(0)
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, props.scale ?? 0.9],
    })

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }
    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }

    return (
        <Animated.View
            style={[
                styles.containerStyle,
                props.containerStyle,
                {transform: [{scale}]},
            ]}>
            <TouchableOpacity
                style={[styles.buttonStyle, props.buttonStyle]}
                activeOpacity={props.touchableOpacity ?? 0.85}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => props.onPress ?? {}}
                onLongPress={() => props.onLongPress ?? {}}>
                {props.children}
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 100,
        width: 100,
        backgroundColor: '#7f7f7f',
        marginBottom: 20,
        overflow: 'hidden',
        borderRadius: 10,
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
