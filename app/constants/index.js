import React from 'react'
import {View} from 'react-native'

/** App details */
export const APP_NAME = 'Sobyte'
export const APP_DESCRIPTION = 'Free Music streamer and download.'

/** Author Details */
export const AUTHOR_NAME = 'Sobhan Bera'
export const AUTHOR_NAME_LOWER = 'sobhanbera'

/** Constants */
/** Storage key Constants */
export const LANGUAGE_CODE_STORAGE_KEY = '@APP:LANGUAGE_CODE' // Storage key where the app language variable exists, for internationlization purpose
export const AUDIO_QUALITY_STORAGE_KEY = '@APP:AUDIO_QUALITY' // Storage key for audio quality
export const THEME_STORAGE_KEY = '@APP:THEME' // Storage key for the app's theme
export const SONG_IMAGE_DEFAULT_QUALITY_STORAGE_KEY =
    '@APP:SONG_IMAGE_DEFAULT_QUALITY' // Storage key for the app's theme

export const API_CONFIG_DATA_STORAGE_KEY = '@APP:API_CONFIG_DATA' // Storage key for header fetched by the api everytime...

/** Fonts Short Name */
export const FontRoboto = 'Roboto-Regular'
export const FontRobotoBold = 'Roboto-Bold'
export const FontHelvetica = 'Helvetica'
export const FontLucida = 'LucidaGrande'
export const FontTahoma = 'Tahoma Regular font'
export const FontVerdana = 'verdana'
export const FontElikaGorica = 'Elika Gorica'
export const FontUbuntuLight = 'Ubuntu Light'
export const FontUbuntu = 'Ubuntu'
export const FontUbuntuBold = 'Ubuntu Bold'

/** links and website redirects */
export const PRIVACY_POLICY_LINK = 'https://sobhanbera.vercel.app'
export const TERM_AND_CONDITIONS_LINK = 'https://sobhanbera.vercel.app'

/**
 * 000@webhosting .com
 * @password          - Tl2Kb1z1KmCp7wSZcQLW
 * @database_name     - id17102443_sobyte
 * @database_username - id17102443_sobhanbera
 * @database_host     - localhost
 * @database_password - Tl2.Kb1z1KmCp7wSZcQLW
 */

/** number constants and more */
export const MUSIC_PLAYER_BLUR = 19 // blurRadius value
export const DOUBLE_TAP_DELAY = 500 // the delay in milliseconds between two press for double press component
export const PROMPT_DURATION = 5000 // duration for showing prompt in milliseconds
export const BOTTOM_TAB_BAR_NAVIGATION_HEIGHT = 54 // this is the height of the bottom tab bar navigation in the AppInside.tsx file navigator
export const HEADER_MAX_HEIGHT = 85 // collapsible header max height
export const HEADER_MIN_HEIGHT = 55 // collapsible header min height
export const HEADER_SCROLL_DISTANCE = 85 - 50 // collapsible header scroll distance which is maxheight - minheight of the header
export const DEFAULT_TINY_ICON_SIZE = 16 // this is the default small icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_SMALL_ICON_SIZE = 22 // this is the default small icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_ICON_SIZE = 24 // this is the default normal icon size ad may be changed anytime with a permission of project maintainer
export const DEFAULT_LARGE_ICON_SIZE = 26 // this is the default large icon size ad may be changed anytime with a permission of project maintainer
export const GRID_COLUMNS = 2 // number of columns per grid component for song list, artists list, playlist list and more...

export const DEFAULT_IMAGE_QUALITY = '200' // default image width and height in string...

export const LARGE_TEXT_LENGTH = 15 // length of the text after which "..." will be shown
export const IMAGE_TINY_SIZE_TO_SHOW = 40 // width and height of the tiny sized image which should be shown in the UI
export const IMAGE_SMALL_SIZE_TO_SHOW = 60 // width and height of the small sized image which should be shown in the UI
export const IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW = 90 // width and height of the small sized image which should be shown in the UI
export const IMAGE_SIZE_TO_SHOW = 130 // width and height of the normal sized image which should be shown in the UI
export const IMAGE_MARGIN_TO_SHOW = 4 // margin of the large sized image which should be shown in the UI
export const IMAGE_PADDING_TO_SHOW = 4 // padding of the image which should be shown in the UI
export const IMAGE_PADDING_H_TO_SHOW = 4 // padding horizontal of the image which should be shown in the UI
export const IMAGE_PADDING_V_TO_SHOW = 4 // padding vertical of the image which should be shown in the UI

export const PaddingBottomView = () => <View style={{paddingBottom: 100}} />
