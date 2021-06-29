import React from 'react'
import {ImageBackground} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'

interface Props {
    children?: React.ReactChild
    angle?: number
    angleCenter?: {x: number; y: number}
    dark?: boolean
}
const GradientBackground = (props: Props) => {
    const {themeColors} = useTheme()

    return (
        <LinearGradient
            angle={props.dark ? 180 : 145}
            angleCenter={{x: 0.5, y: 0.5}}
            useAngle={true}
            style={{width: '100%', height: '100%'}}
            colors={
                props.dark
                    ? themeColors.darksurfacegradient
                    : [
                          themeColors.primary.main[0] + 'D7',
                          themeColors.secondary.main[0] + 'AF',
                          themeColors.primary.dark[0] + 'D7',
                          themeColors.primary.dark[0] + 'D7',
                          themeColors.primary.dark[0] + 'D7',
                          themeColors.primary.dark[0] + 'D7',
                          themeColors.primary.dark[0] + 'D7',
                          themeColors.primary.dark[0] + 'D7',
                      ]
            }>
            <ImageBackground
                source={require('../../assets/images/phone_screen.png')}
                style={globalStyles.fullImageBackground}
                blurRadius={5}>
                {props.children}
            </ImageBackground>
        </LinearGradient>
    )
}

export default GradientBackground
