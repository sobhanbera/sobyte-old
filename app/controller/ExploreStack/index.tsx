import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Explore from '../../screens/main/Explore/Explore'
import SearchResult from '../../screens/main/Explore/SearchResult'
import SongCategory from '../../screens/main/Explore/SongCategory'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
            initialRouteName="explore">
            <ProfileStack.Screen name="explore" component={Explore} />
            <ProfileStack.Screen name="search" component={SearchResult} />
            <ProfileStack.Screen name="songcategory" component={SongCategory} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
