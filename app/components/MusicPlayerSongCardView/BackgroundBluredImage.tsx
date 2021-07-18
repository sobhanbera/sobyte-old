import React from 'react'
import {StyleSheet, Animated, Dimensions} from 'react-native'

import {Track} from '../../api/PlayerControls'
import {APP_LOGO_LINK} from '../../constants'

const {width} = Dimensions.get('screen')
const IMAGE_BLUR_RADIUS = 50

interface Props {
    song: Track
    scrollX: Animated.Value
    index: number
}
const BackgroundBluredImage = (props: Props) => {
    const {song, scrollX, index} = props
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
    const opacity = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0],
    })

    return (
        <Animated.Image
            key={`${song.id}-${index}`}
            style={[
                StyleSheet.absoluteFillObject,
                {
                    opacity: opacity,
                },
            ]}
            source={{uri: song.artwork || APP_LOGO_LINK}}
            blurRadius={IMAGE_BLUR_RADIUS}
        />
    )
}

export default BackgroundBluredImage
