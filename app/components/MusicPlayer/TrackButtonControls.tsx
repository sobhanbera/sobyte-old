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
import {LIKE_ICON_OR_TEXT_COLOR} from '../../constants'

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
    }, [])

    return (
        <View style={styles.wrapper}>
            <FontAwesome
                style={styles.icon}
                size={24}
                color={props.isLiked ? LIKE_ICON_OR_TEXT_COLOR : props.color}
                name={'heart'}
                onPress={() => props.likeIsMusic()} // TODO like feature
            />

            <MaterialIcons
                style={styles.icon}
                size={24}
                color={props.color}
                name={'queue-music'}
                onPress={() => {}} // TODO playlist feature
            />

            <Ionicons
                style={styles.icon}
                size={24}
                color={props.color}
                name={'share-outline'}
                onPress={() => {}} // TODO share feature
            />

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
                    style={styles.icon}
                    color={props.color}
                    size={32}
                />
            ) : localPlayingState === 'playing' ? (
                <Ionicons
                    style={styles.icon}
                    onPress={() => {
                        setLocalPlayingState('paused')
                        pauseTrack()
                    }}
                    size={32}
                    color={props.color}
                    name={'pause'}
                />
            ) : (
                <Ionicons
                    style={styles.icon}
                    onPress={() => {
                        setLocalPlayingState('playing')
                        playTrack()
                    }}
                    size={32}
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
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    icon: {
        padding: 12,
        borderRadius: 100,
    },
})

export default TrackButtonControls
