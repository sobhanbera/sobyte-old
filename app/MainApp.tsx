import React, {createContext, useContext, useState} from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import AppStartingPoint from './controller/AppStartingPoint'
import ThemeProvider from './themes/ThemeProvider'
import {Loader} from './components'

const LoaderContext = createContext({
    showLoading: null,
    setShowLoading: (value: boolean) => null,
    toggleLoader: () => null,
})
const MainApp = () => {
    const [showLoading, setShowLoading] = useState(false)

    function setLoader(value: boolean) {
        setShowLoading(value)
    }

    function toggleLoader() {
        setShowLoading(show => !show)
    }

    const loaderValues = {
        showLoading,
        setShowLoading: setLoader,
        toggleLoader,
    }

    return (
        <ThemeProvider>
            <NavigationContainer>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <AppStartingPoint />

                <LoaderContext.Provider value={loaderValues}>
                    {showLoading && <Loader />}
                </LoaderContext.Provider>
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default MainApp
export const useLoader = () => useContext(LoaderContext)
