/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - many data types and instances
 */

export interface DominatingColors {
    average: string | ''
    darkMuted: string | ''
    darkVibrant: string | ''
    dominant: string | ''
    lightMuted: string | ''
    lightVibrant: string | ''
    muted: string | ''
    platform: 'android' | 'ios'
    vibrant: string | ''
}

export type ColorGradientCodeName =
    | ''
    | 'bisman'
    | 'flamingo'
    | 'phoenix'
    | 'emerald'
    | 'canary'
    | 'celeste'
    | 'graphite'
    | 'disco'

export type ThemeType = 'd' | 'l' | 'c'
export type AudioQualityType = 'extreme' | 'good' | 'poor' | 'auto'
export type ImageQualityType =
    | '720'
    | '512'
    | '420'
    | '300'
    | '200'
    | '120'
    | '60'
export type LanguageType = 'en' | 'hi' | 'bn'

// music track type which is the main type of the songs playing/played each time...
export interface MusicTrack {
    id: string
    url: string
    duration: number
    title: string
    artist: string
    artwork: string | any
    playlistId: string
    type?: 'default' | 'dash' | 'hls' | 'smoothstreaming'
    pitchAlgorithm?: string | number
    genre?: string
    description?: string
    album?: string
    rating?: number | boolean
    [key: string]: any
}

// lrc lines modal for callback function returing object's type...
export interface LrcLine {
    id: string
    millisecond: number
    content: string
}

/**
 * user data interface
 * which contains email, username, phone, gender, account_type, account_type_upto, etc...
 */
export interface AppUserData {
    uid?: number
    email?: string
    username?: string
    profile_image?: string | null
    phone?: string | null
    gender?: string | null
    account_type?: string | null
    account_type_upto?: Date
    created_on?: Date
    created_ip?: string | null
    last_login_on?: Date
    last_login_ip?: string | null
    last_updated_on?: Date
    last_updated_ip?: string | null
    disabled?: number
    verified_account?: number
    verified_email?: number
    access_token?: string | null
}

/**
 * interface which is a type of object among all the arttributes
 * in short this is the sum of all the input fields of the api
 * for example::
 * - login route takes {user: string, email_type, username_type password: string}
 * - register route takes {email: string, password: string}
 * - updatelastlogin route takes {uid: number}
 * - ...
 * so this api interface would contain the following arttributes...
 * - {
 *      uid?: string
 *      email?: string
 *      username?: string
 *      password?: string
 *      user: string,
 *      ...
 * }...
 */
export interface AllApiPostBodyArttributes {
    key?: string
    id?: string
    uid?: string | number
    email?: string
    username?: string
    password?: string
    [key: string]: any
}
