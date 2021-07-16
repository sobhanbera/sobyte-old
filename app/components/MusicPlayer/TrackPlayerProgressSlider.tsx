import React, {useEffect} from 'react'
import {View, Button} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'

interface Props {
    duration: number
    index?: number
}
const TrackPlayerProgressSlider = (props: Props) => {
    const {position, duration, bufferedPosition} = usePlayerProgress()
    const {playing, paused, buffering, seekTo, seekInterval, playonly, pause} =
        usePlayer()

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
                }}>
                <Slider
                    value={position} // position is in seconds
                    minimumValue={0}
                    maximumValue={props.duration || duration / 1000} // duration is in milliseconds, but props.duration must be in seconds
                    maximumTrackTintColor="black"
                    thumbTintColor="black"
                    minimumTrackTintColor="blue"
                    onSlidingComplete={e => {
                        seekTo(e / 1000) // the e is in milliseconds
                        // console.log(e)
                    }}
                    style={{
                        width: '100%',
                    }}
                />
            </View>
        </View>
    )
}

export default TrackPlayerProgressSlider
