/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Javascript
 *
 * Purpose - all application constants are here
 */

import {NativeModules, Dimensions} from 'react-native'

const {StatusBarManager} = NativeModules

import * as Limits from './limits'
import queries from './queries'
export {Limits}

import {
    DefaultStatusBarComponent,
    PaddingBottomView,
    DefaultDeviceHeightView,
} from './components'
import {shuffleArray} from '../utils'
import {CommonColors} from '../themes/ThemeProps'

/** App details */
export const APP_NAME = 'Sobyte'
export const APP_DESCRIPTION = 'Free Music streamer and download.'
export const APP_BACKEND_API_KEY =
    '16e65baf9179f923b9019281b795b1c49ebbce2a3fbef51df5d13eb646a7a598'

export const DEVICE_STATUSBAR_HEIGHT_CONSTANT = StatusBarManager.HEIGHT

/**
 * jsx components................................
 *
 *
 */
export {DefaultStatusBarComponent, PaddingBottomView, DefaultDeviceHeightView}

/** Author Details */
export const AUTHOR_NAME = 'Sobhan Bera'
export const AUTHOR_NAME_LOWER = 'sobhanbera'

/** Constants */
/** Storage key Constants */
export const USER_DATA_STORAGE_KEY = '@APP:USER_DATA' // the storage key where the user data like email, username, etc will be stored in android itself...
export const LANGUAGE_CODE_STORAGE_KEY = '@APP:LANGUAGE_CODE' // Storage key where the app language variable exists, for internationlization purpose
export const AUDIO_QUALITY_STORAGE_KEY = '@APP:AUDIO_QUALITY' // Storage key for audio quality
export const THEME_STORAGE_KEY = '@APP:THEME' // Storage key for the app's theme
export const SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY =
    '@APP:SONG_IMAGE_DEFAULT_QUALITY' // Storage key for the app's theme
export const BACKGROUND_COLOR_OR_THEME_STORAGE_KEY =
    '@APP:BACKGROUND_COLOR_OR_THEME' // Storage key where the app's background colors choice will be saved (this is among the gradient colors in ThemeProps.tsx like the blueGradient, pinkGradient and so on)
export const PREVIOUSLY_SEARCHED_QUERIES_ARRAY_STORAGE_KEY =
    '@APP:PREVIOUSLY_SEARCHED_QUERIES_ARRAY_STORAGE_KEY' // Storage key where some or all the previously searched queries will be saved...
export const SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY =
    '@APP:SEARCHED_SONG_OFFLINE_DATA:' // the storage key where the fallbacks searched songs results will be stored this method is available in main music api under api/index.tsx in search method
/**
 * here for the above constant
 * like the searched query is New Bollywood songs and the category is PLAYLIST (may be)
 * then the results of it would be saved in here
 * "@APP:SEARCHED_SONG_OFFLINE_DATA:New Bollywood songs:PLAYLIST"
 * at this local storage key refrence...
 *
 * we can then get this value when there is no internet connection available OR
 * when any error occurred while searching results...
 */
export const MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY =
    '@APP:MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY' // the storage key where the user data like email, username, etc will be stored in android itself...
export const API_CONFIG_DATA_STORAGE_KEY = '@APP:API_CONFIG_DATA' // Storage key for header fetched by the api everytime...
export const USERS_CUSTOM_SONGS_LISTS = '@APP:USERS_CUSTOM_SONGS_LISTS' // user's custom songs list in the explore tab...

// dimension instance for the device
export const WINDOW_DIMENSION = Dimensions.get('window')
export const SCREEN_DIMENSION = Dimensions.get('screen')
// the window's dimenstions and diff parts
export const WINDOW_WIDTH = WINDOW_DIMENSION.width // window's width
export const WINDOW_HEIGHT = WINDOW_DIMENSION.height // window's height
export const WINDOW_SCALE = WINDOW_DIMENSION.scale // window's scale
export const WINDOW_FONT_SCALE = WINDOW_DIMENSION.fontScale // window's font scale
// the screen's dimenstions and diff parts
export const SCREEN_WIDTH = SCREEN_DIMENSION.width // screen's width
export const SCREEN_HEIGHT = SCREEN_DIMENSION.height // screen's height
export const SCREEN_SCALE = SCREEN_DIMENSION.scale // screen's scale
export const SCREEN_FONT_SCALE = SCREEN_DIMENSION.fontScale // screen's font scale

