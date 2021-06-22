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
        light: ['#0F60B6'],
        dark: ['#0F60B6'],
    },
    secondary: {
        main: ['#0F60B6'],
        light: ['#0F60B6'],
        dark: ['#0F60B6'],
    },
    accent: {
        main: ['#0F60B6'],
        light: ['#0F60B6'],
        dark: ['#0F60B6'],
    },

    background: ['#0E003E', '#10003B', '#07012B', '#0A032B', '#0F002D'],
    backgroundgradient: ['#0E003E', '#10003B', '#07012B', '#0A032B', '#0F002D'],
    surface: [''],
    border: [''],

    onSuccess: ['#0FFA50'],
    onError: ['#FF500A'],
    onWarning: [''],
    onDanger: ['#FF500A'],

    ...RequiredCommonColors,
}
/**
 * @end of themes object themes should not be written
 * below this comment for the sake of best programming practices...
 */
