import React from 'react'
import axios, {AxiosRequestConfig} from 'axios'

import MAIN_API_ENDPOINT from '../../app/constants/endPoints'
import {APP_BACKEND_API_KEY} from '../../app/constants'

type ApiRequestType =
    | 'all'
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head'
const AppMainBackendApiContext = React.createContext({
    makeApiRequestPOST: (
        _endpoint: string,
        _dataToPost: any,
        _apiConfigs: AxiosRequestConfig,
    ) => {},
})
interface Props {
    children: React.ReactNode
}
const AppMainBackendApi = (props: Props) => {
    const defaultApiBody = {
        key: APP_BACKEND_API_KEY,
        ip: '',
    }
    let backendApiClient = axios.create({
        baseURL: MAIN_API_ENDPOINT,
        headers: {
            'content-type': 'application/json',
        },
        withCredentials: true,
    })

    function makeApiRequestPOST(
        endpoint: string,
        dataToPost: any,
        _apiConfigs: AxiosRequestConfig,
    ) {
        backendApiClient.post(
            endpoint,
            {
                ...dataToPost,
            },
            _apiConfigs,
        )
    }

    const appMainBackendApiContextValues = {
        makeApiRequestPOST: makeApiRequestPOST,
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
