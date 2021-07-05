import React, {useState, createContext, FC, useContext, useEffect} from 'react'

import TrackPlayer, {
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_STOPPED,
    STATE_BUFFERING,
} from 'react-native-track-player'

// const DemoMusicContextReturn = () => axios.request<any>({})
const DemoMusicContextReturn = () => new Promise<any>(() => {})

export interface Track {
    id: string
    url: string
    duration: number
    title: string
    artist: string
    artwork: string | any
    // type?: 'default' | 'dash' | 'hls' | 'smoothstreaming'
    // pitchAlgorithm?: string | number
    // genre?: string
    // description?: string
    // album?: string
    // rating?: number | boolean
    // [key: string]: any
}
interface PlayerContextProperty {
    playing: boolean
    paused: boolean
    stopped: boolean
    buffering: boolean

    current: Track

    /**
     * @param _track the Track object to play the song
     */
    play: Function
    playonly: Function
    pause: Function
    toggleState: Function
    next: Function
    previous: Function

    seekTo: Function
    seekInterval: Function

    rate: number
    getRateText: Function
    setRate: Function

    volume: number
    setVolume: Function
}
const PlayerContext = createContext({
    playing: false,
    paused: false,
    stopped: false,
    buffering: false,

    current: {
        id: '',
        url: '',
        duration: 0,
        title: '',
        artist: '',
        artwork: '',
    },

    play: (_track: Track) => {},
    playonly: () => {},
    pause: () => {},
    toggleState: () => {},

    next: () => {},
    previous: () => {},

    seekTo: (_level: number) => {},
    seekInterval: (interval: number) => {},

    rate: 1,
    getRateText: () => {},
    setRate: (level: number) => {},

    volume: 1,
    setVolume: (level: number) => {},
})
interface PlayerProps {
    children: any
}
const Player: FC<PlayerProps> = props => {
    const [playerState, setPlayerState] = useState()
    const [currentTrack, setCurrentTrack] = useState<Track>({
        id: '',
        url: '',
        duration: 0,
        title: '',
        artist: '',
        artwork: '',
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
                        })
                    })
                    .catch(err => {})
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
        await TrackPlayer.reset().then(res => {
            setCurrentTrack({
                id: '',
                url: '',
                duration: 0,
                title: '',
                artist: '',
                artwork: '',
            })
        })
    }

    const play = async (track: Track) => {
        // await pause()

        if (!track) {
            if (currentTrack) await TrackPlayer.play()
            return
        }

        if (currentTrack && track.id === currentTrack.id) {
            await TrackPlayer.play()
            return
        }

        await TrackPlayer.add([track])
        setCurrentTrack(track)
        await TrackPlayer.skip(track.id)
            .then(res => {})
            .catch(async err => {
                // console.log('SSSSSS', err);
                // const qu = await TrackPlayer.getQueue()
                // console.log('QUQUQU', qu);
            })

        await TrackPlayer.play()
            .then(res => {})
            .catch(err => {})

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
            .then(res => {})
            .catch(err => {
                // console.log('ERRO WHILE PREVIOUS', err.code);
            })
    }

    const next = async () => {
        TrackPlayer.skipToNext()
            .then(res => {})
            .catch(err => {
                // console.log('ERRO WHILE NEXT', err.code);
            })
    }

    const playerValues = {
        playing: playerState === STATE_PLAYING,
        paused: playerState === STATE_PAUSED,
        stopped: playerState === STATE_STOPPED,
        buffering: playerState === STATE_BUFFERING,

        current: currentTrack,

        play: play,
        playonly: playonly,
        pause: pause,
        toggleState: toggleState,
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
