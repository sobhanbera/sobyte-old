import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player'

import {usePlayer} from '../../context'
import {Scaler} from '../'
import {
    playTrack,
    pauseTrack,
    seekTrackInterval,
} from '../../api/PlayerControlsCommons'

interface Props {
    color: string
}
const TrackButtonControls = (props: Props) => {
    const {playing} = usePlayer()

    const [localPlaying, setLocalPlaying] = useState<boolean>(playing)

    useEffect(() => {
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
            stateChangeEvent.remove()
        }
    }, [])

    return (
        <View style={styles.wrapper}>
            <FontAwesome5
                style={styles.iconWrapper}
                size={20}
                color={props.color}
                name={'backward'}
                onPress={() => seekTrackInterval(-10)}
            />

            {localPlaying ? (
                <Scaler
                    containerStyle={styles.iconWrapper}
                    onPress={() => {
                        setLocalPlaying(false)
                        pauseTrack()
                    }}
                    touchableOpacity={0.2}>
                    <Ionicons size={32} color={props.color} name={'pause'} />
                </Scaler>
            ) : (
                <Scaler
                    containerStyle={styles.iconWrapper}
                    onPress={() => {
                        setLocalPlaying(true)
                        playTrack()
                    }}
                    touchableOpacity={0.2}>
                    <Ionicons size={32} color={props.color} name={'play'} />
                </Scaler>
            )}

            <FontAwesome5
                style={styles.iconWrapper}
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
    iconWrapper: {
        padding: 12,
        borderRadius: 100,
    },
    icon: {},
})

export default TrackButtonControls
