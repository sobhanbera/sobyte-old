import React, {useState} from 'react'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'

import AuthenticationNavigation from './Authentication'
import AppInsideNavigation from './AppInsideNavigation'

import {FullScreenLoading} from '../components'

interface Props {}
const AppLaunchingNavigation = (props: Props) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <NavigationContainer theme={DarkTheme}>
            {!userLoggedIn ? (
                <AuthenticationNavigation />
            ) : (
                <AppInsideNavigation />
            )}

            <FullScreenLoading visible={loading} />
        </NavigationContainer>
    )
}

export default AppLaunchingNavigation
