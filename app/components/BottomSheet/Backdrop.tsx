import React, {useMemo} from 'react'
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated'

import {useTheme} from '../../context'

export const Backdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
    const {surfacelight} = useTheme().themeColors

    // the animated value for changing the color value on the change of animatedIndex value
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP,
        ),
    }))

    // actual styles are here
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: surfacelight[0],
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle],
    )

    return <Animated.View style={containerStyle} />
}
