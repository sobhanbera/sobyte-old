import React, {useContext} from 'react'
import musicFetch from 'react-native-ytdl'

const MusicFetcherContext = React.createContext({
    fetchMusic: (id: string) => new Promise((resolve, reject) => {}),
    getURL: (id: string) => {},
})
interface MusicFetcherProps {}
const MusicFetcher: React.FC<MusicFetcherProps> = props => {
    function getURL(id: string) {
        const origin = 'https://www.youtube.com/watch?v='
        return origin + id
    }

    async function fetchMusic(id: string) {
        return new Promise(async (resolve, reject) => {
            const URL = getURL(id)
            const result = await musicFetch(URL, {quality: 'highestaudio'})

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
