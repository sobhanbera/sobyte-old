import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Animated,
} from 'react-native'
import {Text} from 'react-native-paper'
import {BlurView} from '@react-native-community/blur'

import {
    DEFAULT_IMAGE_BLUR,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    HEADER_MIN_HEIGHT,
} from '../../constants'
import {useTheme, useUserData} from '../../context'
import {PROFILE_STACK__SETTINGS_SCREEN} from '../../constants/screens'
// import {formatNames} from '../../utils'

const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground)
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
const HEADER_HEIGHT_EXPANDED = 90
const HEADER_HEIGHT_NARROWED =
    DEVICE_STATUSBAR_HEIGHT_CONSTANT + HEADER_MIN_HEIGHT

interface Props {
    scrollY: Animated.Value

    navigation: any
}
const HeaderProfile = (props: Props) => {
    const {themecolorrevert, themecolor} = useTheme().themeColors
    const {username} = useUserData().data

    return (
        <>
            {/* settign icon to navigate to settings screen */}
            <View style={styles.headerIcon}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        props.navigation.navigate(
                            PROFILE_STACK__SETTINGS_SCREEN,
                        )
                    }}>
                    {/* the actual setting icon in form of an image */}
                    <Image
                        style={{
                            width: 23,
                            height: 23,
                            margin: 8,
                        }}
                        source={require('../../assets/images/icons/setting.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* the animated username area */}
            <Animated.View
                style={[
                    styles.headerAnimatedArea,
                    {
                        // opacity animated as user scrolls down..
                        opacity: props.scrollY.interpolate({
                            inputRange: [150, 180],
                            outputRange: [0, 1],
                        }),
                    },
                ]}>
                <Image
                    source={{
                        uri: 'https://avatars.githubusercontent.com/u/50291544?v=4',
                    }}
                    style={[
                        styles.headerProfileImage,
                        {borderColor: themecolor[0]},
                    ]}
                />
                <View style={styles.headerAnimatedInnerArea}>
                    {/* <Text
                        style={[
                            styles.headerFullname,
                            {color: themecolorrevert[0]},
                        ]}
                        numberOfLines={1}>
                        {fullname}
                    </Text> */}

                    <Text
                        style={[
                            styles.headerUsername,
                            {color: themecolorrevert[0]},
                        ]}
                        numberOfLines={1}>
                        {/* @{formatNames(username)} */}
                        {username}
                    </Text>
                </View>
            </Animated.View>

            <AnimatedImageBackground
                source={{
                    uri: 'https://fast-cdn.dynamicwallpaper.club/wallpapers%2Fci7xe3twgfv%2Fthumbs%2F800%2F1.jpg?generation=1564525549295848&alt=media',
                }}
                style={[
                    styles.headerBackgroundImage,
                    {
                        transform: [
                            {
                                scale: props.scrollY.interpolate({
                                    inputRange: [-200, 0],
                                    outputRange: [5, 1],
                                    extrapolateLeft: 'extend',
                                    extrapolateRight: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}>
                <AnimatedBlurView
                    blurType="dark"
                    blurAmount={DEFAULT_IMAGE_BLUR}
                    style={[
                        styles.headerBlurView,
                        {
                            opacity: props.scrollY.interpolate({
                                inputRange: [-90, 0, 90, 140],
                                outputRange: [1, 0, 0, 1],
                            }),
                        },
                    ]}
                />
            </AnimatedImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        width: '100%',
        height: '100%',
        // height: 55,
    },
    headerBackgroundImage: {
        height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    headerBlurView: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2,
        width: '100%',
        height: '100%',
    },
    headerProfileImage: {
        width: 38,
        height: 38,
        borderRadius: 100,
        borderWidth: 1,
        marginHorizontal: 10,
    },
    headerIcon: {
        width: 30,
        height: 30,
        zIndex: 2,
        position: 'absolute',
        top: DEVICE_STATUSBAR_HEIGHT_CONSTANT + 10,
        right: 20, // shift towards right side of the absolute screen
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAnimatedArea: {
        maxWidth: 250,
        zIndex: 2,
        position: 'absolute',
        top: DEVICE_STATUSBAR_HEIGHT_CONSTANT + 6,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15, // so that some space all around
    },
    headerAnimatedInnerArea: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerFullname: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -3,
    },
    headerUsername: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        width: 23,
        height: 23,
        margin: 8,
    },
})

export default HeaderProfile
