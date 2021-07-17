import React, {useEffect} from 'react'
import {View, Button} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'

interface Props {
    color: string
}
const TrackPlayerProgressSlider = (props: Props) => {
    const {position, duration, bufferedPosition} = usePlayerProgress()
    const {
        playing,
        paused,
        buffering,
        seekTo,
        seekInterval,
        playonly,
        pause,
        current,
    } = usePlayer()

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
            <View
                style={{
                    width: '90%',
                    maxWidth: 330,
                    // backgroundColor: 'white',
                }}>
                <Slider
                    value={position} // position is in seconds
                    minimumValue={0}
                    maximumValue={duration / 1000} // duration is in milliseconds, but props.duration must be in seconds
                    maximumTrackTintColor={(props.color || '#000000') + '7F'} // half brightness of the given color prop
                    thumbTintColor={props.color || '#000000'}
                    minimumTrackTintColor={props.color || '#000000'}
                    onSlidingComplete={e => {
                        seekTo(e) // the e is in seconds
                    }}
                    step={0.5}
                    style={{
                        width: '100%',
                        padding: 0,
                        margin: 0,
                    }}
                />
            </View>
        </View>
    )
}

export default TrackPlayerProgressSlider
