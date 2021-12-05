import React, {useEffect} from 'react'
import {Animated, StyleProp, StyleSheet} from 'react-native'

interface ScalerProps {
    children?: React.ReactNode
    containerStyle?: StyleProp<any>
    high?: number
    low?: number
}
export default function Scaler(props: ScalerProps) {
    const animation = new Animated.Value(0)
    const scale = animation.interpolate({
        inputRange: [0, props.low ?? 0.95],
        outputRange: [0.95, props.high ?? 1],
    })

    const continueAnimation = () =>
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start(runAnimation)

    const runAnimation = () =>
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start(continueAnimation)

    useEffect(() => {
        runAnimation()
    }, [])

    return (
        <Animated.View
            style={[
                styles.containerStyle,
                props.containerStyle,
                {transform: [{scale}]},
            ]}>
            {props.children}
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
