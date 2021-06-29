import ThemeColors, {RequiredCommonColors} from './ThemeProps'

/**
 * Here different Theme could be written which should include all the following properties of @theme_interface
 * and includig @common_colors_interface as the object given above @theme_interface__object + @common_colors_interface__object
 */

/**
 * @define as much themes you want below this comment only...
 * @and also give some sutaible detail of the corresponsing theme...
 */
export const DarkTheme: ThemeColors = {
    /**
     * This is the object for Dark Theme
     */
    primary: {
        main: ['#0077b6'],
        light: ['#81E4DA'],
        dark: ['#0E003E'],
    },
    secondary: {
        main: ['#EF1559'],
        light: ['#F9B5AC'],
        dark: ['#EE7674'],
    },
    accent: {
        main: ['#0F60B6'],
        light: ['#0F60B6'],
        dark: ['#0F60B6'],
    },

    background: ['#1B182B'],
    backgroundgradient: [
        '#0F002D',
        '#0A032B',
        '#07012B',
        '#0E003E',
        '#10003E',
        '#10004E',
    ],
    surfacegradient: [
        '#10004e',
        '#0f014c',
        '#0e0249',
        '#0d0247',
        '#0c0245',
        '#0b0342',
        '#0b0340',
        '#0b033d',
        '#0b033b',
        '#0b0338',
        '#0b0336',
        '#0b0333',
        '#0c0231',
        '#0b022e',
        '#0b022c',
        '#0b0229',
        '#0a0127',
        '#0a0124',
        '#090122',
        '#08011f',
        '#06001c',
        '#05001a',
    ],
    darksurfacegradient: ['#050505', '#000000'],
    surface: ['#040309'],
    border: ['#00369F'],
    placeholder: ['#CFCFCF'],
    text: ['#EFEFEF'],

    onSuccess: ['#28a745'],
    onError: ['#FF5500'],
    onWarning: ['#ffc107'],
    onDanger: ['#dc3545'],

    ...RequiredCommonColors,
}
/**
 * @end of themes object themes should not be written
 * below this comment for the sake of best programming practices...
 */
