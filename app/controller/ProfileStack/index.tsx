import React from 'react'
import {} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Profile from '../../screens/main/Profile/Profile'
import Setting from '../../screens/main/Profile/Setting'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="profile">
            <ProfileStack.Screen name="profile" component={Profile} />
            <ProfileStack.Screen name="setting" component={Setting} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
