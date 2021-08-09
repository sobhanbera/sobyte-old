import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player'

import {Scaler} from '../'
import {
    playTrack,
    pauseTrack,
    seekTrackInterval,
} from '../../api/PlayerControlsCommons'
import {LIKE_ICON_OR_TEXT_COLOR} from '../../constants'

interface Props {
    color: string
    isLiked: boolean
    likeIsMusic: Function
}
const TrackButtonControls = (props: Props) => {
    const [localPlaying, setLocalPlaying] = useState<boolean>(false)

    useEffect(() => {
        const playEvent = TrackPlayer.addEventListener('remote-play', () => {
            setLocalPlaying(true)
        })
        const pauseEvent = TrackPlayer.addEventListener('remote-pause', () => {
            setLocalPlaying(false)
        })
        const stopEvent = TrackPlayer.addEventListener('remote-stop', () => {
            setLocalPlaying(false)
        })
        const stateChangeEvent = TrackPlayer.addEventListener(
            'playback-state',
            (state: {state: number}) => {
                if (state.state == STATE_PLAYING) {
                    setLocalPlaying(true)
                } else {
                    setLocalPlaying(false)
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

            {localPlaying ? (
                <Scaler
                    containerStyle={styles.icon}
                    onPress={() => {
                        setLocalPlaying(false)
                        pauseTrack()
                    }}
                    touchableOpacity={0.2}>
                    <Ionicons size={32} color={props.color} name={'pause'} />
                </Scaler>
            ) : (
                <Scaler
                    containerStyle={styles.icon}
                    onPress={() => {
                        setLocalPlaying(true)
                        playTrack()
                    }}
                    touchableOpacity={0.2}>
                    <Ionicons size={32} color={props.color} name={'play'} />
                </Scaler>
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
