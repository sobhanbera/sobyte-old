import React, {useEffect} from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {DarkTheme} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {useTheme, useMusicApi} from '../context'

import ExploreStackNavigator from './ExploreStack'
import MusicPlayer from '../screens/main/Music/MusicPlayer'
import BareMinimumMusicPlayerUIOnlyForTesting from '../screens/main/Music/BareMinimumMusicPlayerForTestingPurpose'
import ProfileStackNavigator from './ProfileStack'
import {DEFAULT_ICON_SIZE, DEFAULT_SMALL_ICON_SIZE} from '../constants'

const BarNavigator = createMaterialBottomTabNavigator()
const AppInsideNavigationWithMaterialTabBar = () => {
    const {t} = useTranslation()

    const {themeColors} = useTheme()
    const {initMusicApi} = useMusicApi()

    useEffect(() => {
        // if (!loaded || error) {
        //     console.log('Music Api Init...')
        initMusicApi()
        // }
    }, [])

    return (
        <BarNavigator.Navigator
            labeled={true}
            theme={DarkTheme}
            // activeColor={themeColors.white[0]}
            // inactiveColor={themeColors.grey[0]}
            sceneAnimationEnabled={false}
            backBehavior="history"
            shifting={true}
            keyboardHidesNavigationBar={true}
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
            initialRouteName={'MusicPlayer'}>
            <BarNavigator.Screen
                name="Explore"
                component={ExploreStackNavigator}
                options={{
                    tabBarAccessibilityLabel: 'Explore Tab',
                    tabBarColor: themeColors.surface[0] + 'F7',
                    tabBarLabel: t('words:explore'),
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={focused ? 'md-search' : 'md-search-outline'}
                            size={DEFAULT_ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />

            {/* PLAYER SCREEN WHERE ALL THE SONGS PLAYING INTERFACE EXISTS */}
            <BarNavigator.Screen
                name="MusicPlayer"
                component={BareMinimumMusicPlayerUIOnlyForTesting}
                options={{
                    tabBarAccessibilityLabel: 'Music Player Tab',
                    tabBarColor: themeColors.primary.main[0] + '00',
                    tabBarLabel: t('common:appName'),
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={
                                focused
                                    ? 'musical-note'
                                    : 'musical-note-outline'
                            }
                            size={DEFAULT_ICON_SIZE}
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
                    tabBarColor: themeColors.surface[0] + 'F7',
                    tabBarLabel: t('words:profile'),
                    tabBarIcon: ({focused, color}) => (
                        <AntDesign
                            name={focused ? 'star' : 'staro'}
                            size={DEFAULT_SMALL_ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />
        </BarNavigator.Navigator>
    )
}

const BottomTabBarNavigator = createBottomTabNavigator()
export const AppInsideNavigationWithSimpleTabBar = () => {
    const {t} = useTranslation()

    const {themeColors} = useTheme()
    const {initMusicApi} = useMusicApi()

    useEffect(() => {
        // if (!loaded || error) {
        //     console.log('Music Api Init...')
        initMusicApi()
        // }
    }, [])

    return (
        <BottomTabBarNavigator.Navigator
            tabBarOptions={{
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    // height: 54,
                    elevation: 0,
                    margin: 0,
                    padding: 0,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderTopColor: 'transparent',
                    borderTopWidth: 0,
                },
                keyboardHidesTabBar: true,
                activeTintColor: themeColors.white[0],
                inactiveTintColor: themeColors.grey[0],
                // activeBackgroundColor: 'black',
                // inactiveBackgroundColor: 'black',
                showLabel: true,
                adaptive: true,
                allowFontScaling: true,
                tabStyle: {
                    backgroundColor: themeColors.themecolor[0] + 'EA',
                },
            }}
            screenOptions={({}) => ({})}
            lazy={true}
            sceneContainerStyle={
                {
                    // this should be empty always or unwanted things may happen
                }
            }
            backBehavior="history"
            initialRouteName={'MusicPlayer'}>
            <BottomTabBarNavigator.Screen
                name="Explore"
                component={ExploreStackNavigator}
                options={{
                    tabBarAccessibilityLabel: 'Explore Tab',
                    tabBarLabel: t('words:explore'),
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={focused ? 'md-search' : 'md-search-outline'}
                            size={DEFAULT_ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />

            {/* PLAYER SCREEN WHERE ALL THE SONGS PLAYING INTERFACE EXISTS */}
            <BottomTabBarNavigator.Screen
                name="MusicPlayer"
                component={MusicPlayer}
                options={{
                    tabBarAccessibilityLabel: 'Music Player Tab',
                    tabBarLabel: t('common:appName'),
                    tabBarIcon: ({focused, color}) => (
                        <Ionicons
                            name={
                                focused
                                    ? 'musical-note'
                                    : 'musical-note-outline'
                            }
                            size={DEFAULT_ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />

            <BottomTabBarNavigator.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarAccessibilityLabel: 'Profile Tab',
                    tabBarLabel: t('words:profile'),
                    tabBarIcon: ({focused, color}) => (
                        <AntDesign
                            name={focused ? 'star' : 'staro'}
                            size={DEFAULT_SMALL_ICON_SIZE}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTabBarNavigator.Navigator>
    )
}

/**
 * @important_note may be useful in future...
 */
// interface FloatingTabBarIconProps {
//     backgroundColor: string
//     children?: React.ReactNode
//     onPress?: Function
// }
// const FloatingTabBarIcon = ({
//     onPress,
//     backgroundColor,
//     children,
// }: FloatingTabBarIconProps) => {
//     return (
//         <View style={styles.floatingIconContainer}>
//             <Scaler touchableOpacity={1} onPress={onPress}>
//                 <View
//                     style={[
//                         styles.floatingIconContainerWrapper,
//                         {backgroundColor: backgroundColor},
//                     ]}>
//                     {children}
//                 </View>
//             </Scaler>
//         </View>
//     )
// }

// interface SimpleTabBarComponentProps {
//     icon: React.ReactNode
//     title: string
//     focused: boolean
//     focusedColor: string
//     grey: string
//     showTitle?: boolean
// }
// const SimpleTabBarComponent = (props: SimpleTabBarComponentProps) => {
//     return <View style={styles.iconContainer}>{props.icon}</View>
// }

// const styles = StyleSheet.create({
//     floatingIconContainer: {
//         top: -25,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     floatingIconContainerWrapper: {
//         width: 70,
//         height: 70,
//         borderRadius: 1000,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     iconContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// })

export default AppInsideNavigationWithMaterialTabBar
