import React from 'react'
import {View} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'

interface Props {
    color?: string
    duration: number
}
const TrackProgress = (props: Props) => {
    const {
        position, // unit - second
    } = usePlayerProgress()
    const actualPosition = Math.floor(position)
    const actualDuration = Math.floor(props.duration / 1000)
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
                    alignItems: 'center',
                }}>
                <Slider
                    // step={0.001}
                    value={actualPosition}
                    minimumValue={0}
                    maximumValue={actualDuration}
                    thumbTintColor={props.color || '#FFFFFF'}
                    minimumTrackTintColor={props.color || '#FFFFFF'}
                    maximumTrackTintColor={(props.color || '#FFFFFF') + '7F'} // half brightness of the given color prop
                    onSlidingComplete={(value: number) => {
                        seekTo(Math.floor(value)) // the e is in seconds
                    }}
                    thumbImage={require('../../assets/images/icons/thumb.png')}
                    minimumTrackImage={require('../../assets/images/icons/track.png')}
                    maximumTrackImage={require('../../assets/images/icons/track.png')}
                    style={{
                        width: '100%',
                        height: 20,
                        marginVertical: 10,
                        borderRadius: 10,
                        // transform: [{rotateZ: '270deg'}],
                    }}
                />
            </View>
        </View>
    )
}

export default TrackProgress
