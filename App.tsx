import React from 'react'
import MainApp from './app/MainApp'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const App = () => (
    <SafeAreaProvider>
        <MainApp />
    </SafeAreaProvider>
)

export default App

// console.log(
//     '%cWelcome to sobyte development mode...',
//     'background: black; color: lightblue; padding: 10px; margin: 10px; border-radius: 6px; border: 1px solid grey;',
// )
