import React, {FC, useState, useEffect, useCallback, useRef} from 'react'
import {
    View,
    Animated,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    FlatList,
    ToastAndroid,
} from 'react-native'
import LottieView from 'lottie-react-native'
import TrackPlayer from 'react-native-track-player'

import {useFetcher, useMusicApi, usePlayer, useTheme} from '../../../context'
import {
    GradientBackground,
    MusicPlayerSongView,
    BackgroundBluredImage,
} from '../../../components'
import {
    DefaultStatusBarComponent,
    LIKE_ANIMATION_DISAPPEAR_DURATION,
    RANDOM_SEARCH_QUERY as getRandomSearchQuery,
    INITIAL_NUMBER_OF_TRACKS_TO_LOAD,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
    SCREEN_HEIGHT,
} from '../../../constants'
import {
    formatArtists,
    getNotificationPlayerImageFromLinkWithHeight,
} from '../../../utils'
import {FetchedSongObject, MusicTrack, SongObject} from '../../../interfaces'
import globalStyles from '../../../styles/global.styles'
import {Track} from '../../../interfaces'

const AppLoadingAnimation = require('../../../assets/animations/animation.json')
const PopupLikeAnimation = require('../../../assets/animations/like_popup.json')
// const LikeAnimation = require('../../../assets/animations/like.json')
// const FlyingLikeAnimation = require('../../../assets/animations/like_flying.json')

