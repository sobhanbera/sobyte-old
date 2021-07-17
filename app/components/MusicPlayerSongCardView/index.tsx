import React from 'react'
import {Animated, View, Image, Dimensions} from 'react-native'

import {APP_LOGO_LINK} from '../../constants'
import {Track} from '../../api/PlayerControls'

const {width} = Dimensions.get('screen')
const IMAGE_WIDTH = width * 0.65
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.071 // same as the WIDTH of image
const IMAGE_BORDER_RADIUS = 10

interface Props {
    index: number
    scrollX: Animated.Value
    item: Track
}
const MusicPlayerSongCardView = (props: Props) => {
    const {item, index, scrollX} = props
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
    // const translateRange = index % 2 === 0 ? -100 : -100
    const translateY = scrollX.interpolate({
        inputRange: inputRange,
        outputRange: [-100, 0, -100],
    })

    return (
        <View
            style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
            }}>
            <Animated.View
                style={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_HEIGHT,
                    borderRadius: IMAGE_BORDER_RADIUS,
                    overflow: 'hidden',
                    elevation: 10,
                    transform: [{translateY: translateY}],
                }}>
                <Image
                    fadeDuration={1000}
                    source={{
                        uri: item.artwork || APP_LOGO_LINK,
                    }}
                    style={{
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        borderRadius: IMAGE_BORDER_RADIUS,
                        overflow: 'hidden',
                        resizeMode: 'cover',
                    }}
                />
            </Animated.View>
        </View>
    )
}

export default MusicPlayerSongCardView
