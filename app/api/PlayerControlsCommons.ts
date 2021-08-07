/**
 * here we does not use any async await code so that
 * there is minimum waiting and each task occurs more fast and quckily
 */

import TrackPlayer from 'react-native-track-player'

/**
 * This file contains the common player controls like
 * play, pause, next, prev, etc...
 *
 * These function are removed from the main PlayerControls.tsx (the context api provider)
 * and no more supported there since it will update the UI continuosly so we are creating these
 * commons function which does not depends on state, UI, rendering, etc
 * so that the performace could increase in some part...
 */

/**
 * function to continue playing the track player
 */
export function playTrack() {
    TrackPlayer.play()
}

/**
 * function to pause the track player
 */
export function pauseTrack() {
    TrackPlayer.pause()
}

/**
 * @param level of the track player position
 * skip to some interger interval
 */
export const seekTrackTo = (level: number) => {
    if (!Number.isNaN(level)) TrackPlayer.seekTo(level)
}

/**
 * @param interval the interval to skip
 * skip to some number of interval in any direction
 * negative will make backward skip to the interval and +ve will forward skip to the interval
 */
export const seekTrackInterval = (interval: number = 10) => {
    TrackPlayer.getPosition().then(currPos => {
        TrackPlayer.seekTo(currPos + interval)
    })
}

/**
 * @param level the level of volume
 * sets volume level of the track player
 */
export const setTrackVolumeLevel = (level: number) => {
    TrackPlayer.setVolume(level).then(() => {
        TrackPlayer.getVolume()
    })
}

/**
 * @param rate the level of volume
 * this function returns the rate text
 * for Ex:
 * 1X, 2X, 5X, 0.5X, 0.25X, 0.75X etc...
 */
export const getRateText = () => {}

/**
 * @param level the level of rate
 * sets rate level of the track player
 */
export const setRateLevel = (level: number) => {
    TrackPlayer.setRate(level)
}

/**
 * skips to previous song
 * not is use in this application
 * @deprecated
 */
export const previousTrack = () => {
    TrackPlayer.skipToPrevious()
}

/**
 * skips to next song
 * not is use in this application
 * @deprecated
 */
export const nextTrack = () => {
    TrackPlayer.skipToNext()
}

// default time measurment code just copy paste the below code
// let start = new Date().getTime()
// console.log('Time to seek interval', new Date().getTime() - start)
