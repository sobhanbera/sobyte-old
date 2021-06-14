import {Scaler} from './app/components'
import React from 'react'
import {SafeAreaView, StatusBar, Text} from 'react-native'

const App = () => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Scaler>
                <Text
                    style={{
                        color: 'black',
                    }}>
                    s
                </Text>
            </Scaler>
        </SafeAreaView>
    )
}

export default App
