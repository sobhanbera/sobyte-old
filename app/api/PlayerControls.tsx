import React, {createContext, FC, useContext, useEffect} from 'react'
import {useRef} from 'react'

import TrackPlayer, {STATE_PAUSED} from 'react-native-track-player'

import {useApp, useFetcher} from '../context'
import {ContinuationObject} from '../interfaces'

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
    play(
        track: Track,
        continuation: ContinuationObject | {} | {},
        play?: boolean,
        showLoading?: boolean,
    ): any

    /**
     * @param track is the track which is provided to play directly
     * this function resets the player and add the track which is passed and plays it directly but the track must be valid
     * since this function doesn't has any checks for the url of the music or the image or any other property
     */
    addSongAndPlay(track: Track): any
}
const PlayerContext = createContext<PlayerControlsModal>({
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
    play: (
        _track: Track,
        _continuation: ContinuationObject | {} | {} = {},
        _play?: boolean,
        _showLoading?: boolean,
    ) => {},

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

    /**
     * playerstate provide the info about the track player that the song is
     * playing, paused, stopped, buffering, etc...
     */
    const playerState = useRef<number>()
    /**
     * the current track's ID which is playing currenlty...
     * this will be changed depending when the track is changed or new track is player from any where in the application...
     */
    const currentTrackID = useRef<string>('')

    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            'playback-state',
            ({state}) => {
                playerState.current = state
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
                currentTrackID.current = res.nextTrack // res.nextTrack is the is of the currently playing song so why to get the track we can get the id from here itself..

                // await TrackPlayer.getTrack(res.nextTrack)
                //     .then(async result => {
                //         if (result === null) {
                //             return
                //         }
                //         currentTrackID.current = result.id
                //     })
                //     .catch(_err => {})
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
            currentTrackID.current = ''
        })
    }

    /**
     * @param track is the track which is provided to play directly
     * this function resets the player and add the track which is passed and plays it directly but the track must be valid
     * since this function doesn't has any checks for the url of the music or the image or any other property
     */
    const addSongAndPlay = (track: Track) => {
        if (!track) {
            if (currentTrackID.current)
                if (playerState.current === STATE_PAUSED) TrackPlayer.play()
            return
        }
        if (currentTrackID.current && track.id === currentTrackID.current) {
            if (playerState.current === STATE_PAUSED) TrackPlayer.play()
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
        continuation: ContinuationObject | {} = {},
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
            if (currentTrackID.current)
                if (playerState.current === STATE_PAUSED) TrackPlayer.play()
            return
        }
        if (currentTrackID.current && track.id === currentTrackID.current) {
            if (playerState.current === STATE_PAUSED) TrackPlayer.play()
            return
        }

        if (showLoading && play) setShowLoading(true)
        TrackPlayer.pause()
        fetchMusic(track.id)
            .then((__res: any) => {
                resetPlayer()

                if (showLoading && play) setShowLoading(false)

                const trackGot = {
                    ...track,
                    url: __res,
                    description: JSON.stringify(continuation), // since we are setting the current track in  playback-track-changed event listener above in the useEffect function
                }
                TrackPlayer.add([trackGot])
                if (play) TrackPlayer.play()
                console.log('Time took to play: ', new Date().getTime() - start)
            })
            .catch(() => {
                setShowLoading(false)
            })
    }

    /**
     * all the values of the Context API for all the
     * children components...
     */
    const playerValues = {
        play: play,
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
