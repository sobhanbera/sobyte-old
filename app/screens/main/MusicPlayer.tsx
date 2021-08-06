import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    Animated,
    ListRenderItemInfo,
} from 'react-native'
import LottieView from 'lottie-react-native'
import FastImage from 'react-native-fast-image'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {DoubleTap, GradientBackground, TrackProgress} from '../../components'
import {
    APP_LOGO_LINK,
    DefaultStatusBarComponent,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
import BackgroundBluredImage from '../../components/MusicPlayerSongCardView/BackgroundBluredImage'
import {StyleSheet} from 'react-native'
import MainControls from 'app/components/MusicPlayer/MainControls'

const {width, height} = Dimensions.get('window')

const PopupLikeAnimation = require('../../assets/animations/like_popup.json')
// const LikeAnimation = require('../../assets/animations/like.json')
// const FlyingLikeAnimation = require('../../assets/animations/like_flying.json')

const IMAGE_BLUR_RADIUS = 25

export type ViewToken = {
    item: SongObject
    key: string
    index: number
    isViewable: boolean
    section?: any
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
        search('most listened bollywood songs', 'SONG')
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
                )
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
    const onViewableItemsChanged = useRef(
        ({viewableItems /*, changed */}: any) => {
            console.log('Visible items are', viewableItems)
        },
    ).current
    const ViewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
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
                            priority: 'high',
                            cache: 'immutable',
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

    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        720,
        100,
    )

    const artists = formatArtists(song.artist)

    FastImage.preload([
        {
            uri: highQualityImage,
            priority: 'high',
            cache: 'cacheOnly',
        },
    ])

    return (
        <DoubleTap onDoubleTap={playLikeAnimation}>
            <ImageBackground
                loadingIndicatorSource={{
                    uri: highQualityImage,
                    cache: 'force-cache',
                    scale: 1,
                }}
                source={{
                    uri: highQualityImage,
                    cache: 'force-cache',
                    scale: 1,
                }}
                fadeDuration={500}
                style={{
                    flex: 1,
                    width,
                    height: height,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
                blurRadius={IMAGE_BLUR_RADIUS}>
                <Text style={{color: 'white'}}>{song.name}</Text>
                <Text style={{color: 'white'}}>{artists}</Text>

                <FastImage
                    source={{
                        uri: highQualityImage,
                        priority: 'high',
                        cache: 'web',
                    }}
                    style={{
                        width: 260,
                        height: 260,
                        borderRadius: 3,
                        marginVertical: 20,
                    }}
                />

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: themeColors.themecolor[0] + '50',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <MainControls color={themeColors.themecolorrevert[0]} />
                    </View>

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
