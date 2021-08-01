/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - renders the authentication flow of the application
 */

import React, {useState, useEffect} from 'react'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import AuthenticationNavigation from './Authentication'
import AppInsideNavigation from './AppInsideNavigation'

import {FullScreenLoading} from '../components'
import {USER_DATA_STORAGE_KEY} from '../constants'

interface Props {}
const AppLaunchingNavigation = (props: Props) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * user verification that the user data exists or not
     * if the data exists the user should get access to the application's main
     * navigation else the user should be shown the main authentication navigation...
     */
    useEffect(() => {
        // loading the user data from async local storage of the android ...
        AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
            .then(res => {
                const localUserData = JSON.parse(JSON.stringify(res))
                console.log(localUserData)

                /**
                 * if no user data is saved locally
                 * it means no user is logged in
                 * we will render the authentication navigator
                 */
                if (!res || !localUserData) {
                    // user is not logged in...
                    setUserLoggedIn(false)
                    setLoading(false)
                } else if (localUserData) {
                    /**
                     * if some user data if found saved locally
                     * we could think of showing the main app navigator upto some extent
                     * first we will check wheather the user data contains a valid userID, email address, username, etc..
                     * if this check passed we could continue to show the app's main navigator
                     * or else we will think the user has clear the data or cache of the application and due to some error the full
                     * data could not be removed...
                     */
                    if (localUserData.uid > 0) {
                        // user is logged in...
                        // update last login and many more...
                    } else {
                        // user is not logged in...
                        setUserLoggedIn(false)
                        setLoading(false)
                    }
                }
            })
            .catch(err => {
                console.error(err)
                // we could not load the user data from the local storage or any error occurred in then block
                // logout the user
                // user is not logged in...
                setUserLoggedIn(false)
                setLoading(false)
            })
    }, [])

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
