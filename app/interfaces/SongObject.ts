export interface SongArtistObject {
    name: string
    browseId: string
}

export interface ThumbnailObject {
    height: number
    url: string
}

export interface SongObject {
    type: string
    musicId: string
    playlistId: string
    name: string
    artist: Array<SongArtistObject> | SongArtistObject
    album: {
        name: string
        browseId: string
    }
    duration: number
    thumbnails: Array<ThumbnailObject>
    params: 'wAEB'
    [key: string]: any
}

export interface SongObjectWithArtistAsString {
    type: string
    musicId: string
    playlistId: string
    name: string
    artist: string
    album: {
        name: string
        browseId: string
    }
    duration: number
    thumbnails: Array<ThumbnailObject>
    params: 'wAEB'
    [key: string]: any
}

export default interface FetchedSongObject {
    content: Array<SongObject>
    continuation: {
        continuation: string
        clickTrackingParams: string
    }
}

export interface ContinuationObject {
    continuation: string
    clickTrackingParams: string
}

export interface ContinuationObjectItself {
    continuation: {
        continuation: string
        clickTrackingParams: string
    }
}

export const BareSongObjectInstance: SongObject = {
    album: {
        browseId: '',
        name: '',
    },
    artist: {
        browseId: '',
        name: '',
    },
    duration: 0,
    musicId: '',
    name: '',
    params: 'wAEB',
    playlistId: '',
    thumbnails: [
        {
            height: 0,
            url: '',
        },
    ],
    type: '',
}

export const BareFetchedSongObjectInstance: FetchedSongObject = {
    content: [
        {
            type: '',
            musicId: '',
            playlistId: '',
            name: '',
            artist: [
                {
                    browseId: '',
                    name: '',
                },
            ],
            album: {
                name: '',
                browseId: '',
            },
            duration: 0,
            thumbnails: [
                {
                    height: 0,
                    url: '',
                },
                {
                    height: 0,
                    url: '',
                },
            ],
            params: 'wAEB',
        },
    ],
    continuation: {
        clickTrackingParams: '',
        continuation: '',
    },
}

export const CasualDemoList = [
    {
        id: '1',
        name: '1',
    },
    {
        id: '2',
        name: '2',
    },
    {
        id: '3',
        name: '3',
    },
    {
        id: '4',
        name: '4',
    },
    {
        id: '5',
        name: '5',
    },
    {
        id: '6',
        name: '6',
    },
    {
        id: '7',
        name: '7',
    },
    {
        id: '8',
        name: '8',
    },
    {
        id: '9',
        name: '9',
    },
    {
        id: '10',
        name: '10',
    },
    {
        id: '11',
        name: '11',
    },
]
