import React from 'react'
import {Text, View, Dimensions, Animated, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import MarqueeText from 'react-native-text-ticker'

import {useTheme} from '../../context'
import {DoubleTap, TrackProgress, TrackButtonControls} from '../../components'
import {
    DEFAULT_HIGH_IMAGE_SIZE,
    DEFAULT_HIGH_IMAGE_QUALITY,
    FontUbuntuBold,
    MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    MUSIC_PLAYER_BLUR,
    DEFAULT_MUSIC_PLAYER_IMAGE_SIZE,
    APP_LOGO_LINK,
    MARQUEE_SCROLL_SPEED,
    SONG_CARD_PARALLAX_MULTIPLIER,
} from '../../constants'
import {
    formatArtists,
    getHighQualityImageFromLinkWithHeight,
    capitalizeWords,
    formatTrackTitle,
} from '../../utils'
import {SongObject} from '../../interfaces'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)
const AnimatedMarqueeText = Animated.createAnimatedComponent(MarqueeText)

const {width, height} = Dimensions.get('screen')

interface SongView {
    song: SongObject
    index: number
    onLike: Function
    navigation: any
    scrollPos: Animated.Value
}
const MusicPlayerSongView = ({
    song,
    index,
    onLike,
    navigation,
    scrollPos,
}: SongView) => {
    const {themeColors} = useTheme()
    const {thumbnails, name, artist, duration} = song

    const highQualityImage = getHighQualityImageFromLinkWithHeight(
        thumbnails[0].url,
        thumbnails[0].height,
        DEFAULT_HIGH_IMAGE_SIZE,
        DEFAULT_HIGH_IMAGE_QUALITY,
    )
    const title = formatTrackTitle(name)
    const artistsString = capitalizeWords(formatArtists(artist))

    const inputRange = [
        (index - 1) * height,
        index * height,
        (index + 1) * height,
    ]
    const opacity = scrollPos.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0],
    })
    const translateY = scrollPos.interpolate({
        inputRange,
        outputRange: [
            -height * SONG_CARD_PARALLAX_MULTIPLIER,
            0,
            height * SONG_CARD_PARALLAX_MULTIPLIER,
        ],
    })

    return (
        <View>
            <Animated.Image
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        opacity: opacity,
                    },
                ]}
                source={{
                    uri: thumbnails[1].url || APP_LOGO_LINK,
                    // cache: 'force-cache',
                }}
                blurRadius={MUSIC_PLAYER_BLUR}
            />

            <View
                style={{
                    flex: 1,
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingBottom: 20, // the main bottom tab bar navigation height is overlping the children component so providing a padding bottom of 15~25
                    // opacity: 0,
                }}>
                <View
                    style={{
                        width: '85%',
                        alignSelf: 'flex-start',
                        marginHorizontal: 25,
                    }}>
                    <AnimatedMarqueeText
                        style={{
                            fontSize: 25,
                            fontFamily: FontUbuntuBold,
                            color: themeColors.white[0],
                            textAlign: 'left',
                            width: '100%',
                            alignSelf: 'flex-start',
                            paddingVertical: 3,
                        }}
                        loop
                        scroll
                        bounce={false}
                        useNativeDriver
                        scrollSpeed={MARQUEE_SCROLL_SPEED}
                        animationType="auto"
                        repeatSpacer={250}
                        marqueeDelay={1000}>
                        {title}
                    </AnimatedMarqueeText>

                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: FontUbuntuBold,
                            color: themeColors.white[0] + 'AF',
                            paddingVertical: 1,
                            // backgroundColor: '#000000AF', // background is only just for testing purpose
                        }}
                        numberOfLines={1}>
                        {artistsString}
                    </Text>
                </View>

                <View
                    style={{
                        width: DEFAULT_MUSIC_PLAYER_IMAGE_SIZE,
                        height: DEFAULT_MUSIC_PLAYER_IMAGE_SIZE,
                        overflow: 'hidden',
                        alignItems: 'center',

                        borderRadius: 2,
                        marginVertical: 20,
                    }}>
                    <AnimatedFastImage
                        source={{
                            uri: highQualityImage,
                            // priority: 'high',
                            // cache: 'web',
                        }}
                        style={{
                            width: DEFAULT_MUSIC_PLAYER_IMAGE_SIZE,
                            height: DEFAULT_MUSIC_PLAYER_IMAGE_SIZE,
                            transform: [
                                {
                                    translateY,
                                },
                            ],
                        }}
                    />
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        // backgroundColor: themeColors.themecolor[0] + '50',
                    }}>
                    <TrackButtonControls
                        launchLyrics={() =>
                            navigation.navigate('lyrics', {song})
                        }
                        isLiked={false}
                        onLike={onLike}
                        color={themeColors.themecolorrevert[0]}
                    />

                    <TrackProgress
                        color={themeColors.themecolorrevert[0]}
                        duration={duration}
                    />
                </View>
            </View>
        </View>
    )
}
export default MusicPlayerSongView
