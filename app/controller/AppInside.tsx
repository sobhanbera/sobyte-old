import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Intro from '../screens/authentication/Intro'
import Login from '../screens/authentication/Login'
import Register from '../screens/authentication/Register'
import ForgotPassword from '../screens/authentication/ForgotPassword'
import Help from '../screens/authentication/Help'
import MusicApi from '../api'

const AuthenticationNavigator = createStackNavigator()
const AuthenticationNavigation = () => {
    return (
        <MusicApi>
            <AuthenticationNavigator.Navigator>
                <AuthenticationNavigator.Screen
                    name="Intro"
                    component={Intro}
                />
                <AuthenticationNavigator.Screen
                    name="Intro"
                    component={Login}
                />
                <AuthenticationNavigator.Screen
                    name="Intro"
                    component={Register}
                />
                <AuthenticationNavigator.Screen
                    name="Intro"
                    component={ForgotPassword}
                />
                <AuthenticationNavigator.Screen name="Intro" component={Help} />
            </AuthenticationNavigator.Navigator>
        </MusicApi>
    )
}

export default AuthenticationNavigation