/** Fonts Short Name */
export const FontRoboto = 'Roboto-Regular'
export const FontRobotoBold = 'Roboto-Bold'
export const FontHelvetica = 'Helvetica'
export const FontLucida = 'LucidaGrande'
export const FontTahoma = 'Tahoma Regular font'
export const FontVerdana = 'verdana'
export const FontVerdanaBold = 'VerdanaBold'
export const FontElikaGorica = 'Elika Gorica'
export const FontUbuntuLight = 'Ubuntu Light'
export const FontUbuntu = 'Ubuntu'
export const FontUbuntuBold = 'Ubuntu Bold'

/** links and website redirects */
export const PRIVACY_POLICY_LINK = 'https://sobhanbera.vercel.app'
export const TERM_AND_CONDITIONS_LINK = 'https://sobhanbera.vercel.app'
export const APP_LOGO_LINK =
    'https://raw.githubusercontent.com/sobhanbera/sobyte/master/app/assets/images/sobyte_logo_white.png?token=AL7WGWAQBBGY7A53625TI43A7LSNU'

/**
 * 000@webhosting .com
 * @password          - Tl2Kb1z1KmCp7wSZcQLW
 * @database_name     - id17102443_sobyte
 * @database_username - id17102443_sobhanbera
 * @database_host     - localhost
 * @database_password - Tl2.Kb1z1KmCp7wSZcQLW
 */

/** number constants and more */
export const MUSIC_PLAYER_BLUR = 25 // blurRadius value
export const DEFAULT_IMAGE_BLUR = 45 // blurRadius value
export const DOUBLE_TAP_DELAY = 500 // the delay in milliseconds between two press for double press component
export const PROMPT_DURATION = 3500 // duration for showing prompt in milliseconds
export const MARQUEE_TEXT_PROGRESS_DURATION = 2000 // duration for showing prompt in milliseconds
export const MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION = 6500 // duration for scrolling the song name which is a large string or so...

export const BOTTOM_TAB_BAR_NAVIGATION_HEIGHT = 54 // this is the height of the bottom tab bar navigation in the AppInside.tsx file navigator
export const HEADER_MAX_HEIGHT = 85 // collapsible header max height
export const HEADER_MIN_HEIGHT = 55 // collapsible header min height
export const HEADER_SCROLL_DISTANCE = 85 - 50 // collapsible header scroll distance which is maxheight - minheight of the header
export const DEFAULT_TINY_ICON_SIZE = 16 // this is the default small icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_SMALL_ICON_SIZE = 22 // this is the default small icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_ICON_SIZE = 24 // this is the default normal icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_LARGE_ICON_SIZE = 26 // this is the default large icon size ad may be changed anytime with a permission of project maintainer
export const GRID_COLUMNS = 2 // number of columns per grid component for song list, artists list, playlist list and more...

