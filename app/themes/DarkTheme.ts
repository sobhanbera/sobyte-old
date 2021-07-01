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
        main: ['#0F60B6'],
        light: ['#5a8de9'],
        dark: ['#003785'],
    },
    secondary: {
        main: ['#EF1559'],
        light: ['#F9B5AC'],
        dark: ['#EE7674'],
    },
    accent: {
        main: ['#0077b6'],
        light: ['#81E4DA'],
        dark: ['#0E003E'],
    },

    background: ['#101010', '#101010'],
    backgroundgradient: [
        '#0F002D',
        '#0F002D',
        '#0A032B',
        '#07012B',
        '#07012B',
        '#07012B',
        '#10003E',
        '#10004E',
    ],

    surface: ['#050505'], // for surface components
    surfacelight: ['#21242b'], // for cards
    border: ['#272727'],
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
