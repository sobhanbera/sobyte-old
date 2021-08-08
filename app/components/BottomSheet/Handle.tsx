import React, {useMemo} from 'react'
import {StyleProp, StyleSheet, ViewStyle} from 'react-native'
import {BottomSheetHandleProps} from '@gorhom/bottom-sheet'
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from 'react-native-reanimated'
import {toRad} from 'react-native-redash'

import {useTheme} from '../../context'

export const transformOrigin = ({x, y}: any, ...transformations: any) => {
    'worklet'
    return [
        {translateX: x},
        {translateY: y},
        ...transformations,
        {translateX: x * -1},
        {translateY: y * -1},
    ]
}

interface HandleProps extends BottomSheetHandleProps {
    style?: StyleProp<ViewStyle>
}

export const Handle: React.FC<HandleProps> = ({style, animatedIndex}) => {
    const {surfacelight, border} = useTheme().themeColors

    const indicatorTransformOriginY = useDerivedValue(() =>
        interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [-1, 0, 1],
            Extrapolate.CLAMP,
        ),
    )

    /**
     * constant styles for the right indicator
     */
    const containerStyle = useMemo(
        () => [
            styles.header,
            {
                backgroundColor: surfacelight[0],
                borderBottomWidth: 0.4,
                borderBottomColor: border[0],
            },
            style,
        ],
        [style],
    )
    /**
     * the main animated styles for the main wrapper of this
     * indicator handle section
     */
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const borderTopRadius = interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [13, 0, 0], // 13 is the default border radius of the top section of the handle component provided by bottom-sheet
            Extrapolate.CLAMP,
        )
        return {
            borderTopLeftRadius: borderTopRadius,
            borderTopRightRadius: borderTopRadius,
        }
    })

    /**
     * constant styles for the left indicator...
     */
    const leftIndicatorStyle = useMemo(
        () => ({
            ...styles.indicator,
            ...styles.leftIndicator,
        }),
        [],
    )
    /**
     * animated left indicator style
     * this value is the must to change the rotation of the left indication...
     */
    const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
        const leftIndicatorRotate = interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [toRad(-30), 0, toRad(30)],
            Extrapolate.CLAMP,
        )
        return {
            transform: transformOrigin(
                {x: 0, y: indicatorTransformOriginY.value},
                {
                    rotate: `${leftIndicatorRotate}rad`,
                },
                {
                    translateX: -7, // this translate property's value must be the half of the indicator width / 2
                },
            ),
        }
    })

    /**
     * constant styles for the right indicator....
     */
    const rightIndicatorStyle = useMemo(
        () => ({
            ...styles.indicator,
            ...styles.rightIndicator,
        }),
        [],
    )
    /**
     * animated right indicator style
     * this value is the must to change the rotation of the right indication...
     */
    const rightIndicatorAnimatedStyle = useAnimatedStyle(() => {
        const rightIndicatorRotate = interpolate(
            animatedIndex.value,
            [0, 1, 2],
            [toRad(30), 0, toRad(-30)],
            Extrapolate.CLAMP,
        )
        return {
            transform: transformOrigin(
                {x: 0, y: indicatorTransformOriginY.value},
                {
                    rotate: `${rightIndicatorRotate}rad`,
                },
                {
                    translateX: 7, // this translate property's value must be the half of the indicator width / 2
                },
            ),
        }
    })

    return (
        <Animated.View
            style={[containerStyle, containerAnimatedStyle]}
            renderToHardwareTextureAndroid={true}>
            <Animated.View
                style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]}
            />
            <Animated.View
                style={[rightIndicatorStyle, rightIndicatorAnimatedStyle]}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 14,
        height: 55,
    },
    indicator: {
        position: 'absolute',
        width: 14,
        height: 3,
        backgroundColor: 'white',
    },
    leftIndicator: {
        borderTopStartRadius: 2,
        borderBottomStartRadius: 2,
    },
    rightIndicator: {
        borderTopEndRadius: 2,
        borderBottomEndRadius: 2,
    },
})
