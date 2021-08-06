import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    ListRenderItemInfo,
    StatusBar,
} from 'react-native'
import LottieView from 'lottie-react-native'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {DoubleTap, TrackPlayerController, TrackProgress} from '../../components'
import {
    APP_LOGO_LINK,
    HEADER_MAX_HEIGHT,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    ViewabilityConfig,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
import MusicPlayerSongCardView from '../../components/MusicPlayerSongCardView'
import BackgroundBluredImage from '../../components/MusicPlayerSongCardView/BackgroundBluredImage'

const {width, height} = Dimensions.get('window')

const PopupLikeAnimation = require('../../assets/animations/like_popup.json')
const LikeAnimation = require('../../assets/animations/like.json')
const FlyingLikeAnimation = require('../../assets/animations/like_flying.json')

const IMAGE_BLUR_RADIUS = 25

interface PlayerProps {
    navigation?: any
}
const Player: FC<PlayerProps> = _props => {
    // const {current, play} = usePlayer()
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const [songs, setSongs] = useState<FetchedSongObject>()

    const scrollX = useRef(new Animated.Value(0)).current
    const scrollReference = useRef<any>(null)

    const initializeMusicPlayer = () => {
        search('most listened bollywood songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(err => {
                console.log('ERROR IN MUSIC PLAYER', err)
            })
    }

    useEffect(() => {
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
                        initializeMusicPlayer()
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

    // useEffect(() => {
    // console.log('CURRENT INDEX 1', getTheIndexOfCurrentSong())
    // const playbackQueueEnded = TrackPlayer.addEventListener(
    //     'playback-track-changed',
    //     () => {
    //         console.log('CURRENT INDEX 2', getTheIndexOfCurrentSong())
    //         // console.log(scrollReference.current)
    //         const currentIndexOfScroll: any = getTheIndexOfCurrentSong()
    //         if (currentIndexOfScroll < nextSongsList.length - 1) {
    //             scrollReference.current.scrollToIndex({
    //                 animated: true,
    //                 index: currentIndexOfScroll + 1,
    //             })
    //             console.log(
    //                 'SCROLLED: ',
    //                 currentIndexOfScroll,
    //                 nextSongsList.length,
    //             )
    //         } else {
    //             console.log(
    //                 'NOT SCROLLED: ',
    //                 currentIndexOfScroll,
    //                 nextSongsList.length,
    //             )
    //         }
    //     },
    // )
    // return () => {
    //     playbackQueueEnded.remove()
    // }
    // }, [])

    /**
     * whenever the scroll position changes this code will be executed and change the song
     * according to the index or the position of scroll
     */
    const scrollChangedHandler = (event: any) => {
        const scrollPostion = event.nativeEvent.contentOffset.y
        const screenWidth = width
        const screenHeight = height
        // if (scrollPostion % screenWidth === 0) {
        //     const songIndex = scrollPostion / screenWidth
        /**
         * if the song which we are gonna playing is not the currently playing song
         */
        // }

        // for vertical scrollview
        if (scrollPostion % screenHeight === 0) {
            const songIndex = scrollPostion / screenHeight
            console.log(songIndex)
            /**
             * if the song which we are gonna playing is not the currently playing song
             */
        }

        /**
         * TODO: when the user scroll this scroll reference to the last second song player control
         * will load more song and push them to the nextSongsList variable so that the next songs list never ends
         * and continues for much time
         */
    }

    const renderItem = useCallback(
        (itemDetails: ListRenderItemInfo<SongObject>) => {
            const {item} = itemDetails
            return <MusicPLayerSongView song={item} />
        },
        [],
    )
    const keyExtractor = useCallback((item: SongObject) => item.musicId, [])
    const getItemLayout = useCallback(
        (data, index) => ({
            length: height,
            offset: height * index,
            index,
        }),
        [],
    )

    const onViewableItemsChanged = ({viewableItems, changed}: any) => {
        console.log('Visible items are', viewableItems)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <StatusBar backgroundColor={'transparent'} translucent animated />

            {songs?.content.length && songs.content[0].musicId.length > 0 ? (
                <Animated.FlatList
                    data={songs.content}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    getItemLayout={getItemLayout}
                    ref={scrollReference}
                    viewabilityConfig={ViewabilityConfig}
                    onViewableItemsChanged={onViewableItemsChanged}
                    scrollEventThrottle={16}
                    scrollToOverflowEnabled
                    overScrollMode={'never'}
                    pagingEnabled
                    bounces
                    // horizontal
                    nestedScrollEnabled
                    bouncesZoom
                    alwaysBounceVertical
                    alwaysBounceHorizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {
                            useNativeDriver: true,
                            listener: event => {
                                scrollChangedHandler(event)
                            },
                        },
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

            {/* main content of this particular tab */}
            {/* {songs.length > 0 && songs[0].artwork.length ? (
                <View style={StyleSheet.absoluteFillObject}>
                    {songs.map((song, _) => {
                        return (
                            <BackgroundBluredImage
                                key={`${song.id}-${_}`}
                                song={song}
                                index={_}
                                scrollX={scrollX}
                            />
                        )
                    })}
                </View>
            ) : null} */}

            {/* <View
                    style={{
                        // height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: themeColors.themecolor[0] + '50',
                        paddingTop: 20,
                        paddingBottom: BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                    }}>
                    <TrackPlayerController
                        color={themeColors.themecolorrevert[0]}
                    />
                </View> */}
        </View>
    )
}

interface SongView {
    song: SongObject
}
const MusicPLayerSongView = ({song}: SongView) => {
    const likeAnimRef = useRef<LottieView>(null)

    const playLikeAnimation = () => {
        likeAnimRef.current?.play(0, 65)
        setTimeout(() => {
            likeAnimRef.current?.reset()
        }, LIKE_ANIMATION_DISAPPEAR_DURATION)
    }

    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        720,
        100,
    )

    return (
        <DoubleTap onDoubleTap={playLikeAnimation}>
            <ImageBackground
                loadingIndicatorSource={{
                    uri: highQualityImage,
                    cache: 'force-cache',
                }}
                source={{
                    uri: highQualityImage,
                    cache: 'force-cache',
                    scale: 1,
                    height,
                }}
                fadeDuration={500}
                style={{
                    flex: 1,
                    width,
                    height: height,
                    //  - HEADER_MAX_HEIGHT,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
                blurRadius={IMAGE_BLUR_RADIUS}>
                <Text style={{color: 'white'}}>{song.name}</Text>

                <Image
                    loadingIndicatorSource={{
                        uri: highQualityImage,
                        cache: 'force-cache',
                    }}
                    source={{
                        uri: highQualityImage,
                        cache: 'force-cache',
                        scale: 1,
                        height,
                    }}
                    fadeDuration={500}
                    style={{
                        width: 260,
                        height: 260,
                        borderRadius: 3,
                        resizeMode: 'cover',
                        marginVertical: 20,
                    }}
                    blurRadius={0}
                />

                <View
                    onStartShouldSetResponder={v => false}
                    style={{
                        // flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                    <LottieView
                        ref={likeAnimRef}
                        source={PopupLikeAnimation}
                        style={{
                            width: 250,
                            position: 'absolute',
                            borderRadius: 1000,
                            overflow: 'hidden',
                        }}
                        speed={2}
                        autoSize={false}
                        autoPlay={false}
                        // cacheStrategy="strong"
                        loop={false}
                    />
                </View>

                <TrackProgress
                    // color={'white'}
                    duration={song.duration}
                />

                <View
                    style={{
                        marginBottom: 200,
                    }}></View>
            </ImageBackground>
        </DoubleTap>
    )
}

export default Player
