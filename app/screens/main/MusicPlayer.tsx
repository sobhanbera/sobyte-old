import React, {useEffect} from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Animated,
    FlatList,
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import ImageColors from 'react-native-image-colors'

import {usePlayer, useTheme} from '../../context'
import {TrackPlayerProgressSlider} from '../../components'
import {APP_LOGO_LINK, BOTTOM_TAB_BAR_NAVIGATION_HEIGHT} from '../../constants'
import {
    getHightQualityImageFromLink,
    isColorDark,
    sortColorsBasedOnBrightness,
} from '../../utils'
import {DominatingColors} from '../../interfaces'

const {width, height} = Dimensions.get('screen')
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
    const {themeColors} = useTheme()

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = React.useRef<any>(null)
    const [dominatingColors, setDominatingColors] =
        React.useState<string>('#FFFFFFFF')
    const [dominatingColorsStyle, setDominatingColorsStyle] = React.useState<
        'light' | 'dark'
    >('light')

    useEffect(() => {
        if (current.url) {
            ImageColors.getColors(
                getHightQualityImageFromLink(current.artwork, '100'),
                {
                    fallback: themeColors.rgbstreakgradient[0],
                    cache: false,
                    key: 'sobyte_music_player_color',
                },
            )
                .then((res: DominatingColors | any) => {
                    /* available colors which should be used ->
                     * res.dominant,
                     * res.vibrant,
                     * res.darkVibrant,
                     * res.darkMuted
                     * */
                    const lightColorAmongAll = sortColorsBasedOnBrightness([
                        res.dominant,
                        res.vibrant,
                        res.darkVibrant,
                    ])[0]
                    setDominatingColors(lightColorAmongAll || '#FFFFFFFF')
                    setDominatingColorsStyle(
                        isColorDark(lightColorAmongAll || '#FFFFFFFF')
                            ? 'dark'
                            : 'light',
                    )
                })
                .catch(err => {
                    if (String(err).includes('Connection closed')) {
                        // prompt(
                        //     'Please check your internet connection.',
                        //     'warning',
                        // )
                    }
                    setDominatingColors('#FFFFFFFF')
                    setDominatingColorsStyle('light')
                })

            // const currentSongIndex: any = getTheIndexOfCurrentSong()
            // if (currentSongIndex !== -1) {
            // console.log(scrollReference.current)
            // }
        }
    }, [current.artwork])

    useEffect(() => {
        console.log('CURRENT INDEX', getTheIndexOfCurrentSong())
        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-queue-ended',
            () => {
                // console.log(scrollReference.current)
                const currentIndexOfScroll: any = getTheIndexOfCurrentSong()
                if (currentIndexOfScroll < nextSongsList.length - 1) {
                    scrollReference.current.scrollToIndex({
                        animated: true,
                        index: currentIndexOfScroll + 1,
                    })
                    console.log(
                        'SCROLLED: ',
                        currentIndexOfScroll,
                        nextSongsList.length,
                    )
                } else {
                    console.log(
                        'NOT SCROLLED: ',
                        currentIndexOfScroll,
                        nextSongsList.length,
                    )
                }
            },
        )

        return () => {
            playbackQueueEnded.remove()
        }
    }, [])

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

    const getItemLayout = (data: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    })

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {/* these are the temporary data and are not reqired that much as the main UI component itself... */}
            <Image
                source={{uri: current.artwork || APP_LOGO_LINK}}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        opacity: 0,
                    },
                ]}
            />
            {/* main content of this particular tab */}
            {nextSongsList.length > 0 && current.id.length > 0 ? (
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
                                source={{uri: song.artwork || APP_LOGO_LINK}}
                                blurRadius={IMAGE_BLUR_RADIUS}
                            />
                        )
                    })}
                </View>
            ) : null}

            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                }}>
                {nextSongsList.length && nextSongsList[0].artwork.length > 0 ? (
                    <Animated.FlatList
                        scrollToOverflowEnabled
                        overScrollMode={'never'}
                        ref={scrollReference}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {
                                useNativeDriver: true,
                                listener: event => {
                                    scrollChangedHandler(event)
                                },
                            },
                        )}
                        pagingEnabled
                        bounces={true}
                        getItemLayout={getItemLayout}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
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
                                        // backgroundColor: 'red',
                                    }}>
                                    <Animated.View
                                        style={{
                                            width: IMAGE_WIDTH,
                                            height: IMAGE_HEIGHT,
                                            borderRadius: IMAGE_BORDER_RADIUS,
                                            overflow: 'hidden',
                                            elevation: 10,
                                            transform: [
                                                {translateY: translateY},
                                            ],
                                        }}>
                                        <Image
                                            fadeDuration={1000}
                                            source={{
                                                uri:
                                                    item.artwork ||
                                                    APP_LOGO_LINK,
                                            }}
                                            style={{
                                                width: IMAGE_WIDTH,
                                                height: IMAGE_HEIGHT,
                                                borderRadius:
                                                    IMAGE_BORDER_RADIUS,
                                                overflow: 'hidden',
                                                resizeMode: 'cover',
                                            }}
                                        />
                                    </Animated.View>
                                </View>
                            )
                        }}
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}>
                        <Image
                            source={{uri: APP_LOGO_LINK}}
                            style={[
                                {
                                    opacity: 1,
                                    width: 218 / 2,
                                    height: 276 / 2,
                                },
                            ]}
                            // blurRadius={IMAGE_BLUR_RADIUS / 5000}
                        />
                    </View>
                )}

                <View
                    style={{
                        // height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor:
                            dominatingColorsStyle === 'light'
                                ? '#FFFFFF10'
                                : '#00000010',
                        paddingTop: 20,
                        paddingBottom: BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                    }}>
                    <TrackPlayerProgressSlider color={dominatingColors} />
                </View>
            </View>
        </View>
    )
}

export default Player
