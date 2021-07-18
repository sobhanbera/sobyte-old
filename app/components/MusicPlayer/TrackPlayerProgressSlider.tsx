import React, {useEffect} from 'react'
import {View, Button, Dimensions, Text} from 'react-native'
import Slider from '@react-native-community/slider'

import BufferSlider from 'react-native-scrubber'

import {useFetcher, usePlayer, usePlayerProgress} from '../../context'
import {StyleSheet} from 'react-native'

const PLACEHOLDER_DISPLAY_VALUE = '--:--'
interface Props {
    color: string
}
const TrackPlayerProgressSlider = (props: Props) => {
    const {
        position, // unit - second
        duration, // unit - millisecond
        bufferedPosition, // unit - second
    } = usePlayerProgress()
    const {
        playing,
        paused,
        buffering,
        seekTo,
        seekInterval,
        playonly,
        pause,
        current,
    } = usePlayer()
    const {fetchMusic} = useFetcher()

    const convertMillisecondsToMinuteSecondFormat = (millis: number) => {
        var minutes = Math.floor(millis / 60000)
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`
    }

    useEffect(() => {
        fetchMusic('DUwlGduupRI')
            .then(res => {
                console.log(res)
            })
            .catch(_err => {})
    }, [])

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
                        console.log(e)
                    }}
                    step={0.5}
                    style={{
                        width: '100%',
                        padding: 0,
                        margin: 0,
                    }}
                />
                <BufferSlider
                    value={position}
                    totalDuration={duration / 1000}
                    bufferedValue={bufferedPosition}
                    onSlidingComplete={e => {
                        console.log(e)
                        seekTo(e)
                    }}
                    tapNavigation={false}
                    trackBackgroundColor={(props.color || '#000000') + '50'}
                    bufferedTrackColor={(props.color || '#000000') + '80'}
                    scrubbedColor={'black'}
                    trackColor={props.color || '#000000'}
                    displayValues={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default TrackPlayerProgressSlider
