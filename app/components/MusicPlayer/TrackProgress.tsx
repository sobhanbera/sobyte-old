import React, {useState} from 'react'
import {View, Text} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayer, usePlayerProgress} from '../../context'
import {Scaler} from '../'

const PLACEHOLDER_DISPLAY_VALUE = '--:--'
interface Props {
    color: string
}
const TrackProgress = (props: Props) => {
    const {
        position, // unit - second
        duration, // unit - millisecond
    } = usePlayerProgress()
    const {seekTo} = usePlayer()

    const [showCurrentDuration, setShowCurrentDuration] = useState(true) // true - show current duration after formatting, false - show remaining duration after formatting

    const convertMillisecondsToMinuteSecondFormat = (millis: number) => {
        if (position > 0) {
            var minutes = Math.floor(millis / 60000)
            var seconds = ((millis % 60000) / 1000).toFixed(0)
            return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
        }
        return PLACEHOLDER_DISPLAY_VALUE
    }
    const getCurrentDuration = () => {
        return convertMillisecondsToMinuteSecondFormat(position * 1000)
    }
    const getRemainingDuration = () => {
        return `-${convertMillisecondsToMinuteSecondFormat(
            duration - position * 1000,
        )}`
    }
    const getDuration = () => {
        return convertMillisecondsToMinuteSecondFormat(duration)
    }

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

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginVertical: 5,
                }}>
                <Scaler onPress={() => setShowCurrentDuration(show => !show)}>
                    <Text
                        style={{
                            color: props.color,
                            width: '100%',
                            textAlign: 'right',
                        }}>
                        {`${
                            showCurrentDuration
                                ? getCurrentDuration()
                                : getRemainingDuration()
                        } / ${getDuration()}`}
                    </Text>
                </Scaler>
            </View>
        </View>
    )
}

export default TrackProgress
