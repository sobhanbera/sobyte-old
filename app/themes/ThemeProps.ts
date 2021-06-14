/**
 * Some Common Color which always are constant and universal...
 * @common_colors_interface
 */
export interface CommonColors {
    white: string[] | string
    black: string[] | string
    grey: string[] | string
    dimGrey: string[] | string
    lightSlateGrey: string[] | string
    slateGrey: string[] | string
    red: string[] | string
    green: string[] | string
    blue: string[] | string
    yellow: string[] | string
    cyan: string[] | string
    pink: string[] | string
    purple: string[] | string
    orange: string[] | string
    lightBlue: string[] | string
    darkBlue: string[] | string
    cadetBlue: string[] | string
    transparent: string[] | string
}

/**
 * This interface is to create the Theme object with the following properties and
 * including Common Colors
 * @theme_interface + @common_colors_interface
 */
export default interface ThemeColors extends CommonColors {
    primary: {
        main: string[] | string
        light: string[] | string
        dark: string[] | string
    }
    secondary: {
        main: string[] | string
        light: string[] | string
        dark: string[] | string
    }
    accent: {
        main: string[] | string
        light: string[] | string
        dark: string[] | string
    }

    background: string[] | string
    surface?: string[] | string
    border: string[] | string

    onSuccess: string[] | string
    onError: string[] | string
    onWarning: string[] | string
    onDanger: string[] | string
}

/**
 * These are the main common colors
 * @common_colors_interface__object
 * this - @
 */
export const RequiredCommonColors: CommonColors = {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#808080',
    dimGrey: '#696969',
    lightSlateGrey: '#778899',
    slateGrey: '#708090',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    cyan: '#00FFFF',
    pink: '#FF00FF',
    purple: '#800080',
    orange: '#FFA500',
    lightBlue: '#98C1D9',
    darkBlue: '#3D5A80',
    cadetBlue: '#293241',
    transparent: '#00000000',
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
