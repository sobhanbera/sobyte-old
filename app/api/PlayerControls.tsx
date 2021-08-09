import React, {useState, createContext, FC, useContext, useEffect} from 'react'
import {useRef} from 'react'

import TrackPlayer, {
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_STOPPED,
    STATE_BUFFERING,
} from 'react-native-track-player'

import {useApp, useFetcher, useMusicApi} from '../context'
import {SongObjectWithArtistAsString} from '../interfaces'
import {getHighQualityImageFromSongImage} from '../utils'

/**
 * the data type or the object type for each Tracks of the song
 */
export interface Track {
    id: string
    url: string
    duration: number
    title: string
    artist: string
    artwork: string | any
    playlistId: string
    // type?: 'default' | 'dash' | 'hls' | 'smoothstreaming'
    // pitchAlgorithm?: string | number
    // genre?: string
    // description?: string
    // album?: string
    // rating?: number | boolean
    // [key: string]: any
}
interface PlayerControlsModal {
    /**
     * list of songs which are next to the current song
     * this is generated when a new song is played or the last song reached
     */
    nextSongsList: Array<Track>

    /**
     * the current track which is playing...
     */
    current: Track

    /**
     * @param _track the actual track to play
     * @param _play we will load the track to queue but this data decise wheather to play it without user interaction (default value is true)
     * @param _showLoading wheather to show loading while loading the song data
     *
     * the common and normal play function which had many checks and then plays the song
     * also generate next songs list and there url...
     *
     * first this function will check that the track which is passed is the current playing track
     * and also if the track is a valid track
     * else it will play the current track and returns from the function....
     */
    play(_track: Track, _play?: boolean, _showLoading?: boolean): any

