import React, {
    useState,
    createContext,
    FC,
    useContext,
    useEffect,
    useCallback,
} from 'react'
import {} from 'react-native'

import TrackPlayer, {
    STATE_PLAYING,
    STATE_PAUSED,
    STATE_STOPPED,
    CAPABILITY_STOP,
    CAPABILITY_PLAY,
    CAPABILITY_PAUSE,
    CAPABILITY_SKIP,
    CAPABILITY_SKIP_TO_NEXT,
    CAPABILITY_SKIP_TO_PREVIOUS,
    CAPABILITY_JUMP_BACKWARD,
    CAPABILITY_JUMP_FORWARD,
} from 'react-native-track-player'

const PlayerContext = createContext({
    playing: false,
    play: () => null,
    pause: () => null,
    next: () => null,
    previous: () => null,
})
interface PlayerProps {
    children: any
}
const Player: FC<PlayerProps> = props => {
    const [playing, setPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState({
        id: '',
        title: '',
        artwork: '',
        thumbnail: '',
    })
    const [volume, setVolume] = useState(1)
    const [rate, setRate] = useState(1)

    const play = () => {}
    const pause = () => {}
    const next = () => {}
    const previous = () => {}

    const playerValues = {
        playing,
        play,
        pause,
        next,
        previous,
    }

    return (
        <PlayerContext.Provider value={playerValues}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default Player
export const usePlayer = () => useContext(PlayerContext)
