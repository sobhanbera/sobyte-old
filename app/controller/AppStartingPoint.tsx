import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/Home'

const AppStack = createStackNavigator()
const AppStartingPoint = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={Home} />
            <AppStack.Screen name="Home2" component={Home} />
        </AppStack.Navigator>
    )
}

export default AppStartingPoint