interface ExtraTypeHelper extends SongObject {
    keyword: string
}
// this is the type when a song is changed this data is provided through the track description
interface ContinousDataTrackDetails extends Track {
    description: string
}

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
    const {initMusicApi, search, getContinuation, error} = useMusicApi()
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
        // random song query before loading songs...
        const randomQuery = getRandomSearchQuery()
        /**
         * debug code below...
         */
        console.log(randomQuery)

        search(
            'Arijit Singh',
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
                const trackImage = getNotificationPlayerImageFromLinkWithHeight(
                    initialTrack.thumbnails[0].url,
                    initialTrack.thumbnails[0].height,
                )

                // without this below line the songs will only scroll after the user somewhat scrolls the flatlist...
                currentlyPlayingTrackID.current = initialTrack.musicId // setting the first song which would be played so that there is no such user interaction is required to auto scroll from next time

                play(
                    {
                        artist,
                        artwork: trackImage,
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
     * this function will be called when the songs list has reached to its bottom or the list of songs is ended
     * this function will load more songs data and append those data to the end of @var songs list...
     * by this we can form a infinite scrolling songs list....
     *
     * @param {boolean} scrollToNextSongAfterLoadingMoreData is a variable that will say wheather to scroll to the next song after loading the data this variable could be used when the song has been scrolled to the end automatically and there is no songs next to it
     * this may happen when there was no internet for sometime so when the last 3 or 2 song from end reached it could not load more data
     * this is then the backup case if internet is found we can load and scroll to the next song
     * @param {number} index this is the index of the song which was played currently if the @var scrollToNextSongAfterLoadingMoreData is true we will scroll to this index only, after loading more song/track data
     * @param {SongObject} previousSong a object which is the the last song which is playing or added...
     * actually this is the previous song for which next song must be loaded
     *
     * above parameters were used in previous version of music player UI component...
     */
    const loadMoreSongsDatas = (
        scrollToNextSongAfterLoadingMoreData: boolean = false,
        scrollToNextIndex: number = -1,
    ) => {
        /**
         * we are continously getting the songs using the continuation object of the FetchedSongsObjects...
         */
        getContinuation('search', songs.continuation, 'SONG')
            .then((res: FetchedSongObject) => {
                // more data for continous songs list is loaded now we can set this data to the state...
                setSongs(songs => ({
                    content: songs.content.concat(res.content),
                    continuation: res.continuation,
                }))
                // if the end of the scroll is reached and there are no songs then we will scroll to the next song after loading more songs
                if (
                    scrollToNextSongAfterLoadingMoreData &&
                    scrollToNextIndex >= 0
                ) {
                    scrollToSongIndex(scrollToNextIndex)
                }
            })
            .catch(_err => {
                ToastAndroid.show(
                    'Cannot load more data. Internet Issues found.',
                    ToastAndroid.SHORT,
                )
            })
    }

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
     * whenever a new song is played or the current track is also played this function will be called
     * if the song if played from music player by scrolling up/down this function will do nothing
     * while if the track/song is played from other sections of the application like the explore tab, search tab, or from the downloads list, songs details screen,
     * artists tabs, etc.
     * then this funtion will load more data related to the song which is changed or played (the latest song)
     */
    const onTrackChangedFromGlobalContext = (
        track: ContinousDataTrackDetails,
    ) => {
        /** this will the case when the search query is not provided while playing the song and this will only occur when the song is changed through music player itself
         * but if it is changed within music player then this code will not reach it will terminate much before. before calling this function from the event listener...
         */
        if (
            // typeof track.description === 'string' &&
            String(track.description).length <= 0
        ) {
            return
        }
        // if the above condition is false then search data and song data is provided now we could go futhure..
        const TrackDescription: ExtraTypeHelper = JSON.parse(track.description)

        /**
         * if the current track's id is empty or null this could be becuase there are no track/song in the queue
         * this could also happen because we called this before the change of song this is good because the function will again execute when the actual song is played
         * if the song's id is null or the music player's current track's id is null do nothing since we could not say what is the current song and can't load the next songs list
         *
         * in short we are detecting that every data is present or not which is required to do the task later this check
         */
        if (
            !track.id ||
            !currentlyPlayingTrackID ||
            TrackDescription.keyword.length <= 0 ||
            TrackDescription.musicId.length <= 0
        )
            return
        // if both the id are valid and present in the memory and track is successfully played...
        // if the new songs id is different from the saved id of this local music player

        // this is the variable which will be updated to the main songs state after loading the data...
        const songsList: SongObject[] = [
            {
                ...TrackDescription,
            },
        ]
        setSongs({
            content: songsList,
            continuation: {
                clickTrackingParams: '', // providing some initial data to resolve warnings...
                continuation: '',
            },
        })
        search(TrackDescription.keyword, 'SONG', false, false, '', [0, 10])
            .then((res: FetchedSongObject) => {
                /**
                 * itterating over all the results we have got and checking wheather the results song
                 * includes the song which is played currently..
                 */
                for (let i in res.content) {
                    if (res.content[i].musicId === TrackDescription.musicId) {
                        continue // if the song is exist in this result that means we do not need to do anything
                        // buy one thing is sure that the user have played the song from the result just after the searching or searched result.
                        // that means the user has not loaded more data or so ...
                        // although this is temporary
                    } else {
                        songsList.push(res.content[i]) // include this song data
                    }
                }

                // now updating the main song list state
                setSongs({content: songsList, continuation: res.continuation})

                // the scrollview/flatlist may be scrolled to some position so we are adjusting the position of that after loading the songs...
                scrollToSongIndex(0)
            })
            .catch(_err => {})
    }

    /**
     * this function will be triggered automatically when a song is ended
     * or exactly the current song which was playing is ended (the queue is ended)
     */
    const currentTrackEndedScrollDown = () => {
        if (currentlyPlayingTrackID.current.length <= 0) return
        /**
         * checking that which songs was playing currently
         * by using the local variable @var currentlyPlayingTrackID and iterating over the songs list
         * when the id is equal to any of the songs list music item it means that music was playing and we will check the index of that song item
         * if the index is the last index of the song item then we will load more data and then scroll one index down for the flatlist
         * other wise if the song index is not the last song than scroll to the next index and that song will be played than...
         */
        const numberOfSongs = songs.content.length
        for (let index = 0; index < numberOfSongs; ++index) {
            if (
                songs.content[index].musicId === currentlyPlayingTrackID.current
            ) {
                // if the track id which has been ended is found
                if (index === numberOfSongs - 1) {
                    // if the song is the last song which is available to play and has ended load more songs and then scroll to the next one...
                    loadMoreSongsDatas(true, index + 1) // scroll to the song at index -> index + 1
                } else {
                    // if that song's index is not the last one in the list of songs than scroll to next song...
                    // also play the song first

                    // play data
                    const initialTrack = songs.content[index + 1]
                    const artist = formatArtists(initialTrack.artist)
                    const trackImage =
                        getNotificationPlayerImageFromLinkWithHeight(
                            initialTrack.thumbnails[0].url,
                            initialTrack.thumbnails[0].height,
                        )

                    play(
                        {
                            artist,
                            artwork: trackImage,
                            id: initialTrack.musicId,
                            duration: initialTrack.duration,
                            playlistId: initialTrack.playlistId,
                            title: initialTrack.name,
                            url: '',
                        },
                        '',
                    )
                    currentlyPlayingTrackID.current = initialTrack.musicId
                    scrollToSongIndex(index + 1) // scroll to the song at index -> index + 1
                }
                // since we have found the song which was playing recently our task is completed so return from this function...
                break
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
                /**
                 * checking if the current track's id from global track-player is
                 * same as the local current track's id here in this component
                 * if - the id is same than it means that the user had scrolled and then the song is changed in this case do nothing
                 * else - the song is played from outside of this component like explore tab or search tab, download list, artists list, albums, playlist, songs list outside of this component, etc...
                 * in this case load more data which should be played after the current song which is changed....
                 */
                if (trackData.nextTrack === currentlyPlayingTrackID.current) {
                    // do nothing since the song is played from music player itself
                    // may be by user's scrolling or the multiple songs are ended...
                } else {
                    // load more data in this case
                    TrackPlayer.getTrack(trackData.nextTrack)
                        .then((result: any | MusicTrack) => {
                            if (result === null || result === undefined) {
                                return
                            }
                            onTrackChangedFromGlobalContext(result)
                        })
                        .catch(_err => {})
                }
            },
        )

        /**
         * we the current song will end we will scroll down to the next song if
         * there is a song exists let see the function implementation first...
         */
        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-queue-ended',
            _queueEndedData => {
                /**
                 * since sometime this happens that even if the song is not playing when refreshed in development build
                 * then the song automatically changed (no song is played then also) for that case we are providing a condition
                 * where the track should not be null to continue...
                 * and rest is given as another comment see below line...
                 */
                if (
                    _queueEndedData.position > 0 &&
                    _queueEndedData.track !== null
                )
                    currentTrackEndedScrollDown() // since if the queue ending position of the song must be a +ve integer
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
    }, [songs])

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
            length: SCREEN_HEIGHT,
            offset: SCREEN_HEIGHT * index,
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
        const trackImage = getNotificationPlayerImageFromLinkWithHeight(
            item.thumbnails[0].url,
            item.thumbnails[0].height,
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

    const scrollChangedHandler = (event: any) => {
        /**
         * here we are also loading the next song's data url
         * in advance so that if the user scrolls down the song plays in the least time
         * and more efficient if some time is given and then scrolled
         *
         * IMP NOTE: this task will only be done if the next indexed song exists...
         *
         * if the scroll position is showing a full part of any song than only we will load the next song data url
         */

        if (event.nativeEvent.contentOffset.y % SCREEN_HEIGHT === 0) {
            const nextSongIndex =
                event.nativeEvent.contentOffset.y / SCREEN_HEIGHT
            if (
                songs.content[nextSongIndex + 1] !== undefined &&
                songs.content[nextSongIndex + 1].musicId.length > 0
            ) {
                fetchMusic(songs.content[nextSongIndex + 1].musicId)
            }
        }
    }

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

            {/* this section is temporarily commented */}
            {/* main content of this particular tab */}
            {/* {songs?.content.length && songs?.content[0].musicId.length ? (
                <View style={StyleSheet.absoluteFillObject}>
                    {songs.content.map((song, _) => {
                        // return null
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
            ) : null} */}

            <View
                style={{
                    height: 100,
                    backgroundColor: 'green',
                    position: 'absolute',
                }}></View>

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
                    // onResponderRelease={re => {
                    //     console.log(re)
                    // }}
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
                    onEndReached={() => loadMoreSongsDatas()} // more data when the end is reaching close while scrolling...
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollX}}}],
                        {
                            useNativeDriver: true,
                            listener: event => {
                                scrollChangedHandler(event)
                            },
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

// test commit
// these are done since to check the code even works in production or not with different commits...
// recently an error occurred due to git while generating the application
