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
                    step={0.001}
                    value={actualPosition}
                    minimumValue={0}
                    maximumValue={actualDuration}
                    minimumTrackTintColor={props.color || '#DFDFDF'}
                    maximumTrackTintColor={(props.color || '#DFDFDF') + '7F'} // half brightness of the given color prop
                    thumbTintColor={props.color || '#DFDFDF'}
                    onSlidingComplete={(value: number) => {
                        seekTo(Math.floor(value)) // the e is in seconds
                        console.log("LOAOAO", value, position, duration/1000)
                    }}
                    style={{
                        width: '100%',
                    }}
                />
                <ElementSlider
                    step={0.001}
                    value={actualPosition}
                    minimumValue={0}
                    maximumValue={actualDuration}
                    minimumTrackTintColor={props.color || '#DFDFDF'}
                    maximumTrackTintColor={(props.color || '#DFDFDF') + '7F'} // half brightness of the given color prop
                    thumbTintColor={props.color || '#DFDFDF'}
                    thumbTouchSize={{width: 20, height: 20}}
                    thumbStyle={{
                        width: 9,
                        height: 9
                    }}
                    trackStyle={{
                        width: '100%',
                        height: 2
                    }}
                    allowTouchTrack
                    style={{
                        width: '100%',
                    }}
                    onSlidingComplete={(e) => {
                        console.log(e)
                    }}
                    animateTransitions
                    animationType='timing'
                />

                
            </View>
        </View>
    )
}

export default TrackProgress
