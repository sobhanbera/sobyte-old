import axios from 'axios'
import React, {useEffect, useState} from 'react'
import RNLocalize from 'react-native-localize'
import querystring from 'querystring'
import _ from 'lodash'

import * as utils from './utils'
import * as parsers from './parsers'

const DemoMusicContextReturn = () => new Promise(() => {})
const MusicContext = React.createContext({
    // initalize: () => DemoMusicContextReturn(),
    // getContinuation: (
    //     endpointName = 'song',
    //     continuation = {
    //         continuation: '',
    //         clickTrackingParams: '',
    //     },
    // ) => DemoMusicContextReturn(),
    // getSearchSuggestions: (search = '') => DemoMusicContextReturn(),
    search: (
        query: string,
        categoryName: string = 'song',
        _pageLimit: number = 1,
    ) => DemoMusicContextReturn(),
    // getAlbum: (browseId = '') => DemoMusicContextReturn(),
    // getPlaylist: (browseId = '', contentLimit = 100) =>
    //     DemoMusicContextReturn(),
    // getArtist: (browseId = '') => DemoMusicContextReturn(),
    // getNext: (videoId = '', playlistId = '', paramString = '') =>
    //     DemoMusicContextReturn(),
})

interface MusicApiProps {
    children: React.ReactChild
}
const MusicApi = (props: MusicApiProps) => {
    const [musicConfig, setMusicConfig] = useState<{[key: string]: string}>({})
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    let fetchConfig: {[key: string]: string} = {}
    let client = axios.create({
        baseURL: 'https://music.youtube.com/',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.5',
        },
        withCredentials: true,
    })

    const initalize = () => {
        return new Promise((resolve, reject) => {
            client
                .get('/')
                .then(res => {
                    try {
                        res.data
                            .split('ytcfg.set(')
                            .map((v: string) => {
                                try {
                                    return JSON.parse(v.split(');')[0])
                                } catch (_) {}
                            })
                            .filter(Boolean)
                            .forEach(
                                (cfg: any) =>
                                    (fetchConfig = Object.assign(
                                        cfg,
                                        fetchConfig,
                                    )),
                            )
                        resolve({
                            locale: fetchConfig.LOCALE,
                            logged_in: fetchConfig.LOGGED_IN,
                        })
                        setMusicConfig(fetchConfig)
                        setError(false)
                        setLoaded(true)
                    } catch (err) {
                        reject(err)
                        setError(false)
                        setLoaded(false)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    useEffect(() => {
        initalize()
    }, [])

    const _createApiRequest = (
        endpointName: string,
        inputVariables: Object,
        inputQuery = {},
    ) => {
        const headers = Object.assign(
            {
                'x-origin': client.defaults.baseURL,
                'X-Goog-Visitor-Id': musicConfig.VISITOR_DATA,
                'X-YouTube-Client-Name':
                    musicConfig.INNERTUBE_CONTEXT_CLIENT_NAME,
                'X-YouTube-Client-Version':
                    musicConfig.INNERTUBE_CLIENT_VERSION,
                'X-YouTube-Device': musicConfig.DEVICE,
                'X-YouTube-Page-CL': musicConfig.PAGE_CL,
                'X-YouTube-Page-Label': musicConfig.PAGE_BUILD_LABEL,
                'X-YouTube-Utc-Offset': String(-new Date().getTimezoneOffset()),
                'X-YouTube-Time-Zone': RNLocalize.getTimeZone(),
            },
            client.defaults.headers,
        )

        return new Promise((resolve, reject) => {
            client
                .post(
                    `youtubei/${
                        musicConfig.INNERTUBE_API_VERSION
                    }/${endpointName}?${querystring.stringify(
                        Object.assign(
                            {
                                alt: 'json',
                                key: musicConfig.INNERTUBE_API_KEY,
                            },
                            inputQuery,
                        ),
                    )}`,
                    Object.assign(
                        inputVariables,
                        utils.createApiContext(musicConfig),
                    ),
                    {
                        responseType: 'json',
                        headers: headers,
                    },
                )
                .then(res => {
                    if (res.data.hasOwnProperty('responseContext')) {
                        resolve(res.data)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const search = (
        query: string,
        categoryName: string = 'song',
        _pageLimit: number = 1,
    ) => {
        return new Promise((resolve, reject) => {
            var result = {}
            _createApiRequest('search', {
                query: query,
                params: utils.getCategoryURI(categoryName),
            })
                .then(context => {
                    try {
                        switch (_.upperCase(categoryName)) {
                            case 'SONG':
                                result = parsers.parseSongSearchResult(context)
                                break
                            case 'VIDEO':
                                result = parsers.parseVideoSearchResult(context)
                                break
                            case 'ALBUM':
                                result = parsers.parseAlbumSearchResult(context)
                                break
                            case 'ARTIST':
                                result =
                                    parsers.parseArtistSearchResult(context)
                                break
                            case 'PLAYLIST':
                                result =
                                    parsers.parsePlaylistSearchResult(context)
                                break
                            default:
                                result = parsers.parseSearchResult(context)
                                break
                        }
                        resolve(result)
                    } catch (error) {
                        return resolve({
                            error: error.message,
                        })
                    }
                })
                .catch(error => reject(error))
        })
    }

    const musicApiValues = {
        search: search,
    }
    return (
        <MusicContext.Provider value={musicApiValues}>
            {props.children}
        </MusicContext.Provider>
    )
}

export default MusicApi
export const useMusicApi = () => React.useContext(MusicContext)
