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
export type AudioQualityType = 'e' | 'g' | 'p' | 'a'
export type ImageQualityType =
    | '720'
    | '512'
    | '420'
    | '300'
    | '200'
    | '120'
    | '60'
export type LanguageType = 'en' | 'hi'

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
    uid?: string
    email?: string
    username?: string
    password?: string
}
