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
import NetInfo from '@react-native-community/netinfo' // if the internet connection is slow than we will load low quality track else load high quality progressively...
import TrackPlayer from 'react-native-track-player'

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
    const {play} = usePlayer()
    const {randomGradient} = useTheme()
    const {initMusicApi, search, getNext, getContinuation, error} =
        useMusicApi()
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
    const scrollReference = useRef<FlatList>(null)

    const likeAnimRef = useRef<LottieView>(null)
    const isAnimationPlaying = useRef<boolean>(false)

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

    /**
     * @param {number} index in the index of the song in where to scroll the flatlist
     * function which scroll to the song at index @param index
     */
    const scrollToSongIndex = (index: number) => {
        scrollReference.current?.scrollToIndex({
            index: index, // scrolling to the next song in the list
            animated: true,
        })
    }
    /**
     * this function will be called when the songs list has reached to its bottom or the list of songs is ended
     * this function will load more songs data and append those data to the end of @var songs list...
     * by this we can form a infinite scrolling songs list....
     *
     * @param {boolean} scrollToNextSongAfterLoadingMoreData is a variable that will say wheather to scroll to the next song after loading the data this variable could be used when the song has been scrolled to the end automatically and there is no songs next to it
     * this may happen when there was no internet for sometime so when the last 3 or 2 song from end reached it could not load more data
     * this is then the backup case if internet is found we can load and scroll to the next song
     * @param {number} index this is the index of the song which was played currently if the @var scrollToNextSongAfterLoadingMoreData is true we will scroll to this index only, after loading more song/track data
     */
    const continueTheSongsList = (
        scrollToNextSongAfterLoadingMoreData: boolean = false,
        index: number = 0,
    ) => {
        getContinuation('search', songs.continuation, 'SONG')
            .then((res: FetchedSongObject) => {
                for (let i in res.content) {
                    console.log(res.content[i].name)
                }

                // if the scrollToNextSongAfterLoadingMoreData variable is true than this function is called when a song is ended and the last song is reached in this case scroll to next song after setting the songs list
                if (scrollToNextSongAfterLoadingMoreData) {
                    scrollToSongIndex(index)
                }
            })
            .catch(err => {})
    }

    /**
     * whenever a new song is played or the current track is also played this function will be called
     * if the song if played from music player by scrolling up/down this function will do nothing
     * while if the track/song is played from other sections of the application like the explore tab, search tab, or from the downloads list, songs details screen,
     * artists tabs, etc.
     * then this funtion will load more data related to the song which is changed or played (the latest song)
     */
    const trackChangedInPlayerControlsLoadDifferentData = (
        currentTrackID: string,
    ) => {
        /**
         * if the current track's id is empty or null this could be becuase there are no track/song in the queue
         * this could also happen because we called this before the change of song this is good because the function will again execute when the actual song is played
         * if the song's id is null or the music player's current track's id is null do nothing since we could not say what is the current song and can't load the next songs list
         */
        if (!currentTrackID || !currentlyPlayingTrackID) return
        // if both the id are valid and present in the memory and track is successfully played...
        // if the new songs id is different from the saved id of this local music player

        /**
         * checking if the current track's id from global track-player is
         * same as the local current track's id here in this component
         * if - the id is same than it means that the user had scrolled and then the song is changed in this case do nothing
         * else - the song is played from outside of this component like explore tab or search tab, download list, artists list, albums, playlist, songs list outside of this component, etc...
         * in this case load more data which should be played after the current song which is changed....
         */
        if (currentTrackID === currentlyPlayingTrackID.current) {
            console.log('<<<< MUSIC PLAYER >>>> .')
        } else {
            console.log('<<<< OUTER >>>> .')
        }
    }
    /**
     * this function will be triggered automatically when a song is ended
     * or exactly the current song which was playing is ended (the queue is ended)
     */
    const currentTrackEndedScrollDown = () => {
        /**
         * checking that which songs was playing currently
         * by using the local variable @var currentlyPlayingTrackID and iterating over the songs list
         * when the id is equal to any of the songs list music item it means that music was playing and we will check the index of that song item
         * if the index is the last index of the song item then we will load more data and then scroll one index down for the flatlist
         * other wise if the song index is not the last song than scroll to the next index and that song will be played than...
         */
        const numberOfSongs = songs.content.length
        for (
            let currentSongIndex = 0;
            currentSongIndex < numberOfSongs;
            ++currentSongIndex
        ) {
            if (
                songs.content[currentSongIndex].musicId ===
                currentlyPlayingTrackID.current
            ) {
                // if the track id which has been ended is found
                if (currentSongIndex === numberOfSongs - 1) {
                    // if the song is the last song which is available to play and has ended load more songs and then scroll to the next one...
                    console.log('Load more data')
                    continueTheSongsList(true, currentSongIndex + 1) // scroll to the song at index -> currentSongIndex + 1
                } else {
                    // if that song's index is not the last one in the list of songs than scroll to next song...
                    scrollToSongIndex(currentSongIndex + 1) // scroll to the song at index -> currentSongIndex + 1
                }
            }
        }
    }
    useEffect(() => {
        /**
         * when a new track is played from anywhere the application
         * maybe from music player by scrolling or from other tabs like explore, search, downloads, etc...
         * this callback function will be called
         */
        const playbackTrackChanged = TrackPlayer.addEventListener(
            'playback-track-changed',
            trackData => {
                trackChangedInPlayerControlsLoadDifferentData(
                    trackData.nextTrack,
                )
            },
        )

        /**
         * we the current song will end we will scroll down to the next song if
         * there is a song exists let see the function implementation first...
         */
        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-queue-ended',
            _queueEndedData => {
                currentTrackEndedScrollDown()
                // console.log('Queue ended with this data', queueEndedData)
            },
        )

        /**
         * cleaning up the event listeners of react-native-track-player
         * so that no memory overflow or state managment error/warnings occurs...
         */
        return () => {
            playbackTrackChanged.remove()
            playbackQueueEnded.remove()
        }
    }, [])

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

        /**
         *  this below step is very very very important to load data and show data in the UI
         * we are changing the current track playing in this local music player UI itself...
         */
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
