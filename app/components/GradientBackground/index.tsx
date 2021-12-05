import React from 'react'
import {ViewStyle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'

interface Props {
    style?: ViewStyle
    children?: React.ReactNode
    angle?: number
    angleCenter?: {x: number; y: number}
    uniformColor?: boolean
    colors?: string[]
    location?: number[]
}
const GradientBackground = React.memo((props: Props) => {
    const {themeColors, randomGradient} = useTheme()

    // render a random gradient background...
    return (
        <LinearGradient
            angle={props.angle || 315}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={[{width: '100%', flex: 1}, props.style]}
            // colors uniform color will be changed in future according to light or dark theme
            colors={
                props.colors
                    ? props.colors
                    : props.uniformColor
                    ? [themeColors.surfacelight[0], themeColors.surfacelight[0]]
                    : randomGradient
            }
            locations={
                props.colors && props.location
                    ? props.location
                    : props.uniformColor
                    ? [0, 0.5]
                    : [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
            }>
            {props.children}
        </LinearGradient>
    )
})

export default GradientBackground
