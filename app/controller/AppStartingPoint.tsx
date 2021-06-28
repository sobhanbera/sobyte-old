import React, {useEffect, useState} from 'react'
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native'

import Player from '../api/PlayerControls'
import MusicApi from '../api'
import ThemeProvider from '../themes/ThemeProvider'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

import {FullScreenLoading} from '../components'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <Player>
            <MusicApi>
                <ThemeProvider>
                    <NavigationContainer theme={DarkTheme}>
                        {!userLoggedIn ? (
                            <AuthenticationNavigation />
                        ) : (
                            <AppNavigation />
                        )}

                        <FullScreenLoading visible={loading} />
                    </NavigationContainer>
                </ThemeProvider>
            </MusicApi>
        </Player>
    )
}

export default AppStartingPoint
