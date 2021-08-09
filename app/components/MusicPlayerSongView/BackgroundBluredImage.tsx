import React from 'react'
import {StyleSheet, Animated, Dimensions} from 'react-native'

import {APP_LOGO_LINK} from '../../constants'

const {width, height} = Dimensions.get('screen')
const IMAGE_BLUR_RADIUS = 50

interface Props {
    image: string
    scrollX: Animated.Value
    index: number
}
const BackgroundBluredImage = (props: Props) => {
    const {image, scrollX, index} = props
    const inputRange = [
        (index - 1) * height,
        index * height,
        (index + 1) * height,
    ]
    const opacity = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0],
    })

    return (
        <Animated.Image
            style={[
                StyleSheet.absoluteFillObject,
                {
                    opacity: opacity,
                },
            ]}
            source={{
                uri: image || APP_LOGO_LINK,
                // cache: 'force-cache',
            }}
            blurRadius={IMAGE_BLUR_RADIUS}
        />
    )
}

export default BackgroundBluredImage