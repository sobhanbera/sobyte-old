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

    background: ['#0E003E', '#10003B', '#07012B', '#0A032B', '#0F002D'],
    backgroundgradient: [
        '#0F002D',
        '#0A032B',
        '#07012B',
        '#0E003E',
        '#10003E',
        '#10004E',
    ],
    surfacegradient: [
        '#0f0f0f',
        '#0f0f0f',
        '#121b2a',
        '#142745',
        '#1b4485',
        '#2b4587',
    ],
    surface: ['#272727'],
    border: ['#00369F'],
    placeholder: ['#CFCFCF'],
    text: ['#EFEFEF'],

    onSuccess: ['#0496FF'],
    onError: ['#D81159'],
    onWarning: ['#FCFC62'],
    onDanger: ['#EF0000'],

    ...RequiredCommonColors,
}
/**
 * @end of themes object themes should not be written
 * below this comment for the sake of best programming practices...
 */
