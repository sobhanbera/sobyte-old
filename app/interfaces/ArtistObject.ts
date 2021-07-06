export interface ArtistObject {
    type: string
    browseId: string
    name: string
    thumbnails: Array<{
        url: string
        width: number
        height: number
    }>
}

export default interface FetchedArtistObject {
    content: Array<ArtistObject>
    continuation: {
        continuation: string
        clickTrackingParams: string
    }
}

export const BareFetchedArtistObjectInstance: FetchedArtistObject = {
    content: [
        {
            type: '',
            browseId: '',
            name: '',
            thumbnails: [
                {
                    width: 60,
                    height: 60,
                    url: '',
                },
            ],
        },
    ],
    continuation: {
        clickTrackingParams: '',
        continuation: '',
    },
}
