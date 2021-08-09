/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - all application contexts are exported from here
 */

// the main app backend api context provider
import {useBackendApi, AppMainBackendApiContext} from '../backend' // the major and main secure backend api of the application
export {useBackendApi, AppMainBackendApiContext}

import {
    useUserData,
    UserDataContext,
} from '../controller/AppLaunchingNavigation'
export {useUserData, UserDataContext}

// other context providers
import {useMusicApi} from '../api' // the main music loader
import {useApp} from '../MainApp' // the app starting
import {useTheme} from '../themes/ThemeProvider' // theme context
import {useFetcher} from '../api/MusicFetcher' // track featching methods
import Setting, {useSetting} from './Settings' // global settings

import Player, {usePlayer} from '../api/PlayerControls' // global player options

export default Player
export {Setting}

export {useSetting, useTheme, useApp, useFetcher, useMusicApi, usePlayer}

/** external apis */
import {useTrackPlayerProgress} from 'react-native-track-player'
export {useTrackPlayerProgress as usePlayerProgress}
