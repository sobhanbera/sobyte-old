import React from 'react'
import {SafeAreaView, StatusBar, Text} from 'react-native'

import MainApp from './app/MainApp'

const App = () => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <MainApp />
        </SafeAreaView>
    )
}

export default App
