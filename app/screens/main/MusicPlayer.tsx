import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    Animated,
    ListRenderItemInfo,
    StyleSheet,
} from 'react-native'
import LottieView from 'lottie-react-native'
import FastImage from 'react-native-fast-image'
import MarqueeText from 'react-native-text-ticker'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {
    DoubleTap,
    GradientBackground,
    TrackProgress,
    TrackButtonControls,
} from '../../components'
import {
    APP_LOGO_LINK,
    DefaultStatusBarComponent,
    DEFAULT_HIGH_IMAGE_QUALITY,
    FontUbuntuBold,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION,
    RANDOM_SEARCH_QUERY,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
    capitalizeWords,
} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
import BackgroundBluredImage from '../../components/MusicPlayerSongCardView/BackgroundBluredImage'
import {pauseTrack} from '../../api/PlayerControlsCommons'

const PopupLikeAnimation = require('../../assets/animations/like_popup.json')
// const LikeAnimation = require('../../assets/animations/like.json')
// const FlyingLikeAnimation = require('../../assets/animations/like_flying.json')

const IMAGE_BLUR_RADIUS = 25
const {width, height} = Dimensions.get('window')

/**
 * the interface or data type which will be giving the types for the song data whenever the user scrolls
 * to different song/track and provide with a callback function which recieve this data
 */
export type ViewToken = {
    viewableItems: Array<{
        item: SongObject
        key: string
        index: number
        isViewable: boolean
        section?: any
    }>
    changed: Array<{
        index: number
        isViewable: boolean
        item: SongObject
        key: string
    }>
}
interface PlayerProps {
    navigation?: any
}
const Player: FC<PlayerProps> = _props => {
    const {play} = usePlayer()
    const {randomGradient} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const [songs, setSongs] = useState<FetchedSongObject>()

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = useRef<any>(null)

    const likeAnimRef = useRef<LottieView>(null)
    const isAnimationPlaying = useRef<boolean>(false)

    const playLikeAnimationForMusicId = useCallback((musicId: string) => {
        if (isAnimationPlaying.current) return

        isAnimationPlaying.current = true
        likeAnimRef.current?.play(0, 65)

        setTimeout(() => {
            likeAnimRef.current?.reset()
            isAnimationPlaying.current = false
        }, LIKE_ANIMATION_DISAPPEAR_DURATION)
    }, [])

    const initializeMusicPlayer = () => {
        search(RANDOM_SEARCH_QUERY, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)

                // initial data
                const initialTrack = res.content[0]
                const artist = formatArtists(initialTrack.artist)

                play(
                    {
                        artist,
                        artwork: initialTrack.thumbnails[1].url,
                        id: initialTrack.musicId,
                        duration: initialTrack.duration,
                        playlistId: initialTrack.playlistId,
                        title: initialTrack.name,
                        url: '',
                    },
                    false,
                    false,
                )
            })
            .catch(err => {
                // console.log('ERROR IN MUSIC PLAYER', err)
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

    const renderItem = useCallback(
        (itemDetails: ListRenderItemInfo<SongObject>) => {
            const {item} = itemDetails
            return (
                <MusicPLayerSongView
                    song={item}
                    playLikeAnimation={() =>
                        playLikeAnimationForMusicId(item.musicId)
                    }
                />
            )
        },
        [],
    )
    const keyExtractor = useCallback((item: SongObject) => item.musicId, [])
    const getItemLayout = useCallback(
        (_data, index) => ({
            length: height,
            offset: height * index,
            index,
        }),
        [],
    )
    const onViewableItemsChanged = useRef((data: any) => {
        const {viewableItems}: ViewToken = data
        const {item} = viewableItems[0]
        const trackImage = getHightQualityImageFromLinkWithHeight(
            item.thumbnails[0].url,
            item.thumbnails[0].height,
            300,
            90,
        )
        const artists = formatArtists(item.artist)
        pauseTrack()
        play({
            url: '',
            id: item.musicId,
            duration: item.duration,
            title: item.name,
            playlistId: item.playlistId,
            artist: artists,
            artwork: trackImage,
        })
    }).current

    const ViewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
        minimumViewTime: 0,
    }).current

    return (
        <GradientBackground
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
            colors={[
                randomGradient[2],
                randomGradient[3],
                randomGradient[4],
                randomGradient[5],
            ]}
            location={[0.2, 0.4, 0.6, 0.8]}
            angle={175}>
            <DefaultStatusBarComponent backgroundColor={'transparent'} />

            {/* main content of this particular tab */}
            {songs?.content.length && songs?.content[0].musicId.length ? (
                <View style={StyleSheet.absoluteFillObject}>
                    {songs.content.map((song, _) => {
                        return (
                            <BackgroundBluredImage
                                key={`${song.id}-${_}`}
                                image={song.thumbnails[1].url}
                                index={_}
                                scrollX={scrollX}
                            />
                        )
                    })}
                </View>
            ) : null}

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
                    snapToAlignment="start"
                    snapToStart
                    nestedScrollEnabled
                    bouncesZoom
                    alwaysBounceVertical
                    alwaysBounceHorizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollX}}}],
                        {
                            useNativeDriver: true,
                            // listener: event => {
                            // scrollChangedHandler(event)
                            // },
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
                    <FastImage
                        source={{
                            uri: APP_LOGO_LINK,
                            // priority: 'high',
                            // cache: 'immutable',
                        }}
                        style={[
                            {
                                opacity: 1,
                                width: 218 / 2,
                                height: 276 / 2,
                            },
                        ]}
                    />
                </View>
            )}

            {/* like animation when the user presses the like button or double tap the track (on the screen) */}
            {isAnimationPlaying.current || true ? (
                <View
                    onStartShouldSetResponder={() => false} // a event variable is also received from this function
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        backgroundColor: 'black',
                    }}>
                    <LottieView
                        ref={likeAnimRef}
                        source={PopupLikeAnimation}
                        style={{
                            width: 250,
                            position: 'absolute',
                            // borderRadius: 1000,
                            // overflow: 'hidden',
                            // top: 0,
                            // left: 0,
                            zIndex: 1000,
                        }}
                        speed={2}
                        autoSize={false}
                        autoPlay={false}
                        // cacheStrategy="strong"
                        loop={false}
                    />
                </View>
            ) : null}
        </GradientBackground>
    )
}

