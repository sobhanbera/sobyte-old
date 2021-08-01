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
function AppStartingPoint(props: ContextAPIsRendererProps) {
    return (
        <AppMainBackendApi>
            <MusicApi>
                <MusicFetcher>
                    <ThemeProvider>
                        <SettingsProvider>
                            <Player>
                                <Prompt>
                                    <AppLaunchingNavigation />
                                </Prompt>
                            </Player>
                        </SettingsProvider>
                    </ThemeProvider>
                </MusicFetcher>
            </MusicApi>
        </AppMainBackendApi>
    )
}

export default AppStartingPoint
