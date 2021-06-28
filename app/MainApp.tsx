import React, {createContext, useContext, useEffect, useState} from 'react'
import {StatusBar} from 'react-native'

import TrackPlayer, {
    CAPABILITY_PLAY,
    CAPABILITY_PAUSE,
    CAPABILITY_STOP,
    CAPABILITY_JUMP_BACKWARD,
    CAPABILITY_JUMP_FORWARD,
    CAPABILITY_SKIP,
    CAPABILITY_SKIP_TO_NEXT,
    CAPABILITY_SKIP_TO_PREVIOUS,
} from 'react-native-track-player'

import AppStartingPoint from './controller/AppStartingPoint'
import {Loader} from './components'

const AppContext = createContext({
    showLoading: null,
    setShowLoading: (value: boolean) => null,
    toggleLoader: () => null,
})
const MainApp = () => {
    const [showLoading, setShowLoading] = useState(false)

    const toggleLoader = () => setShowLoading(show => !show)

    const loaderValues = {
        showLoading,
        setShowLoading,
        toggleLoader,
    }

    useEffect(() => {
        TrackPlayer.updateOptions({
            stopWithApp: false,
            icon: require('./assets/images/sobyte_logo_white.png'),
            jumpInterval: 5,
            // color: 1,
            capabilities: [
                CAPABILITY_PLAY,
                CAPABILITY_PAUSE,
                CAPABILITY_STOP,
                CAPABILITY_SKIP,
                CAPABILITY_SKIP_TO_NEXT,
                CAPABILITY_SKIP_TO_PREVIOUS,
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
                // CAPABILITY_SKIP,
                // CAPABILITY_SKIP_TO_NEXT,
                // CAPABILITY_SKIP_TO_PREVIOUS,
                CAPABILITY_JUMP_BACKWARD,
                CAPABILITY_JUMP_FORWARD,
            ],
        })

        TrackPlayer.registerPlaybackService(() => {
            return require('./api/playerServices')
        })

        TrackPlayer.setupPlayer({}).then(async () => {})
    }, [])

    return (
        <AppContext.Provider value={loaderValues}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
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
