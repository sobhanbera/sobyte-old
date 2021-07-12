import React, {useEffect, useState} from 'react'

import ImageColors from 'react-native-image-colors'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import {ImageBackground} from 'react-native'
import globalStyles from '../../styles/global.styles'
import {MUSIC_PLAYER_BLUR} from '../../constants'
import {DoubleTap, GradientBackground, ProgressSlider} from '../../components'
import {usePlayer, useTheme} from '../../context'
import {View} from 'react-native'
import {DominatingColors} from '../../interfaces'
import LinearGradient from 'react-native-linear-gradient'

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current, playonly} = usePlayer()
    const {themeColors} = useTheme()
    const [colors, setColor] = useState([
        themeColors.primary.dark[0],
        themeColors.secondary.main[0],
        themeColors.primary.main[0],
    ])

    const [backgroundColor, setBackgroundColors] = useState<string[]>(
        themeColors.backgroundgradient,
    )

    useEffect(() => {
        if (current.artwork)
            ImageColors.getColors(current.artwork, {
                fallback: themeColors.primary.dark[0],
                cache: false,
                key: 'sobyte_music_player_color',
            })
                .then((res: any) => {
                    console.log(current.title, res)
                    setColor([
                        res.lightVibrant,
                        // res.vibrant,
                        res.dominant,
                        res.darkVibrant,
                    ])
                })
                .catch(err => {
                    setBackgroundColors(themeColors.backgroundgradient)
                })
    }, [current.artwork])

    return (
        <GradientBackground colors={backgroundColor}>
            {/* background image with blur */}

            <LinearGradient
                useAngle
                angle={180}
                angleCenter={{x: 0.5, y: 0.5}}
                style={{flex: 1, justifyContent: 'center'}}
                colors={colors}>
                <Image
                    source={{
                        uri:
                            current.artwork ||
                            'https://lh3.googleusercontent.com/fx6kz_AXXbWVglzvmChcvFRTwV_nFmSAjuyYUO2XTqO_Es9hv4Fe6scz1pTfNWw6hSWob6gtpsft3vZm=w400-h400-l90-rj',
                    }}
                    style={[
                        // StyleSheet.absoluteFillObject,
                        {
                            height: 300,
                        },
                    ]}
                    blurRadius={0}
                />
            </LinearGradient>

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
