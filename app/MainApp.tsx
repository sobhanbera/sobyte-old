import React, {createContext, useContext, useEffect, useState} from 'react'
import {StatusBar} from 'react-native'

import TrackPlayer, {
    CAPABILITY_PLAY,
    CAPABILITY_PAUSE,
    CAPABILITY_STOP,
    CAPABILITY_JUMP_BACKWARD,
    CAPABILITY_JUMP_FORWARD,
    CAPABILITY_SKIP,
} from 'react-native-track-player'

import AppStartingPoint from './controller/AppStartingPoint'
import {Loader} from './components'

const AppContext = createContext({
    showLoading: false,
    setShowLoading: (_value: boolean) => {},
    toggleLoader: () => {},
})
const MainApp = () => {
    const [showLoading, setShowLoading] = useState(false)

    const toggleLoader = () => setShowLoading(show => !show)
    const setLoading = (value: boolean) => setShowLoading(value)

    const loaderValues = {
        showLoading: showLoading,
        setShowLoading: setLoading,
        toggleLoader,
    }

    useEffect(() => {
        TrackPlayer.updateOptions({
            stopWithApp: false,
            icon: require('./assets/images/sobyte_logo_white.png'),
            jumpInterval: 5,
            color: 50,
            capabilities: [
                CAPABILITY_PLAY,
                CAPABILITY_PAUSE,
                CAPABILITY_STOP,
                CAPABILITY_SKIP,
                CAPABILITY_JUMP_BACKWARD,
                CAPABILITY_JUMP_FORWARD,
            ],
            notificationCapabilities: [
                CAPABILITY_PLAY,
                CAPABILITY_PAUSE,
                CAPABILITY_STOP,
                CAPABILITY_JUMP_BACKWARD,
                CAPABILITY_JUMP_FORWARD,
            ],
            compactCapabilities: [
                CAPABILITY_PLAY,
                CAPABILITY_PAUSE,
                CAPABILITY_STOP,
                CAPABILITY_JUMP_BACKWARD,
                CAPABILITY_JUMP_FORWARD,
            ],
            alwaysPauseOnInterruption: true,
        })

        TrackPlayer.registerPlaybackService(() => {
            return require('./api/playerServices')
        })

        TrackPlayer.setupPlayer({
            minBuffer: 60 * 1, // 1 minutes buffer time will be the minimum buffer at once
            maxBuffer: 60 * 4, // 4 minutes buffer time will be the maximum buffer at once
            backBuffer: 60 * 4, // 4 minutes buffer time from the current position of track
            playBuffer: 1, // 1 second is the buffer duration or loaded track duration after which the track will be played
            maxCacheSize: 1024 * 1, // 1 MB max cache size
            waitForBuffer: false,
        }).then(async () => {})
    }, [])

    return (
        <AppContext.Provider value={loaderValues}>
            <StatusBar backgroundColor={'#0E003E'} barStyle="light-content" />
            <LoaderRendererHelper />

            <AppStartingPoint />
        </AppContext.Provider>
    )
}

const LoaderRendererHelper = () => {
    const {showLoading} = useApp()
    return showLoading ? <Loader /> : null
}

export default MainApp
export const useApp = () => useContext(AppContext)
