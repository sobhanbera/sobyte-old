import React, {createContext, useContext, useState} from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import AppStartingPoint from './controller/AppStartingPoint'
import ThemeProvider from './themes/ThemeProvider'
import {Loader} from './components'

const AppContext = createContext({
    showLoading: null,
    setShowLoading: (value: boolean) => null,
    toggleLoader: () => null,
})
const MainApp = () => {
    const [showLoading, setShowLoading] = useState(false)

    const toggleLoader = () => setShowLoading(show => !show)

    const loaderValues = {
        showLoading,
        setShowLoading,
        toggleLoader,
    }

    return (
        <AppContext.Provider value={loaderValues}>
            <ThemeProvider>
                <NavigationContainer>
                    <StatusBar
                        backgroundColor="black"
                        barStyle="light-content"
                    />

                    <LoaderRendererHelper />

                    <AppStartingPoint />
                </NavigationContainer>
            </ThemeProvider>
        </AppContext.Provider>
    )
}

const LoaderRendererHelper = () => {
    const {showLoading} = useApp()
    return showLoading ? <Loader /> : null
}

export default MainApp
export const useApp = () => useContext(AppContext)
