import React, {useState, useEffect} from 'react'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {getIpAddressSync} from 'react-native-device-info'

import MAIN_API_ENDPOINT from '../constants/endPoints'
import {
    API_AUTHORIZATION_BEARER_TOKEN_PREFIX,
    API_DETAILS_TAG,
    APP_BACKEND_API_KEY,
    IP_ADDRESS_REGEX,
    USER_DATA_STORAGE_KEY,
} from '../constants'
import {AllApiPostBodyArttributes, AppUserData} from '../interfaces/Modals'
import ResponseCodes from '../constants/apiCodes'
import {ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// interface DefaultApiPostBody {
//     key: string
//     ip: string
// }
// type ApiRequestType =
//     | 'all'
//     | 'get'
//     | 'post'
//     | 'put'
//     | 'delete'
//     | 'patch'
//     | 'options'
//     | 'head'

interface RegularResponse extends AxiosResponse {
    data: {
        code: ResponseCodes
        data: any
    }
}
const BareApiResponse: Promise<RegularResponse> = new Promise(
    (_resolve, _reject) => {},
)
const AppMainBackendApiContext = React.createContext({
    /**
     * all kinds of post api request to the main app backend will be done by this function
     * this function takes some arguments those are:
     * @param endpoint the endpoint after the baseurl in which the request must be made like /auth/login, /logout, /login, etc...
     * @param dataToPost this is the payload or exactly the json data which should be posted during posting the api request
     * @param _apiConfigs this is the object which is of type as given (AxiosRequestConfig) this helps the request to be more clear...
     * @returns a promise with the response data from the request made...
     */
    makeApiRequestPOST: (
        _endpoint: string,
        _dataToPost: AllApiPostBodyArttributes,
        _apiConfigs: AxiosRequestConfig = {},
    ) => BareApiResponse,
    /**
     * function which reloads the IP address of the device
     * get the device local IP address and update the state...
     */
    // reloadIP: () => {},

    // ipAddress: '',
    // now the above function and variable is not given from the context since it could also be get from react-native-device-info package...
})
interface Props {
    children: React.ReactNode
}
const AppMainBackendApi = (props: Props) => {
    // const [IP, setIP] = useState<string>('')
    const [accessToken, setAccessToken] = useState<any>('')
    let backendApiClient = axios.create({
        baseURL: MAIN_API_ENDPOINT,
        headers: {
            'content-type': 'application/json',
        },
        withCredentials: true,
    })

    /**
     * function which reloads the IP address of the device
     * get the device local IP address and update the state...
     */
    // function updateIpAddress() {
    //     // getting the device IP address
    //     const deviceIPSynced = getIpAddressSync()
    //     // setting the device IP address...
    //     setIP(deviceIPSynced)
    // }
    /**
     * at the starting of this component or while initiating
     * this component we are loading the device ip address and saving it to the state for
     * later use
     */
    // useEffect(() => {
    // this is the function to load device ip address
    // if (IP.length <= 0 || IP_ADDRESS_REGEX.test(IP) === false)
    //     updateIpAddress()
    /**
     * if the ip is not loaded or the loaded ip
     * is not valid load the IP address of the device again
     */
    // }, [IP])

    function getTheAccessToken() {
        AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
            .then((res: any) => {
                const localUserData: AppUserData = JSON.parse(res)

                /**
                 * if no user data is saved locally
                 * it means no user is logged in
                 * we will render the authentication navigator
                 */
                if (!res || !localUserData) {
                    // user is not logged in...
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
                        setAccessToken(localUserData.access_token)
                    } else {
                        // user is not logged in...
                    }
                }
            })
            .catch(err => {})
    }
    useEffect(() => {
        if (accessToken.length <= 0) getTheAccessToken()
    }, [accessToken])

    /**
     * all kinds of post api request to the main app backend will be done by this function
     * this function takes some arguments those are:
     * @param endpoint the endpoint after the baseurl in which the request must be made like /auth/login, /logout, /login, etc...
     * @param dataToPost this is the payload or exactly the json data which should be posted during posting the api request
     * @param apiConfigs this is the object which is of type as given (AxiosRequestConfig) this helps the request to be more clear...
     * @returns a promise with the response data from the request made...
     */
    function makeApiRequestPOST(
        endpoint: string,
        dataToPost: AllApiPostBodyArttributes,
        apiConfigs: AxiosRequestConfig = {},
    ): Promise<RegularResponse> {
        if (!accessToken) getTheAccessToken()
        // the promise to return ...
        return new Promise((resolve, reject) => {
            // making the api request to the backend...
            // console.log(
            //     'ACCESS_TOKEN WHILE MAKING REQUEST IS ->>>',
            //     accessToken,
            // )

            backendApiClient
                .post(
                    endpoint,
                    {
                        // default values with app api key and IP address
                        key: APP_BACKEND_API_KEY,
                        ip: getIpAddressSync(),
                        ...dataToPost,
                    },
                    {
                        ...apiConfigs,
                        headers: {
                            ...apiConfigs.headers,
                            authorization: `${API_AUTHORIZATION_BEARER_TOKEN_PREFIX} ${accessToken}`,
                        },
                    },
                )
                .then((response: RegularResponse) => {
                    const appDetailsInServer = response.headers[API_DETAILS_TAG]

                    // const {data, status} = response
                    // if the response from the backend is with good status then resolve this promise...
                    if (response.data.code === 'NOT_AUTHORIZED') {
                        ToastAndroid.show(
                            'Please update the app. This version is no longer supported in your device.',
                            ToastAndroid.SHORT,
                        )
                    } else if (response.data.code === 'NOT_AUTHENTICATED') {
                        ToastAndroid.show(
                            'You are not authenticated. So we are logging you out.',
                            ToastAndroid.SHORT,
                        )
                    } else if (response.data.code === 'IP_NOT_AUTHORIZED') {
                        ToastAndroid.show(
                            'Please check your internet connection.',
                            ToastAndroid.SHORT,
                        )
                    }
                    resolve(response)
                })
                .catch(error => {
                    // if (IP.length <= 0) updateIpAddress()
                    // if the api request responded with any error
                    // reject this promise with that error..
                    // console.log(
                    //     'ERRORO WHILE MAKING BACKEND API REQUEST := ',
                    //     error,
                    // )
                    reject(error)
                })
        })
    }

    const appMainBackendApiContextValues = {
        makeApiRequestPOST: makeApiRequestPOST,
        // reloadIP: updateIpAddress,

        // ipAddress: IP,
    }
    return (
        <AppMainBackendApiContext.Provider
            value={appMainBackendApiContextValues}>
            {props.children}
        </AppMainBackendApiContext.Provider>
    )
}

export default AppMainBackendApi
export const useBackendApi = () => React.useContext(AppMainBackendApiContext)
export {AppMainBackendApiContext}
