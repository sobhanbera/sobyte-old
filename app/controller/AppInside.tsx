import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {usePlayer} from '../context'

import Explore from '../screens/main/Explore'
import Player from '../screens/main/Player'
import Profile from '../screens/main/Profile'
import {useTheme} from '../context'

import {Scaler} from '../components'

const BarNavigator = createBottomTabNavigator()
const AuthenticationNavigation = () => {
    const {themeColors} = useTheme()
    const {playing} = usePlayer()

    return (
        <BarNavigator.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    height: 55,
                    backgroundColor: themeColors.primary.dark[0],
                    borderRadius: 0,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                },
            }}>
            <BarNavigator.Screen
                name="Explore"
                component={Explore}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SimpleTabBarComponent
                            icon={
                                <Ionicons
                                    name={
                                        focused
                                            ? 'md-search'
                                            : 'md-search-outline'
                                    }
                                    size={30}
                                    color={
                                        focused
                                            ? themeColors.secondary.main[0]
                                            : themeColors.primary.light[0]
                                    }
                                />
                            }
                            title="Explore"
                            focused={focused}
                            focusedColor={themeColors.secondary.main[0]}
                            grey={themeColors.grey[0]}
                        />
                    ),
                }}
            />

            {/* PLAYER SCREEN WHERE ALL THE SONGS PLAYING INTERFACE EXISTS */}
            <BarNavigator.Screen
                name="Player"
                component={Player}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Ionicons
                            style={{
                                padding: 10,
                                backgroundColor: themeColors.primary.dark[0],
                                borderRadius: 100,
                            }}
                            name={
                                focused
                                    ? playing
                                        ? 'pause'
                                        : 'play'
                                    : playing
                                    ? 'pause-outline'
                                    : 'play-outline'
                            }
                            size={30}
                            color={
                                focused
                                    ? themeColors.secondary.main[0]
                                    : themeColors.primary.light[0]
                            }
                        />
                    ),
                    // tabBarBadge: null,
                    // tabBarButton: props => (
                    //     <FloatingTabBarIcon
                    //         {...props}
                    //         backgroundColor={'#efefef'}
                    //     />
                    // ),
                }}
            />

            <BarNavigator.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <SimpleTabBarComponent
                            icon={
                                <MaterialCommunityIcons
                                    name={
                                        focused ? 'account' : 'account-outline'
                                    }
                                    size={30}
                                    color={
                                        focused
                                            ? themeColors.secondary.main[0]
                                            : themeColors.primary.light[0]
                                    }
                                />
                            }
                            title="Profile"
                            focused={focused}
                            focusedColor={themeColors.secondary.main[0]}
                            grey={themeColors.grey[0]}
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
