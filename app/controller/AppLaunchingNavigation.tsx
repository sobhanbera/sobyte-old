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
import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import AuthenticationNavigation from './Authentication'
import AppInsideNavigation from './AppInsideNavigation'

import {FullScreenLoading} from '../components'
import {USER_DATA_STORAGE_KEY} from '../constants'
import {AppUserData} from '../interfaces'

const UserDataContext = React.createContext<AppUserData>({
    uid: 0,
    email: '',
    username: '',
    profile_image: null,
    phone: null,
    gender: '',
    account_type: '',
    account_type_upto: new Date(),
    created_on: new Date(),
    created_ip: '',
    last_login_on: new Date(),
    last_login_ip: '',
    last_updated_on: new Date(),
    last_updated_ip: '',
    disabled: 0,
    verified_account: 0,
    verified_email: 0,
    access_token: '',
})
interface Props {}
const AppLaunchingNavigation = (_props: Props) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<AppUserData>()

    /**
     * user verification that the user data exists or not
     * if the data exists the user should get access to the application's main
     * navigation else the user should be shown the main authentication navigation...
     */

    function loadUserData() {
        AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
            .then(res => {
                const localUserData: AppUserData = JSON.parse(
                    JSON.stringify(res),
                )
                /**
                 * if no user data is saved locally
                 * it means no user is logged in
                 * we will render the authentication navigator
                 */
                if (!res || !localUserData) {
                    console.log('NO USER DATA FOUND')
                    // user is not logged in...
                    setUserLoggedIn(false)
                    setLoading(false)
                    SplashScreen.hide()
                } else if (localUserData) {
                    /**
                     * if some user data if found saved locally
                     * we could think of showing the main app navigator upto some extent
                     * first we will check wheather the user data contains a valid userID, email address, username, etc..
                     * if this check passed we could continue to show the app's main navigator
                     * or else we will think the user has clear the data or cache of the application and due to some error the full
                     * data could not be removed...
                     */
                    if (localUserData.uid && localUserData.uid > 0) {
                        console.log('USER DATA FOUND')
                        // user is logged in...
                        // update last login and many more...
                        setUserData(localUserData)
                        setUserLoggedIn(true)
                        setLoading(false)
                        SplashScreen.hide()
                    } else {
                        console.log('USER DATA FOUND BUT NOT ENOUGH')
                        // user is not logged in...
                        setUserLoggedIn(false)
                        setLoading(false)
                        SplashScreen.hide()
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
                SplashScreen.hide()
            })
    }
    useEffect(() => {
        // loading the user data from async local storage of the android ...
        loadUserData()
    }, [])

    const userDataValues = {
        ...userData,
    }
    return (
        <NavigationContainer theme={DarkTheme}>
            <UserDataContext.Provider value={userDataValues}>
                {!userLoggedIn ? (
                    <AuthenticationNavigation />
                ) : (
                    <AppInsideNavigation />
                )}
            </UserDataContext.Provider>
            <FullScreenLoading visible={loading} />
        </NavigationContainer>
    )
}

export default AppLaunchingNavigation
export const useUserData = () => React.useContext(UserDataContext)
export {UserDataContext}
