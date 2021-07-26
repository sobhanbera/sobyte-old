import React from 'react'
import {View} from 'react-native'

import TrackProgress from './TrackProgress'
import MainControls from './MainControls'

interface Props {
    color: string
}
const TrackPlayerController = (props: Props) => {
    return (
        <View
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <MainControls color={props.color} />
            <TrackProgress color={props.color} />
        </View>
    )
}

export default TrackPlayerController
