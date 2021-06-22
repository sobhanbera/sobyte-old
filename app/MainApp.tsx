import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import AppStartingPoint from './controller/AppStartingPoint'
import ThemeProvider from './themes/ThemeProvider'

const MainApp = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <AppStartingPoint />
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default MainApp
