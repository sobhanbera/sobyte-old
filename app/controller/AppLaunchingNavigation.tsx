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
import {ToastAndroid} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {NavigationContainer, DarkTheme} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import AuthenticationNavigation from './Authentication'
import AppInsideNavigation from './AppInsideNavigation'

import {FullScreenLoading, SobyteAlertBox} from '../components'
import {USER_DATA_STORAGE_KEY} from '../constants'
import {AppUserData} from '../interfaces'
import {useBackendApi} from '../context'
import {UPDATE_LAST_LOGIN_ROUTE_ENDPOINT} from '../constants/endPoints'

type MyFunctionType = (data: string) => any
interface ContextArttributs {
    data: AppUserData
    setLocalUserData: MyFunctionType
    loadUserDataAgain: Function
    logout: Function
}
const UserDataContext = React.createContext<ContextArttributs>({
    data: {
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
    },
    setLocalUserData: (_data: string) => {},
    loadUserDataAgain: () => {},
    logout: () => {},
})
interface Props {}
const AppLaunchingNavigation = (_props: Props) => {
    const {makeApiRequestPOST} = useBackendApi()
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<AppUserData>({})
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    function updateLastLogin(userID: number) {
        /**
         * updating and loading the ip address of the device
         * since many time a error is comming due to which the api request is incomplete
         * and that's because of the IP address not loaded at the initial of the application launch..
         */
        // reloadIP()
        /**
         * now the above statement is automatically done since when any request is
         * made immediately the ip address is loaded and makes the api request then
         */

        /**
         * we will not show any alert/propmt if any error
         * occurred in below api request
         * since this task is optional and not a user controlled task
         * instead automated
         */
        makeApiRequestPOST(UPDATE_LAST_LOGIN_ROUTE_ENDPOINT, {
            uid: userID,
        })
            .then(_res => {
                if (_res.data.code === 'USER_ID_NOT_PROVIDED') {
                    /**
                     * user data may not be stored in the local storage correctly
                     * or the user data is stored correctly but cannot load it during
                     * app launch correctly...
                     */
                } else if (_res.data.code === 'FAILED') {
                    /**
                     * any error occured while making the
                     * query in the backend
                     * no worries
                     */
                } else if (_res.data.code === 'PARTIAL_SUCCESS') {
                    /**
                     * user last login time is updated but cannot get the
                     * latest user data from the database
                     */
                } else if (_res.data.code === 'SUCCESS') {
                    /**
                     * user last login is successfully updated
                     * and got a user data so we should save this data instead of the previous one
                     */
                    AsyncStorage.setItem(
                        USER_DATA_STORAGE_KEY,
                        JSON.stringify(_res.data.data),
                    )
                        .then(_saved => {
                            setUserData(_res.data.data)
                            console.log('LAST LOGIN UPDATED')
                        })
                        .catch(_notSaved => {
                            setUserData(_res.data.data)
                        })
                }
            })
            .catch(_err => {
                /**
                 * cannot update the last login
                 * maybe the user's internet connection is slow
                 * or maybe there is some problem in backend
                 * maybe there is some internal issue
                 */
            })
    }

    /**
     * user verification that the user data exists or not
     * if the data exists the user should get access to the application's main
     * navigation else the user should be shown the main authentication navigation...
     */
    async function loadUserData() {
        setLoading(true)
        await AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
            .then((res: any) => {
                const localUserData: AppUserData = JSON.parse(
                    // JSON.stringify(
                    res,
                    // ),
                )
                /**
                 * if no user data is saved locally
                 * it means no user is logged in
                 * we will render the authentication navigator
                 */
                if (!res || !localUserData) {
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
                        // user is logged in...
                        // update last login and many more...
                        setUserData(localUserData)
                        setUserLoggedIn(true)
                        setLoading(false)

                        // hiding the splash screen after verifying user data is available or not
                        SplashScreen.hide()

                        // since the user data is valid so we can update the last login of the user too...
                        updateLastLogin(localUserData.uid)
                    } else {
                        // user is not logged in...
                        setUserLoggedIn(false)
                        setLoading(false)

                        // hiding the splash screen after verifying user data is available or not
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

                // hiding the splash screen after verifying user data is available or not
                SplashScreen.hide()
            })
    }
    useEffect(() => {
        // loading the user data from async local storage of the android ...
        loadUserData()
    }, [])

    /**
     * this function will help during login or registering user
     * after these tasks when the backend responded with data we will pass that data to this function
     * and save it in local storage
     */
    async function setLocalUserData(data: string) {
        // saving the data to the local storage
        await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, String(data))
            .then(_res => {
                // after saving the data to local storage we need to load the
                // user data and again render the right thing depending on the user data found
                loadUserData()
            })
            .catch(_err => {
                // cannot save the data locally display a error to the user...
                ToastAndroid.show(
                    'Login was successful, but could not save your data. Please try again!!',
                    ToastAndroid.SHORT,
                )
            })
    }

    function logoutCurrentUser() {
        AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify({}))
            .then(_res => {
                loadUserData()
                setShowLogoutConfirm(false)
            })
            .catch(_err => {
                setShowLogoutConfirm(false)
                loadUserData()
            })
    }

    function logout() {
        setShowLogoutConfirm(true)
    }

    const userDataValues = {
        data: userData,
        setLocalUserData: setLocalUserData,
        loadUserDataAgain: loadUserData,
        logout: logout,
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

            {/* logout confirm alert box */}
            <SobyteAlertBox
                setVisibility={setShowLogoutConfirm}
                visible={showLogoutConfirm}
                title="Confirm Logout!!"
                description="Are you sure to logout from your account? This will remove all authentication data and user data from your device. You have to login again to continue with this account."
                activeOpacity={0.5}
                cancelText="No"
                confirmText="Yes"
                onConfirm={() => logoutCurrentUser()}
                cancelBackgroundColor={'blue'}
                confirmBackgroundColor={'transparent'}
            />
            <FullScreenLoading visible={loading} />
        </NavigationContainer>
    )
}

export default AppLaunchingNavigation
export const useUserData = () => React.useContext(UserDataContext)
export {UserDataContext}
