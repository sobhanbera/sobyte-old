export interface ArtistObject {
    name: string
    browseId: string
}

export interface ThumbnailObject {
    name: string
    browseId: string
}

export interface SongObject {
    type: string
    videoId: string
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
