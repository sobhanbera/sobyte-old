import React, {useState} from 'react' // as usual import
import axios from 'axios' // for making api requests
import RNLocalize from 'react-native-localize' // to pass the location of user in the api call
import querystring from 'querystring' // string methods
import _ from 'lodash' // util methods
import AsyncStorage from '@react-native-community/async-storage'

import * as utils from './utils' // local util path
import * as parsers from './parsers' // local parser path
import {ContinuationObjectItself, ContinuationObject} from '../interfaces' // objects required for instances in this files
import {API_CONFIG_DATA_STORAGE_KEY} from '../constants'

/**
 * this is the all types of data which could be fetched
 * from the backend api
 */
type TypeOFDatas = 'SONG' | 'ALBUM' | 'ARTIST' | 'PLAYLIST' | 'VIDEO'

const DemoMusicContextReturn = () => new Promise<any>(() => {})
// interface BareMinimumFetchedDataType {
//     content: object[] | any[]
//     continuation: {
//         continuation: string
//         clickTrackingParams: string
//     }
// }

export interface MusicContextApiProviderProps {
    initialize(): Promise<any>
    initMusicApi(): Promise<any>
    getContinuation(
        _endpointName: string | 'search' | '',
        _continuation: ContinuationObject,
        _dataType: TypeOFDatas,
    ): Promise<any>
    getSearchSuggestions(_search: string): Promise<string[]>
    search(
        _query: string,
        _dataType: TypeOFDatas,
        _getARandomSong?: boolean,
        _saveToLocalStorage?: boolean,
        _pageLimit?: number,
    ): Promise<any>
    getAlbum(_browseId: string): Promise<any>
    getPlaylist(_browseId: string): Promise<any>
    getArtist(_browseId: string): Promise<any>
    getNext(
        _musicId: string,
        _playlistId: string,
        _paramString: string,
    ): Promise<any>
    getPlayer(
        _musicId: string,
        _playlistId: string,
        _paramString: string,
    ): Promise<any>

    musicConfig: object | any
    error: boolean
    loaded: boolean
}

const MusicContext = React.createContext<MusicContextApiProviderProps>({
    /**
     * @returns a promise after initializing the music api fetcher this
     * function should be called in the root element of the app where the
     * main app starts after using this function context provider
     */
    initialize: () => DemoMusicContextReturn(),
    /**
     * @returns a promise after initializing the music api fetcher this
     * function should be called in the root element of the app where the
     * main app starts after using this function context provider
     */
    initMusicApi: () => DemoMusicContextReturn(),
    /**
     * @param endpointName this is the endpoint name like "search" or anything else
     * @param continuation this is the continuation object which is provided in the fetched data after making any request to get more data of the same type...
     * @returns return the same type of object for which the continuation is provided
     */
    getContinuation: (
        _endpointName: string | 'search' | '',
        _continuation: ContinuationObject,
        _dataType: TypeOFDatas,
    ) => DemoMusicContextReturn(),
    /**
     * @param query the query string for getting suggestions
     * @returns object with array of strings containing the search suggestion...
     */
    getSearchSuggestions: (_search: string) => DemoMusicContextReturn(),
    /**
     * @param query the query string
     * @param categoryName what type of data is needed like "song" | "album" | "playlist"
     * @param getARandomResult boolean value if true then will provide a random search result out of the result got from api
     * @param saveToLocalStorage boolean if true then after searching and providing the results this function will also save the data in local storage for offline use cases.
     * @param _pageLimit number of data page wise (this argument is not in use currently).... and not prefered to use in future too...
     * @returns the search result after making api request
     *
     * the local storage will store the data in form of key value pair like {"search_query": JSON.stringify("search_result_json_value")}
     * when any error occured or seems to have no internet connection then if the particular search result is saved in local storage this function will return it in place of returning the new updated data
     * since there should be some 2nd plan for every work...
     */
    search: (
        _query: string,
        _dataType: TypeOFDatas,
        _getARandomSong: boolean = false,
        _saveToLocalStorage: boolean = false,
        _pageLimit: number = 1,
    ) => DemoMusicContextReturn(),
    /**
     * @param browseId id of the album
     * @returns the object with album data
     */
    getAlbum: (_browseId: string) => DemoMusicContextReturn(),
    /**
     * @param browseId id of the playlist
     * @param contentLimit limiting the data
     * @returns the object with playlist data
     */
    getPlaylist: (_browseId: string, _contentLimit = 100) =>
        DemoMusicContextReturn(),
    /**
     * @param browseId id of the artist
     * @returns the object with artist data
     */
    getArtist: (_browseId: string) => DemoMusicContextReturn(),
    /**
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs list in that particular playlist
     */
    getNext: (
        _musicId: string,
        _playlistId: string,
        _paramString: string = '',
    ) => DemoMusicContextReturn(),
    /**
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs data
     */
    getPlayer: (
        _musicId: string,
        _playlistId: string,
        _paramString: string = '',
    ) => DemoMusicContextReturn(),

    /**
     * state of main api component
     */
    musicConfig: {},
    error: true,
    loaded: false,
})

