import React, {useEffect, useState} from 'react'
import {
    View,
    Image,
    Dimensions,
    FlatList,
    StyleSheet,
    StatusBar,
    Animated,
} from 'react-native'
import ImageColors from 'react-native-image-colors'

import {LINEAR_GRADIENT_LOCATIONS_4} from '../../constants'
import {DoubleTap, GradientBackground, ProgressSlider} from '../../components'
import {usePlayer, usePrompt, useTheme} from '../../context'
import {DominatingColors} from '../../interfaces'
import {
    sortColorsBasedOnBrightness,
    getHightQualityImageFromLink,
} from '../../utils'

const {width} = Dimensions.get('screen')
const IMAGE_WIDTH = width * 0.7
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2 // same as the WIDTH of image
const IMAGE_BORDER_RADIUS = 10
const IMAGE_BLUR_RADIUS = 50

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current, nextSongsList} = usePlayer()
    const {prompt} = usePrompt()
    const {themeColors} = useTheme()

    const scrollX = React.useRef(new Animated.Value(0)).current

    const [colors, setColors] = useState<string[]>([
        themeColors.rgbstreakgradient[1],
        themeColors.rgbstreakgradient[2],
        themeColors.rgbstreakgradient[3],
        themeColors.rgbstreakgradient[5],
    ])

    // useEffect(() => {}, [nextSongsList[0].id])

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
            <View style={StyleSheet.absoluteFillObject}>
                {nextSongsList.map((song, _) => {
                    const inputRange = [
                        (_ - 1) * width,
                        _ * width,
                        (_ + 1) * width,
                    ]
                    const opacity = scrollX.interpolate({
                        inputRange: inputRange,
                        outputRange: [0, 1, 0],
                    })
                    return (
                        <Animated.Image
                            key={`${song.id}-${_}`}
                            style={[
                                StyleSheet.absoluteFillObject,
                                {
                                    opacity: opacity,
                                },
                            ]}
                            source={{uri: song.artwork}}
                            blurRadius={IMAGE_BLUR_RADIUS}
                        />
                    )
                })}
            </View>

            <Animated.FlatList
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                )}
                horizontal
                pagingEnabled
                bounces={true}
                showsHorizontalScrollIndicator={false}
                data={nextSongsList}
                keyExtractor={(item, _) => `${item.id}-${_}`}
                renderItem={({item}) => {
                    return (
                        <View
                            style={{
                                width: width,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    width: IMAGE_WIDTH,
                                    height: IMAGE_HEIGHT,
                                    borderRadius: IMAGE_BORDER_RADIUS,
                                    overflow: 'hidden',
                                    elevation: 10,
                                }}>
                                <Image
                                    fadeDuration={1000}
                                    source={{uri: item.artwork}}
                                    style={{
                                        width: IMAGE_WIDTH,
                                        height: IMAGE_HEIGHT,
                                        borderRadius: IMAGE_BORDER_RADIUS,
                                        overflow: 'hidden',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </View>
                        </View>
                    )
                }}
            />

            <Image
                source={{uri: current.artwork}}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        opacity: 0,
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Player
