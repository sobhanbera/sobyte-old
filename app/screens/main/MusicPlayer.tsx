import React, {useEffect, useState} from 'react'
import {View, Alert} from 'react-native'

import ImageColors from 'react-native-image-colors'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import globalStyles from '../../styles/global.styles'
import {LINEAR_GRADIENT_LOCATIONS_4} from '../../constants'
import {DoubleTap, GradientBackground, ProgressSlider} from '../../components'
import {usePlayer, usePrompt, useTheme} from '../../context'
import {DominatingColors} from '../../interfaces'
import {sortColorsBasedOnBrightness} from '../../utils'

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
            ImageColors.getColors(current.artwork, {
                fallback: themeColors.rgbstreakgradient[0],
                cache: false,
                key: 'sobyte_music_player_color',
            })
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
            {/* background image with blur */}
            <Image
                source={{
                    uri:
                        current.artwork ||
                        'https://lh3.googleusercontent.com/fx6kz_AXXbWVglzvmChcvFRTwV_nFmSAjuyYUO2XTqO_Es9hv4Fe6scz1pTfNWw6hSWob6gtpsft3vZm=w400-h400-l90-rj',
                }}
                style={[
                    // StyleSheet.absoluteFillObject,
                    {
                        height: 200,
                        width: 200,
                        borderRadius: 6,
                        overflow: 'hidden',
                    },
                ]}
                blurRadius={0}
            />

            {/* <LinearGradient
                useAngle
                angle={180}
                angleCenter={{x: 0.5, y: 0}}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                colors={colors}
                locations={LINEAR_GRADIENT_LOCATIONS_4}>
                
            </LinearGradient> */}

            {/* <DoubleTap
                onDoubleTap={() => {
                    console.log('TAPPED')
                }}> */}
            {/* <ProgressSlider /> */}

            {/* <ImageBackground
                    source={{
                        uri:
                            current.artwork ||
                            'https://lh3.googleusercontent.com/fx6kz_AXXbWVglzvmChcvFRTwV_nFmSAjuyYUO2XTqO_Es9hv4Fe6scz1pTfNWw6hSWob6gtpsft3vZm=w400-h400-l90-rj',
                    }}
                    resizeMode="cover"
                    style={globalStyles.fullImageBackground}
                    blurRadius={MUSIC_PLAYER_BLUR + 30}>
                    <View></View>
                </ImageBackground> */}
            {/* </DoubleTap> */}
        </GradientBackground>
    )
}

export default Player
