import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Entypo from 'react-native-vector-icons/Entypo'

import Explore from '../../screens/main/Explore/Explore'
import SearchResult from '../../screens/main/Explore/SearchResult'
import SongCategory from '../../screens/main/Explore/SongCategory'
import { ARTIST_DETAILS_SCREEN } from '../../constants'
import ArtistDetail from '../../screens/main/common/ArtistDetail'

const ProfileStack = createStackNavigator()
interface Props {}
const ProfileStackNavigator = (props: Props) => {
    console.log("TEST", props)
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
            <ProfileStack.Screen
                name="songcategory"
                component={SongCategory}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: '#FFFFFF',
                    headerBackImage: () => (
                        <Entypo
                            name="chevron-thin-left"
                            color={'white'}
                            size={20}
                        />
                    ),
                }}
            />
            {/* this screen must be the same constant or many parts of the app may break when launching this screen */}
            <ProfileStack.Screen name={ARTIST_DETAILS_SCREEN} component={ArtistDetail} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