interface MusicApiProps {
    children: React.ReactChild
}
const MusicApi = (props: MusicApiProps) => {
    /**
     * state
     */
    const [musicConfig, setMusicConfig] = useState<{[key: string]: any}>({})
    const [error, setError] = useState(true)
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
     * @returns a promise after initializing the music api fetcher this
     * function should be called in the root element of the app where the
     * main app starts after using this function context provider
     */
    const initialize = async () => {
        return new Promise(async (resolve, reject) => {
            // await AsyncStorage.setItem(API_CONFIG_DATA_STORAGE_KEY, '')
            await AsyncStorage.getItem(API_CONFIG_DATA_STORAGE_KEY)
                .then((res: any) => {
                    /** this is the locally saved api fetching and helping
                     *  data which would help a faster loader when the app
                     *  is launched */
                    const apiConfigs = JSON.parse(res)
                    /**
                     * @LAST_UPDATED_DATE - this is the timestamp when the last api was last updated which is done every day once automatically...
                     */
                    const LAST_DATE = new Date(
                        Number(apiConfigs.LAST_UPDATED_DATE),
                    ).getDate()
                    // current date to compare the above date with...
                    const CURR_DATE = new Date().getDate()
                    /**
                     * here we are checking that the current date and the last update
                     * date difference is <= 1 only then we can continue to provide the
                     * saved data else provide the updated data as fetch config
                     * means if the user was only yesterday, today or tommowrow
                     * than we will provide the saved data else the updated one
                     * the check is : `Math.abs(CURR_DATE-LAST_DATE) <= 1`
                     * check outputs :
                     * Yesterday = 1
                     * Today = 0
                     * Tommorow = 1
                     * now it will update daily (updated) */
                    if (
                        Math.abs(CURR_DATE - LAST_DATE) === 0 &&
                        apiConfigs.LAST_UPDATED_DATE &&
                        apiConfigs.VISITOR_DATA &&
                        apiConfigs.INNERTUBE_CONTEXT_CLIENT_NAME &&
                        apiConfigs.INNERTUBE_CLIENT_VERSION &&
                        apiConfigs.DEVICE &&
                        apiConfigs.PAGE_CL &&
                        apiConfigs.PAGE_BUILD_LABEL &&
                        apiConfigs.INNERTUBE_API_VERSION &&
                        apiConfigs.INNERTUBE_API_KEY
                    ) {
                        setMusicConfig(apiConfigs)
                        setError(false)
                        setLoaded(true)
                        resolve({
                            locale: apiConfigs.LOCALE,
                            logged_in: apiConfigs.LOGGED_IN,
                        })
                    } else {
                        /**
                         *
                         * @returns this context return the same which was the initialize function was doing instead first a check
                         * will be done that the api data is available if not then this function will be called and this would be more faster and
                         * efficient than the usual code...
                         */
                        console.log(
                            'STARTED INIT API CODE 1: under else condition...',
                        )
                        client
                            .get('/')
                            .then(async res => {
                                try {
                                    res.data
                                        .split('ytcfg.set(')
                                        .map((v: string) => {
                                            try {
                                                return JSON.parse(
                                                    v.split(');')[0],
                                                )
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
                                    /**
                                     * this is the timestamp when the last api was last updated which is done every day once automatically...
                                     */
                                    const LAST_UPDATED_DATE = new Date()
                                        .getTime()
                                        .toString()
                                    await AsyncStorage.setItem(
                                        API_CONFIG_DATA_STORAGE_KEY,
                                        JSON.stringify({
                                            ...fetchConfig,
                                            LAST_UPDATED_DATE:
                                                LAST_UPDATED_DATE,
                                        }),
                                    )
                                } catch (err) {
                                    reject(err)
                                    setError(true)
                                    setLoaded(false)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    }
                })
                .catch(_err => {
                    /**
                     *
                     * @returns this context return the same which was the initialize function was doing instead first a check
                     * will be done that the api data is available if not then this function will be called and this would be more faster and
                     * efficient than the usual code...
                     */
                    console.log(
                        'STARTED INIT API CODE 2: under catch statement...',
                    )
                    client
                        .get('/')
                        .then(async res => {
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
                                /**
                                 * this is the timestamp when the last api was last updated which is done every day once automatically...
                                 */
                                const LAST_UPDATED_DATE = new Date()
                                    .getTime()
                                    .toString()
                                await AsyncStorage.setItem(
                                    API_CONFIG_DATA_STORAGE_KEY,
                                    JSON.stringify({
                                        ...fetchConfig,
                                        LAST_UPDATED_DATE: LAST_UPDATED_DATE,
                                    }),
                                )
                            } catch (err) {
                                reject(err)
                                setError(true)
                                setLoaded(false)
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
        })
    }

    /**
     * @param endpointName the name of api endpoint where the call is to be made
     * @param inputVariables all data which should be POST to the endpoint
     * @param inputQuery extra data to provide while calling api endpoint
     * @returns everyfunction that exists in this component and makes api
     * call to the backend it will require to call this function as this would
     * be the wrapper function of all of them...
     */
    const _createApiRequest = async (
        endpointName: string,
        inputVariables: Object,
        inputQuery = {},
        cancelToken: any = '',
    ) => {
        // if (error)
        //     await initialize()
        //         .then(res => {})
        //         .catch(err => {})
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
                        headers: {...headers, cancelToken},
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
     * @param endpointName this is the endpoint name like "search" or anything else
     * @param continuation this is the continuation object which is provided in the fetched data after making any request to get more data of the same type...
     * @returns return the same type of object for which the continuation is provided
     */
    const getContinuation = (
        endpointName: string = 'search',
        continuation: ContinuationObject,
        dataType: TypeOFDatas,
    ) => {
        if (
            // continuation != [] &&
            continuation instanceof Object &&
            continuation.continuation &&
            continuation.clickTrackingParams
        ) {
            return new Promise(resolve => {
                _createApiRequest(
                    endpointName,
                    {},
                    {
                        ctoken: continuation.continuation,
                        continuation: continuation.continuation,
                        itct: continuation.clickTrackingParams,
                        type: 'next',
                        key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
                        alt: 'json',
                    },
                ).then(context => {
                    // let parse:Date = new Date()
                    let parsedData: any = {}
                    try {
                        switch (_.upperCase(dataType)) {
                            case 'SONG':
                                parsedData =
                                    parsers.parseSongSearchResult(context)
                                break
                            case 'VIDEO':
                                parsedData =
                                    parsers.parseVideoSearchResult(context)
                                break
                            case 'ALBUM':
                                parsedData =
                                    parsers.parseAlbumSearchResult(context)
                                break
                            case 'ARTIST':
                                parsedData =
                                    parsers.parseArtistSearchResult(context)
                                break
                            case 'PLAYLIST':
                                parsedData =
                                    parsers.parsePlaylistSearchResult(context)
                                break
                            default:
                                parsedData = parsers.parseSearchResult(context)
                                break
                        }
                        resolve(parsedData)
                    } catch (error) {
                        return resolve({
                            error: error.message,
                        })
                    }
                    // let o:number = new Date() - parse
                })
            })
        } else {
            return new Promise(() => {})
        }
    }

    /**
     * @param query the query string for getting suggestions
     * @returns object with array of strings containing the search suggestion...
     */
    let getSearchSuggestionsCancelToken: any
    const getSearchSuggestions = (query: string) => {
        if (typeof getSearchSuggestionsCancelToken != typeof undefined)
            getSearchSuggestionsCancelToken.cancel(
                'Cancelling the previous token for new request.',
            )

        getSearchSuggestionsCancelToken = axios.CancelToken.source()

        return new Promise<string[]>((resolve, reject) => {
            _createApiRequest(
                'music/get_search_suggestions',
                {
                    input: query,
                },
                {},
                getSearchSuggestionsCancelToken,
            )
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
     * @param query the query string
     * @param categoryName what type of data is needed like "song" | "album" | "playlist"
     * @param getARandomResult boolean value if true then will provide a random search result out of the result got from api
     * @param saveToLocalStorage boolean if true then after searching and providing the results this function will also save the data in local storage for offline use cases.
     * @param _pageLimit number of data page wise (this argument is not in use currently).... and not prefered to use in future too...
     * @returns the search result after making api request
     *
     * the local storage will store the data in form of key value pair like {"search_query": JSON.stringify("search_result_json_value")}
     * when any error occured or seems to have no internet connection then if the particular search result is saved in local storage this function will return it in place of returning the new updated data
     * since there should be some 2nd plan for every work...
     */
    const search = (
        query: string,
        categoryName: TypeOFDatas = 'SONG',
        getARandomResult: boolean = false,
        saveToLocalStorage: boolean = false,
        _pageLimit: number = 1,
    ) => {
        return new Promise((resolve, reject) => {
            var result: any = {}
            _createApiRequest('search', {
                query: query,
                params: utils.getCategoryURI(categoryName),
            })
                .then(context => {
                    try {
                        switch (_.upperCase(categoryName)) {
                            case 'SONG':
                                result = parsers.parseSongSearchResult(context)
                                if (getARandomResult) {
                                    result =
                                        result.content[
                                            Math.floor(
                                                Math.random() *
                                                    result.content.length,
                                            )
                                        ]
                                }
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
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs list in that particular playlist
     */
    const getNext = (
        musicId: string,
        playlistId: string,
        paramString: string = '',
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
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs data
     */
    const getPlayer = (
        musicId: string,
        playlistId: string,
        paramString: string = '',
    ) => {
        return new Promise((resolve, reject) => {
            _createApiRequest('player', {
                captionParams: {},
                // cpn: '8aVi-t8xotY1HKuU',
                playlistId: playlistId,
                videoId: musicId,
                param: paramString,
            })
                .then(context => {
                    try {
                        const result = parsers.parseSongDetailsPlayer(
                            context,
                            musicId,
                            playlistId,
                        )
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
        initialize: initialize,
        initMusicApi: initialize,
        getContinuation: getContinuation,
        getSearchSuggestions: getSearchSuggestions,
        search: search,
        getAlbum: getAlbum,
        getPlaylist: getPlaylist,
        getArtist: getArtist,
        getNext: getNext,
        getPlayer: getPlayer,

        musicConfig: musicConfig,
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
