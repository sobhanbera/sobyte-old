import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from 'app/screens/Home'

const AppStackNavigator = createStackNavigator()
const MainAppNavigationStartingPoint = () => {
    return (
        <AppStackNavigator.Navigator>
            <AppStackNavigator.Screen name="Home" component={Home} />
        </AppStackNavigator.Navigator>
    )
}

const InternationalizationWrapper = ({t}) => {
    return <MainAppNavigationStartingPoint />
}

export default MainAppNavigationStartingPoint
