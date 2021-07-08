import React, {useEffect, useState} from 'react'
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native'

import {DoubleTap, GradientBackground, ProgressSlider} from '../../components'
import {usePlayer, usePrompt, useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {MUSIC_PLAYER_BLUR} from '../../constants'
import {DominatingColors} from '../../interfaces'
import ImageColors from 'react-native-image-colors'

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current, playonly} = usePlayer()
    const {themeColors} = useTheme()

    const [backgroundColor, setBackgroundColors] = useState<string[]>(
        themeColors.backgroundgradient,
    )

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            playonly()
        })

        console.log(current.artwork)

        if (current.artwork)
            ImageColors.getColors(current.artwork, {
                fallback: themeColors.primary.dark[0],
                cache: true,
                key: 'sobyte_music_player_color',
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    setBackgroundColors(themeColors.backgroundgradient)
                })
    }, [current.artwork])

    return (
        <GradientBackground colors={backgroundColor}>
            {/* background image with blur */}
            {/* <Image
                source={{
                    uri:
                        current.artwork ||
                        'https://lh3.googleusercontent.com/fx6kz_AXXbWVglzvmChcvFRTwV_nFmSAjuyYUO2XTqO_Es9hv4Fe6scz1pTfNWw6hSWob6gtpsft3vZm=w400-h400-l90-rj',
                }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={10}
            /> */}

            <DoubleTap
                onDoubleTap={() => {
                    console.log('TAPPED')
                }}>
                <ProgressSlider />

                {/* <ImageBackground
                    source={{
                        uri:
                            current.artwork ||
                            'https://lh3.googleusercontent.com/fx6kz_AXXbWVglzvmChcvFRTwV_nFmSAjuyYUO2XTqO_Es9hv4Fe6scz1pTfNWw6hSWob6gtpsft3vZm=w400-h400-l90-rj',
                    }}
                    resizeMode="cover"
                    style={globalStyles.fullImageBackground}
                    blurRadius={MUSIC_PLAYER_BLUR + 30}>
                </ImageBackground> */}
            </DoubleTap>
        </GradientBackground>
    )
}

export default Player
