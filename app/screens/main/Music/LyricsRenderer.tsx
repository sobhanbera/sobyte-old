import React from 'react'
import {View, Text, Dimensions, Image, Animated} from 'react-native'
import {useCallback} from 'react'
import MarqueeText from 'react-native-text-ticker'

import {usePlayerProgress, useTheme} from '../../../context'
import {HeaderMain, TrackProgress} from '../../../components'
import {
    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
    DefaultStatusBarComponent,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    FontUbuntu,
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
                lineHeight={34} // the maximum height of each lyrics line including margin, padding vertical, fontsize, scale, etc
                activeLineHeight={58} // the maximum height of the current lyrics line including margin, padding vertical, fontsize, scale, etc
                lineRenderer={item => {
                    return (
                        <Animated.Text
                            style={{
                                textAlign: 'left',
                                color: item.active ? 'white' : '#AFAFAF',
                                fontSize: item.active ? 22 : 16,
                                fontFamily: FontUbuntu,
                                paddingHorizontal: 25,
                                marginVertical: item.active ? 18 : 9,
                            }}>
                            {item.currentLine.content}
                        </Animated.Text>
                    )
                }}
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
[ti:lut gaye]
[ar:Jubin Nautiyal, Tanishk Bagchi, Nusrat Fateh Ali Khan]
[al:Dont]
[au:JN]
[by:sobhanbera]
[la:HI]
[ve:4.00]

[00:00.76]Maine Jab Dekha Tha Tujhko

[00:24.40]Raat Bhi Woh Yaad Hai Mujhko

[00:27.00]Taare Ginte Ginte So Gaya


[00:32.16]Dil Mera Dhadka Tha Kass Ke

[00:34.81]Kuch Kaha Tha Tune Hass Ke

[00:37.44]Main Usi Pal Tera Ho Gaya


[00:42.78]Aasmano Pe Jo Khuda Hai

[00:45.42]Usse Meri Yahi Dua Hai

[00:47.98]Chand Yeh Har Roz Main Dekhu

[00:50.92]Tere Sath Mein


[00:52.63]Aankh Uthi Mohabbat Ne Angrai Li

[00:57.71]Dil Ka Sauda Hua Chandani Raat Mein

[01:02.73]Oh Teri Nazron Ne Kuch Aisa Jaadoo Kiya

[01:06.51]Lut Gaye Hum Toh Pehli Mulaqaat Mein

[01:13.81]Oh Aankh Uthi!


[01:35.58]Paao Rakhna Na Zameen Par

[01:37.76]Jaan Rukja Tu Ghadi Bhar

[01:39.87]Thode Taare Toh Bichha Du

[01:42.91]Main Tere Vaaste


[01:45.52]Aajmale Mujhko Yaara

[01:48.07]Tu Zara Sa Kar Ishaara

[01:50.51]Dil Jala Ke Jagmaga Du

[01:53.47]Main Tere Raaste


[01:56.74]Haan Mere Jaisa Ishq Mein Pagal

[01:59.18]Phir Mile Ya Na Mile Kal

[02:01.86]Sochna Kya Hath Ye Dede

[02:04.35]Mere Hath Mein


[02:06.18]Aankh Uthi Mohabbat Ne Angrai Li

[02:11.39]Dil Ka Sauda Hua Chandani Raat Mein

[02:16.57]Oh Teri Nazron Ne Kuch Aisa Jaadoo Kiya

[02:22.08]Lut Gaye Hum Toh Pehli Mulaqaat Mein

[02:27.07]Oh Aankh Uthi!


[02:38.05]Haan Kisse Mohabbat Ke

[02:51.99]Hain Jo Kitabon Mein

[02:54.69]Sab Chahta Hoon Main

[02:57.27]Sang Tere Dohrana


[02:59.90]Kitna Zaroori Hai

[03:02.54]Ab Meri Khatir Tu

[03:05.25]Mushqil Hai Mushqil Hai

[03:08.27]Lafzon Mein Keh Pana


[03:10.52]Ab Toh Yeh Alam Hai

[03:13.16]Tu Jaan Mange Toh

[03:15.64]Main Shaunk Se Dedu

[03:18.06]Saugat Mein


[03:20.52]Aankh Uthi Mohabbat Ne Angrai Li

[03:24.93]Dil Ka Sauda Hua Chandani Raat Mein

[03:30.24]Oh Teri Nazron Ne Kuch Aisa Jaadoo Kiya

[03:35.95]Lut Gaye Hum Toh Pehli Mulaqaat Mein

[03:41.01]Oh Aankh Uthi!
`