export const DEFAULT_OVERLAY_OPACITY_MAX = 0.73128946 // maximum opacity overlay over any view, component, image, etc
export const DEFAULT_OVERLAY_OPACITY = 0.55 // threshold default opacity overlay over any view, component, image, etc
export const DEFAULT_OVERLAY_OPACITY_MIN = 0.375692 // minimum opacity overlay over any view, component, image, etc
export const DEFAULT_IMAGE_SIZE = '200' // default image width and height in string...
export const DEFAULT_IMAGE_QUALITY = '90' // default image quality in string...
export const DEFAULT_HIGH_IMAGE_SIZE = '576' // default high quality image width and height in string...
export const DEFAULT_HIGH_IMAGE_QUALITY = '100' // default high quality image quality in string...
export const DEFAULT_VERY_HIGH_IMAGE_SIZE = '720' // default high quality image width and height in string...
export const DEFAULT_VERY_HIGH_IMAGE_QUALITY = '100' // default high quality image quality in string...
export const DEFAULT_PLAY_IMAGE_SIZE = '300' // default size image for the music player UI in string...
export const DEFAULT_PLAY_IMAGE_QUALITY = '100' // default quality image quality for music player UI string...
// below value should not be changed regarding the shades on notification panel
export const DEFAULT_NOTIFICATION_IMAGE_SIZE = '250' // the size (width/height) of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...
export const DEFAULT_NOTIFICATION_IMAGE_QUALITY = '90' // the quality of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...

export const INFINITE_SCROLL_OFFSET = 1000 // default image width and height in string...

export const MAX_DISPLAY_TEXT_LENGTH = 30 // length of the text after which "..." will be shown
export const IMAGE_TINY_SIZE_TO_SHOW = 40 // width and height of the tiny sized image which should be shown in the UI
export const IMAGE_SMALL_SIZE_TO_SHOW = 60 // width and height of the small sized image which should be shown in the UI
export const IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW = 90 // width and height of the small sized image which should be shown in the UI
export const MAX_IMAGE_SIZE_TO_SHOW = 160 // width and height of the normal sized image which should be shown in the UI
export const IMAGE_WIDTH_TO_SHOW = 145 // width and height of the normal sized image which should be shown in the UI
export const IMAGE_HEIGHT_TO_SHOW = 155 // width and height of the normal sized image which should be shown in the UI
export const IMAGE_MARGIN_TO_SHOW = 5 // margin of the large sized image which should be shown in the UI
export const IMAGE_PADDING_TO_SHOW = 5 // padding of the image which should be shown in the UI
export const IMAGE_PADDING_H_TO_SHOW = 5 // padding horizontal of the image which should be shown in the UI
export const IMAGE_PADDING_V_TO_SHOW = 5 // padding vertical of the image which should be shown in the UI

export const DEFAULT_IMAGE_BORDER_RADIUS = 10
export const DEFAULT_TITLE_MARGIN = 9

export const LIKE_ANIMATION_DISAPPEAR_DURATION = 1650 // the duration after which the like animation while be hidden
export const HIGHEST_Z_INDEX_VALUE = 987654 // the largest z index value

export const INITIAL_NUMBER_OF_TRACKS_TO_LOAD = 5 // the initial number of tracks we have to load when the app launched and music player UI is shown
export const INITIAL_NUMBER_OF_TRACKS_TO_LOAD_IN_EXPLORE_TAB = 11 // the initial number of tracks we have to load when the app launched and exlore tab is shown

export const LIKE_ICON_OR_TEXT_COLOR = '#D61F26'

export const DEFAULT_QR_CODE_IMAGE_SIZE = 180

export const GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH = 8

export const AUTO_SCROLL_AFTER_USER_SCROLL_DURATION = 1000 // duration after which the song's lyrics will be auto scrolled to its perfect position. NOTE: if the user has scrolled to different position of lyrics than this will work...

export const MAXIMUM_USERS_CUSTOM_SONGS_LISTS = 10 // the maximum numbers of custom user's songs list that can be created...

/** equal partition arrays for linear gradient locations */
export const LINEAR_GRADIENT_LOCATIONS_2 = [0, 0.5]
export const LINEAR_GRADIENT_LOCATIONS_3 = [0, 0.33, 0.66]
export const LINEAR_GRADIENT_LOCATIONS_4 = [0, 0.25, 0.5, 0.75]
export const LINEAR_GRADIENT_LOCATIONS_5 = [0, 0.2, 0.4, 0.6, 0.8]
export const LINEAR_GRADIENT_LOCATIONS_6 = [0, 0.16, 0.32, 0.48, 0.64, 0.8]