interface SongView {
    song: SongObject
    playLikeAnimation: Function
}
const MusicPLayerSongView = ({song, playLikeAnimation}: SongView) => {
    const {themeColors} = useTheme()
    const averageQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        '120',
        50,
    )
    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        DEFAULT_HIGH_IMAGE_QUALITY,
        100,
    )
    const artists = formatArtists(song.artist)

    return (
        <DoubleTap onDoubleTap={playLikeAnimation}>
            <ImageBackground
                // loadingIndicatorSource={{
                // uri: highQualityImage,
                // cache: 'force-cache',
                // scale: 1,
                // }}
                source={{
                    uri: averageQualityImage,
                    // cache: 'force-cache',
                    // scale: 1,
                }}
                fadeDuration={500}
                style={{
                    flex: 1,
                    width,
                    height: height,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingBottom: 20, // the main bottom tab bar navigation height is overlping the children component so providing a padding bottom of 15~25
                }}
                blurRadius={IMAGE_BLUR_RADIUS}>
                <View
                    style={{
                        width: '75%',
                        alignSelf: 'flex-start',
                        marginHorizontal: 20,
                    }}>
                    <MarqueeText
                        style={{
                            fontSize: 25,
                            fontFamily: FontUbuntuBold,
                            color: 'white',
                            textAlign: 'left',
                            width: '100%',
                            alignSelf: 'flex-start',
                            paddingVertical: 3,
                            paddingHorizontal: 5,
                        }}
                        loop
                        scroll
                        useNativeDriver
                        duration={MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION}
                        bounceSpeed={1}
                        scrollSpeed={1}
                        animationType="scroll"
                        marqueeDelay={1000}>
                        {capitalizeWords(song.name)}
                    </MarqueeText>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'white',
                            paddingVertical: 1,
                            paddingHorizontal: 5,
                        }}>
                        {capitalizeWords(artists)}
                    </Text>
                </View>

                <FastImage
                    source={{
                        uri: highQualityImage,
                        // priority: 'high',
                        // cache: 'web',
                    }}
                    style={{
                        width: 260,
                        height: 260,
                        borderRadius: 5,
                        marginVertical: 20,
                    }}
                />

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        // backgroundColor: themeColors.themecolor[0] + '50',
                    }}>
                    <TrackButtonControls
                        color={themeColors.themecolorrevert[0]}
                    />

                    <TrackProgress
                        color={themeColors.themecolorrevert[0]}
                        duration={song.duration}
                    />
                </View>
            </ImageBackground>
        </DoubleTap>
    )
}

export default Player
