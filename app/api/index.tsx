import React, {useEffect, useState} from 'react' // as usual import
import axios from 'axios' // for making api requests
import RNLocalize from 'react-native-localize' // to pass the location of user in the api call
import querystring from 'querystring' // string methods
import _ from 'lodash' // util methods

import * as utils from './utils' // local util path
import * as parsers from './parsers' // local parser path
import {ContinuationObjectItself, ContinuationObject} from '../interfaces' // objects required for instances in this files

const DemoMusicContextReturn = () => new Promise(() => {})
const MusicContext = React.createContext({
    initalize: () => DemoMusicContextReturn(),
    getContinuation: (
        _endpointName: string,
        _continuation: ContinuationObject,
    ) => DemoMusicContextReturn(),
    getSearchSuggestions: (_search: string) => DemoMusicContextReturn(),
    search: (
        _query: string,
        _categoryName: string = 'song',
        _pageLimit: number = 1,
    ) => DemoMusicContextReturn(),
    getAlbum: (_browseId: string) => DemoMusicContextReturn(),
    getPlaylist: (_browseId: string, _contentLimit = 100) =>
        DemoMusicContextReturn(),
    getArtist: (_browseId: string) => DemoMusicContextReturn(),
    getNext: (_musicId: string, _playlistId: string, _paramString: string) =>
        DemoMusicContextReturn(),

    error: false,
    loaded: false,
})

