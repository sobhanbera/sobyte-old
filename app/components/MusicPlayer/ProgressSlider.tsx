import React, {useEffect} from 'react'
import {View, Button} from 'react-native'
import Slider from '@react-native-community/slider'

import {useFetcher, usePlayer, usePlayerProgress} from '../../context'

const ProgressSlider = () => {
    const {position, duration, bufferedPosition} = usePlayerProgress()
    const {playing, seekTo, play} = usePlayer()
    const {fetchMusic} = useFetcher()

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
                            'https://lh3.googleusercontent.com/F2He2VHzeB6GgifAdh7jPLOLu6nYr3g7mDaeor7WITgyc4P-HwE2qrB50eYc5Mw6e5IKL6CHnN-c9u1bGQ=w420-h420-l90-rj',
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
