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
    playing: false,
    paused: false,
    stopped: false,
    buffering: false,
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

    current: {
        id: '',
        url: '',
        duration: 0,
        title: '',
        artist: '',
        artwork: '',
        playlistId: '',
    },

    play: (_track: Track) => {},
    playonly: () => {},
    pause: () => {},
    toggleState: () => {},

    checkSongAlreadyInNextSongsList: (_musicId: string) => {},
    playSongAtIndex: (_index: number) => {},
    getTheIndexOfCurrentSong: () => {},
    addSongAndPlay: (_track: Track) => {},

    next: () => {},
    previous: () => {},

    seekTo: (_level: number) => {},
    seekInterval: (_interval: number) => {},

    rate: 1,
    getRateText: () => {},
    setRate: (_level: number) => {},

    volume: 1,
    setVolume: (_level: number) => {},
})
interface PlayerProps {
    children: any
}
const Player: FC<PlayerProps> = props => {
    const {setShowLoading} = useApp()
    const {fetchMusic} = useFetcher()
    const {getNext, getPlayer} = useMusicApi()

    const [nextSongsList, setNextSongsList] = useState<Array<Track>>([])
    const [playerState, setPlayerState] = useState()
    const [currentTrack, setCurrentTrack] = useState<Track>({
        artist: '',
        artwork: '',
        duration: 0,
        id: '',
        title: '',
        url: '',
        playlistId: '',
    })

    const [volume, setVolume] = useState(1)
    const [rate, setRate] = useState(1)

    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            'playback-state',
            ({state}) => {
                setPlayerState(state)
            },
        )

        const playerNext = TrackPlayer.addEventListener(
            'remote-previous',
            async () => {
                next()
            },
        )

        const playerPrev = TrackPlayer.addEventListener(
            'remote-next',
            async () => {
                previous()
            },
        )

        // const playbackTrackChanged =
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
                            playlistId: result.album || '',
                        })
                        console.log('SETTING PLAYLIST', result.album)
                    })
                    .catch(_err => {})
            },
        )

        // const remoteStop =
        const remoteStop = TrackPlayer.addEventListener('remote-stop', () => {
            resetPlayer()
        })

        // const playbackQueueEnded =
        const playbackQueueEnded = TrackPlayer.addEventListener(
            'playback-queue-ended',
            () => {
                setCurrentTrack(track => ({
                    id: '',
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
            playerNext.remove()
            playerPrev.remove()

            playbackTrackChanged.remove()
            remoteStop.remove()
            playbackQueueEnded.remove()
        }
    }, [])

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

    const checkSongAlreadyInNextSongsList = (musicId: string) => {
        if (currentTrack.id === musicId) return true

        for (let i in nextSongsList)
            if (nextSongsList[i].id === musicId) return true
        return false
    }

    const checkSongAlreadyInTemporaryNextSongsList = (
        musicId: string,
        list: Array<Track>,
    ) => {
        for (let i in list) if (list[i].id === musicId) return true
        return false
    }

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
            album: track.playlistId, // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
        }
        await TrackPlayer.add([trackGot])
        await TrackPlayer.skip(trackGot.id)
        await TrackPlayer.play()
    }

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

    const play = async (track: Track) => {
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
                    album: track.playlistId, // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
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
                                                })
                                                .catch(err => {})
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
                        setNextSongsList(nextSongsData)
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

    const pause = async () => {
        await TrackPlayer.pause()
    }

    const playonly = async () => {
        if (currentTrack.id)
            if (playerState === STATE_PAUSED) await TrackPlayer.play()
    }

    const toggleState = async () => {
        if (playerState === STATE_PLAYING) await TrackPlayer.pause()
        else if (playerState === STATE_PAUSED) await TrackPlayer.play()
    }

    const seekInterval = async (interval: number = 10) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos + interval)
    }

    const seekTo = async (level: number) => {
        // console.log('SEKE');
        // console.log(level);
        if (!Number.isNaN(level)) {
            await TrackPlayer.seekTo(level)
        }
    }

    const setVolumeLevel = (level: number) => {
        TrackPlayer.setVolume(level).then(async () => {
            await TrackPlayer.getVolume().then(res => {
                setVolume(res)
            })
        })
    }

    const getRateText = () => {}

    const setRateLevel = (level: number) => {
        TrackPlayer.setRate(level).then(async () => {
            setRate(level)
        })
    }

    const previous = async () => {
        TrackPlayer.skipToPrevious()
            .then(_res => {})
            .catch(_err => {
                // console.log('ERRO WHILE PREVIOUS', err.code);
            })
    }

    const next = async () => {
        TrackPlayer.skipToNext()
            .then(_res => {})
            .catch(_err => {
                // console.log('ERRO WHILE NEXT', err.code);
            })
    }

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
