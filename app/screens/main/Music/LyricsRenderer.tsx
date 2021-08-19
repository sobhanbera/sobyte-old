import React from 'react'
import {Dimensions, ImageBackground, View} from 'react-native'

import {usePlayerProgress, useTheme} from '../../../context'
import {HeaderMain} from '../../../components'
import {
    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
    DefaultStatusBarComponent,
    DEFAULT_VERY_HIGH_IMAGE_QUALITY,
    DEFAULT_VERY_HIGH_IMAGE_SIZE,
    PaddingBottomView,
} from '../../../constants'
import LRCRenderer from '../../../components/LRCRenderer'
import {SongObject} from '../../../interfaces'
import {
    formatTrackTitle,
    getHightQualityImageFromLinkWithHeight,
} from '../../../utils'

const {height, width} = Dimensions.get('window')

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
    } = usePlayerProgress()
    const {themeColors} = useTheme()

    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        DEFAULT_VERY_HIGH_IMAGE_SIZE,
        DEFAULT_VERY_HIGH_IMAGE_QUALITY,
    )

    return (
        <ImageBackground
            source={{uri: highQualityImage}}
            style={{width, height}}>
            <DefaultStatusBarComponent backgroundColor={'transparent'} />

            <View
                style={{
                    backgroundColor: themeColors.black[0] + '7F',
                }}>
                <HeaderMain
                    navigation={navigation}
                    title={`Lyrics  "${formatTrackTitle(song.name)}"`}
                    color={themeColors.themecolorrevert[0]}
                    goBack
                    backgroundColor={themeColors.black[0] + '7F'}
                    style={{
                        borderBottomWidth: 0,
                    }}
                />

                <LRCRenderer lrc={LRC_STRING} currentTime={position} />

                <PaddingBottomView
                    paddingBottom={BOTTOM_TAB_BAR_NAVIGATION_HEIGHT}
                />
            </View>
        </ImageBackground>
    )
}

export default SongLyricsRenderer

// testing
const LRC_STRING = `
[ti:wafa na raha sai]
[ar:Jubin Nautiyaal]
[al:Wafa Na Raha Sai]
[au:Sobhan Bera]
[by:Sobhan Bera]
[la:HI]
[ve:4.00]

[00:00.00]Roun Ya Hansun Teri Harkat Pe
[00:35.68]Ya Phir Teri Taarif Karoon
[00:41.17]Mere Dil Se Tu Aise Khel Gaya
[00:44.50]Ab Jee Na Saku Mar Bhi Na Saku

[00:50.32]Teri Zehar Bhari Do Aankhon Ki
[00:55.20]Mujhe Chaal Samjh Mein Na Aayi

[01:00.22]Wafa Na Raas Aayi
[01:05.14]Tujhe O Harjai
[01:07.26]Wafa Na Raas Aayi
[01:13.59]Tujhe O Harjai

[01:17.46]Sadiyon Yeh Zamana Yaad Rakhega
[01:27.66]Yaar Teri Bewafai
[01:32.00]Wafa Na Raas Aayee
[01:35.53]Tujhe O Harjai

[02:06.52]Waadon Ki Lashon Ko Bol Kahan Dafnaun
[02:28.97]Waadon Ki Lashon Ko Bol Kahan Dafnaun
[02:38.64]Khwabon Aur Yaadon Se Kaise Tumko Mitaun

[02:44.60]Kyun Na Main Tujhe Pehchan Saka
[02:52.88]Sach Tere Nahi Main Jaan Saka
[02:57.92]Tere Noor Se Jo Raushan Tha Kabhi
[03:02.81]Uss Shehar Mein Aag Lagai

[03:05.69]Wafa Na Raas Aayi
[03:13.91]Tujhe O Harjai
[03:18.87]Wafa Na Raas Aayi
[03:22.81]Tujhe O Harjai

[03:30.24]Sadiyon Yeh Zamana Yaad Rakhega
[03:35.34]Yaar Teri Bewafai
[03:40.82]Wafa Na Raas Aayee
[03:45.75]Tujhe O Harjai

[03:46.69]Jis Jis Ko Mohabbat Raas Aayi
[03:54.33]Woh Log Naseebon Wale The
[03:56.75]Taqdeer Ke Hathon Haar Gaye
[03:58.75]Hum Jaise Jo The

[04:01.54]Sunn Yaar Mere Oh Harjai
[04:03.79]Hum Thode Alag Dilwale The
[04:06.28]Par Jaisa Socha Tha Humne
[04:08.76]Tum Waise Na The

[04:11.37]Tune Waar Kiya Sidhe Dil Pe
[04:16.12]Aur Palak Bhi Na Jhapkayi

[04:21.73]Wafa Na Raas Aayi
[04:26.48]Tujhe O Harjai
[04:32.55]Wafa Na Raas Aayi
[04:37.22]Tujhe O Harjai



`
