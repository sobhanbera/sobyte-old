/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - apps dark and default theme scheme
 */

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

    themecolor: ['#000000'],
    themecolorrevert: ['#FFFFFF'],

    surface: ['#050505'], // for surface components
    surfacelight: ['#21242b'], // for cards
    border: ['#272727'],
    placeholder: ['#CFCFCF'],
    text: ['#EFEFEF'],

    onSuccess: ['#28a745'],
    onError: ['#FF5500'],
    onWarning: ['#ffc107'],
    onDanger: ['#dc3545'],

    blueGradient: [
        '#0F002D',
        '#0F002D',
        '#0A032B',
        '#07012B',
        '#07012B',
        '#07012B',
        '#10003E',
        '#10004E',
    ],
    pinkGradient: [
        '#3D002F',
        '#3D002F',
        '#3B032A',
        '#3B0127',
        '#3B0127',
        '#3B0127',
        '#4E0030',
        '#5E0030',
    ],
    redGradient: [
        '#2D000F',
        '#2D000F',
        '#2B030A',
        '#2B0107',
        '#2B0107',
        '#2B0107',
        '#3E0010',
        '#4E0010',
    ],
    greenGradient: [
        '#0F402D',
        '#0F402D',
        '#0A432B',
        '#07412B',
        '#07412B',
        '#07412B',
        '#10403E',
        '#10404E',
    ],
    yellowGradient: [
        '#1F3D00',
        '#1F3D00',
        '#1A3B03',
        '#173B01',
        '#173B01',
        '#173B01',
        '#204E00',
        '#205E00',
    ],
    cyanGradient: [
        '#3D1F00',
        '#3D1F00',
        '#3B1A03',
        '#3B1701',
        '#3B1701',
        '#3B1701',
        '#4E2000',
        '#5E2000',
    ],
    mixGradient: [
        '#5D02FF',
        '#5D02FF',
        '#3B01A3',
        '#3B0171',
        '#3B0171',
        '#3B0171',
        '#4E0200',
        '#5E0200',
    ],
    greyGradient: [
        '#404040',
        '#353535',
        '#303030',
        '#252525',
        '#202020',
        '#151515',
        '#101010',
        '#050505',
    ],

    ...RequiredCommonColors,
}
/**
 * @end of themes object themes should not be written
 * below this comment for the sake of best programming practices...
 */
