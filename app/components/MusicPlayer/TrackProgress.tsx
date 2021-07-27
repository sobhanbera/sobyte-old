import React from 'react'
import {View} from 'react-native'
import Slider from '@react-native-community/slider'
import {Slider as ElementSlider} from 'react-native-elements'

import {usePlayer, usePlayerProgress} from '../../context'

interface Props {
    color: string
}
const TrackProgress = (props: Props) => {
    const {
        position, // unit - second
        duration, // unit - millisecond
    } = usePlayerProgress()
    const actualPosition = Math.floor(position)
    const actualDuration = Math.floor(duration / 1000)
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
                    thumbTintColor={props.color || '#DFDFDF'}
                    minimumTrackTintColor={props.color || '#DFDFDF'}
                    maximumTrackTintColor={(props.color || '#DFDFDF') + '7F'} // half brightness of the given color prop
                    onSlidingComplete={(value: number) => {
                        seekTo(Math.floor(value)) // the e is in seconds
                        console.log('LOAOAO', value, position, duration / 1000)
                    }}
                    thumbImage={require('../../assets/images/icons/thumb.png')}
                    minimumTrackImage={require('../../assets/images/icons/track.png')}
                    maximumTrackImage={require('../../assets/images/icons/track.png')}
                    style={{
                        width: '100%',
                        height: 20,
                        marginVertical: 10,
                        borderRadius: 10,
                    }}
                />
            </View>
        </View>
    )
}

export default TrackProgress
