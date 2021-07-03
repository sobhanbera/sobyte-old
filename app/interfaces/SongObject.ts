export interface ArtistObject {
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
    artist: Array<ArtistObject> | ArtistObject
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
