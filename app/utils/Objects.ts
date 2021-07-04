import {ArtistObject, SongObject, ThumbnailObject} from '../interfaces'
import {LARGE_TEXT_LENGTH} from '../constants'

export function returnNullCallback(nullableValue: any, defaultValue: any): any {
    return !nullableValue ||
        nullableValue === null ||
        nullableValue === undefined
        ? defaultValue
        : nullableValue
}

export function IF(condition: boolean, yes: any, no: any) {
    return condition ? yes : no
}

export function getHighQualityImage(
    imageLink: string,
    height: number,
    resultHeight: number | string,
) {
    // demo url - https://lh3.googleusercontent.com/WP7l4p-2WhWzLM6lXJ0n2gXLK6u07eCejpybWzb-yhEyt9Y0aOkxMlLhpayO7PdXYOYy2NgkWu9hGBPy=w60-h60-l90-rj
    // here size is 60
    const heighQuery = `w${height}-h${height}-l90-rj`
    const resultHeightQuery = `w${resultHeight}-h${resultHeight}-l90-rj`
    return imageLink.replace(heighQuery, resultHeightQuery)
}
export const getHighQualityImageFromSongImage = (
    image: ThumbnailObject,
    height: number | string,
) =>
    image.url.replace(
        `w${image.height}-h${image.height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )
export const getHighQualityImageFromSongImageArray = (
    image: Array<ThumbnailObject>,
    height: number | string,
) =>
    image[0].url.replace(
        `w${image[0].height}-h${image[0].height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )
export const getHighQualityImageFromSong = (
    song: SongObject,
    height: number | string,
) =>
    song.thumbnails[0].url.replace(
        `w${song.thumbnails[0].height}-h${song.thumbnails[0].height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )

/**
 *
 * @param artists array of artists with multiple values
 * @returns the string of list of names of artist in the arguments of function
 */
export function formatArtistsListFromArray(artists: Array<ArtistObject>) {
    let str = ''
    for (let i = 0; i < artists.length; ++i) {
        if (i >= 2) break
        str += firstLetterCap(`${artists[i].name}, `)
    }
    return trimLargeString(str, 25)
}
/**
 *
 * @param artists only takes a single artist object with name and browserId
 * @returns the name of artist
 */
export function formatArtistSingle(artists: ArtistObject) {
    return firstLetterCap(artists.name)
}
/**
 *
 * @param artists accepts both artistObject and array of it and provide the artist or the artist list string according to the input parameter
 * @returns the name or string of list of names of artists
 */
export function formatArtists(artists: Array<ArtistObject> | ArtistObject) {
    if (Array.isArray(artists)) {
        return formatArtistsListFromArray(artists)
    } else {
        return formatArtistSingle(artists)
    }
}

/**
 * @param text the text which is to be tested and if it is larger than the thresold constant we will add dots after that length
 * @returns the result of the above operation
 */
export function trimLargeString(
    text: string,
    length: number = LARGE_TEXT_LENGTH,
) {
    if (text.length > length) return text.substring(0, length) + '...'
    return firstLetterCap(text)
}

export function firstLetterCap(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
