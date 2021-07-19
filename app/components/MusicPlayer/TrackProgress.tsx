import React from 'react'
import {View} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'

interface Props {
    color: string
}
const TrackProgress = (props: Props) => {
    const {
        position, // unit - second
        duration, // unit - millisecond
    } = usePlayerProgress()
    const {seekTo} = usePlayer()

    return (
        <View
            style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View
                style={{
                    width: '100%',
                    // maxWidth: 330,
                    alignItems: 'center',
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
                    step={1}
                    style={{
                        width: '100%',
                        padding: 0,
                        margin: 0,
                        alignItems: 'center',
                        zIndex: 2,
                    }}
                />
            </View>
        </View>
    )
}

export default TrackProgress
