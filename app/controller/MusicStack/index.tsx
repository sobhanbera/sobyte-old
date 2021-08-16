import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Music from '../../screens/main/Music/MusicPlayer'
import TestMusic from '../../screens/main/Music/BareMinimumMusicPlayerForTestingPurpose'
import SongsLyricsScreen from '../../screens/main/Music/LyricsRenderer'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="music">
            <ProfileStack.Screen name="music" component={TestMusic} />
            <ProfileStack.Screen name="lyrics" component={SongsLyricsScreen} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
