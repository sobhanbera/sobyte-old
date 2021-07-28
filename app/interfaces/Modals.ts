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

export type ColorGradientCodeName = '' | 'bisman' | 'flamingo' | 'phoenix' | 'emerald' | 'canary' | 'celeste' | 'graphite' | 'disco'

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

