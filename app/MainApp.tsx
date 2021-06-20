import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import MainAppNavigationStartingPoint from './controller/MainAppNavigationStartingPoint'
import Home from './screens/Home'

const MainApp = () => {
    return (
        <NavigationContainer>
            <Home />
            {/* <MainAppNavigationStartingPoint /> */}
        </NavigationContainer>
    )
}

export default MainApp