interface MusicApiProps {
    children: React.ReactChild
}
const MusicApi = (props: MusicApiProps) => {
    /**
     * state
     */
    const [musicConfig, setMusicConfig] = useState<{[key: string]: string}>({})
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    /**
     * main and core required variable to make requests to the backend
     */
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

    /**
     *
     * @returns a promise after initializing the music api fetcher this
     * function should be called in the root element of the app where the
     * main app starts after using this function context provider
     */
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

    /**
     *
     * @param endpointName the name of api endpoint where the call is to be made
     * @param inputVariables all data which should be POST to the endpoint
     * @param inputQuery extra data to provide while calling api endpoint
     * @returns everyfunction that exists in this component and makes api
     * call to the backend it will require to call this function as this would
     * be the wrapper function of all of them...
     */
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

    /**
     *
     * @param endpointName this is the endpoint name like "search" or anything else
     * @param continuation this is the continuation object which is provided in the fetched data after making any request to get more data of the same type...
     * @returns return the same type of object for which the continuation is provided
     */
    const getContinuation = (
        endpointName: string,
        continuation: ContinuationObject,
    ) => {
        if (
            // continuation != [] &&
            continuation instanceof Object &&
            continuation.continuation &&
            continuation.clickTrackingParams
        ) {
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    endpointName,
                    {},
                    {
                        ctoken: continuation.continuation,
                        continuation: continuation.continuation,
                        itct: continuation.clickTrackingParams,
                        type: 'next',
                    },
                ).then(context => {
                    // let parse:Date = new Date()
                    let r = parsers.parseSongSearchResult(context)
                    // let o:number = new Date() - parse
                    resolve(r)
                })
            })
        } else {
            return new Promise(() => {})
        }
    }

    /**
     *
     * @param query the query string for getting suggestions
     * @returns object with array of strings containing the search suggestion...
     */
    const getSearchSuggestions = (query: string) => {
        return new Promise((resolve, reject) => {
            _createApiRequest('music/get_search_suggestions', {
                input: query,
            })
                .then(content => {
                    try {
                        resolve(
                            utils.fv(
                                content,
                                'searchSuggestionRenderer:navigationEndpoint:query',
                            ),
                        )
                    } catch (error) {
                        reject(error)
                    }
                })
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param query the query string
     * @param categoryName what type of data is needed like "song" | "album" | "playlist"
     * @param _pageLimit number of data page wise
     * @returns the search result after making api request
     */
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

    /**
     *
     * @param browseId id of the album
     * @returns the object with album data
     */
    const getAlbum = (browseId: string) => {
        if (_.startsWith(browseId, 'MPREb')) {
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    utils.buildEndpointContext('ALBUM', browseId),
                )
                    .then(context => {
                        try {
                            const result = parsers.parseAlbumPage(context)
                            resolve(result)
                        } catch (error) {
                            return resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid album browse id.')
        }
    }

    /**
     *
     * @param browseId id of the playlist
     * @param contentLimit limiting the data
     * @returns the object with playlist data
     */
    const getPlaylist = (browseId: string, contentLimit = 100) => {
        if (_.startsWith(browseId, 'VL') || _.startsWith(browseId, 'PL')) {
            _.startsWith(browseId, 'PL') && (browseId = 'VL' + browseId)
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    utils.buildEndpointContext('PLAYLIST', browseId),
                )
                    .then(context => {
                        try {
                            var result = parsers.parsePlaylistPage(context)
                            const getContinuations = (
                                params: ContinuationObjectItself,
                            ) => {
                                _createApiRequest(
                                    'browse',
                                    {},
                                    {
                                        ctoken: params.continuation,
                                        continuation: params.continuation,
                                        itct: params.continuation
                                            .clickTrackingParams,
                                    },
                                ).then(context => {
                                    const continuationResult =
                                        parsers.parsePlaylistPage(context)
                                    if (
                                        Array.isArray(
                                            continuationResult.content,
                                        )
                                    ) {
                                        result.content = _.concat(
                                            result.content,
                                            continuationResult.content,
                                        )
                                        result.continuation =
                                            continuationResult.continuation
                                    }
                                    if (
                                        !Array.isArray(
                                            continuationResult.continuation,
                                        ) &&
                                        result.continuation instanceof Object
                                    ) {
                                        if (
                                            contentLimit > result.content.length
                                        ) {
                                            getContinuations(
                                                continuationResult.continuation,
                                            )
                                        } else {
                                            return resolve(result)
                                        }
                                    } else {
                                        return resolve(result)
                                    }
                                })
                            }

                            if (
                                contentLimit > result.content.length &&
                                !Array.isArray(result.continuation) &&
                                result.continuation instanceof Object
                            ) {
                                getContinuations(result.continuation)
                            } else {
                                return resolve(result)
                            }
                        } catch (error) {
                            return resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid playlist id.')
        }
    }

    /**
     *
     * @param browseId id of the artist
     * @returns the object with artist data
     */
    const getArtist = (browseId: string) => {
        if (_.startsWith(browseId, 'UC')) {
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    utils.buildEndpointContext('ARTIST', browseId),
                )
                    .then(context => {
                        try {
                            const result = parsers.parseArtistPage(context)
                            resolve(result)
                        } catch (error) {
                            resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid artist browse id.')
        }
    }

    /**
     *
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs list in that particular playlist
     */
    const getNext = (
        musicId: string,
        playlistId: string,
        paramString: string,
    ) => {
        return new Promise((resolve, reject) => {
            _createApiRequest('next', {
                enablePersistentPlaylistPanel: true,
                isAudioOnly: true,
                params: paramString,
                playlistId: playlistId,
                tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
                videoId: musicId,
            })
                .then(context => {
                    try {
                        const result = parsers.parseNextPanel(context)
                        resolve(result)
                    } catch (error) {
                        resolve({
                            error: error.message,
                        })
                    }
                })
                .catch(error => reject(error))
        })
    }

    /**
     * music api context values provider
     */
    const musicApiValues = {
        initalize: initalize,
        getContinuation: getContinuation,
        getSearchSuggestions: getSearchSuggestions,
        search: search,
        getAlbum: getAlbum,
        getPlaylist: getPlaylist,
        getArtist: getArtist,
        getNext: getNext,

        error: error,
        loaded: loaded,
    }
    return (
        <MusicContext.Provider value={musicApiValues}>
            {props.children}
        </MusicContext.Provider>
    )
}

/**
 * exports the main component and the api for using the MusicApi context
 */
export default MusicApi
export const useMusicApi = () => React.useContext(MusicContext)