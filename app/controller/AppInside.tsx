import React from 'react'
import {StyleSheet, View} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {DarkTheme} from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {usePlayer} from '../context'

import Explore from '../screens/main/Explore'
import MusicPlayer from '../screens/main/MusicPlayer'
import {useTheme} from '../context'

import {Scaler} from '../components'
import ProfileStackNavigator from './ProfileStack'

const BarNavigator = createMaterialBottomTabNavigator()
const AuthenticationNavigation = () => {
    const {themeColors} = useTheme()
    const {playing} = usePlayer()

    return (
        <BarNavigator.Navigator
            labeled={true}
            theme={DarkTheme}
            activeColor={themeColors.secondary.main[0]}
            inactiveColor={themeColors.primary.light[0]}
            sceneAnimationEnabled
            backBehavior="history"
            shifting
            barStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                // height: 54,
                elevation: 0,
                margin: 0,
                padding: 0,
                backgroundColor: 'transparent',
            }}
            initialRouteName="MusicPlayer">
            <BarNavigator.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarAccessibilityLabel: 'Explore Tab',
                    tabBarColor: themeColors.surface[0],
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={focused ? 'md-search' : 'md-search-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            {/* PLAYER SCREEN WHERE ALL THE SONGS PLAYING INTERFACE EXISTS */}
            <BarNavigator.Screen
                name="MusicPlayer"
                component={MusicPlayer}
                options={{
                    tabBarAccessibilityLabel: 'Music Player Tab',
                    tabBarColor: themeColors.primary.main[0] + '00',
                    tabBarLabel: 'Music',
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={
                                focused
                                    ? playing
                                        ? 'pause'
                                        : 'play'
                                    : playing
                                    ? 'pause-outline'
                                    : 'play-outline'
                            }
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            <BarNavigator.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarAccessibilityLabel: 'Profile Tab',
                    tabBarColor: themeColors.surface[0],
                    tabBarLabel: 'Me',
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
        </BarNavigator.Navigator>
    )
}

interface FloatingTabBarIconProps {
    backgroundColor: string
    children?: React.ReactNode
    onPress?: Function
}
const FloatingTabBarIcon = ({
    onPress,
    backgroundColor,
    children,
}: FloatingTabBarIconProps) => {
    return (
        <View style={styles.floatingIconContainer}>
            <Scaler touchableOpacity={1} onPress={onPress}>
                <View
                    style={[
                        styles.floatingIconContainerWrapper,
                        {backgroundColor: backgroundColor},
                    ]}>
                    {children}
                </View>
            </Scaler>
        </View>
    )
}

interface SimpleTabBarComponentProps {
    icon: React.ReactNode
    title: string
    focused: boolean
    focusedColor: string
    grey: string
    showTitle?: boolean
}
const SimpleTabBarComponent = (props: SimpleTabBarComponentProps) => {
    return <View style={styles.iconContainer}>{props.icon}</View>
}

const styles = StyleSheet.create({
    floatingIconContainer: {
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingIconContainerWrapper: {
        width: 70,
        height: 70,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default AuthenticationNavigation
