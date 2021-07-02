import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Explore from '../../screens/main/Explore/Explore'
import SearchResult from '../../screens/main/Explore/SearchResult'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="explore">
            <ProfileStack.Screen name="explore" component={Explore} />
            <ProfileStack.Screen name="search" component={SearchResult} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
