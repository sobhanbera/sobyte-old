import React, {useContext, useState} from 'react'
import {useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from '@react-native-community/netinfo' // if the internet connection is slow than we will load low quality track else load high quality progressively...

import {AUDIO_QUALITY_STORAGE_KEY} from '../constants'
import {getTrackURL} from '../api/Music'
import {AudioQualityType} from '../interfaces'
import {usePrompt} from '../context'

/**
 * this is the previously listened songs list
 * if any song is played once than no need to retrive the data
 * source for it again and again
 */
let previouslyLoadedSongs: {[key: string]: string} = {}

const MusicFetcherContext = React.createContext({
    fetchMusic: (_id: string, _quality: AudioQualityType = 'extreme') =>
        new Promise((_resolve, _reject) => {}),
})
interface MusicFetcherProps {}
const MusicFetcher: React.FC<MusicFetcherProps> = props => {
    /**
     * prompt when the song is playing
     * only for first time...
     */
    const propmt = usePrompt().prompt
    const [quality, setQuality] = useState<AudioQualityType>('extreme')

    const loadQualityData = async () => {
        AsyncStorage.getItem(AUDIO_QUALITY_STORAGE_KEY)
            .then((res: AudioQualityType | any) => {
                if (!res) {
                    AsyncStorage.setItem(AUDIO_QUALITY_STORAGE_KEY, 'extreme')
                        .then(res => {
                            if (res === null) {
                            }
                        })
                        .catch(_err => {})
                    setQuality('extreme')
                } else {
                    setQuality(res)
                }
            })
            .catch(_err => {})
    }

    /**
     * load the audio quality data from local storage
     */
    useEffect(() => {
        loadQualityData()
    }, [])

    // variable if > 0 we will does not show the prompt like "playing over wifi" and all
    let alreadyShownPrompt = 0
    /**
     * actual function which will load the music URL
     * and return it
     * @param id the musicId
     * @param _quality a custom audio quality
     * @returns the URL of the songs related to the musicID provided
     */
    async function fetchMusic(
        id: string,
        _quality: AudioQualityType = quality,
    ) {
        return new Promise((resolve, _reject) => {
            /**
             * if the songs is already played than providing the previously stored data
             * source of that particular songs/track
             * in this way the data would be used less and also make the app somewhat more performant
             * than previous
             */
            if (
                previouslyLoadedSongs[id] !== null &&
                previouslyLoadedSongs[id] !== undefined
            ) {
                console.log('PROVIDED FROM I')
                return resolve(previouslyLoadedSongs[id])
            }
            // the songs is not played already so loading the URL again and then providing it

            /**
             * this is the final audio quality variable which will
             * decide what quality of song/track to play depending on the internet connection
             */

            let finalQuality: AudioQualityType = 'good'
            NetInfo.fetch()
                .then((res: any) => {
                    /**
                     * if the internet connection is not 4g we
                     * the song will be of poor quality...
                     */
                    if (
                        res.details?.cellularGeneration !== undefined &&
                        !String(res.details?.cellularGeneration)
                            .toLowerCase()
                            .includes('4g')
                    ) {
                        finalQuality = 'poor' // 3g or 2g internet
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 100
                    ) {
                        finalQuality = 'auto' // if the internet strength is equals to 100
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 90
                    ) {
                        finalQuality = 'auto' // if the internet strength is some what is the line of excellent
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 85
                    ) {
                        finalQuality = 'good' // if the internet strength is between 85 and 90
                    } else if (
                        res.details?.strength &&
                        res.details?.strength < 85
                    ) {
                        finalQuality = 'poor' // if the internet strength is less than 85
                    } else if (res.details?.isConnectionExpensive === true) {
                        finalQuality = 'good' // if the internet is causing some more energy or power consumption
                    } else {
                        finalQuality = 'good' // else the default quality song will be played
                    }
                    // audio quality decided
                    getTrackURL(id, {
                        hasAudio: true,
                        hasVideo: false,
                        audioQuality: finalQuality,
                    })
                        .then(songUrl => {
                            // saving the data to use later on if the same song is played with the same musicID
                            previouslyLoadedSongs[id] = songUrl

                            /**
                             * if we haven't shown the prompt once then show it and make the control variable false
                             * so that from next time the prompt is not shown
                             * if we have shown the propmt once
                             */
                            if (alreadyShownPrompt <= 0)
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
                                    propmt(
                                        `playing over ${res.type}.`,
                                        'danger',
                                    )
                                    // incrementing the control variable..
                                    alreadyShownPrompt++
                                }

                            /** since the result will provide a object like this:-
                             * result = [{
                             *     "header": [],
                             *     "url": string
                             * }]
                             * so we are returning the url value directly
                             */
                            resolve(songUrl)
                        })
                        .catch(_err => {})
                })
                .catch(err => {
                    // if any error occured just provide the data not need to care about the audio quality this time
                    // and this time the audio quality will be default to "good"
                    getTrackURL(id, {
                        hasAudio: true,
                        hasVideo: false,
                        audioQuality: finalQuality,
                    })
                        .then(songUrl => {
                            // saving the data to use later on if the same song is played with the same musicID
                            previouslyLoadedSongs[id] = songUrl

                            /** since the result will provide a object like this:-
                             * result = [{
                             *     "header": [],
                             *     "url": string
                             * }]
                             * so we are returning the url value directly
                             */
                            resolve(songUrl)
                        })
                        .catch(_err => {})
                })
        })
    }

    const musicFetcherValues = {
        fetchMusic: fetchMusic,
    }
    return (
        <MusicFetcherContext.Provider value={musicFetcherValues}>
            {props.children}
        </MusicFetcherContext.Provider>
    )
}

export default MusicFetcher
export const useFetcher = () => useContext(MusicFetcherContext)
