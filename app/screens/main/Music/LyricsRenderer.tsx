import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import {useCallback} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer, {
    STATE_PLAYING,
    STATE_BUFFERING,
} from 'react-native-track-player'

import {usePlayerProgress, useTheme} from '../../../context'
import {HeaderMain, TrackProgress} from '../../../components'
import {
    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
    DefaultStatusBarComponent,
    DEFAULT_LARGE_ICON_SIZE,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    FontRoboto,
    FontRobotoBold,
    HEADER_MAX_HEIGHT,
} from '../../../constants'
import LRCRenderer from '../../../components/LRCRenderer'
import {playTrack, pauseTrack} from '../../../api/PlayerControlsCommons'

const {height} = Dimensions.get('window')

// if the song is playing then set to playing and rest are also same...
type LocalPlayState = 'playing' | 'paused' | 'buffering' | 'ready'
interface Props {
    navigation: any
}
const SongLyricsRenderer = ({navigation}: Props) => {
    const {
        position, // unit - second
        duration,
    } = usePlayerProgress()
    const {themeColors} = useTheme()

    // by default its value is paused since we don't need the user is pausing even if the song haven't started
    const [localPlayingState, setLocalPlayingState] =
        useState<LocalPlayState>('paused')

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

    useEffect(() => {
        // triggered when the song/track is played from notification/lock-screen/other parts of the android
        const playEvent = TrackPlayer.addEventListener('remote-play', () => {
            setLocalPlayingState('playing')
        })
        // triggered when the song/track is paused from notification/lock-screen/other parts of the android
        const pauseEvent = TrackPlayer.addEventListener('remote-pause', () => {
            setLocalPlayingState('paused')
        })
        // triggered when the song/track is stopped from notification/lock-screen/other parts of the android
        const stopEvent = TrackPlayer.addEventListener('remote-stop', () => {
            setLocalPlayingState('paused')
        })
        // triggered when any state changes related to song from notification/lock-screen/other parts of the android
        const stateChangeEvent = TrackPlayer.addEventListener(
            'playback-state',
            (state: {state: number}) => {
                if (state.state === STATE_PLAYING) {
                    setLocalPlayingState('playing')
                } else if (state.state === STATE_BUFFERING) {
                    setLocalPlayingState('buffering')
                } else {
                    setLocalPlayingState('paused')
                }
            },
        )
        return () => {
            playEvent.remove()
            pauseEvent.remove()
            stopEvent.remove()
            stateChangeEvent.remove()
        }
    }, [])

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
                    height -
                    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT -
                    DEVICE_STATUSBAR_HEIGHT_CONSTANT -
                    HEADER_MAX_HEIGHT -
                    100
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
                {localPlayingState === 'buffering' ? (
                    <ActivityIndicator
                        style={[styles.icon, styles.constantIcon]}
                        color={'white'}
                        size={DEFAULT_LARGE_ICON_SIZE}
                    />
                ) : localPlayingState === 'playing' ? (
                    <Ionicons
                        style={[styles.icon, styles.constantIcon]}
                        onPress={() => {
                            setLocalPlayingState('paused')
                            pauseTrack()
                        }}
                        size={DEFAULT_LARGE_ICON_SIZE}
                        color={'white'}
                        name={'pause'}
                    />
                ) : (
                    <Ionicons
                        style={[styles.icon, styles.constantIcon]}
                        onPress={() => {
                            setLocalPlayingState('playing')
                            playTrack()
                        }}
                        size={DEFAULT_LARGE_ICON_SIZE}
                        color={'white'}
                        name={'play'}
                    />
                )}
                <TrackProgress
                    color={themeColors.themecolorrevert[0]}
                    duration={duration}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    icon: {
        padding: 12,
        borderRadius: 100,
    },
    // when the user plays or pause the track the icon size is constant
    // but when the track is being buffering the icon size is bit small which maked the whole UI shifts
    // so this style is for a constant width and height of such dynamic icons...
    constantIcon: {
        width: 50,
        height: 50,
        // backgroundColor: 'black',
    },
})

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
