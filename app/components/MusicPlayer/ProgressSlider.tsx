import React, {useEffect} from 'react'
import {View, Button} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'

const ProgressSlider = () => {
    const {position, duration, bufferedPosition} = usePlayerProgress()
    const {playing, seekTo, play} = usePlayer()

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Button
                title="Play"
                onPress={() => {
                    play({
                        id: '1',
                        url: 'http://www.bigrockmusic.com/mp3/track_01.mp3',
                        duration: 67,
                        title: 'Name',
                        artist: 'Sobhan Bera',
                        artwork:
                            'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
                    })
                }}
            />
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

export default ProgressSlider
