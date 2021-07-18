import React, {useContext} from 'react'
import musicFetch from 'react-native-ytdl'

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
    function getURL(id: string) {
        const origin = 'https://www.youtube.com/watch?v='
        return origin + id
    }

    async function fetchMusic(
        id: string,
        _quality: AudioType = 'highestaudio',
    ) {
        return new Promise(async (resolve, _reject) => {
            const URL = getURL(id)
            const result = await musicFetch(URL, {quality: _quality})

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
