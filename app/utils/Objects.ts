import {SongArtistObject, SongObject, ThumbnailObject} from '../interfaces'
import {
    ALPHA_NUMERIC_PASSWORD_REGEX,
    BRACKET_BRACES_AND_PARENTHESIS_INSIDE_TEXT,
    DEFAULT_NOTIFICATION_IMAGE_QUALITY,
    DEFAULT_NOTIFICATION_IMAGE_SIZE,
    MAX_DISPLAY_TEXT_LENGTH,
    PASSWORD_CHARACTERS,
    FACEBOOK_ENDPOINT,
    INSTAGRAM_ENDPOINT,
    GITHUB_ENDPOINT,
    LINKEDIN_ENDPOINT,
    SNAPCHAT_ENDPOINT,
    TWITTER_ENDPOINT,
} from '../constants'
import {FakeMailsList} from '../constants/fakeMails'
import {Linking} from 'react-native'

export function returnNullCallback(nullableValue: any, defaultValue: any): any {
    return !nullableValue ||
        nullableValue === null ||
        nullableValue === undefined
        ? defaultValue
        : nullableValue
}

export function IF(condition: boolean, yes: any, no: any): any {
    return condition ? yes : no
}

export const IMAGE_WIDTH_HEIGHT_FORMATTING_REGEX =
    /w[0-9]{2,4}-h[0-9]{2,4}-l[0-9]{2,3}-rj/
export const IMAGE_DYNAMIC_WIDTH_HEIGHT_FORMATTING_REGEX =
    /w[0-9]{2,4}-h[0-9]{2,4}-l[0-9]{2,3}-rj/
export function getHighQualityImage(
    imageLink: string,
    height: number,
    resultHeight: number | string,
): string {
    // demo url - https://lh3.googleusercontent.com/WP7l4p-2WhWzLM6lXJ0n2gXLK6u07eCejpybWzb-yhEyt9Y0aOkxMlLhpayO7PdXYOYy2NgkWu9hGBPy=w60-h60-l90-rj
    // here size is 60
    const heighQuery = `w${height}-h${height}-l90-rj`
    const resultHeightQuery = `w${resultHeight}-h${resultHeight}-l90-rj`
    return imageLink.replace(heighQuery, resultHeightQuery)
}
export const getHighQualityImageFromSongImage = (
    image: ThumbnailObject,
    height: number | string,
): string =>
    image.url.replace(
        IMAGE_WIDTH_HEIGHT_FORMATTING_REGEX,
        `w${height}-h${height}-l90-rj`,
    )
export const getHighQualityImageFromSongImageArray = (
    image: Array<ThumbnailObject>,
    height: number | string,
): string =>
    image[0].url.replace(
        IMAGE_WIDTH_HEIGHT_FORMATTING_REGEX,
        `w${height}-h${height}-l100-rj`,
    )
export const getHighQualityImageFromSong = (
    song: SongObject,
    height: number | string,
): string =>
    song.thumbnails[0].url.replace(
        IMAGE_WIDTH_HEIGHT_FORMATTING_REGEX,
        `w${height}-h${height}-l100-rj`,
    )
export const getHightQualityImageFromLink = (
    imageLink: string,
    height: number | string,
): string =>
    imageLink.replace(
        IMAGE_WIDTH_HEIGHT_FORMATTING_REGEX,
        `w${height}-h${height}-l100-rj`,
    )
export const getHighQualityImageFromLinkWithHeight = (
    imageLink: string,
    initialHeight: number | string,
    height: number | string = 244,
    imageQuality: number | string = 90,
): string =>
    imageLink
        .replace(
            `=w${initialHeight}-h${initialHeight}`,
            `=w${height}-h${height}`,
        )
        .replace(`-l90-rj`, `-l${imageQuality}-rj`)

export const getNotificationPlayerImageFromLinkWithHeight = (
    imageLink: string,
    initialHeight: number | string,
): string => {
    return imageLink
        .replace(
            `=w${initialHeight}-h${initialHeight}`,
            `=w${DEFAULT_NOTIFICATION_IMAGE_SIZE}-h${DEFAULT_NOTIFICATION_IMAGE_SIZE}`,
        )
        .replace(`-l90-rj`, `-l${DEFAULT_NOTIFICATION_IMAGE_QUALITY}-rj`)
}

/**
 *
 * @param artists array of artists with multiple values
 * @returns the string of list of names of artist in the arguments of function
 */
export function formatArtistsListFromArray(
    artists: Array<SongArtistObject>,
): string {
    let str = ''
    for (let i = 0; i < artists.length; ++i) {
        str += firstLetterCap(`${artists[i].name}`)
        if (i < artists.length - 1) str += ', ' // we are not adding comma after the last artist's name
    }
    return trimLargeString(str, 30)
}
/**
 *
 * @param artists only takes a single artist object with name and browserId
 * @returns the name of artist
 */
export function formatArtistSingle(artists: SongArtistObject): string {
    return firstLetterCap(artists.name)
}
/**
 *
 * @param artists accepts both artistObject and array of it and provide the artist or the artist list string according to the input parameter
 * @returns the name or string of list of names of artists
 */
export function formatArtists(
    artists: Array<SongArtistObject> | SongArtistObject,
): string {
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
    length: number = MAX_DISPLAY_TEXT_LENGTH,
): string {
    if (text.length > length) return text.substring(0, length) + '...'
    return firstLetterCap(text)
}

export function firstLetterCap(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * @returns function which returns a random number in a range
 */
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}
/**
 * this function is the exact same as the above one but the difference is that this function provides the string of that number
 * @returns a random string constaining numbers
 */
export function getRandomNumberString(): string {
    return Math.random().toString(36).substring(7)
}

