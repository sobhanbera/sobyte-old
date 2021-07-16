import React, {useEffect} from 'react'
import {View, Button} from 'react-native'
import Slider from '@react-native-community/slider'

import {useFetcher, usePlayer, usePlayerProgress} from '../../context'

const TrackPlayerProgressSlider = () => {
    const {position, duration, bufferedPosition} = usePlayerProgress()
    const {playing, paused, buffering, seekTo, seekInterval, playonly, pause} =
        usePlayer()

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                maximumTrackTintColor="black"
                thumbTintColor="black"
                minimumTrackTintColor="blue"
                onSlidingComplete={e => {
                    seekTo(e)
                }}
                style={{
                    width: '90%',
                    maxWidth: 330,
                }}
            />
        </View>
    )
}

export default TrackPlayerProgressSlider
