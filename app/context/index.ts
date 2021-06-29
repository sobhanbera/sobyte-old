import {useMusicApi} from '../api'
import {useApp} from '../MainApp'
import {useTheme} from '../themes/ThemeProvider'
import {useFetcher} from '../api/MusicFetcher'
import {usePrompt} from '../components/Prompt'
import Setting, {useSetting} from './Settings'

import Player, {usePlayer} from '../api/PlayerControls'

export default Player
export {Setting}

export {
    useSetting,
    useTheme,
    useApp,
    useFetcher,
    useMusicApi,
    usePlayer,
    usePrompt,
}

/** external apis */
import {useTrackPlayerProgress} from 'react-native-track-player'
export {useTrackPlayerProgress as usePlayerProgress}
