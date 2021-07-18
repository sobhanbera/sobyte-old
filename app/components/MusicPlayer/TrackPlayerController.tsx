import React from 'react'
import {View, Dimensions, Text, Animated} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'
import {StyleSheet} from 'react-native'
import {useState} from 'react'
import {Scaler} from '../'
import {colorBrightness} from '../../utils'
import TrackProgress from './TrackProgress'

const PLACEHOLDER_DISPLAY_VALUE = '--:--'
interface Props {
    color: string
    theme: 'light' | 'dark'
}
const TrackPlayerController = (props: Props) => {
    const {playing, paused, buffering, seekInterval, playonly, pause, current} =
        usePlayer()

    return (
        <View
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TrackProgress color={props.color} />
        </View>
    )
}

export default TrackPlayerController
