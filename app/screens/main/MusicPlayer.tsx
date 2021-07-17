import React, {useEffect} from 'react'
import {View, Image, Dimensions, StyleSheet, Animated} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import ImageColors from 'react-native-image-colors'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {TrackPlayerProgressSlider} from '../../components'
import {APP_LOGO_LINK, BOTTOM_TAB_BAR_NAVIGATION_HEIGHT} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLink,
    isColorDark,
    sortColorsBasedOnBrightness,
} from '../../utils'
import {DominatingColors, SongObject} from '../../interfaces'
import MusicPlayerSongCardView from '../../components/MusicPlayerSongCardView'

const {width} = Dimensions.get('screen')
const IMAGE_BLUR_RADIUS = 50

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {
        current,
        nextSongsList,
        play,
        playSongAtIndex,
        getTheIndexOfCurrentSong,
    } = usePlayer()
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = React.useRef<any>(null)
    const [dominatingColors, setDominatingColors] =
        React.useState<string>('#FFFFFFFF')
    const [dominatingColorsStyle, setDominatingColorsStyle] = React.useState<
        'light' | 'dark'
    >('light')

    let timer: any = null

    const loadInitialMusicPlayerData = () => {
        search('bollywood trending songs', 'SONG', true)
            .then((res: SongObject) => {
                const artist = formatArtists(res.artist)
                const artwork = getHightQualityImageFromLink(
                    res.thumbnails[0].url,
                    '720',
                )
                play({
                    artist: artist,
                    artwork: artwork,
                    duration: res.duration,
                    id: res.musicId,
                    playlistId: res.playlistId,
                    title: res.name,
                    url: '',
                })
                if (scrollReference !== null)
                    scrollReference.current.scrollToIndex({
                        animated: true,
                        x: 0,
                        y: 0,
                    })
            })
            .catch(_err => {})
    }

    /**
     * we are calling the loadData -(which loads all the data for explore tab) function twice
     * because it may not be ready or compiled when we call it for the first time so indented calling
     * also with a fallback variable error whenever it changed again everything will load from beginning
     * this function is also used in explore tab UI
     */
    useEffect(() => {
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
                        loadInitialMusicPlayerData()
                    })
                    .catch(() => {})
            })
            .catch(() => {
                // this will only be called when the internet connectivity is very slow or not present...
                console.error(
                    '(Outer) Error Initiating Music Api... no internet connection found',
                )
            })
    }, [error])

    /**
     * this useEffect changes the primary color or any colors that is related to the song
     * and pass them to children components
     */
    useEffect(() => {
        if (current.url)
            timer = setTimeout(() => {
                clearTimeout(timer)

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
            }, 1500)
    }, [current.artwork])

    useEffect(() => {
        console.log('CURRENT INDEX 1', getTheIndexOfCurrentSong())
        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-track-changed',
            () => {
                console.log('CURRENT INDEX 2', getTheIndexOfCurrentSong())
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
                        renderItem={({item, index}) => (
                            <MusicPlayerSongCardView
                                item={item}
                                index={index}
                                scrollX={scrollX}
                            />
                        )}
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
                                ? '#FFFFFF33'
                                : '#00000033',
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
