import React from 'react'
import {View, Text} from 'react-native'
import LRCRenderer from '../../../components/LRCRenderer'
import {useCallback} from 'react'

import {usePlayerProgress} from '../../../context'
import TrackPlayer from 'react-native-track-player'

interface Props {}
const SongLyricsRenderer = (props: Props) => {
    const {
        position, // unit - second
    } = usePlayerProgress()

    const lineRenderer = useCallback(
        ({lrcLine: {content}, active}) => (
            <Text
                style={{
                    textAlign: 'center',
                    color: active ? 'white' : 'grey',
                    fontSize: active ? 20 : 18,
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

    return (
        <View>
            <LRCRenderer
                height={300}
                style={{height: 300}}
                lrc={LRC_STRING}
                currentTime={position * 1000}
                lineHeight={16}
                activeLineHeight={20}
                lineRenderer={lineRenderer}
                autoScroll={true}
                autoScrollAfterUserScroll={1000}
            />

            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                }}
                onPress={() => {
                    TrackPlayer.seekTo(0)
                }}>
                {position}
            </Text>
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
