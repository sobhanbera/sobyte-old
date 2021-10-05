import React from 'react'
import {Text, View, ImageBackground} from 'react-native'
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
} from '../../constants'
import {
    formatArtists,
    getHighQualityImageFromLinkWithHeight,
    capitalizeWords,
    formatTrackTitle,
} from '../../utils'
import {SongObject} from '../../interfaces'

interface SongView {
    song: SongObject
    likeIsMusic: Function
    navigation: any
}
const MusicPlayerSongView = ({song, likeIsMusic, navigation}: SongView) => {
    const {themeColors} = useTheme()
    const averageQualityImage = getHighQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        '300',
        50,
    )
    const highQualityImage = getHighQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        DEFAULT_HIGH_IMAGE_SIZE,
        DEFAULT_HIGH_IMAGE_QUALITY,
    )
    const title = formatTrackTitle(song.name)
    const artistsString = capitalizeWords(formatArtists(song.artist))

    return (
        <DoubleTap onDoubleTap={likeIsMusic}>
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
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingBottom: 20, // the main bottom tab bar navigation height is overlping the children component so providing a padding bottom of 15~25
                    // opacity: 0,
                }}
                blurRadius={MUSIC_PLAYER_BLUR}>
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
                            color: themeColors.white[0],
                            textAlign: 'left',
                            width: '100%',
                            alignSelf: 'flex-start',
                            paddingVertical: 3,
                            paddingHorizontal: 5,
                        }}
                        loop
                        scroll
                        useNativeDriver
                        duration={MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION}
                        bounceSpeed={1}
                        scrollSpeed={1}
                        animationType="scroll"
                        marqueeDelay={1000}>
                        {title}
                    </MarqueeText>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: FontUbuntuBold,
                            color: themeColors.white[0] + 'AF',
                            paddingVertical: 1,
                            paddingHorizontal: 5,
                        }}>
                        {artistsString}
                    </Text>
                </View>

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
                        likeIsMusic={likeIsMusic}
                        color={themeColors.themecolorrevert[0]}
                    />

                    <TrackProgress
                        color={themeColors.themecolorrevert[0]}
                        duration={song.duration}
                    />
                </View>
            </ImageBackground>
        </DoubleTap>
    )
}
export default MusicPlayerSongView
