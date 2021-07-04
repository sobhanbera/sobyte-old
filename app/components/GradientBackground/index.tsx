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
}
const GradientBackground = (props: Props) => {
    const {themeColors} = useTheme()

    return (
        <LinearGradient
            angle={props.angle || 315}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={[{width: '100%', flex: 1}, props.style]}
            // colors uniform color will be changed in future according to light or dark theme
            colors={
                props.uniformColor
                    ? ['#000000', '#000000']
                    : themeColors.backgroundgradient
            }
            locations={
                props.uniformColor
                    ? [0, 0.5]
                    : [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
            }>
            {props.children}
        </LinearGradient>
    )
}

export default GradientBackground
