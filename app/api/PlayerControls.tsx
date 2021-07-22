import React, {useState, createContext, FC, useContext, useEffect} from 'react'

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
const PlayerContext = createContext({
    playing: false, // player state is playing or not...
    paused: false, // player state is paused or not...
    stopped: false, // player state is stopped or not...
    buffering: false, // player state is buffering or not...

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
     * the common and normal play function which had many checks and then plays the song
     * also generate next songs list and there url...
     *
     * first this function will check that the track which is passed is the current playing track
     * and also if the track is a valid track
     * else it will play the current track and returns from the function....
     */
    play: (_track: Track) => {},
    /**
     * function to pause the track player
     */
    pause: () => {},
    /**
     * function to continue playing the track player
     */
    playonly: () => {},

    /**
     * function to toggle the player state
     * if paused then start playing and vice versa
     */
    toggleState: () => {},

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

    /**
     * skips to previous song
     * not is use in this application
     * @deprecated
     */
    previous: () => {},
    /**
     * skips to next song
     * not is use in this application
     * @deprecated
     */
    next: () => {},

    /**
     * @param level of the track player position
     * skip to some interger interval
     */
    seekTo: (_level: number) => {},
    /**
     * @param interval the interval to skip
     * skip to some number of interval in any direction
     * negative will make backward skip to the interval and +ve will forward skip to the interval
     */
    seekInterval: (_interval: number) => {},

    /**
     * rate of the track player
     */
    rate: 1,
    /**
     * volume of the track player and
     * rate of the track player
     */
    volume: 1,
    /**
     * @param rate the level of volume
     * this function returns the rate text
     * for Ex:
     * 1X, 2X, 5X, 0.5X, 0.25X, 0.75X etc...
     */
    getRateText: () => {},
    /**
     * @param level the level of rate
     * sets rate level of the track player
     */
    setRate: (_level: number) => {},
    /**
     * @param level the level of volume
     * sets volume level of the track player
     */
    setVolume: (_level: number) => {},
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
    const [nextSongsList, setNextSongsList] = useState<Array<Track>>([])
    /**
     * playerstate provide the info about the track player that the song is
     * playing, paused, stopped, buffering, etc...
     */
    const [playerState, setPlayerState] = useState()
    /**
     * the current track which is playing...
     */
    const [currentTrack, setCurrentTrack] = useState<Track>({
        artist: '',
        artwork: '',
        duration: 0,
        id: '',
        title: '',
        url: '',
        playlistId: '',
    })

    /**
     * volume of the track player and
     * rate of the track player
     */
    const [volume, setVolume] = useState(1)
    const [rate, setRate] = useState(1)

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
                        setCurrentTrack({
                            id: result.id,
                            url: result.url,
                            duration: result.duration || 0,
                            title: result.title,
                            artist: result.artist,
                            artwork: result.artwork,
                            playlistId: result.description || '',
                        })
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
                setCurrentTrack(track => ({
                    id: track.id,
                    url: track.url,
                    duration: track.duration,
                    title: track.title,
                    artist: track.artist,
                    artwork: track.artwork,
                    playlistId: track.playlistId,
                }))
            },
        )
        ;(async () => {
            await TrackPlayer.getVolume().then(res => {
                setVolume(res)
            })

            await TrackPlayer.getRate().then(res => {
                setRate(res)
            })
        })()

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
            setCurrentTrack({
                id: '',
                url: '',
                duration: 0,
                title: '',
                artist: '',
                artwork: 'noimage',
                playlistId: '',
            })
        })
    }

    /**
     * @param musicId is the id of the any track
     * @returns that the track with id is in the next songs list
     */
    const checkSongAlreadyInNextSongsList = (musicId: string) => {
        if (currentTrack.id === musicId) return true

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
    const addSongAndPlay = async (track: Track) => {
        if (!track) {
            console.log('First Condition IN DIRECT PLAY')
            if (currentTrack)
                if (playerState === STATE_PAUSED) await TrackPlayer.play()
            return
        }
        if (currentTrack && track.id === currentTrack.id) {
            console.log('Second Condition IN DIRECT PLAY')
            if (playerState === STATE_PAUSED) await TrackPlayer.play()
            return
        }

        resetPlayer()
        const trackGot = {
            ...track,
            albdescriptionum: track.playlistId, // since we are setting the current track in playback-track-changed event listener above in the useEffect function
        }
        await TrackPlayer.add([trackGot])
        await TrackPlayer.skip(trackGot.id)
        await TrackPlayer.play()
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
        const currentSongID = currentTrack.id
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
     * the common and normal play function which had many checks and then plays the song
     * also generate next songs list and there url...
     */
    const play = async (track: Track) => {
        /**
         * first this function will check that the track which is passed is the current playing track
         * and also if the track is a valid track
         * else it will play the current track and returns from the function....
         */
        if (!track) {
            console.log('First Condition')
            if (currentTrack)
                if (playerState === STATE_PAUSED) await TrackPlayer.play()
            return
        }
        if (currentTrack && track.id === currentTrack.id) {
            console.log('Second Condition')

            if (playerState === STATE_PAUSED) await TrackPlayer.play()
            return
        }

        setShowLoading(true)
        fetchMusic(track.id)
            .then(async (__res: any) => {
                resetPlayer()
                setShowLoading(false)

                const trackGot = {
                    ...track,
                    url: __res,
                    description: track.playlistId, // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
                }
                await TrackPlayer.add([trackGot])
                await TrackPlayer.skip(trackGot.id)
                await TrackPlayer.play()

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
                                    (result: SongObjectWithArtistAsString) => {
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
                                                    const artist = result.artist

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
                                                        currentIndex === 1 ||
                                                        currentIndex %
                                                            updatedDependent ===
                                                            0 ||
                                                        currentIndex ===
                                                            res.content.length -
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
                                    console.error('GETTING PLAYER ERROR', err)
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

        /**
         * @deprecated the below code becuase it was a much junk then this usual one
         * it was causing many performance issues because of many checks, async tasks...
         */
        // try {
        //we are checking that the track exists or not...
        // await TrackPlayer.getTrack(track.id)
        //     .then(async res => {
        //         if (!res || res === null) {
        //             await TrackPlayer.add([track])
        //         }
        //     })
        //     .catch(async err => {
        //         await TrackPlayer.add([track])
        //     })
        // } catch (err) {
        //track not found than add it...
        // await TrackPlayer.add([track])
        // } finally {
        //and finally set currentTrack to track and
        //play after skiping to the track with id [track.id]
        // setCurrentTrack(track)
        // setLoading(false);here
        /* await TrackPlayer.skip(track.id)
                .then(res => {})
                .catch(async err => {
                    // console.log('SSSSSS', err);
                    // const qu = await TrackPlayer.getQueue()
                    // console.log('QUQUQU', qu);
                }) */
        /* await TrackPlayer.play()
                .then(res => {})
                .catch(err => {}) */
        // }
    }

    /**
     * function to pause the track player
     */
    const pause = async () => {
        await TrackPlayer.pause()
    }

    /**
     * function to continue playing the track player
     */
    const playonly = async () => {
        await TrackPlayer.play()
    }

    /**
     * function to toggle the player state
     * if paused then start playing and vice versa
     */
    const toggleState = async () => {
        if (playerState === STATE_PLAYING) await TrackPlayer.pause()
        else if (playerState === STATE_PAUSED) await TrackPlayer.play()
    }

    /**
     * @param interval the interval to skip
     * skip to some number of interval in any direction
     * negative will make backward skip to the interval and +ve will forward skip to the interval
     */
    const seekInterval = async (interval: number = 10) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos + interval)
    }

    /**
     * @param level of the track player position
     * skip to some interger interval
     */
    const seekTo = async (level: number) => {
        // console.log('SEKE');
        // console.log(level);
        if (!Number.isNaN(level)) {
            await TrackPlayer.seekTo(level)
        }
    }

    /**
     * @param level the level of volume
     * sets volume level of the track player
     */
    const setVolumeLevel = (level: number) => {
        TrackPlayer.setVolume(level).then(async () => {
            await TrackPlayer.getVolume().then(res => {
                setVolume(res)
            })
        })
    }

    /**
     * @param rate the level of volume
     * this function returns the rate text
     * for Ex:
     * 1X, 2X, 5X, 0.5X, 0.25X, 0.75X etc...
     */
    const getRateText = () => {}

    /**
     * @param level the level of rate
     * sets rate level of the track player
     */
    const setRateLevel = (level: number) => {
        TrackPlayer.setRate(level).then(async () => {
            setRate(level)
        })
    }

    /**
     * skips to previous song
     * not is use in this application
     * @deprecated
     */
    const previous = async () => {
        TrackPlayer.skipToPrevious()
            .then(_res => {})
            .catch(_err => {
                // console.log('ERRO WHILE PREVIOUS', err.code);
            })
    }

    /**
     * skips to next song
     * not is use in this application
     * @deprecated
     */
    const next = async () => {
        TrackPlayer.skipToNext()
            .then(_res => {})
            .catch(_err => {
                // console.log('ERRO WHILE NEXT', err.code);
            })
    }

    /**
     * all the values of the Context API for all the
     * children components...
     */
    const playerValues = {
        playing: playerState === STATE_PLAYING,
        paused: playerState === STATE_PAUSED,
        stopped: playerState === STATE_STOPPED,
        buffering: playerState === STATE_BUFFERING,

        current: currentTrack,
        nextSongsList: nextSongsList,

        play: play,
        playonly: playonly,
        pause: pause,
        toggleState: toggleState,

        checkSongAlreadyInNextSongsList: checkSongAlreadyInNextSongsList,
        playSongAtIndex: playSongAtIndex,
        getTheIndexOfCurrentSong: getTheIndexOfCurrentSong,
        addSongAndPlay: addSongAndPlay,

        next: next,
        previous: previous,

        seekTo: seekTo,
        seekInterval: seekInterval,

        rate: rate,
        getRateText: getRateText,
        setRate: setRateLevel,

        volume: volume,
        setVolume: setVolumeLevel,
    }

    return (
        <PlayerContext.Provider value={playerValues}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default Player
export const usePlayer = () => useContext(PlayerContext)
