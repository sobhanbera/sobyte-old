import React from 'react'
const {width, height} = Dimensions.get('screen')
import {StyleSheet, Animated, Dimensions} from 'react-native'

import {APP_LOGO_LINK, MUSIC_PLAYER_BLUR} from '../../constants'
import {ThumbnailObject} from '../../interfaces'

interface Props {
    thumbnails: Array<ThumbnailObject>
    scrollX: Animated.Value
    index: number
}
const BackgroundBluredImage = (props: Props) => {
    const {thumbnails, scrollX, index} = props
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
                uri: thumbnails[1].url || APP_LOGO_LINK,
                // cache: 'force-cache',
            }}
            blurRadius={MUSIC_PLAYER_BLUR}
        />
    )
}

export default BackgroundBluredImage
