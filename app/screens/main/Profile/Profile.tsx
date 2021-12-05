import React, {useRef} from 'react'
import {Animated, Linking, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'

import {
    // GradientBackground,
    HeaderProfile,
    SimpleButton,
    TopicTitle,
} from '../../../components'
import {
    DefaultStatusBarComponent,
    DEFAULT_LARGE_ICON_SIZE,
    DEFAULT_TINY_ICON_SIZE,
    DEVELOPER_DETAILS,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
    Separator,
} from '../../../constants'
import {useTheme, useUserData} from '../../../context'
import globalStyles from '../../../styles/global.styles'
import AppData from '../../../../app.data.details'
import {
    PROFILE_STACK__UPDATE_PROFILE_SCREEN,
    PROFILE_STACK__UPDATE_SOCIAL_MEDIA_LINKS_SCREEN,
} from '../../../constants/screens'
import {
    getFacebookLink,
    getGitHubLink,
    getInstagramLink,
    getLinkedinLink,
    getSnapchatLink,
    getTwitterLink,
    redirectToWebsite,
} from '../../../utils'

const HEADER_HEIGHT_EXPANDED = 90
const HEADER_HEIGHT_NARROWED =
    DEVICE_STATUSBAR_HEIGHT_CONSTANT + HEADER_MIN_HEIGHT

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const {themecolor, themecolorrevert} = useTheme().themeColors
    const {
        username,
        fullname,
        created_on,
        facebook,
        instagram,
        github,
        linkedin,
        snapchat,
        twitter,
    } = useUserData().data
    /**
     * if any of the above links, username, or endpoint contain any string or text than
     * this below variable will be true and if it is true we will change the UI accordingly...
     */
    const anySocialLinkExists: boolean =
        (
            facebook ||
            instagram ||
            github ||
            linkedin ||
            snapchat ||
            twitter ||
            ''
        ).length > 0

    const createdOn = dayjs(created_on).format('MMMM, YYYY').toString()

    const scrollY = useRef(new Animated.Value(0)).current

    const openProfileUpdateScreen = () => {
        props.navigation.navigate(PROFILE_STACK__UPDATE_PROFILE_SCREEN)
    }
    const openProfileSocialMediaLinksUpdateScreen = () => {
        props.navigation.navigate(
            PROFILE_STACK__UPDATE_SOCIAL_MEDIA_LINKS_SCREEN,
        )
    }

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
                        {/* TODO: onPress Function */}
                        <SimpleButton
                            title={'Edit Profile'}
                            onPress={() => openProfileUpdateScreen()}
                        />
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
                        {fullname}
                    </Text>

                    {/* profile user's username */}
                    <Text
                        style={[
                            styles.usernameText,
                            {
                                color: themecolorrevert[0] + 'AF',
                            },
                        ]}
                        numberOfLines={1}>
                        @{username}
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

                    {anySocialLinkExists ? (
                        <View
                            style={{
                                paddingVertical: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            {facebook && (
                                <MaterialCommunityIcons
                                    name="facebook"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(
                                            getFacebookLink(facebook),
                                        )
                                    }
                                />
                            )}
                            {instagram && (
                                <MaterialCommunityIcons
                                    name="instagram"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(
                                            getInstagramLink(instagram),
                                        )
                                    }
                                />
                            )}
                            {github && (
                                <MaterialCommunityIcons
                                    name="github"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(getGitHubLink(github))
                                    }
                                />
                            )}
                            {linkedin && (
                                <MaterialCommunityIcons
                                    name="linkedin"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(
                                            getLinkedinLink(linkedin),
                                        )
                                    }
                                />
                            )}
                            {snapchat && (
                                <MaterialCommunityIcons
                                    name="snapchat"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(
                                            getSnapchatLink(snapchat),
                                        )
                                    }
                                />
                            )}
                            {twitter && (
                                <MaterialCommunityIcons
                                    name="twitter"
                                    size={DEFAULT_LARGE_ICON_SIZE}
                                    color={themecolorrevert[0] + 'EF'}
                                    onPress={() =>
                                        redirectToWebsite(
                                            getTwitterLink(twitter),
                                        )
                                    }
                                />
                            )}
                        </View>
                    ) : null}

                    <SimpleButton
                        title={'Update Social Media Links'}
                        onPress={() =>
                            openProfileSocialMediaLinksUpdateScreen()
                        }
                        style={{
                            paddingVertical: 8,
                        }}
                    />

                    {/* line separator */}
                    <Separator color={themecolorrevert[0] + '20'} />

                    {/* <Text style={{fontSize: 20, color: 'white'}}>
                        Other User data like playlists, liked songs, downloaded
                        songs list, queue, history, settings and other types of
                        user related data will go here. Curently to check the
                        scroll behaviour this section is filled with some text
                        with heavy font size. More text more text more text more
                        text more text more text more textmore text more text
                        more textmore text more text more text more text more
                        text more text more text more text more text more text
                        text more text more text more text more text more text
                        text more text more text more text more text more text
                        text more text more text more text more text more text
                        text more text more text more text more text more text
                        more text more text more text more text more text more
                        text more text
                    </Text> */}

                    {/* line separator */}
                    <Separator color={themecolorrevert[0] + '20'} />

                    <TopicTitle title={`Joined On - ${createdOn}\n`} />

                    <MadeInText />

                    <PaddingBottomView paddingBottom={200} />
                </View>
            </Animated.ScrollView>
        </View>
    )
}

/**
 * this section was somewhat looking meesy in the above main component so I made
 * it as separate component
 * @returns the made in detail of the application
 */
const MadeInText = () => {
    const {themecolorrevert, red, accent} = useTheme().themeColors

    const IndianFlagColors = {
        saffron: '#FF9933',
        white: '#FFFFFF',
        green: '#138808',
        navy_blue: '#000080',
    }
    const IndiaText = [
        {char: 'I', color: IndianFlagColors.saffron},
        {char: 'N', color: IndianFlagColors.saffron},
        {char: 'D', color: IndianFlagColors.white},
        {char: 'I', color: IndianFlagColors.green},
        {char: 'A', color: IndianFlagColors.green},
    ]

    const openDeveloperDetailsWebsite = () => {
        Linking.openURL(DEVELOPER_DETAILS)
    }

    return (
        <Text
            style={{
                letterSpacing: 1,
                color: themecolorrevert[0] + 'DF',
                textAlignVertical: 'center',
                textAlign: 'center',
            }}>
            {'Made with '}
            <MaterialCommunityIcons
                name="heart"
                size={DEFAULT_TINY_ICON_SIZE - 2}
                color={red[0] + 'DF'}
            />
            {' in '}

            {/* new way to render India character */}
            {IndiaText.map((char, _) => (
                <Text
                    key={_}
                    style={{
                        fontWeight: 'bold',
                        color: char.color,
                        letterSpacing: 2,
                    }}>
                    {char.char}
                </Text>
            ))}

            {' by '}
            <Text
                style={[
                    globalStyles.boldText,
                    {
                        color: accent.light[0],
                    },
                ]}
                onPress={() => openDeveloperDetailsWebsite()}>
                {AppData.developerName}
            </Text>
            {'.'}
        </Text>
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
        marginTop: 10,
        fontWeight: 'bold',
    },
    usernameText: {
        fontSize: 15,
        marginBottom: 15,
        fontWeight: 'bold',
        marginTop: 10,
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
        borderWidth: 0.65,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
})

export default Profile

// facebook
// insta
// github
// linkedin
// snapchat
// twitter
// youtube
