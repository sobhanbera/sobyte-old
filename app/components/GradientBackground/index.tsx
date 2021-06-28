import React from 'react'
import {View, Text, Easing} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {easeGradient} from 'react-native-easing-gradient'

import {useTheme} from '../../context'

interface Props {
    children?: React.ReactChild
    angle?: number
    angleCenter?: {x: number; y: number}
}
const GradientBackground = (props: Props) => {
    const {themeColors} = useTheme()
    const {colors, locations} = easeGradient({
        colorStops: {
            0: {
                color: themeColors.surfacegradient[0],
            },
            1: {
                color: themeColors.surfacegradient[1],
            },
            2: {
                color: themeColors.surfacegradient[2],
            },
            3: {
                color: themeColors.surfacegradient[3],
            },
            4: {
                color: themeColors.surfacegradient[4],
            },
            // 5: {
            //     color: themeColors.surfacegradient[5],
            // },
            // 6: {
            //     color: themeColors.surfacegradient[6],
            // },
            // 7: {
            //     color: themeColors.surfacegradient[7],
            // },
        },

        easing: Easing.ease,
    })

    return (
        <LinearGradient
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={{width: '100%', height: '100%'}}
            colors={themeColors.surfacegradient}
            locations={[0, 0.3, 0.55, 0.72, 0.81, 1]}>
            {props.children}
        </LinearGradient>
    )
}

export default GradientBackground
