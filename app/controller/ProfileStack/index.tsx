import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {
    PROFILE_STACK__MAIN_PROFILE_SCREEN,
    PROFILE_STACK__SETTINGS_SCREEN,
    PROFILE_STACK__LANGUAGE_PICKER_SCREEN,
    PROFILE_STACK__SETTINGS_UPDATER_SCREEN,
    PROFILE_STACK__UPDATE_PROFILE_SCREEN,
    PROFILE_STACK__UPDATE_SOCIAL_MEDIA_LINKS_SCREEN,
} from '../../constants/screens'
import Profile from '../../screens/main/Profile/Profile'
import Setting from '../../screens/main/Profile/Setting'
import SettingsUpdater from '../../screens/main/Profile/SettingsUpdater'
import LanguagePicker from '../../screens/main/Profile/LanguagePicker'
import UpdateProfile from '../../screens/main/Profile/UpdateProfile'
import UpdateSocialMediaLinks from '../../screens/main/Profile/UpdateSocialMediaLinks'

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
            initialRouteName={PROFILE_STACK__MAIN_PROFILE_SCREEN}
        >
            <ProfileStack.Screen
                name={PROFILE_STACK__MAIN_PROFILE_SCREEN}
                component={Profile}
            />
            <ProfileStack.Screen
                name={PROFILE_STACK__SETTINGS_SCREEN}
                component={Setting}
            />
            <ProfileStack.Screen
                name={PROFILE_STACK__LANGUAGE_PICKER_SCREEN}
                component={LanguagePicker}
            />
            <ProfileStack.Screen
                name={PROFILE_STACK__SETTINGS_UPDATER_SCREEN}
                component={SettingsUpdater}
            />
            <ProfileStack.Screen
                name={PROFILE_STACK__UPDATE_PROFILE_SCREEN}
                component={UpdateProfile}
            />
            <ProfileStack.Screen
                name={PROFILE_STACK__UPDATE_SOCIAL_MEDIA_LINKS_SCREEN}
                component={UpdateSocialMediaLinks}
            />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
