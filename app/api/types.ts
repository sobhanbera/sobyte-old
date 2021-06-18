export default interface SearchMusicType {
    type: string
    videoId: string
    playlistId: string
    name: string
    artist: [
        {
            name: string
            browseId: string
        },
        {
            name: string
            browseId: string
        },
        {
            name: string
            browseId: string
        },
    ]
    album: {
        name: string
        browseId: string
    }
    duration: number
    thumbnails: [
        {
            url: string
            width: number
            height: number
        },
        {
            url: string
            width: number
            height: number
        },
    ]
    params: string
}
