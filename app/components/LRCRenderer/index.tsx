import React, {useRef, useEffect, useCallback, useState, useMemo} from 'react'
import {
    ScrollView,
    StyleProp,
    Text,
    View,
    ViewStyle,
    Animated,
} from 'react-native'

import {LrcLine} from '../../interfaces'
import {AUTO_SCROLL_AFTER_USER_SCROLL} from '../../constants'
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
    lineRenderer: ({
        lrcLine,
        index,
        active,
    }: {
        lrcLine: LrcLine
        index: number
        active: boolean
    }) => React.ReactNode
    currentTime: number
    style?: StyleProp<ViewStyle>
    containerHeight: number
    lineHeight: number
    activeLineHeight: number
}
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
function LRCRenderer(props: Props) {
    const lrcRef = useRef<ScrollView>(null)
    const scrollX = React.useRef(new Animated.Value(0)).current
    const lrcLineList = useMemo(() => parseLrc(props.lrc), [props.lrc])
    const currentIndex = useCurrentIndex({
        lrcLineList,
        currentTime: props.currentTime,
    })
    // lineRenderer = ({lrcLine: {content}, active}) => (
    //     <Text style={{textAlign: 'center', color: active ? 'green' : '#666'}}>
    //         {content}
    //     </Text>
    // ),
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
            console.log('AF')
        }, AUTO_SCROLL_AFTER_USER_SCROLL)
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
            scrollEventThrottle={40}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {
                    useNativeDriver: false,
                    listener: _event => {
                        onScroll()
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
                    style={{width: '100%', height: 0.1 * props.containerHeight}}
                />

                {lrcLineList.map((lrcLine, index) => (
                    <View
                        key={lrcLine.id}
                        style={{
                            height:
                                currentIndex === index
                                    ? props.activeLineHeight
                                    : props.lineHeight,
                        }}>
                        {props.lineRenderer({
                            lrcLine,
                            index,
                            active: currentIndex === index,
                        })}
                    </View>
                ))}
            </View>
        </AnimatedScrollView>
    )
}

export default LRCRenderer
