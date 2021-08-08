import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    View,
    Dimensions,
    Animated,
    ListRenderItemInfo,
    StyleSheet,
    Text,
} from 'react-native'
import LottieView from 'lottie-react-native'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {
    GradientBackground,
    MusicPlayerSongView,
    BackgroundBluredImage,
} from '../../components'
import {
    DefaultStatusBarComponent,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    RANDOM_SEARCH_QUERY,
    INITIAL_NUMBER_OF_TRACKS_TO_LOAD,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
import {pauseTrack} from '../../api/PlayerControlsCommons'
import globalStyles from '../../styles/global.styles'

const AppLoadingAnimation = require('../../assets/animations/animation.json')
const PopupLikeAnimation = require('../../assets/animations/like_popup.json')
// const LikeAnimation = require('../../assets/animations/like.json')
// const FlyingLikeAnimation = require('../../assets/animations/like_flying.json')

const {height} = Dimensions.get('window')

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

    /**
     * a demo value just for rendering the laoding properly or else if there
     * is no songs.content and it would be undefined and
     * always show the flatlist not the loading component...
     */
    const [songs, setSongs] = useState<FetchedSongObject>({
        content: [],
        continuation: {
            continuation: '',
            clickTrackingParams: '',
        },
    })

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
        /**
         * we don't need to save this data
         */
        search(
            RANDOM_SEARCH_QUERY,
            'SONG',
            false,
            true,
            MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
            [0, INITIAL_NUMBER_OF_TRACKS_TO_LOAD],
        )
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
                <MusicPlayerSongView
                    song={item}
                    likeIsMusic={() =>
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
                randomGradient[6] + 'AF', // light to dark
                randomGradient[3] + 'AF', // we are adding AF
                randomGradient[4] + 'AF', // alpha value to give it some darkness
                randomGradient[5] + 'AF', // because the extreme backgorund is black in color
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
                <View style={globalStyles.loadingArea}>
                    <LottieView
                        source={AppLoadingAnimation}
                        style={globalStyles.appLogoAnimation}
                        speed={1}
                        autoPlay
                        loop
                    />
                    <Text style={globalStyles.loadingText}>Loading...</Text>
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

export default Player
