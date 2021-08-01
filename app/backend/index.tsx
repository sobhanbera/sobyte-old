import React, {useState, useEffect} from 'react'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {getIpAddressSync} from 'react-native-device-info'

import MAIN_API_ENDPOINT from '../constants/endPoints'
import {APP_BACKEND_API_KEY} from '../constants'
import {AllApiPostBodyArttributes} from '../interfaces/Modals'
import ResponseCodes from '../constants/apiCodes'
import {ToastAndroid} from 'react-native'

interface DefaultApiPostBody {
    key: string
    ip: string
}
type ApiRequestType =
    | 'all'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head'

interface RegularResponse extends AxiosResponse {
    data: {
        code: ResponseCodes
        data: any
    }
}
const BareApiResponse: Promise<RegularResponse> = new Promise(
    (resolve, reject) => {},
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
    reloadIP: () => {},

    ipAddress: '',
})
interface Props {
    children: React.ReactNode
}
const AppMainBackendApi = (props: Props) => {
    const [IP, setIP] = useState<string>('')
    const defaultApiBody: DefaultApiPostBody = {
        key: APP_BACKEND_API_KEY,
        ip: IP,
    }
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
    function updateIpAddress() {
        // getting the device IP address
        const deviceIPSynced = getIpAddressSync()
        // setting the device IP address...
        setIP(deviceIPSynced)
    }
    /**
     * at the starting of this component or while initiating
     * this component we are loading the device ip address and saving it to the state for
     * later use
     */
    useEffect(() => {
        // this is the function to load device ip address
        updateIpAddress()
    }, [])

    /**
     * all kinds of post api request to the main app backend will be done by this function
     * this function takes some arguments those are:
     * @param endpoint the endpoint after the baseurl in which the request must be made like /auth/login, /logout, /login, etc...
     * @param dataToPost this is the payload or exactly the json data which should be posted during posting the api request
     * @param _apiConfigs this is the object which is of type as given (AxiosRequestConfig) this helps the request to be more clear...
     * @returns a promise with the response data from the request made...
     */
    function makeApiRequestPOST(
        endpoint: string,
        dataToPost: AllApiPostBodyArttributes,
        _apiConfigs: AxiosRequestConfig = {},
    ): Promise<RegularResponse> {
        // the promise to return ...
        return new Promise((resolve, reject) => {
            // making the api request to the backend...
            backendApiClient
                .post(
                    endpoint,
                    {
                        ...defaultApiBody,
                        ...dataToPost,
                    },
                    _apiConfigs,
                )
                .then((response: RegularResponse) => {
                    // const {data, status} = response
                    // if the response from the backend is with good status then resolve this promise...
                    if (response.data.code === 'NOT_AUTHORIZED') {
                        ToastAndroid.show(
                            'Please update the app. This version is no longer supported in your device',
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
                    console.log(IP)
                    // if the api request responded with any error
                    // reject this promise with that error..
                    reject(error)
                })
        })
    }

    const appMainBackendApiContextValues = {
        makeApiRequestPOST: makeApiRequestPOST,
        reloadIP: updateIpAddress,

        ipAddress: IP,
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
