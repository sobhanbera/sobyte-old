import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Intro from '../screens/authentication/Intro'
import Login from '../screens/authentication/Login'
import Register from '../screens/authentication/Register'
import ForgotPassword from '../screens/authentication/ForgotPassword'
import Help from '../screens/authentication/Help'

const AuthenticationNavigator = createStackNavigator()
const AuthenticationNavigation = () => {
    return (
        <AuthenticationNavigator.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthenticationNavigator.Screen name="Intro" component={Intro} />
            <AuthenticationNavigator.Screen name="Login" component={Login} />
            <AuthenticationNavigator.Screen
                name="Register"
                component={Register}
            />
            <AuthenticationNavigator.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />
            <AuthenticationNavigator.Screen name="Help" component={Help} />
        </AuthenticationNavigator.Navigator>
    )
}

export default AuthenticationNavigation
