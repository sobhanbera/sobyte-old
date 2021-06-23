import React, {Component} from 'react'
import {StyleSheet, Animated} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
})

export class GradientHelper extends Component {
    render() {
        const {
            style,
            color1,
            color2,
            start = {x: 0, y: 0},
            end = {x: 0, y: 1},
        } = this.props
        return (
            <LinearGradient
                colors={[color1, color2]}
                start={start}
                end={end}
                style={style}
            />
        )
    }
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper)

export class AnimatedGradient extends Component {
    constructor(props) {
        super(props)

        const {colors} = props
        this.state = {
            prevColors: colors,
            colors,
            tweener: new Animated.Value(0),
        }
    }

    static getDerivedStateFromProps(props, state) {
        const {colors: prevColors} = state
        const {colors} = props
        const tweener = new Animated.Value(0)
        return {
            prevColors,
            colors,
            tweener,
        }
    }

    componentDidUpdate() {
        const {tweener} = this.state
        Animated.timing(tweener, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    render() {
        const {tweener, prevColors, colors} = this.state

        const {style} = this.props

        const color1Interp = tweener.interpolate({
            inputRange: [0, 1],
            outputRange: [prevColors[0], colors[0]],
        })

        const color2Interp = tweener.interpolate({
            inputRange: [0, 1],
            outputRange: [prevColors[1], colors[1]],
        })

        return (
            <AnimatedGradientHelper
                style={style || styles.component}
                color1={color1Interp}
                color2={color2Interp}
            />
        )
    }
}