    /**
     * @param musicId is the id of the any track
     * @returns that the track with id is in the next songs list
     */
    checkSongAlreadyInNextSongsList(_musicId: string): any
    /**
     * @param index a number which should be an index for the nextSongList
     * this function is exactly a helper function of the @function addSongAndPlay which checks that the index is among
     * the nextsong list index and plays it then directly
     */
    playSongAtIndex(_index: number): any
    /**
     * @returns the index of the current playing song from next songs list data
     * returns -1 if no data is found
     */
    getTheIndexOfCurrentSong(): any
    /**
     * @param track is the track which is provided to play directly
     * this function resets the player and add the track which is passed and plays it directly but the track must be valid
     * since this function doesn't has any checks for the url of the music or the image or any other property
     */
    addSongAndPlay(_track: Track): any
}
const PlayerContext = createContext<PlayerControlsModal>({
    /**
     * list of songs which are next to the current song
     * this is generated when a new song is played or the last song reached
     */
    nextSongsList: [
        {
            id: '',
            url: '',
            duration: 0,
            title: '',
            artist: '',
            artwork: '',
            playlistId: '',
        },
    ],

    /**
     * the current track which is playing...
     */
    current: {
        id: '',
        url: '',
        duration: 0,
        title: '',
        artist: '',
        artwork: '',
        playlistId: '',
    },

    /**
     * @param _track the actual track to play
     * @param _play we will load the track to queue but this data decise wheather to play it without user interaction (default value is true)
     * @param _showLoading wheather to show loading while loading the song data
     *
     * the common and normal play function which had many checks and then plays the song
     * also generate next songs list and there url...
     *
     * first this function will check that the track which is passed is the current playing track
     * and also if the track is a valid track
     * else it will play the current track and returns from the function....
     */
    play: (_track: Track, _play?: boolean, _showLoading?: boolean) => {},

    /**
     * @param musicId is the id of the any track
     * @returns that the track with id is in the next songs list
     */
    checkSongAlreadyInNextSongsList: (_musicId: string) => {},
    /**
     * @param index a number which should be an index for the nextSongList
     * this function is exactly a helper function of the @function addSongAndPlay which checks that the index is among
     * the nextsong list index and plays it then directly
     */
    playSongAtIndex: (_index: number) => {},
    /**
     * @returns the index of the current playing song from next songs list data
     * returns -1 if no data is found
     */
    getTheIndexOfCurrentSong: () => {},
    /**
     * @param track is the track which is provided to play directly
     * this function resets the player and add the track which is passed and plays it directly but the track must be valid
     * since this function doesn't has any checks for the url of the music or the image or any other property
     */
    addSongAndPlay: (_track: Track) => {},
})
interface PlayerProps {
    children: any
}
const Player: FC<PlayerProps> = props => {
    const {setShowLoading} = useApp()
    const {fetchMusic} = useFetcher()
    const {getNext, getPlayer} = useMusicApi()

    /**
     * list of songs which are next to the current song
     * this is generated when a new song is played or the last song reached
     */
    const [nextSongsList, setNextSongsList] = useState<Array<Track>>([
        {
            artist: 'My Self',
            artwork:
                'https://wonderfulengineering.com/wp-content/uploads/2014/10/wallpaper-photos-31.jpg',
            duration: 10023,
            id: '123asd',
            title: 'Demo Songs & will be removed',
            url: 'asdf',
            playlistId: 'sadfi8ysaod909',
        },
    ])
    /**
     * playerstate provide the info about the track player that the song is
     * playing, paused, stopped, buffering, etc...
     */
    const [playerState, setPlayerState] = useState()
    /**
     * the current track which is playing...
     */
    const currentTrack = useRef<Track>({
        artist: '',
        artwork: '',
        duration: 0,
        id: '',
        title: '',
        url: '',
        playlistId: '',
    })

    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            'playback-state',
            ({state}) => {
                setPlayerState(state)
            },
        )

        // const playerNext = TrackPlayer.addEventListener(
        //     'remote-previous',
        //     async () => {
        //         next()
        //     },
        // )
        // const playerPrev = TrackPlayer.addEventListener(
        //     'remote-next',
        //     async () => {
        //         previous()
        //     },
        // )

        const playbackTrackChanged = TrackPlayer.addEventListener(
            'playback-track-changed',
            async res => {
                if (!res.nextTrack) {
                    return
                }

                await TrackPlayer.getTrack(res.nextTrack)
                    .then(async result => {
                        if (result === null) {
                            return
                        }
                        currentTrack.current = {
                            id: result.id,
                            url: result.url,
                            duration: result.duration || 0,
                            title: result.title,
                            artist: result.artist,
                            artwork: result.artwork,
                            playlistId: result.description || '',
                        }
                    })
                    .catch(_err => {})
            },
        )

        const remoteStop = TrackPlayer.addEventListener('remote-stop', () => {
            //     resetPlayer()
        })

        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-queue-ended',
            () => {
                // setCurrentTrack(track => ({
                //     id: track.id,
                //     url: track.url,
                //     duration: track.duration,
                //     title: track.title,
                //     artist: track.artist,
                //     artwork: track.artwork,
                //     playlistId: track.playlistId,
                // }))
            },
        )

        return () => {
            listener.remove()
            // playerNext.remove()
            // playerPrev.remove()

            playbackTrackChanged.remove()
            remoteStop.remove()
            playbackQueueEnded.remove()
        }
    }, [])

    /**
     * this function reset the track player by clearing the queue...
     */
    const resetPlayer = async () => {
        await TrackPlayer.reset().then(_res => {
            currentTrack.current = {
                id: '',
                url: '',
                duration: 0,
                title: '',
                artist: '',
                artwork: 'noimage',
                playlistId: '',
            }
        })
    }

    /**
     * @param musicId is the id of the any track
     * @returns that the track with id is in the next songs list
     */
    const checkSongAlreadyInNextSongsList = (musicId: string) => {
        if (currentTrack.current.id === musicId) return true

        for (let i in nextSongsList)
            if (nextSongsList[i].id === musicId) return true
        return false
    }

    /**
     * @param musicId is the id of the any track
     * @param list the list where to check the id is present
     * @returns that the track with id is in the the list passed...
     */
    const checkSongAlreadyInTemporaryNextSongsList = (
        musicId: string,
        list: Array<Track>,
    ) => {
        for (let i in list) if (list[i].id === musicId) return true
        return false
    }

    /**
     * @param track is the track which is provided to play directly
     * this function resets the player and add the track which is passed and plays it directly but the track must be valid
     * since this function doesn't has any checks for the url of the music or the image or any other property
     */
    const addSongAndPlay = (track: Track) => {
        if (!track) {
            if (currentTrack)
                if (playerState === STATE_PAUSED) TrackPlayer.play()
            return
        }
        if (currentTrack && track.id === currentTrack.current.id) {
            if (playerState === STATE_PAUSED) TrackPlayer.play()
            return
        }

        resetPlayer()
        const trackGot = {
            ...track,
            albdescriptionum: track.playlistId, // since we are setting the current track in playback-track-changed event listener above in the useEffect function
        }
        TrackPlayer.add([trackGot])
        TrackPlayer.play()
    }

    /**
     * @param index a number which should be an index for the nextSongList
     * this function is exactly a helper function of the @function addSongAndPlay which checks that the index is among
     * the nextsong list index and plays it then directly
     */
    const playSongAtIndex = (index: number) => {
        if (nextSongsList.length > index) {
            addSongAndPlay(nextSongsList[index])
        }
    }

    /**
     * @returns the index of the current playing song from next songs list data
     * returns -1 if no data is found
     */
    const getTheIndexOfCurrentSong = () => {
        const currentSongID = currentTrack.current.id
        for (let i in nextSongsList) {
            if (nextSongsList[i].id === currentSongID) {
                return i
            }
        }
        /**
         * returns -1 if no data is found
         */
        return -1
    }

    /**
     * @param _track the actual track to play
     * @param _play we will load the track to queue but this data decise wheather to play it without user interaction (default value is true)
     *
     * the common and normal play function which had many checks and then plays the song
     * also generate next songs list and there url...
     *
     * first this function will check that the track which is passed is the current playing track
     * and also if the track is a valid track
     * else it will play the current track and returns from the function....
     */
    const play = (
        track: Track,
        play: boolean = true,
        showLoading: boolean = false,
    ) => {
        const start = new Date().getTime()
        /**
         * first this function will check that the track which is passed is the current playing track
         * and also if the track is a valid track
         * else it will play the current track and returns from the function....
         */
        if (!track) {
            if (currentTrack.current.id)
                if (playerState === STATE_PAUSED) TrackPlayer.play()
            console.log('Condition 1')
            return
        }
        if (currentTrack.current.id && track.id === currentTrack.current.id) {
            if (playerState === STATE_PAUSED) TrackPlayer.play()
            console.log('Condition 2', playerState, STATE_PAUSED)
            return
        }

        if (showLoading && play) setShowLoading(true)
        fetchMusic(track.id)
            .then((__res: any) => {
                resetPlayer()

                if (showLoading && play) setShowLoading(false)

                const trackGot = {
                    ...track,
                    url: __res,
                    description: track.playlistId, // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
                }
                TrackPlayer.add([trackGot])
                if (play) TrackPlayer.play()
                console.log('Time took to play: ', new Date().getTime() - start)
                return

                /**
                 * after playing or starting playing the song loading of song which
                 * occurs next will start
                 */
                const nextSongsData: Array<Track> = []
                nextSongsData.push({
                    id: trackGot.id,
                    artist: trackGot.artist,
                    artwork: trackGot.artwork,
                    duration: trackGot.duration,
                    playlistId: trackGot.playlistId,
                    title: trackGot.title,
                    url: __res,
                })
                /**
                 * generating the next song list to show in the music player tab UI
                 */
                const ShouldLoadMoreData = true
                const ShouldShowDataInUI = true // if this variable is true the above varialble should be true
                // then the below code will load one more track data so that it updates the UI and show it in the music player UI...
                // condition true- to load more data, false- to load no more data...
                if (ShouldLoadMoreData && ShouldShowDataInUI)
                    // this check is given bcz I need we any developer is only working on the first song then no need to render all the songs list in music player UI and wait sometime
                    getNext(track.id, track.playlistId, '')
                        .then(res => {
                            /**
                             * since result of next contains an array which contains Objects
                             * these Object are of type {
                             *      id: string
                             *      playlistId: string
                             * }
                             * this is a demo type to resemble the object blueprint
                             * here we are itterating over the result and getting its full song data with title, artist, thumbnail, duration etc
                             */

                            /**
                             * we are getting the length of the content and according to that we are setting the @var nextSongsList only for 5 times.
                             * one time is done as for the above code
                             * one at the starting of below check
                             * other 2 updates will be done below
                             * and a final update will be done when everything is loaded
                             */
                            const numberOfContents = res.content.length
                            /**
                             * number of updates according the number of Content's...
                             */
                            const updatedDependent = Math.floor(
                                numberOfContents / 3,
                            ) // since the maximum next data we could get is 24
                            // so we are dividing by 3 to get exactly 2 updates except the last one
                            for (let i in res.content) {
                                getPlayer(
                                    res.content[i].musicId,
                                    res.content[i].playlistId,
                                    '',
                                )
                                    .then(
                                        (
                                            result: SongObjectWithArtistAsString,
                                        ) => {
                                            /**
                                             * if the song already exists in the next song list we will continue to the next itteration
                                             */
                                            if (
                                                !checkSongAlreadyInTemporaryNextSongsList(
                                                    result.musicId,
                                                    nextSongsData,
                                                )
                                            ) {
                                                /**
                                                 * if the song does not exists in the next sont list which is temporary in this case
                                                 * then this code will fetch the song url using the fetchMusic function provided by the Fetcher Context API
                                                 */
                                                fetchMusic(result.musicId)
                                                    .then(async (_res: any) => {
                                                        /**
                                                         * after getting the data will are also generating the high quality image link
                                                         * of the song and the artist name with
                                                         * finally pushing the whole data to nextSongList to get it in the music player UI
                                                         */
                                                        const highQualityImage =
                                                            getHighQualityImageFromSongImage(
                                                                result
                                                                    .thumbnails[0],
                                                                '720',
                                                            )
                                                        const artist =
                                                            result.artist

                                                        /**
                                                         * final push to nextSongList
                                                         */
                                                        nextSongsData.push({
                                                            id: result.musicId,
                                                            artist: artist,
                                                            artwork:
                                                                highQualityImage,
                                                            duration:
                                                                result.duration,
                                                            playlistId:
                                                                result.playlistId,
                                                            title: result.name,
                                                            url: _res,
                                                        })
                                                        const currentIndex =
                                                            Number(i)
                                                        if (
                                                            currentIndex ===
                                                                1 ||
                                                            currentIndex %
                                                                updatedDependent ===
                                                                0 ||
                                                            currentIndex ===
                                                                res.content
                                                                    .length -
                                                                    1
                                                        ) {
                                                            setNextSongsList(
                                                                nextSongsData,
                                                            )
                                                        }
                                                    })
                                                    .catch(_err => {})
                                            }
                                        },
                                    )
                                    .catch(err => {
                                        console.error(
                                            'GETTING PLAYER ERROR',
                                            err,
                                        )
                                    })
                            }
                            /**
                             * setting the next song list from next song list temporary data...
                             */
                            // setNextSongsList(nextSongsData)
                        })
                        .catch(err => {
                            console.error('GETTING NEXT LIST', err)
                        })
            })
            .catch(err => {
                setShowLoading(false)
                console.error('ERROR PLAYING SONG...', err)
            })
    }

    /**
     * all the values of the Context API for all the
     * children components...
     */
    const playerValues = {
        current: currentTrack.current,
        nextSongsList: nextSongsList,

        play: play,

        checkSongAlreadyInNextSongsList: checkSongAlreadyInNextSongsList,
        playSongAtIndex: playSongAtIndex,
        getTheIndexOfCurrentSong: getTheIndexOfCurrentSong,
        addSongAndPlay: addSongAndPlay,
    }

    return (
        <PlayerContext.Provider value={playerValues}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default Player
export const usePlayer = () => useContext(PlayerContext)

/**
 * we are no more providing the next songs list
 * from this context api component
 * those should be featched and renderered in there own components
 */
