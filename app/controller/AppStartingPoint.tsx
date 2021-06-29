import React, {useState} from 'react'
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native'

import Player from '../api/PlayerControls'
import MusicApi from '../api'
import ThemeProvider from '../themes/ThemeProvider'
import MusicFetcher from '../api/MusicFetcher'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

import {FullScreenLoading, Prompt} from '../components'
import SettingsProvider from '../context/Settings'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState(false)

    return (
        <SettingsProvider>
            <ThemeProvider>
                <Player>
                    <MusicApi>
                        <MusicFetcher>
                            <Prompt>
                                <NavigationContainer theme={DarkTheme}>
                                    {!userLoggedIn ? (
                                        <AuthenticationNavigation />
                                    ) : (
                                        <AppNavigation />
                                    )}

                                    <FullScreenLoading visible={loading} />
                                </NavigationContainer>
                            </Prompt>
                        </MusicFetcher>
                    </MusicApi>
                </Player>
            </ThemeProvider>
        </SettingsProvider>
    )
}

export default AppStartingPoint
