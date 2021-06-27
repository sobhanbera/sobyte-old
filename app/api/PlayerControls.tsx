import React, {useState, createContext, FC, useContext, useEffect} from 'react'

import TrackPlayer, {
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_STOPPED,
} from 'react-native-track-player'

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

    current: Track

    play?: Function
    pause?: Function
    next?: Function
    previous?: Function

    seekTo: Function
    seekLevel: Function

    rate: number
    getRateText: Function
    setRate: Function

    volume: number
    setVolume: Function
}
const PlayerContext = createContext<PlayerContextProperty>({
    playing: false,
    paused: false,
    stopped: false,

    current: {
        id: '',
        url: '',
        duration: 0,
        title: '',
        artist: '',
        artwork: '',
    },

    play: () => {},
    pause: () => {},
    next: () => {},
    previous: () => {},

    seekTo: (interval: number) => {},
    seekLevel: () => {},

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

        TrackPlayer.addEventListener('playback-track-changed', async res => {
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
                        duration: result.duration,
                        title: result.title,
                        artist: result.artist,
                        artwork: result.artwork,
                    })
                })
                .catch(err => {})
        })

        TrackPlayer.addEventListener('remote-stop', () => {
            resetPlayer()
        })

        TrackPlayer.addEventListener('playback-queue-ended', () => {
            setCurrentTrack({
                id: '',
                url: '',
                duration: 0,
                title: '',
                artist: '',
                artwork: '',
            })
        })
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
        await pause()

        if (!track) {
            if (currentTrack) await TrackPlayer.play()
            return
        }

        if (currentTrack && track.id === currentTrack.id) {
            await TrackPlayer.play()
            return
        }

        // setLoading(true); here
        try {
            //we are checking that the track exists or not...
            await TrackPlayer.getTrack(track.id)
                .then(async res => {
                    if (!res || res === null) {
                        await TrackPlayer.add([track])
                    }
                })
                .catch(async err => {
                    await TrackPlayer.add([track])
                })
        } catch (err) {
            //track not found than add it...
            await TrackPlayer.add([track])
        } finally {
            //and finally set currentTrack to track and
            //play after skiping to the track with id [track.id]
            setCurrentTrack(track)
            // setLoading(false);here
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
        }
    }

    const pause = async () => {
        await TrackPlayer.pause()
    }

    const seekTo = async (interval: number = 10) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos + interval)
    }

    const seekLevel = async (level: number) => {
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

        current: currentTrack,

        play: play,
        pause: pause,
        next: next,
        previous: previous,

        seekTo: seekTo,
        seekLevel: seekLevel,

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
