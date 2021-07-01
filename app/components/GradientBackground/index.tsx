import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'

interface Props {
    children?: React.ReactNode
    angle?: number
    angleCenter?: {x: number; y: number}
}
const GradientBackground = (props: Props) => {
    const {themeColors} = useTheme()

    return (
        <LinearGradient
            angle={props.angle || 315}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={{width: '100%', flex: 1}}
            colors={themeColors.backgroundgradient}
            locations={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]}>
            {props.children}
        </LinearGradient>
    )
}

export default GradientBackground
