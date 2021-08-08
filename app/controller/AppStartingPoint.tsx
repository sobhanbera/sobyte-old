import React from 'react'

import AppMainBackendApi from '../backend'
import MusicApi from '../api'
import MusicFetcher from '../api/MusicFetcher'
import ThemeProvider from '../themes/ThemeProvider'
import SettingsProvider from '../context/Settings'
import Player from '../api/PlayerControls'
import {Prompt} from '../components'

import AppLaunchingNavigation from './AppLaunchingNavigation'

/**
 * application's main context api component renderer
 * or the app's main store/state
 */
interface ContextAPIsRendererProps {
    children?: React.ReactChild
}
function AppStartingPoint(_props: ContextAPIsRendererProps) {
    return (
        // we need prompt in music fetcher context api
        <Prompt>
            {/* we need backend api everywhere so it is the next parent context api */}
            <AppMainBackendApi>
                <MusicApi>
                    <MusicFetcher>
                        <ThemeProvider>
                            <SettingsProvider>
                                <Player>
                                    <AppLaunchingNavigation />
                                </Player>
                            </SettingsProvider>
                        </ThemeProvider>
                    </MusicFetcher>
                </MusicApi>
            </AppMainBackendApi>
        </Prompt>
    )
}

export default AppStartingPoint
