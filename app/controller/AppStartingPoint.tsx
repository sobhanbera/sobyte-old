import React, {useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    return !userLoggedIn ? <AuthenticationNavigation /> : <AppNavigation />
}

export default AppStartingPoint
