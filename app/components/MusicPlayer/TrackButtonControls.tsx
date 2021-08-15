import React, {useEffect, useState} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TrackPlayer, {
    STATE_PLAYING,
    STATE_BUFFERING,
} from 'react-native-track-player'

import {Scaler} from '../'
import {
    playTrack,
    pauseTrack,
    seekTrackInterval,
} from '../../api/PlayerControlsCommons'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_LARGE_ICON_SIZE,
    LIKE_ICON_OR_TEXT_COLOR,
} from '../../constants'

// if the song is playing then set to playing and rest are also same...
type LocalPlayState = 'playing' | 'paused' | 'buffering' | 'ready'
interface Props {
    color: string
    isLiked: boolean
    likeIsMusic: Function
}
const TrackButtonControls = (props: Props) => {
    // by default its value is paused since we don't need the user is pausing even if the song haven't started
    const [localPlayingState, setLocalPlayingState] =
        useState<LocalPlayState>('paused')

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
    }, [props.color, props.isLiked])

    return (
        <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
                <Scaler
                    onPress={() => props.likeIsMusic()} // TODO like feature
                    touchableOpacity={1}
                    scale={0.85}>
                    <FontAwesome
                        style={styles.icon}
                        size={DEFAULT_ICON_SIZE}
                        color={
                            props.isLiked
                                ? LIKE_ICON_OR_TEXT_COLOR
                                : props.color
                        }
                        name={'heart'}
                    />
                </Scaler>

                <MaterialIcons
                    style={styles.icon}
                    size={DEFAULT_ICON_SIZE}
                    color={props.color}
                    name={'queue-music'}
                    onPress={() => {}} // TODO playlist feature
                />
            </View>

            <View style={styles.innerWrapper}>
                <FontAwesome5
                    style={styles.icon}
                    size={20}
                    color={props.color}
                    name={'backward'}
                    onPress={() => seekTrackInterval(-10)}
                />

                {/**
                 * if the track is playing then show pause button
                 * else if the track is paused then show the play button
                 * else if the track is buffering or connecting to the data url of the song then show a loading indicator
                 * else we will decide 👍
                 */}
                {localPlayingState === 'buffering' ? (
                    <ActivityIndicator
                        style={[styles.icon, styles.constantIcon]}
                        color={props.color}
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
                        color={props.color}
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
                        color={props.color}
                        name={'play'}
                    />
                )}

                <FontAwesome5
                    style={styles.icon}
                    size={20}
                    color={props.color}
                    name={'forward'}
                    onPress={() => seekTrackInterval(10)}
                />
            </View>

            {/* <Ionicons
                style={styles.icon}
                size={DEFAULT_ICON_SIZE}
                color={props.color}
                name={'share-outline'}
                onPress={() => {}} // TODO share feature
            />

            <Ionicons
                style={styles.icon}
                size={DEFAULT_ICON_SIZE}
                color={props.color}
                name={'download-outline'}
                onPress={() => {}} // TODO share feature
            /> */}
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

export default TrackButtonControls
