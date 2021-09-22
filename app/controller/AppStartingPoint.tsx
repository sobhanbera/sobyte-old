import React from 'react'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

import AppMainBackendApi from '../backend'
import MusicApi from '../api'
import MusicFetcher from '../api/MusicFetcher'
import ThemeProvider from '../themes/ThemeProvider'
import SettingsProvider from '../context/Settings'
import Player from '../api/PlayerControls'

import AppLaunchingNavigation from './AppLaunchingNavigation'
import globalStyles from '../styles/global.styles'

/**
 * application's main context api component renderer
 * or the app's main store/state
 */
interface ContextAPIsRendererProps {
    children?: React.ReactChild
}
function AppStartingPoint(_props: ContextAPIsRendererProps) {
    {
        /* we need backend api everywhere so it is the parent context api */
    }
    return (
        <AppMainBackendApi>
            <MusicApi>
                <MusicFetcher>
                    <ThemeProvider>
                        <SettingsProvider>
                            <Player>
                                <SafeAreaProvider>
                                    <SafeAreaView style={globalStyles.flex}>
                                        <AppLaunchingNavigation />
                                    </SafeAreaView>
                                </SafeAreaProvider>
                            </Player>
                        </SettingsProvider>
                    </ThemeProvider>
                </MusicFetcher>
            </MusicApi>
        </AppMainBackendApi>
    )
}

export default AppStartingPoint
