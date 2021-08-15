import React from 'react'
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    Easing,
    Animated,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import MarqueeText from 'react-native-text-ticker'

import {useTheme} from '../../context'
import {DoubleTap, TrackProgress, TrackButtonControls} from '../../components'
import {
    DEFAULT_HIGH_IMAGE_SIZE,
    DEFAULT_HIGH_IMAGE_QUALITY,
    FontUbuntuBold,
    MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION,
} from '../../constants'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
    capitalizeWords,
    formatTrackTitle,
} from '../../utils'
import {SongObject} from '../../interfaces'
import Scaler from '../Scaler'

const IMAGE_BLUR_RADIUS = 25
const {width, height} = Dimensions.get('window')

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)
interface SongView {
    song: SongObject
    likeIsMusic: Function
}
const MusicPlayerSongView = ({song, likeIsMusic}: SongView) => {
    const {themeColors} = useTheme()
    const averageQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        '120',
        50,
    )
    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        DEFAULT_HIGH_IMAGE_SIZE,
        DEFAULT_HIGH_IMAGE_QUALITY,
    )
    const artists = formatArtists(song.artist)

    const animatedValue = new Animated.Value(0)
    const handleAnimation = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 0.5,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: -0.5,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 0.0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start()
    }

    return (
        <DoubleTap onDoubleTap={likeIsMusic}>
            <Animated.View
                style={{
                    transform: [
                        {
                            rotate: animatedValue.interpolate({
                                inputRange: [-1, 1],
                                outputRange: ['-0.1rad', '0.1rad'],
                            }),
                        },
                    ],
                }}>
                <ImageBackground
                    // loadingIndicatorSource={{
                    // uri: highQualityImage,
                    // cache: 'force-cache',
                    // scale: 1,
                    // }}
                    source={{
                        uri: averageQualityImage,
                        // cache: 'force-cache',
                        // scale: 1,
                    }}
                    fadeDuration={500}
                    style={{
                        flex: 1,
                        width,
                        height: height,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        paddingBottom: 20, // the main bottom tab bar navigation height is overlping the children component so providing a padding bottom of 15~25
                    }}
                    blurRadius={IMAGE_BLUR_RADIUS}>
                    <View
                        style={{
                            width: '75%',
                            alignSelf: 'flex-start',
                            marginHorizontal: 20,
                        }}>
                        <MarqueeText
                            style={{
                                fontSize: 25,
                                fontFamily: FontUbuntuBold,
                                color: 'white',
                                textAlign: 'left',
                                width: '100%',
                                alignSelf: 'flex-start',
                                paddingVertical: 3,
                                paddingHorizontal: 5,
                            }}
                            loop
                            scroll
                            useNativeDriver
                            duration={
                                MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION
                            }
                            bounceSpeed={1}
                            scrollSpeed={1}
                            animationType="scroll"
                            marqueeDelay={1000}>
                            {formatTrackTitle(song.name)}
                        </MarqueeText>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'white',
                                paddingVertical: 1,
                                paddingHorizontal: 5,
                            }}>
                            {capitalizeWords(artists)}
                        </Text>
                    </View>

                    <Scaler
                        onPress={() => {
                            handleAnimation()
                        }}>
                        <FastImage
                            source={{
                                uri: highQualityImage,
                                // priority: 'high',
                                // cache: 'web',
                            }}
                            style={{
                                width: 260,
                                height: 260,
                                borderRadius: 5,
                                marginVertical: 20,
                            }}
                        />
                    </Scaler>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            // backgroundColor: themeColors.themecolor[0] + '50',
                        }}>
                        <TrackButtonControls
                            isLiked={false}
                            likeIsMusic={likeIsMusic}
                            color={themeColors.themecolorrevert[0]}
                        />

                        <TrackProgress
                            color={themeColors.themecolorrevert[0]}
                            duration={song.duration}
                        />
                    </View>
                </ImageBackground>
            </Animated.View>
        </DoubleTap>
    )
}
export default MusicPlayerSongView
