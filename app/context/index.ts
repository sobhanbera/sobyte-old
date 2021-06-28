import {useMusicApi} from '../api'
import {useApp} from '../MainApp'
import {useTheme} from '../themes/ThemeProvider'
import {useFetcher} from '../api/MusicFetcher'

import Player, {usePlayer} from '../api/PlayerControls'

export default Player
export {useTheme, useApp, useFetcher, useMusicApi, usePlayer}

/** external apis */
import {useTrackPlayerProgress} from 'react-native-track-player'
export {useTrackPlayerProgress as usePlayerProgress}
