import React, {useEffect, useState} from 'react'
import {View, Alert, Dimensions} from 'react-native'

import ImageColors from 'react-native-image-colors'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import globalStyles from '../../styles/global.styles'
import {LINEAR_GRADIENT_LOCATIONS_4} from '../../constants'
import {DoubleTap, GradientBackground, ProgressSlider} from '../../components'
import {useMusicApi, usePlayer, usePrompt, useTheme} from '../../context'
import {DominatingColors} from '../../interfaces'
import {
    sortColorsBasedOnBrightness,
    getHightQualityImageFromLink,
} from '../../utils'
import {ImageBackground} from 'react-native'
import {parseNextPanel, parseSongSearchResult} from '../../api/parsers'

// const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = 210
const IMAGE_HEIGHT = IMAGE_WIDTH // same as the WIDTH of image
const IMAGE_BORDER_RADIUS = 12

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current} = usePlayer()
    const {prompt} = usePrompt()
    const {themeColors} = useTheme()

    const [colors, setColors] = useState<string[]>([
        themeColors.rgbstreakgradient[1],
        themeColors.rgbstreakgradient[2],
        themeColors.rgbstreakgradient[3],
        themeColors.rgbstreakgradient[5],
    ])

    useEffect(() => {
        if (current.artwork)
            ImageColors.getColors(
                getHightQualityImageFromLink(current.artwork, '450'),
                {
                    fallback: themeColors.rgbstreakgradient[0],
                    cache: false,
                    key: 'sobyte_music_player_color',
                },
            )
                .then((res: DominatingColors | any) => {
                    const sortedGradientColors = sortColorsBasedOnBrightness([
                        res.dominant,
                        res.vibrant,
                        res.darkVibrant,
                        res.darkMuted,
                    ])
                    setColors(sortedGradientColors)
                })
                .catch(err => {
                    if (String(err).includes('Connection closed')) {
                        prompt(
                            'Please check your internet connection.',
                            'warning',
                        )
                    }
                    console.log('ERROR in music player', err)
                    setColors([
                        themeColors.rgbstreakgradient[1],
                        themeColors.rgbstreakgradient[2],
                        themeColors.rgbstreakgradient[3],
                        themeColors.rgbstreakgradient[5],
                    ])
                })
    }, [current.artwork])

    return (
        <GradientBackground
            colors={colors}
            angle={180}
            location={LINEAR_GRADIENT_LOCATIONS_4}
            angleCenter={{x: 0, y: 0}}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ImageBackground
                source={{
                    uri: current.artwork,
                }}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: '75%',
                    // opacity: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 0,
                }}
                blurRadius={0}></ImageBackground>
        </GradientBackground>
    )
}

export default Player
