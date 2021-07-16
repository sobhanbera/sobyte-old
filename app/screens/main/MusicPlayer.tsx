import React, {useEffect} from 'react'
import {View, Image, Dimensions, StyleSheet, Animated} from 'react-native'

import {usePlayer} from '../../context'

const {width} = Dimensions.get('screen')
const IMAGE_WIDTH = width * 0.65
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.071 // same as the WIDTH of image
const IMAGE_BORDER_RADIUS = 10
const IMAGE_BLUR_RADIUS = 50

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current, nextSongsList, playSongAtIndex, getTheIndexOfCurrentSong} =
        usePlayer()

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = React.useRef<Animated.FlatList>(null)

    useEffect(() => {
        if (current.url) {
            /**
             * now onwards we are not using this type of background
             */
            // ImageColors.getColors(
            //     getHightQualityImageFromLink(current.artwork, '450'),
            //     {
            //         fallback: themeColors.rgbstreakgradient[0],
            //         cache: false,
            //         key: 'sobyte_music_player_color',
            //     },
            // )
            //     .then((res: DominatingColors | any) => {
            //         const sortedGradientColors = sortColorsBasedOnBrightness([
            //             res.dominant,
            //             res.vibrant,
            //             res.darkVibrant,
            //             res.darkMuted,
            //         ])
            //         setColors(sortedGradientColors)
            //     })
            //     .catch(err => {
            //         if (String(err).includes('Connection closed')) {
            //             prompt(
            //                 'Please check your internet connection.',
            //                 'warning',
            //             )
            //         }
            //         setColors([
            //             themeColors.rgbstreakgradient[1],
            //             themeColors.rgbstreakgradient[2],
            //             themeColors.rgbstreakgradient[3],
            //             themeColors.rgbstreakgradient[5],
            //         ])
            //     })

            const currentSongIndex: any = getTheIndexOfCurrentSong()
            if (currentSongIndex !== -1) {
                // console.log(scrollReference.current)
            }
        }
    }, [current.artwork])

    /**
     * whenever the scroll position changes this code will be executed and change the song
     * according to the index or the position of scroll
     */
    const scrollChangedHandler = (event: any) => {
        const scrollPostion = event.nativeEvent.contentOffset.x
        const screenWidth = width
        if (scrollPostion % screenWidth === 0) {
            const songIndex = scrollPostion / screenWidth
            const currentSongIndex: any = getTheIndexOfCurrentSong()
            /**
             * if the song which we are gonna playing is not the currently playing song
             */
            console.log(currentSongIndex, songIndex)
            if (songIndex !== currentSongIndex) {
                playSongAtIndex(songIndex)
            }
        }

        /**
         * TODO: when the user scroll this scroll reference to the last second song player control
         * will load more song and push them to the nextSongsList variable so that the next songs list never ends
         * and continues for much time
         */
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {nextSongsList.length > 0 ? (
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
            ) : null}

            <Animated.FlatList
                // scrollToOverflowEnabled
                // overScrollMode={'never'}
                ref={scrollReference}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {
                        useNativeDriver: true,
                        listener: event => {
                            scrollChangedHandler(event)
                        },
                    },
                )}
                horizontal
                pagingEnabled
                bounces={true}
                showsHorizontalScrollIndicator={false}
                data={nextSongsList}
                keyExtractor={(item, _) => `${item.id}-${_}`}
                renderItem={({item, index}) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ]
                    // const translateRange = index % 2 === 0 ? -100 : -100
                    const translateY = scrollX.interpolate({
                        inputRange: inputRange,
                        outputRange: [-100, 0, -100],
                    })

                    return (
                        <View
                            style={{
                                width: width,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Animated.View
                                style={{
                                    width: IMAGE_WIDTH,
                                    height: IMAGE_HEIGHT,
                                    borderRadius: IMAGE_BORDER_RADIUS,
                                    overflow: 'hidden',
                                    elevation: 10,
                                    transform: [{translateY: translateY}],
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
                            </Animated.View>
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

            {nextSongsList.length > 3 ? (
                <Image
                    source={{uri: nextSongsList[2].artwork}}
                    style={[
                        StyleSheet.absoluteFillObject,
                        {
                            opacity: 0,
                        },
                    ]}
                />
            ) : null}
        </View>
    )
}

export default Player