/**
 * @important constants for the name of screens
 * these are the constant which will be constant all over the app
 * and there will be no need of going to the navigation component and see what is the name of the screen
 *
 * this names will be used in children components therefore these should be same all over the app
 */
export const ARTIST_DETAILS_SCREEN = 'ARTIST_DETAILS_SCREEN' // props - (ArtistObject from the interface)
export const EXTRA_SONGS_SCREEN = 'EXTRA_SONGS_SCREEN' // props - (ArtistObject from the interface)

/**
 * app animations constants
 * may be imports, files, lotties, etc
 */
const AppLogoAnimationConstant = require('../assets/animations/animation.json')
export {AppLogoAnimationConstant}

/**
 * some app raw files as a constants exports
 * this may be images, audios, json, any thing
 */
const AppIconConstant = require('../assets/images/sobyte_logo_white.png')
export {AppIconConstant}

// regex for email and ip address type
export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const IP_ADDRESS_REGEX =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const ALPHA_NUMERIC_PASSWORD_REGEX = /^[a-zA-Z0-9]+$/
export const MUSIC_ID_REGEX = /^[a-zA-Z0-9-_]{11}$/ // all songs have a valid id but for be in safe case this is the regex for valid music ID
export const BRACKET_BRACES_AND_PARENTHESIS_INSIDE_TEXT = / *\([^)]*\) */g

// this variable will not be used since there is not use of this but instead to recognize some
// patern of backend this variable is here...
export const bannedIPs = ['127.0.0.0', '0.0.0.0', 'localhost']

export const PASSWORD_CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@$%^&*(){}[]-_+|<>'

// this constant must contain a space at the end or else when making request this could not be separated from space
export const API_AUTHORIZATION_BEARER_TOKEN_PREFIX =
    'sobyte-bearer-access-token '
// this is the tag which will also be sent to the client as a response during a api requested in the client-side it can be fetched from the header of the response we sent...
export const API_DETAILS_TAG = 'sobyte-app-details'

/**
 * This is the config of the flatlist to provide the
 * currently viewed item in that particular flatlist or scrollview
 * this config is needed or it will through a error:-
 * Changing onViewableItemsChanged on the fly is not supported...
 */
export const ViewabilityConfig = {
    /**
     * Minimum amount of time (in milliseconds) that an item must be physically viewable before the
     * viewability callback will be fired. A high number means that scrolling through content without
     * stopping will not mark the content as viewable.
     */
    /**
     * Percent of viewport that must be covered for a partially occluded item to count as
     * "viewable", 0-100. Fully visible items are always considered viewable. A value of 0 means
     * that a single pixel in the viewport makes the item viewable, and a value of 100 means that
     * an item must be either entirely visible or cover the entire viewport to count as viewable.
     */
    /**
     * Similar to `viewAreaPercentThreshold`, but considers the percent of the item that is visible,
     * rather than the fraction of the viewable area it covers.
     */
    /**
     * Nothing is considered viewable until the user scrolls or `recordInteraction` is called after
     * render.
     */
    minimumViewTime: 1000, // there should be a miminum time only after which the process of playing the song or else should start
    viewAreaCoveragePercentThreshold: 99, // since when we are giving a less area view port it occur much before the scroll actually occurs
    // itemVisiblePercentThreshold: 90, // percent %
    waitForInteraction: false, // false because we want the song must be played instantly when it is loaded
}

export const RANDOM_SEARCH_QUERY = () =>
    shuffleArray(queries)[Math.floor(Math.random() * queries.length)]

/**
 * this is the same constant colors which are primarily provided in theme prop interfaces containing file
 */
export const COMMON_COLORS: CommonColors = {
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
    rgbstreakgradient: [
        '#f79533',
        '#f37055',
        '#ef4e7b',
        '#a166ab',
        '#5073b8',
        '#1098ad',
        '#07b39b',
        '#6fba82',
    ],
}
