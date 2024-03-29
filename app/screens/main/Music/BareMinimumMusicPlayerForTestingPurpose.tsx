import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    View,
    Dimensions,
    Animated,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native'
import LottieView from 'lottie-react-native'

import {useFetcher, useMusicApi, usePlayer, useTheme} from '../../../context'
import {
    GradientBackground,
    MusicPlayerSongView,
    BackgroundBluredImage,
} from '../../../components'
import {
    DefaultStatusBarComponent,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    RANDOM_SEARCH_QUERY,
    INITIAL_NUMBER_OF_TRACKS_TO_LOAD,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
    DEFAULT_NOTIFICATION_IMAGE_QUALITY,
    DEFAULT_IMAGE_QUALITY,
} from '../../../constants'
import {
    formatArtists,
    getHighQualityImageFromLinkWithHeight,
} from '../../../utils'
import {FetchedSongObject, SongObject} from '../../../interfaces'
import globalStyles from '../../../styles/global.styles'

const AppLoadingAnimation = require('../../../assets/animations/animation.json')
const PopupLikeAnimation = require('../../../assets/animations/like_popup.json')
// const LikeAnimation = require('../../../assets/animations/like.json')
// const FlyingLikeAnimation = require('../../../assets/animations/like_flying.json')

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
const Player: FC<PlayerProps> = props => {
    const {play} = usePlayer()
    const {randomGradient} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const {fetchMusic} = useFetcher()

    /**
     * initial value just for rendering the laoding properly or else if there
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

    /**
     * a variable which provides the music id of the track which is played currently
     * in this local music player
     * when a new song is played from other section of the app like the explore section
     * then the current track will change in "playerControls.tsx context api"
     * and it will make this component load data for that particular song
     * but if the song is played from here itself then also the current track will change
     * and load the data, we don't need to load data this time at-least since may be many data is loaded next to the current song
     * why load more than
     * therefore this variable will control this behaviour
     * if the current track change in "playerControls.tsx context api" then we will check wheather the ID are different from the song currently rendered in this component
     * if different then only we will load the data for next songs
     * else no need..................................
     */
    const currentlyPlayingTrackID = useRef<string>('')

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = useRef<FlatList>(null)

    const likeAnimRef = useRef<LottieView>(null)
    const isAnimationPlaying = useRef<boolean>(false)

    // initializing the songs list...
    const initializeMusicPlayer = () => {
        search(
            RANDOM_SEARCH_QUERY,
            'SONG',
            false,
            true,
            MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
            [0, INITIAL_NUMBER_OF_TRACKS_TO_LOAD],
        )
            .then(async (res: FetchedSongObject) => {
                setSongs(res)

                // console.log(
                //     res.content[0],
                //     await fetchMusic(res.content[0].musicId),
                // )

                // initial data
                const initialTrack = res.content[0]
                const artist = formatArtists(initialTrack.artist)

                // without this below line the songs will only scroll after the user somewhat scrolls the flatlist...
                currentlyPlayingTrackID.current = initialTrack.musicId // setting the first song which would be played so that there is no such user interaction is required to auto scroll from next time

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
                    '',
                    false,
                    false,
                )

                // loading the next songs data...
                if (
                    res.content[1] !== undefined &&
                    res.content[1].musicId.length > 0
                ) {
                    fetchMusic(res.content[1].musicId)
                }
            })
            .catch(_err => {
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

    // a reference variable for the duration after which the like animation will be disappear...
    let TimeOutVar = setTimeout(() => {}, 0)
    const playLikeAnimationForMusicId = useCallback((musicId: string) => {
        /**
         * clearing the previous timeout since we are going to do a new time out
         * if we don't clear the previous time out then
         * let the user have liked the song and duration is 3sec here if the user again liked the song after 2sec
         * then the like animation will end in 3-2=1sec which is not good since the duration is 3sec
         * so we are clearing the last timeout and overwiting it with a new one
         */
        clearTimeout(TimeOutVar)
        // after clearing the timeout we can reset the like animation and play it
        likeAnimRef.current?.reset()
        likeAnimRef.current?.play(0, 65)

        // set a new timeout for the like animation hiding trigger
        TimeOutVar = setTimeout(() => {
            likeAnimRef.current?.reset()
        }, LIKE_ANIMATION_DISAPPEAR_DURATION)

        /**
         * here we can make api requests to the backend to include the liked musicID
         * in the user's liked playlist's songs list
         * ACTUAL LIKE WORKING.....
         */
        console.log('YOU LIKED THIS SONG WITH ID:: ', musicId)
    }, [])

    /**
     * item rendered for the list item
     * provide the song data...
     */
    const renderItem = useCallback(
        (itemDetails: ListRenderItemInfo<SongObject>) => {
            const {item} = itemDetails
            return (
                <MusicPlayerSongView
                    song={item}
                    likeIsMusic={() =>
                        playLikeAnimationForMusicId(item.musicId)
                    }
                    navigation={props.navigation}
                />
            )
        },
        [],
    )
    // key extractor for each item of the UI...
    const keyExtractor = useCallback(
        (item: SongObject, index: number) => `${item.musicId}-${index}`,
        [],
    )
    /**
     * layout of each music item or the song view component
     * like width and height are provided through this function...
     */
    const getItemLayout = useCallback(
        (_data, index) => ({
            length: height,
            offset: height * index,
            index,
        }),
        [],
    )

    /**
     * this variable's copy could be found in the main constants
     * file
     */
    const ViewabilityConfig = useRef({
        minimumViewTime: 1000, // there should be a miminum time only after which the process of playing the song or else should start
        viewAreaCoveragePercentThreshold: 99, // since when we are giving a less area view port it occur much before the scroll actually occurs
        // itemVisiblePercentThreshold: 90, // percent %
        waitForInteraction: false, // true because we want the song must be after the user has interacted with the UI. this would be helpful if the user doesnot want to remain in music player after launching and want to go to profile only than no need to play song automatically
        // and if this value is false because we want change the song even if the scrollview is scrolled automatically...
        // both cases are fine but we need false case...
    }).current
    /**
     * when user scrolls the main music player to the next songs
     * this function gets trigger according to the configs above..
     *
     * it provides the ViewToken type of variable
     * if any changed item with isViewable property is true we can play that song in place of the current playing song
     * if it is not true than this means the two tracks are partially shown in the UI to the user
     */
    const onViewableItemsChanged = useRef((data: any) => {
        const {changed}: ViewToken = data
        /**
         * two tracks are shown in the UI to the user
         * this may be the user has just half way scrolled the current song
         * so the user has not decided finally which song to play
         * so we will not change the track yet...
         */
        if (changed[0].isViewable === false) return
        /**
         * if the content is fully rendered or shown to the user
         * change the track if it is different than the current track/song
         */
        const {item} = changed[0]

        /**
         * generating the data required for playing the song
         */
        const trackImage = getHighQualityImageFromLinkWithHeight(
            item.thumbnails[0].url,
            item.thumbnails[0].height,
            DEFAULT_NOTIFICATION_IMAGE_QUALITY,
            DEFAULT_IMAGE_QUALITY,
        )
        const artists = formatArtists(item.artist)

        /**
         *  this below step is very very very important to load data and show data in the UI
         * we are changing the current track playing in this local music player UI itself...
         */
        currentlyPlayingTrackID.current = item.musicId // this is the id of the current track which is playing or going to be played...

        /**
         * finally play the songs
         * after all this loading and checkings
         */
        play(
            {
                url: '',
                id: item.musicId,
                duration: item.duration,
                title: item.name,
                playlistId: item.playlistId,
                artist: artists,
                artwork: trackImage,
            },
            '',
        )
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
                        {useNativeDriver: true},
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
