import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player'

import {usePlayer} from '../../context'
import {Scaler} from '../'

interface Props {
    color: string
}
const TrackButtonControls = (props: Props) => {
    const {playing, seekInterval, playonly, pause} = usePlayer()

    const [localPlaying, setLocalPlaying] = useState<boolean>(playing)

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
            <View style={styles.iconWrapper}>
                <FontAwesome5
                    size={20}
                    color={props.color}
                    name={'backward'}
                    onPress={() => seekInterval(-10)}
                />
            </View>

            <View style={styles.iconWrapper}>
                {localPlaying ? (
                    <Scaler
                        onPress={() => {
                            setLocalPlaying(false)
                            pause()
                        }}
                        touchableOpacity={0.2}>
                        <Ionicons
                            size={32}
                            color={props.color}
                            name={'pause'}
                        />
                    </Scaler>
                ) : (
                    <Scaler
                        onPress={() => {
                            setLocalPlaying(true)
                            playonly()
                        }}
                        touchableOpacity={0.2}>
                        <Ionicons size={32} color={props.color} name={'play'} />
                    </Scaler>
                )}
            </View>

            <View style={styles.iconWrapper}>
                <FontAwesome5
                    size={20}
                    color={props.color}
                    name={'forward'}
                    onPress={() => seekInterval(10)}
                />
            </View>
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
