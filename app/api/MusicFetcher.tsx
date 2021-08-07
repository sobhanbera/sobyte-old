import React, {useContext, useState} from 'react'
import {useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {AUDIO_QUALITY_STORAGE_KEY} from '../constants'
import {getTrackURL} from '../utils/Music'
import {AudioQualityType} from '../interfaces'

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
                    console.log(res)
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
        return new Promise(async (resolve, _reject) => {
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
            getTrackURL(id)
                .then(res => {
                    // saving the data to use later on if the same song is played with the same musicID
                    previouslyLoadedSongs[id] = res

                    /** since the result will provide a object like this:-
                     * result = [{
                     *     "header": [],
                     *     "url": string
                     * }]
                     * so we are returning the url value directly
                     */
                    return resolve(res)
                })
                .catch(err => {
                    console.log('MUSIC FETCHER ERR', err)
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
