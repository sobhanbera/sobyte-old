import {SongObject, ThumbnailObject} from '../interfaces'

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
    resultHeight: number,
) {
    // demo url - https://lh3.googleusercontent.com/WP7l4p-2WhWzLM6lXJ0n2gXLK6u07eCejpybWzb-yhEyt9Y0aOkxMlLhpayO7PdXYOYy2NgkWu9hGBPy=w60-h60-l90-rj
    // here size is 60
    const heighQuery = `w${height}-h${height}-l90-rj`
    const resultHeightQuery = `w${resultHeight}-h${resultHeight}-l90-rj`
    return imageLink.replace(heighQuery, resultHeightQuery)
}
export const getHighQualityImageFromSongImage = (
    image: ThumbnailObject,
    height: number,
) =>
    image.url.replace(
        `w${image.height}-h${image.height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )
export const getHighQualityImageFromSongImageArray = (
    image: Array<ThumbnailObject>,
    height: number,
) =>
    image[0].url.replace(
        `w${image[0].height}-h${image[0].height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )
export const getHighQualityImageFromSong = (song: SongObject, height: number) =>
    song.thumbnails[0].url.replace(
        `w${song.thumbnails[0].height}-h${song.thumbnails[0].height}-l90-rj`,
        `w${height}-h${height}-l90-rj`,
    )
