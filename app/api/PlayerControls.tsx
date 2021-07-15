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

    next: () => {},
    previous: () => {},

    seekTo: (_level: number) => {},
    seekInterval: (_interval: number) => {},

    checkSongAlreadyInNextSongsList: (_musicId: string) => {},

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
        artist: 'Shawn Mendes, Camila Cabe... Test',
        artwork:
            'https://lh3.googleusercontent.com/TK-09E9wZOUk84ktqwb-zNBXfnY3Z927d3fpJ3ObwwOyREKzjAQMMYx0pGSjVAAV2zpRJDpDAavlAPSz=w720-h720-l90-rj',
        duration: 191000,
        id: 'VKC_hzJ3jzg',
        title: 'Señorita',
        url: 'https://r3---sn-ci5gup-g2ge.googlevideo.com/videoplayback?expire=1626132827&ei=-3zsYLzrGeTRz7sPwvKO8Ac&ip=27.62.144.73&id=o-AP85Mm67nnZO6pXPuEJ1j3_lZS7tNfpzd7wnkugh2E4x&itag=251&source=youtube&requiressl=yes&mh=-y&mm=31%2C29&mn=sn-ci5gup-g2ge%2Csn-ci5gup-cvhs&ms=au%2Crdu&mv=m&mvi=3&pcm2cms=yes&pl=22&gcr=in&initcwndbps=172500&vprv=1&mime=audio%2Fwebm&ns=pqp4XjvkbF_lYPYdnuAFx78G&gir=yes&clen=3265170&dur=190.981&lmt=1583247022679728&mt=1626110945&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=H4ZPxKXMRO44NKcien&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgZbFL9puxPwHrFrbYQXjdReJt1FYlGePqEnHHmCL2qYQCIGWj8vksLauAajQ-RNyDbftzKZnf43GHYQUdOo51_EtB&ratebypass=yes&sig=AOq0QJ8wRQIhANKBY-k7Kvufyth6UM8wgfwy_pF0nYAlxHq3ipOu6h-KAiAn1Zwz62XNZc074-p9RHIJKtvVp55xRyeTvXMoSE0eBQ%3D%3D',
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
                artwork: '',
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
                const trackGot = {
                    ...track,
                    url: __res,
                    album: track.playlistId, // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
                }
                await TrackPlayer.add([trackGot])
                await TrackPlayer.skip(trackGot.id)

                setShowLoading(false)

                await TrackPlayer.play()
                    .then(_res => {})
                    .catch(_err => {})

                /**
                 * after playing or starting playing the song loading of song which
                 * occurs next will start
                 */
                getNext(track.id, track.playlistId, '')
                    .then(res => {
                        const nextSongsData: Array<Track> = []

                        for (let i in res.content) {
                            getPlayer(
                                res.content[i].musicId,
                                res.content[i].playlistId,
                                '',
                            )
                                .then(
                                    (result: SongObjectWithArtistAsString) => {
                                        if (
                                            !checkSongAlreadyInNextSongsList(
                                                result.musicId,
                                            )
                                        ) {
                                            const highQualityImage =
                                                getHighQualityImageFromSongImage(
                                                    result.thumbnails[0],
                                                    '720',
                                                )
                                            const artist = result.artist

                                            nextSongsData.push({
                                                id: result.musicId,
                                                artist: artist,
                                                artwork: highQualityImage,
                                                duration: result.duration,
                                                playlistId: result.playlistId,
                                                title: result.name,
                                                url: '',
                                            })
                                        }
                                    },
                                )
                                .catch(err => {
                                    console.error('GETTING PLAYER ERROR', err)
                                })
                        }
                        setNextSongsList(nextSongsData)
                    })
                    .catch(err => {
                        console.error('GETTING NEXT LIST', err)
                    })
            })
            .catch(err => console.error('ERROR PLAYING SONG...', err))

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
        next: next,
        previous: previous,

        checkSongAlreadyInNextSongsList: checkSongAlreadyInNextSongsList,

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
