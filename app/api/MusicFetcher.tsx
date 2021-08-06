import React, {useContext, useState} from 'react'
import {useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import musicFetch from 'react-native-ytdl'

import {AUDIO_QUALITY_STORAGE_KEY} from '../constants'

/**
 * this is the previously listened songs list
 * if any song is played once than no need to retrive the data
 * source for it again and again
 */
let previouslyLoadedSongs: {[key: string]: string} = {}

type AudioType =
    | 'highest'
    | 'lowest'
    | 'highestaudio'
    | 'lowestaudio'
    | 'highestvideo'
    | 'lowestvideo'
const MusicFetcherContext = React.createContext({
    fetchMusic: (_id: string, _quality: AudioType = 'highestaudio') =>
        new Promise((_resolve, _reject) => {}),
    getURL: (_id: string) => {},
})
interface MusicFetcherProps {}
const MusicFetcher: React.FC<MusicFetcherProps> = props => {
    const [quality, setQuality] = useState<AudioType>('highestaudio')

    const loadQualityData = async () => {
        AsyncStorage.getItem(AUDIO_QUALITY_STORAGE_KEY)
            .then(res => {
                if (res === null || res === 'a' || res === 'e') {
                    AsyncStorage.setItem(AUDIO_QUALITY_STORAGE_KEY, 'e')
                        .then(res => {
                            if (res === null) {
                            }
                        })
                        .catch(_err => {})
                    setQuality('highestaudio')
                } else if (res === 'g') {
                    setQuality('lowestaudio')
                } else {
                    setQuality('lowest')
                }
            })
            .catch(_err => {})
    }

    useEffect(() => {
        loadQualityData()
    }, [])

    function getURL(id: string) {
        const origin = 'https://www.youtube.com/watch?v='
        return origin + id
    }

    async function fetchMusic(id: string, _quality: AudioType = quality) {
        return new Promise(async (resolve, _reject) => {
            console.log(
                'the save data is if it is saved than:: ',
                previouslyLoadedSongs[id],
            )
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
            const URL = getURL(id)
            const result = await musicFetch(URL, {quality: _quality})
            // saving the data to use later on if the same song is played with the same musicID
            previouslyLoadedSongs[id] = result[0].url

            /** since the result will provide a object like this:-
             * result = [{
             *     "header": [],
             *     "url": string
             * }]
             * so we are returning the url value directly
             */
            // return result[0].url
            resolve(result[0].url)
        })
    }

    const musicFetcherValues = {
        fetchMusic: fetchMusic,
        getURL: getURL,
    }
    return (
        <MusicFetcherContext.Provider value={musicFetcherValues}>
            {props.children}
        </MusicFetcherContext.Provider>
    )
}

export default MusicFetcher
export const useFetcher = () => useContext(MusicFetcherContext)
