/**
 * Some Common Color which always are constant and universal...
 * @common_colors_interface
 */
export interface CommonColors {
    white: string[]
    black: string[]
    grey: string[]
    dimGrey: string[]
    lightSlateGrey: string[]
    slateGrey: string[]
    red: string[]
    green: string[]
    blue: string[]
    yellow: string[]
    cyan: string[]
    pink: string[]
    purple: string[]
    orange: string[]
    lightBlue: string[]
    darkBlue: string[]
    cadetBlue: string[]
    transparent: string[]
}

/**
 * This interface is to create the Theme object with the following properties and
 * including Common Colors
 * @theme_interface + @common_colors_interface
 */
export default interface ThemeColors extends CommonColors {
    primary: {
        main: string[]
        light: string[]
        dark: string[]
    }
    secondary: {
        main: string[]
        light: string[]
        dark: string[]
    }
    accent: {
        main: string[]
        light: string[]
        dark: string[]
    }

    background: string[]
    backgroundgradient: string[]
    surface: string[]
    surfacelight: string[]
    border: string[]
    placeholder: string[]
    text: string[]

    onSuccess: string[]
    onError: string[]
    onWarning: string[]
    onDanger: string[]
}

/**
 * These are the main common colors
 * @common_colors_interface__object
 * this - @
 */
export const RequiredCommonColors: CommonColors = {
    white: ['#FFFFFF'],
    black: ['#000000'],
    grey: ['#808080'],
    dimGrey: ['#696969'],
    lightSlateGrey: ['#778899'],
    slateGrey: ['#708090'],
    red: ['#FF0000'],
    green: ['#00FF00'],
    blue: ['#0000FF'],
    yellow: ['#FFFF00'],
    cyan: ['#00FFFF'],
    pink: ['#FF00FF'],
    purple: ['#800080'],
    orange: ['#FFA500'],
    lightBlue: ['#98C1D9'],
    darkBlue: ['#3D5A80'],
    cadetBlue: ['#293241'],
    transparent: ['#00000000'],
}

/**
 *
 * @param theme this is the object for Themes Object
 * i.e. @theme_interface__object
 * @returns the an object including all the theme color itself along with the required common colors
 * @deprecated currently deprecated
 */
export function ApplyAllRequiredColor(theme: ThemeColors) {
    return {
        ...theme,
        ...RequiredCommonColors,
    }
}
