import React, {useRef} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {Text, TouchableRipple} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {GradientBackground, HeaderProfile} from '../../../components'
import {
    DefaultStatusBarComponent,
    DEFAULT_LARGE_ICON_SIZE,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
    Separator,
} from '../../../constants'
import {useTheme, useUserData} from '../../../context'
import globalStyles from '../../../styles/global.styles'

const HEADER_HEIGHT_EXPANDED = 90
const HEADER_HEIGHT_NARROWED =
    DEVICE_STATUSBAR_HEIGHT_CONSTANT + HEADER_MIN_HEIGHT

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const {themecolor, themecolorrevert, grey} = useTheme().themeColors
    // const {username, fullname} = useUserData().data

    const scrollY = useRef(new Animated.Value(0)).current

    return (
        <View style={globalStyles.flex}>
            {/* the android statusbar */}
            <DefaultStatusBarComponent backgroundColor={'black'} />
            {/* header */}
            <HeaderProfile navigation={props.navigation} scrollY={scrollY} />

            {/* main part of the profile/scrollview */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true},
                )}
                style={styles.scrollView}>
                <View
                    style={[
                        globalStyles.flex,
                        {backgroundColor: themecolor[0], paddingHorizontal: 20},
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        {/* profile avatar */}
                        <Animated.Image
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/50291544?v=4',
                            }}
                            style={[
                                styles.profileImage,
                                {
                                    transform: [
                                        {
                                            scale: scrollY.interpolate({
                                                inputRange: [
                                                    0,
                                                    HEADER_HEIGHT_EXPANDED,
                                                ],
                                                outputRange: [1, 0.6],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        />

                        {/* edit profile custom button */}
                        <TouchableRipple
                            style={[
                                styles.buttons,
                                {
                                    borderColor: grey[0] + '7F',
                                },
                            ]}
                            onPress={() => {
                                console.log('edit profile')
                            }}>
                            <Text
                                style={{
                                    color: themecolorrevert[0] + 'BF',
                                }}>
                                Edit Profile
                            </Text>
                        </TouchableRipple>
                    </View>

                    {/* profile user's fullname */}
                    <Text
                        style={[
                            styles.fullnameText,
                            {
                                color: themecolorrevert[0],
                            },
                        ]}
                        numberOfLines={1}>
                        {/* {fullname} */}
                        Sobhan Bera
                    </Text>

                    {/* profile user's username */}
                    <Text
                        style={[
                            styles.usernameText,
                            {
                                color: grey[0],
                            },
                        ]}
                        numberOfLines={1}>
                        {/* @{username} */}
                        sobhanbera
                    </Text>

                    {/* line separator */}
                    <Separator color={themecolorrevert[0] + '20'} />

                    {/* profile user's description */}
                    <Text
                        style={[
                            styles.descriptionText,
                            {
                                color: themecolorrevert[0] + 'EF',
                            },
                        ]}>
                        Very enthusiastic about open-source development. I am
                        very passionate to learn new things quickly. I am an
                        experienced web developer and an android developer.
                    </Text>

                    {/* line separator */}
                    <Separator color={themecolorrevert[0] + '20'} />

                    <View
                        style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={[
                                styles.descriptionText,
                                {
                                    color: themecolorrevert[0] + 'EF',
                                },
                            ]}>
                            Other accounts:
                        </Text>

                        <MaterialCommunityIcons
                            name="twitter"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                        <MaterialCommunityIcons
                            name="facebook"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                        <MaterialCommunityIcons
                            name="instagram"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                        <MaterialCommunityIcons
                            name="linkedin"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                        <MaterialCommunityIcons
                            name="snapchat"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                        <MaterialCommunityIcons
                            name="github"
                            size={DEFAULT_LARGE_ICON_SIZE}
                            color={themecolorrevert[0] + 'EF'}
                        />
                    </View>

                    {/* line separator */}
                    <Separator color={themecolorrevert[0] + '20'} />

                    <Text style={{fontSize: 35, color: 'white'}}>
                        Other User data like playlists, liked songs, downloaded
                        songs list, queue, history, settings and other types of
                        user related data will go here. Curently to check the
                        scroll behaviour this section is filled with some text
                        with heavy font size. More text more text more text more
                        text more text more text more textmore text more text
                        more textmore text more text more text more text more
                        text more text more text more text more text more text
                        more text more text more text more text more text more
                        text more text
                    </Text>

                    <PaddingBottomView paddingBottom={200} />
                </View>
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginTop: 15,
    },
    fullnameText: {
        fontSize: 22,
        marginBottom: -3,
        fontWeight: 'bold',
        marginTop: 10,
    },
    usernameText: {
        fontSize: 15,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 18, // > than the font size always
    },
    scrollView: {
        zIndex: 3,
        marginTop: HEADER_HEIGHT_NARROWED,
        paddingTop: HEADER_HEIGHT_EXPANDED,
    },
    buttons: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
})

export default Profile
