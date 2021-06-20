import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/Home'

const AppStackNavigator = createStackNavigator()
const MainAppNavigationStartingPoint = () => {
    return (
        <AppStackNavigator.Navigator>
            <AppStackNavigator.Screen name="Home" component={Home} />
        </AppStackNavigator.Navigator>
    )
}

export default MainAppNavigationStartingPoint
