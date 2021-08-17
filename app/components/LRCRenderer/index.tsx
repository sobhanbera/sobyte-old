import React, {useRef, useEffect, useCallback, useState, useMemo} from 'react'
import {ScrollView, StyleProp, View, ViewStyle, Animated} from 'react-native'

import {LrcLine} from '../../interfaces'
import {AUTO_SCROLL_AFTER_USER_SCROLL_DURATION} from '../../constants'
import {getRandomNumberString} from '../../utils'

const useCurrentIndex = ({
    lrcLineList,
    currentTime,
}: {
    lrcLineList: LrcLine[]
    currentTime: number
}) => {
    const [currentIndex, setCurrentIndex] = useState(-1)

    useEffect(() => {
        const {length} = lrcLineList
        let i = 0
        for (; i < length; i += 1) {
            const {millisecond} = lrcLineList[i]
            if (currentTime < millisecond) {
                break
            }
        }
        setCurrentIndex(i - 1)
    }, [currentTime, lrcLineList])

    return currentIndex
}

const LRC_LINE = /^(\[[0-9]+:[0-9]+(\.[0-9]+)?\])+.*/
const LRC_TIMESTAMP_WITH_BRACKET = /\[[0-9]+:[0-9]+(\.[0-9]+)?\]/g
const LRC_TIMESTAMP = /[0-9]+/g

/**
 * function to parse a valid lrc string to its seperated lines and timestamps
 * @returns a array of the timestamp and the line at that timestamp
 */
const parseLrc = (lrc: string): LrcLine[] => {
    const lrcLineList: LrcLine[] = []
    const lineList = lrc.split('\n')
    for (const line of lineList) {
        if (!LRC_LINE.test(line)) {
            continue
        }
        const timeStringList = line.match(
            LRC_TIMESTAMP_WITH_BRACKET,
        ) as string[]
        const content = line.replace(LRC_TIMESTAMP_WITH_BRACKET, '')
        for (const timeString of timeStringList) {
            const [minute, second, millisecond = '0'] = timeString.match(
                LRC_TIMESTAMP,
            ) as string[]
            lrcLineList.push({
                id: getRandomNumberString(),
                millisecond:
                    Number.parseInt(minute, 10) * 60 * 1000 +
                    Number.parseInt(second, 10) * 1000 +
                    Number.parseInt(millisecond, 10),
                content,
            })
        }
    }
    return lrcLineList.sort((a, b) => a.millisecond - b.millisecond)
}

interface Props {
    lrc: string
    lineRenderer(
        currentLine: LrcLine,
        index: number,
        currentIndex: number,
        active: boolean,
    ): React.ReactNode
    currentTime: number
    style?: StyleProp<ViewStyle>
    containerHeight: number
    lineHeight: number
    activeLineHeight: number
    spacing: number
}
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
function LRCRenderer(props: Props) {
    const lrcRef = useRef<ScrollView>(null)
    const lrcLineList = useMemo(() => parseLrc(props.lrc), [props.lrc])
    const currentIndex = useCurrentIndex({
        lrcLineList,
        currentTime: props.currentTime,
    })

    const [localAutoScroll, setLocalAutoScroll] = useState(true) // wheather to auto scroll the lyrics lines...

    // a reference variable for the duration after which the like animation will be disappear...
    let TimeOutVar = setTimeout(() => {}, 0)
    const onScroll = useCallback(() => {
        /**
         * clearing the previous timeout since we are going to do a new time out
         * if we don't clear the previous time out then
         * let the user have scrolled somepart of the lyrics to different position is 3sec here if the user again scrolled after 2sec (let)
         * then the auto scroll will end in 3-2=1sec which is not good since the duration is 3sec
         * so we are clearing the last timeout and overwiting it with a new one
         */
        clearTimeout(TimeOutVar)

        // setting the auto scroll to false since the user is scrolling continously...
        setLocalAutoScroll(false)

        // set a new timeout to make the auto scrolling enabled after some duration
        TimeOutVar = setTimeout(() => {
            setLocalAutoScroll(true)
        }, AUTO_SCROLL_AFTER_USER_SCROLL_DURATION)
    }, [])

    // since the auto scroll is enabled by default for now...
    useEffect(() => {
        if (localAutoScroll) {
            lrcRef.current?.scrollTo({
                y: currentIndex * props.lineHeight || 0,
                animated: true,
            })
        }
    }, [currentIndex, localAutoScroll, props.lineHeight])

    return (
        <AnimatedScrollView
            {...props}
            ref={lrcRef}
            scrollEventThrottle={16}
            scrollToOverflowEnabled
            overScrollMode={'never'}
            onScroll={Animated.event(
                [], // we are not setting the value of the current position of scroll to any state because that is not needed
                {
                    useNativeDriver: false,
                    listener: _event => {
                        onScroll() // instead we are doing some other tasks depending on wheather user is scrolling or not....
                    },
                },
            )}
            style={[
                {
                    // flex: 1,
                    height: props.containerHeight || 450,
                },
                props.style,
            ]}>
            <View>
                {/**
                 * auto scroll is true
                 * and this is the top spacing after which the main lyrics line will be showing
                 * in other works the offset from top where the current line will be rendered
                 */}
                <View
                    style={{
                        width: '100%',
                        height: 0.25 * props.containerHeight, // from the 25% of the total height available...
                    }}
                />

                {lrcLineList.map((lrcLine, index) =>
                    props.lineRenderer(
                        lrcLine,
                        index,
                        currentIndex,
                        currentIndex === index,
                    ),
                )}

                {/**
                 * auto scroll is true
                 * and this is the bottom spacing after which the main lyrics line will be showing
                 * in other works the offset from bottom where the current line will be rendered
                 */}

                <View
                    style={{
                        width: '100%',
                        height: props.spacing, // from the 25% of the total height available...
                    }}
                />
            </View>
        </AnimatedScrollView>
    )
}

export default LRCRenderer
export {parseLrc as ParseLRC}
