import React, {useState} from 'react'
import {View, Text, Image, Dimensions, Pressable} from 'react-native'
import ImageHeaderScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view'
import * as Animatable from 'react-native-animatable'
import FastImage from 'react-native-fast-image'

import LinearGradient from 'react-native-linear-gradient'
import ImageColors from 'react-native-image-colors'
import {useEffect} from 'react'

import {
    DEFAULT_OVERLAY_OPACITY_MIN,
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
} from '../../constants'
import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {sortColors} from '../../utils'

// const BOTTOM_PADDING = 100
interface OnScrollProps {
    layoutMeasurement: {
        height: number
        width: number
    }
    contentOffset: {
        x: number
        y: number
    }
    contentSize: {
        height: number
        width: number
    }
}
interface Props {
    backgroundGradientColors?: string[]
    sortedBackgroundGradientColors?: string[]
    headerImage: string
    headerTitle: string
    headerNameTitle: string
    children?: React.ReactNode
    infiniteScrollOffset: number // a number or height above from the last of the scrollview from where the onReachedEnd function will trigger
    onReachedEnd: Function // this function will be triggred when the scrollview will reach end - the offset provide in props
}
const AnimatedHeader = (props: Props) => {
    const {themeColors} = useTheme()
    const headerTitleReference = React.useRef<any>(null)
    const [imageColors, setImageColors] = useState<string[]>([
        themeColors.surfacelight[0],
        themeColors.surfacelight[0],
    ])

    /**
     * show the header when the user scrolls back to the top
     * of the screen and show the image not the animated fixed header
     */
    const showHeaderTitle = () => {
        headerTitleReference.current?.slideInDown(300)
    }
    /**
     * hide the image header and progressively show the fixed animated header
     * this function will be called when the user scroll down
     */
    const hideHeaderTitle = () => {
        headerTitleReference.current?.slideOutUp(600)
    }

    /**
     * this function will only be called once at the first render of this component
     * this function will hide the fixed animated header at one instance (instantly in 10ms)
     * since no user experience should be affected
     */
    const hideHeaderTitleAtInitialRender = () => {
        headerTitleReference.current?.slideOutUp(10)
    }

    const checkEndReached = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: OnScrollProps) => {
        if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - props.infiniteScrollOffset
        )
            props.onReachedEnd()
    }

    useEffect(() => {
        /**
         * hide the animated down comming header at initial render
         * some bugs are happening - that this header is not hiding from intial render
         * else only when the user scrolls some part of the scroll-view
         */
        hideHeaderTitleAtInitialRender()
    }, [])

    useEffect(() => {
        /**
         * if the sorted background gradient colors array is provided than save it to the state and render
         * else
         * check if at least any background gradient colors arrray is provided than save it too
         * else fetch it manually from ImageColors module for now at least and render them
         */
        if (
            props.sortedBackgroundGradientColors &&
            props.sortedBackgroundGradientColors.length > 2
        ) {
            setImageColors(props.sortedBackgroundGradientColors)
        } else if (
            props.backgroundGradientColors &&
            props.backgroundGradientColors.length > 2
        ) {
            setImageColors(sortColors(props.backgroundGradientColors))
        } else {
            /**
             * fallback condition when the prop of background gradient colors array is not provided by the
             * parent component itself
             */
            ImageColors.getColors(props.headerImage, {
                fallback: themeColors.surfacelight[0],
                cache: false,
                key: 'sobyte_song_category_color',
            })
                .then((_res: any) => {
                    // storing the colors from light to dark brightness or strength
                    setImageColors(
                        sortColors([
                            _res.vibrant + '7F',
                            _res.dominant + '7F',
                            _res.darkVibrant + '7F',
                            _res.darkMuted + '7F',
                        ]),
                    )
                })
                .catch(_err => {
                    setImageColors([
                        themeColors.surfacelight[0],
                        themeColors.surfacelight[0],
                    ])
                })
        }
    }, [props.headerImage])

    return (
        <ImageHeaderScrollView
            onScroll={({nativeEvent}) => checkEndReached(nativeEvent)}
            scrollEventThrottle={400}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            scrollViewBackgroundColor={imageColors[0]}
            overlayColor={themeColors.surfacelight[0]}
            maxOverlayOpacity={DEFAULT_OVERLAY_OPACITY_MIN}
            minOverlayOpacity={DEFAULT_OVERLAY_OPACITY_MIN}
            maxHeight={350}
            minHeight={HEADER_MIN_HEIGHT}
            headerImage={{
                uri: props.headerImage,
            }}
            renderHeader={() => (
                <View
                    style={[
                        {
                            backgroundColor: 'black',
                        },
                        // globalStyles.lightBottomBorder,
                    ]}>
                    <FastImage
                        source={{
                            uri: props.headerImage,
                            priority: FastImage.priority.high,
                        }}
                        style={{
                            height: HEADER_MAX_HEIGHT,
                            width: Dimensions.get('window').width,
                            alignSelf: 'stretch',
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
            )}
            renderForeground={() => {
                return (
                    <View
                        style={[
                            globalStyles.animatedHeaderTitleContainer,
                            // globalStyles.lightBottomBorder,
                            {
                                height: '100%',
                            },
                        ]}>
                        <Pressable onPress={() => {}}>
                            <Text style={globalStyles.animatedHeaderTitle}>
                                {props.headerNameTitle}
                            </Text>
                        </Pressable>
                    </View>
                )
            }}
            renderFixedForeground={() => (
                <Animatable.View
                    style={[
                        globalStyles.animatedHeaderTitleContainer,
                        // globalStyles.lightBottomBorder,
                        {
                            backgroundColor: themeColors.transparent[0], //themeColors.surfacelight[0],
                            // borderBottomWidth: 1,
                        },
                    ]}
                    ref={headerTitleReference}>
                    <Text
                        style={[
                            globalStyles.animatedHeaderTitle,
                            {
                                fontSize: 20,
                            },
                        ]}>
                        {props.headerTitle}
                    </Text>
                </Animatable.View>
            )}>
            <TriggeringView
                onBeginHidden={showHeaderTitle}
                onHide={showHeaderTitle}
                onBeginDisplayed={hideHeaderTitle}
                onDisplay={hideHeaderTitle}>
                <View style={{backgroundColor: themeColors.themecolor[0]}}>
                    <LinearGradient colors={imageColors}>
                        {props.children}
                    </LinearGradient>

                    <PaddingBottomView
                        backgroundColor={imageColors[imageColors.length - 1]}
                    />
                </View>
            </TriggeringView>
        </ImageHeaderScrollView>
    )
}

export default AnimatedHeader
