import React, {createContext, useContext} from 'react'
import RNLocalize from 'react-native-localize'
import axios from 'axios'
import querystring from 'querystring'
import _ from 'lodash'

import utils from './utils'
import parsers from './parsers'

const DemoMusicContextReturn = () => new Promise((resolve, reject) => {})

const MusicContext = createContext({
    initalize: () => DemoMusicContextReturn(),
    getContinuation: (
        endpointName = 'song',
        continuation = {
            continuation: '',
            clickTrackingParams: '',
        },
    ) => DemoMusicContextReturn(),
    getSearchSuggestions: (search = '') => DemoMusicContextReturn(),
    search: (query = '', categoryName = 'song' | 'video', _pageLimit = 1) =>
        DemoMusicContextReturn(),
    getAlbum: (browseId = '') => DemoMusicContextReturn(),
    getPlaylist: (browseId = '', contentLimit = 100) =>
        DemoMusicContextReturn(),
    getArtist: (browseId = '') => DemoMusicContextReturn(),
    getNext: (videoId = '', playlistId = '', paramString = '') =>
        DemoMusicContextReturn(),
})

class MusicApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicConfig: {},
            error: false,
            loaded: true,
        }
        this.musicConfig = {}

        this.client = axios.create({
            baseURL: 'https://music.youtube.com/',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            withCredentials: true,
        })
    }

    _createApiRequest(endpointName, inputVariables, inputQuery = {}) {
        const headers = Object.assign(
            {
                'x-origin': this.client.defaults.baseURL,
                'X-Goog-Visitor-Id': this.state.musicConfig.VISITOR_DATA,
                'X-YouTube-Client-Name':
                    this.state.musicConfig.INNERTUBE_CONTEXT_CLIENT_NAME,
                'X-YouTube-Client-Version':
                    this.state.musicConfig.INNERTUBE_CLIENT_VERSION,
                'X-YouTube-Device': this.state.musicConfig.DEVICE,
                'X-YouTube-Page-CL': this.state.musicConfig.PAGE_CL,
                'X-YouTube-Page-Label': this.state.musicConfig.PAGE_BUILD_LABEL,
                'X-YouTube-Utc-Offset': String(-new Date().getTimezoneOffset()),
                'X-YouTube-Time-Zone': RNLocalize.getTimeZone(),
            },
            this.client.defaults.headers,
        )

        return new Promise((resolve, reject) => {
            this.client
                .post(
                    `youtubei/${
                        this.state.musicConfig.INNERTUBE_API_VERSION
                    }/${endpointName}?${querystring.stringify(
                        Object.assign(
                            {
                                alt: 'json',
                                key: this.state.musicConfig.INNERTUBE_API_KEY,
                            },
                            inputQuery,
                        ),
                    )}`,
                    Object.assign(
                        inputVariables,
                        utils.createApiContext(this.state.musicConfig),
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

    initalize() {
        return new Promise((resolve, reject) => {
            this.client
                .get('/')
                .then(res => {
                    try {
                        res.data
                            .split('ytcfg.set(')
                            .map(v => {
                                try {
                                    return JSON.parse(v.split(');')[0])
                                } catch (_) {}
                            })
                            .filter(Boolean)
                            .forEach(
                                cfg =>
                                    (this.musicConfig = Object.assign(
                                        cfg,
                                        this.musicConfig,
                                    )),
                            )
                        resolve({
                            locale: this.musicConfig.LOCALE,
                            logged_in: this.musicConfig.LOGGED_IN,
                        })
                        this.setState({
                            musicConfig: this.musicConfig,
                            error: false,
                            loaded: true,
                        })
                    } catch (err) {
                        reject(err)
                        this.setState({
                            error: true,
                            loaded: false,
                        })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    getContinuation(endpointName, continuation) {
        if (
            continuation != [] &&
            continuation instanceof Object &&
            continuation.continuation &&
            continuation.clickTrackingParams
        ) {
            return new Promise((resolve, reject) => {
                this._createApiRequest(
                    endpointName,
                    {},
                    {
                        ctoken: continuation.continuation,
                        continuation: continuation.continuation,
                        itct: continuation.clickTrackingParams,
                        type: 'next',
                    },
                ).then(context => {
                    let parse = new Date()
                    let r = parsers.parseSongSearchResult(context)
                    let o = new Date() - parse
                    resolve(r)
                })
            })
        }
    }

    getSearchSuggestions(query) {
        return new Promise((resolve, reject) => {
            this._createApiRequest('music/get_search_suggestions', {
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

    search(query, categoryName, _pageLimit = 1) {
        return new Promise((resolve, reject) => {
            var result = {}
            this._createApiRequest('search', {
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

    getAlbum(browseId) {
        if (_.startsWith(browseId, 'MPREb')) {
            return new Promise((resolve, reject) => {
                this._createApiRequest(
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

    getPlaylist(browseId, contentLimit = 100) {
        if (_.startsWith(browseId, 'VL') || _.startsWith(browseId, 'PL')) {
            _.startsWith(browseId, 'PL') && (browseId = 'VL' + browseId)
            return new Promise((resolve, reject) => {
                this._createApiRequest(
                    'browse',
                    utils.buildEndpointContext('PLAYLIST', browseId),
                )
                    .then(context => {
                        try {
                            var result = parsers.parsePlaylistPage(context)
                            const getContinuations = params => {
                                this._createApiRequest(
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

    getArtist(browseId) {
        if (_.startsWith(browseId, 'UC')) {
            return new Promise((resolve, reject) => {
                this._createApiRequest(
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

    getNext(videoId, playlistId, paramString) {
        return new Promise((resolve, reject) => {
            this._createApiRequest('next', {
                enablePersistentPlaylistPanel: true,
                isAudioOnly: true,
                params: paramString,
                playlistId: playlistId,
                tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
                videoId: videoId,
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

    componentDidMount() {
        this.initalize()
    }

    musicApiMethods = {
        initalize: this.initalize,
        getContinuation: this.getContinuation,
        getSearchSuggestions: this.getSearchSuggestions,
        search: this.search,
        getAlbum: this.getAlbum,
        getPlaylist: this.getPlaylist,
        getArtist: this.getArtist,
        getNext: this.getNext,
    }

    render() {
        return (
            <MusicContext.Provider value={this.musicApiMethods}>
                {this.props.children}
            </MusicContext.Provider>
        )
    }
}

export default MusicApi
export const useMusicApi = () => useContext(MusicContext)