/**
 * @param password the password string for which the checks must be done,
 * @returns if the password is allowed or not or in other words if the password contains both alphabets and numbers (alphanumeric)...
 */
export function checkIfPasswordIsAlphanumeric(password: string): boolean {
    return ALPHA_NUMERIC_PASSWORD_REGEX.test(password)
}

/**
 * @returns a random string with alphanumeric characters
 * this could be used as a password generator...
 */
export function generateRandomPassword(lengthOfPassword: number = 10): string {
    let password = ''
    for (var i = 0, n = PASSWORD_CHARACTERS.length; i < lengthOfPassword; ++i) {
        password += PASSWORD_CHARACTERS.charAt(randomNumber(0, n))
    }
    return password
}

/**
 * @param email a email string
 * @returns true if the email is temporary mail else false
 */
export function isEmailBlocked(email: string): boolean {
    for (let i in FakeMailsList)
        if (email.includes(FakeMailsList[i])) return true
    return false
}

/**
 * capitalize all words of a string
 * @param string the sentence or the statement
 * @returns a string which contains capital letter after each spaces...
 */
export function capitalizeWords(string: string): string {
    /**
     * we are converting the whole string to lowercase because
     * the input string may be like this:
     * Input:- THIS IS A SENTENCE OR STRING
     * Output:- THIS IS A SENTENCE OR STRING
     * But We Want:- This Is A Sentence Or String
     * that's why
     *
     * this is one of the edge case....
     */
    return string
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, function (character) {
            // upper case character after every space
            return character.toUpperCase()
        })
        .replace(/(?:\.)\S/g, function (character) {
            /**
             * uppercase character after every period
             * this will be helpful to show artist name
             * like - a.r. rahman will be A.r. Rahman without this function
             * and with this function it will be A.R. Rahman
             * which is the correct format of the artists to show in the UI
             */
            return character.toUpperCase()
        })
}

/**
 *
 * @param trackTitle the song's title or the artists list in string format
 * @returns a string which does not contain Unnecessary Characters
 */
export function removeUnnecessaryCharacters(trackTitle: string): string {
    return trackTitle // replacing every unnecessary characters
        .replace("'", '') // '
        .replace('"', '') // "
}

/**
 * @param {string} trackTitle the name or the string of the song
 * @returns the capitalized words string
 * but the change is this function replaces text between (), [] and {} to null/empty
 */
export function formatTrackTitle(trackTitle: string): string {
    // we are checking if the trackTitle contain only one word
    // in that case we will return the full uppercase of the word...
    if (trackTitle.split(' ').length - 1 <= 0) {
        return capitalizeWords(
            trackTitle.replace(BRACKET_BRACES_AND_PARENTHESIS_INSIDE_TEXT, ''),
        ).toUpperCase()
    }
    return capitalizeWords(
        removeUnnecessaryCharacters(
            trackTitle.replace(BRACKET_BRACES_AND_PARENTHESIS_INSIDE_TEXT, ''),
        ),
    )
}

/**
 * @param {string} name the name string which is to be formated
 * @return the formatted username or the fullname whatever is passed as the parameter
 */
export function formatNames(name: string) {
    name = name.trim()
    return name.length > 15 ? name.substring(0, 15).concat('...') : name
}

/**
 * @param {Array} array an array of any type of variables
 * @returns a random and shuffled order of the same array
 */
export function shuffleArray(array: Array<any>): Array<any> {
    var currIndex = array.length,
        temp,
        random
    // the current index and random index variable with one temporary variable
    while (0 !== currIndex) {
        random = Math.floor(Math.random() * currIndex)
        currIndex -= 1
        temp = array[currIndex]
        array[currIndex] = array[random]
        array[random] = temp
    }
    return array
}

/**
 * some below functions will return the link to the social media pages
 * we can use this function like where we need to redirect user to social media pages
 * of other users...
 */
/**
 * facebook link getter function
 * @param username facebook username
 * @return the facebook webpage of the user whatever the username is passed through the arguments...
 */
export function getFacebookLink(username: string): string {
    return `${FACEBOOK_ENDPOINT}/${username}`
}
/**
 * Instagram link getter function
 * @param username Instagram username
 * @return the Instagram webpage of the user whatever the username is passed through the arguments...
 */
export function getInstagramLink(username: string): string {
    return `${INSTAGRAM_ENDPOINT}/${username}`
}
/**
 * GitHub link getter function
 * @param username GitHub username
 * @return the GitHub webpage of the user whatever the username is passed through the arguments...
 */
export function getGitHubLink(username: string): string {
    return `${GITHUB_ENDPOINT}/${username}`
}
/**
 * Linkedin link getter function
 * @param username Linkedin username
 * @return the Linkedin webpage of the user whatever the username is passed through the arguments...
 */
export function getLinkedinLink(username: string): string {
    return `${LINKEDIN_ENDPOINT}/${username}`
}
/**
 * Snapchat link getter function
 * @param username Snapchat username
 * @return the Snapchat webpage of the user whatever the username is passed through the arguments...
 */
export function getSnapchatLink(username: string): string {
    return `${SNAPCHAT_ENDPOINT}/${username}`
}
/**
 * Twitter link getter function
 * @param username Twitter username
 * @return the Twitter webpage of the user whatever the username is passed through the arguments...
 */
export function getTwitterLink(username: string): string {
    return `${TWITTER_ENDPOINT}/${username}`
}

/**
 * this function will redirect the user to some website or some app/browser anything like that
 * @param webpage the website where to redirect...
 */
export async function redirectToWebsite(webpage: string): Promise<any> {
    return await Linking.openURL(webpage)
}
