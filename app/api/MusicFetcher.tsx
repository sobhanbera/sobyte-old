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

    useEffect(() => {
        loadQualityData()
    }, [])

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
            let finalQuality: AudioQualityType = 'good'
            NetInfo.fetch()
                .then((res: any) => {
                    if (
                        res.details?.cellularGeneration !== undefined &&
                        !String(res.details?.cellularGeneration)
                            .toLowerCase()
                            .includes('4g')
                    ) {
                        finalQuality = 'poor'
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 100
                    ) {
                        finalQuality = 'auto'
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 90
                    ) {
                        finalQuality = 'auto'
                    } else if (
                        res.details?.strength &&
                        res.details?.strength >= 85
                    ) {
                        finalQuality = 'good'
                    } else if (
                        res.details?.strength &&
                        res.details?.strength < 85
                    ) {
                        finalQuality = 'poor'
                    } else if (res.details?.isConnectionExpensive === true) {
                        finalQuality = 'good'
                    } else {
                        finalQuality = 'poor'
                    }
                    console.log(res.type)
                    getTrackURL(id, {
                        hasAudio: true,
                        hasVideo: false,
                        audioQuality: finalQuality,
                    })
                        .then(songUrl => {
                            // saving the data to use later on if the same song is played with the same musicID
                            previouslyLoadedSongs[id] = songUrl

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
                                propmt(`playing using ${res.type}`, 'danger')
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
