import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Profile from '../../screens/main/Profile/Profile'
import Setting from '../../screens/main/Profile/Setting'
import SettingsUpdater from '../../screens/main/Profile/SettingsUpdater'
import LanguagePicker from '../../screens/main/Profile/LanguagePicker'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'vertical',
            }}
            initialRouteName="profile">
            <ProfileStack.Screen name="profile" component={Profile} />
            <ProfileStack.Screen name="setting" component={Setting} />
            <ProfileStack.Screen
                name="languagepicker"
                component={LanguagePicker}
            />
            <ProfileStack.Screen
                name="settingsupdater"
                component={SettingsUpdater}
            />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
