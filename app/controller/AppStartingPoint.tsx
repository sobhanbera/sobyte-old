import React, {useState} from 'react'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'

import Player from '../api/PlayerControls'
import MusicApi from '../api'
import ThemeProvider from '../themes/ThemeProvider'
import MusicFetcher from '../api/MusicFetcher'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

import {FullScreenLoading, Prompt} from '../components'
import SettingsProvider from '../context/Settings'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <MusicApi>
            <MusicFetcher>
                <ThemeProvider>
                    <SettingsProvider>
                        <Player>
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
                        </Player>
                    </SettingsProvider>
                </ThemeProvider>
            </MusicFetcher>
        </MusicApi>
    )
}

export default AppStartingPoint
