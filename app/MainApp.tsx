import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import Home from './screens/Home'
import AppStartingPoint from './controller/AppStartingPoint'
import MusicApi from './api'

const MainApp = () => {
    return (
        <NavigationContainer>
            <MusicApi>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <AppStartingPoint />
            </MusicApi>
        </NavigationContainer>
    )
}

export default MainApp
