import React from 'react'
import {View, Text, Dimensions, Image} from 'react-native'
import {useCallback} from 'react'
import MarqueeText from 'react-native-text-ticker'

import {usePlayerProgress, useTheme} from '../../../context'
import {HeaderMain, TrackProgress} from '../../../components'
import {
    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
    DefaultStatusBarComponent,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    FontRoboto,
    FontRobotoBold,
    FontUbuntuBold,
    HEADER_MAX_HEIGHT,
    MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION,
} from '../../../constants'
import LRCRenderer from '../../../components/LRCRenderer'
import {SongObject} from '../../../interfaces'
import {capitalizeWords, formatArtists, formatTrackTitle} from '../../../utils'

const {height} = Dimensions.get('window')

interface Props {
    navigation: any
    route: {
        params: {
            song: SongObject
        }
    }
}
const SongLyricsRenderer = ({navigation, route}: Props) => {
    const {song} = route.params
    const {
        position, // unit - second
        duration,
    } = usePlayerProgress()
    const {themeColors} = useTheme()

    const lineRenderer = useCallback(
        ({lrcLine: {content}, active}) => (
            <Text
                style={{
                    textAlign: 'left',
                    color: active ? 'white' : 'grey',
                    fontSize: active ? 25 : 20,
                    fontFamily: active ? FontRobotoBold : FontRoboto,
                    paddingHorizontal: 25,
                }}>
                {content}
            </Text>
        ),
        [],
    )
    //   const onCurrentLineChange = useCallback(
    //     ({ lrcLine: { millisecond, content }, index }) =>
    //       console.log(index, millisecond, content),
    //     [],
    //   );

    const artists = formatArtists(song.artist)

    return (
        <View>
            <DefaultStatusBarComponent backgroundColor={'grey'} />

            <HeaderMain
                navigation={navigation}
                title={'Lyrics'}
                color={'white'}
                goBack
                backgroundColor={'grey'}
            />

            <LRCRenderer
                containerHeight={
                    height - // the available full height of the device
                    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT - // the bottom tab bar's height
                    DEVICE_STATUSBAR_HEIGHT_CONSTANT - // the device statusbar's height
                    HEADER_MAX_HEIGHT - // the height of header after statusbar
                    85 // an offset
                }
                // style={{height: 300}}
                lrc={LRC_STRING}
                currentTime={position * 1000}
                lineHeight={24}
                activeLineHeight={30}
                lineRenderer={lineRenderer}
                spacing={BOTTOM_TAB_BAR_NAVIGATION_HEIGHT}
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                <TrackProgress
                    color={themeColors.themecolorrevert[0]}
                    duration={duration}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                <Image
                    source={{uri: song.thumbnails[1].url}}
                    style={{height: 75, width: 75, borderRadius: 5}}
                />
                <View
                    style={{
                        width: '50%',
                        alignSelf: 'flex-start',
                        marginHorizontal: 20,
                    }}>
                    <MarqueeText
                        style={{
                            fontSize: 23,
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
                        duration={MARQUEE_SCROLL_LONG_TEXT_PROGRESS_DURATION}
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
            </View>
        </View>
    )
}

export default SongLyricsRenderer

// testing
const LRC_STRING = `
[00:01.23]लग जा गले
[00:07.43]हं हं
[00:12.60]हसीन रात
[00:16.36]हं
[00:25.02]लग जा गले
[00:27.67]के फ़िर ये
[00:29.96]हसीन रात हो ना हो
[00:36.74]शायद
[00:37.99]फ़िर इस जनम में
[00:41.13]मुलाकात हो ना हो
[00:47.88]लग जा गले
[00:50.42]के फ़िर ये
[00:52.45]हसीन रात हो ना हो
[00:59.11]शायद
[01:00.41]फ़िर इस जनम में
[01:03.55]मुलाकात हो ना हो
[01:10.13]लग जा गले
[01:13.03]ए
[01:14.41]ए
[01:32.07]हम को मिली है आज ये
[01:37.20]घडियां नसीब से
[01:45.86]हम को मिली है आज ये
[01:50.92]घडियां नसीब से
[01:56.99]जी भर के देख लीजिए
[02:01.94]हम को
[02:03.62]करीब से
[02:08.05]फ़िर आपके
[02:10.51]नसीब में
[02:12.72]ये बात हो ना हो
[02:19.06]शायद
[02:20.32]फ़िर इस जनम में
[02:23.44]मुलाकात हो ना हो
[02:29.98]लग जा गले
[02:32.79]ए
[02:34.21]ए
[02:51.70]पास आईए के हम नहीं
[02:56.85]आएंगे बार बार
[03:05.55]पास आईए के हम नहीं
[03:10.47]आएंगे बार बार
[03:16.41]बाहें गले में डाल के
[03:21.49]हम रोलें ज़ार ज़ार
[03:27.27]आंखों से फ़िर
[03:29.64]ये प्यार की
[03:31.92]बरसात हो ना हो
[03:38.21]शायद
[03:39.44]फ़िर इस जनम में
[03:42.48]मुलाकात हो ना हो
[03:49.06]लग जा गले
[03:51.51]के फ़िर ये
[03:53.46]हसीन रात हो ना हो
[04:00.06]शायद
[04:01.31]फ़िर इस जनम में
[04:04.26]मुलाकात हो ना हो
[04:10.83]लग जा गले
[04:13.67]ए
[04:15.09]ए
`
