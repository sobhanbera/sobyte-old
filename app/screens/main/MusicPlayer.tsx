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
import NetInfo from '@react-native-community/netinfo' // if the internet connection is slow than we will load low quality track else load high quality progressively...

import {useFetcher, useMusicApi, usePlayer, useTheme} from '../../context'
import {
    GradientBackground,
    MusicPlayerSongView,
    BackgroundBluredImage,
    Prompt,
} from '../../components'
import {
    DefaultStatusBarComponent,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    RANDOM_SEARCH_QUERY,
    INITIAL_NUMBER_OF_TRACKS_TO_LOAD,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
    DEFAULT_NOTIFICATION_IMAGE_QUALITY,
    DEFAULT_IMAGE_QUALITY,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
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
    const {play, current} = usePlayer()
    const {randomGradient} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const {fetchMusic} = useFetcher()

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

    /**
     * the prompt component to show error, log, warning, result
     * and many more, this is the update after the prompt is converted into component from context api...
     */
    const [promptTitle, setPromptTitle] = useState('')
    const promptShown1Time = useRef<boolean>(false) // varialble which controls wheather the prompt is show once when the user launched application or not...

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

                /**
                 * here we are getting the data url of some next songs
                 * so that when the user scrolls some of these are played instantly...
                 * if this songs exists then only we will load the URL of this tracks...
                 *
                 * actually we should load all the songs music URL where the song exists
                 * since it will only take time so why to load later
                 */
                for (let i = 1; i < res.content.length; ++i) {
                    if (i >= 2) break // we are only loading 2 more songs data after the 0th index song (first song/track)
                    if (res.content[i].musicId)
                        fetchMusic(res.content[i].musicId)
                }
                // for now we are loading every songs URL...
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
                        // initializeMusicPlayer()
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
     * whenever the current track changes in the playerControls.tsx
     * this function will get triggered eventually...
     */
    const trackChangedInPlayerControlsLoadDifferentData = () => {
        // if the current track's id is empty or null this could be becuase there are no track/song in the queue
        if (current.id.length <= 0) return

        /**
         * checking if the current track's id from player controls context api is the
         * same as the local current track's id here in this component
         * if - the id is same than it means that the user had scrolled and than the song is changed
         * else - the song is played from outside of this component like explore tab or search tab
         */
        if (current.id === currentlyPlayingTrackID.current) {
            console.log('<<<< MUSIC PLAYER >>>> .')
            return
        } else {
            console.log('<<<< CONTROLS >>>> .')
        }
    }
    useEffect(() => {
        trackChangedInPlayerControlsLoadDifferentData()
    }, [current.id])

    /**
     * @description to show the prompt when a song is played over cellular, wifi,
     * ethernet, or any other network just once...
     */
    const showThePromptForFirstTime = () => {
        // if promptShown1Time is true that means the prompt is shown once no need to show it again just return
        if (promptShown1Time.current === true) return
        // if the prompt is not shown any time then show it and update the promptShown1Time to true
        NetInfo.fetch()
            .then(res => {
                if (
                    [
                        'cellular',
                        'wifi',
                        'bluetooth',
                        'ethernet',
                        'wimax',
                        'vpn',
                    ].includes(res.type)
                ) {
                    // showing the prompt...
                    setPromptTitle(`playing song over ${res.type}.`)
                }
                // now the prompt will not longer be shown again...
                promptShown1Time.current = true
            })
            .catch(_err => {
                // some error occurred we should only set the prompt value to true and not show any prompt
                // since we don't know what type of network is available in device
                promptShown1Time.current = true
            })
    }

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
                />
            )
        },
        [],
    )
    // key extractor for each item of the UI...
    const keyExtractor = useCallback((item: SongObject) => item.musicId, [])
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
        waitForInteraction: true, // true because we want the song must be after the user has interacted with the UI. this would be helpful if the user doesnot want to remain in music player after launching and want to go to profile only than no need to play song automatically
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
        const trackImage = getHightQualityImageFromLinkWithHeight(
            item.thumbnails[0].url,
            item.thumbnails[0].height,
            DEFAULT_NOTIFICATION_IMAGE_QUALITY,
            DEFAULT_IMAGE_QUALITY,
        )
        const artists = formatArtists(item.artist)

        // we are changing the current track playing in this local music player UI itself...
        currentlyPlayingTrackID.current = item.musicId // this is the id of the current track which is playing or going to be played...

        /**
         * finally play the songs
         * after all this loading and checkings
         */
        play({
            url: '',
            id: item.musicId,
            duration: item.duration,
            title: item.name,
            playlistId: item.playlistId,
            artist: artists,
            artwork: trackImage,
        })

        // showing the prompt...
        showThePromptForFirstTime()
    }).current

    /**
     * if we haven't shown the prompt once then show it and make the control variable false
     * so that from next time the prompt is not shown
     * if we have shown the propmt once
     */

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

            {/* the prompt component to show that user is playing song through network for the first time song is being played... */}
            <Prompt title={promptTitle} setTitle={setPromptTitle} />
        </GradientBackground>
    )
}

export default Player
