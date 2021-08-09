import React from 'react'
import {View} from 'react-native'
import Slider from '@react-native-community/slider'

import {usePlayerProgress} from '../../context'
import {seekTrackTo} from '../../api/PlayerControlsCommons'

interface Props {
    color?: string
    duration: number // since the duration will be the same for an unique track so why we should extract it from the progress we could get it from props this will cause less renders in the UI...
}
const TrackProgress = (props: Props) => {
    const {
        position, // unit - second
    } = usePlayerProgress()
    const actualPosition = Math.floor(position)
    const actualDuration = Math.floor(props.duration / 1000)

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
                    step={0.01}
                    value={actualPosition}
                    minimumValue={0}
                    maximumValue={actualDuration}
                    thumbTintColor={props.color || '#FFFFFF'}
                    minimumTrackTintColor={props.color || '#FFFFFF'}
                    maximumTrackTintColor={(props.color || '#FFFFFF') + '7F'} // half brightness of the given color prop
                    onSlidingComplete={(value: number) => {
                        seekTrackTo(Math.floor(value)) // the e is in seconds
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
