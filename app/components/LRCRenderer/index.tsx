import React, {useRef, useEffect, useCallback, useState, useMemo} from 'react'
import {StyleProp, ViewStyle, Animated} from 'react-native'

import {LrcLine} from '../../interfaces'
import {
    AUTO_SCROLL_AFTER_USER_SCROLL_DURATION,
    FontUbuntuBold,
} from '../../constants'
import {getRandomNumberString} from '../../utils'
import {Text} from 'react-native'
import {FlatList} from 'react-native'

/**
 * @param lrcLineList the lrc string in form of array
 * @param currentTime the current position of the track/song in seconds
 * @returns provides all the data related to the current index of the lyrics line
 */
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
        for (let i = 0; i < length; i += 1) {
            const {millisecond} = lrcLineList[i]
            if (currentTime * 1000 < millisecond) {
                setCurrentIndex(i - 1)
                break
            }
        }
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
    /**
     * the main lrc string which includes the main lyrics lines of song/track
     */
    lrc: string
    /**
     * the current position of the current track/song in seconds
     */
    currentTime: number
    /**
     * container style for the lyrics string
     */
    style?: StyleProp<ViewStyle>
}
function LRCRenderer(props: Props) {
    const lrcRef = useRef<FlatList>(null)
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
        }, 0)
    }, [])

    // since the auto scroll is enabled by default for now...
    useEffect(() => {
        if (localAutoScroll) {
            lrcRef.current?.scrollToIndex({
                index: currentIndex <= 0 ? 0 : currentIndex - 1,
                animated: true,
            })
        }
    }, [currentIndex, localAutoScroll])

    return (
        <Animated.FlatList
            {...props}
            ref={lrcRef}
            data={lrcLineList}
            renderItem={({item, index}) => {
                return (
                    <LyricLineRenderer
                        key={item.id}
                        lyricLine={item}
                        currentIndex={currentIndex}
                        index={index}
                    />
                )
            }}
            snapToStart
            snapToAlignment="start"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            scrollToOverflowEnabled
            overScrollMode={'never'}
            onScroll={Animated.event(
                [], // we are not setting the value of the current position of scroll to any state because that is not needed
                {
                    useNativeDriver: false,
                    listener: _event => onScroll(), // instead we are doing some other tasks depending on wheather user is scrolling or not....
                },
            )}
            style={props.style}
        />
    )
}

interface Pops {
    lyricLine: LrcLine
    index: number
    currentIndex: number
}
const LyricLineRenderer = (props: Pops) => {
    const {lyricLine, index, currentIndex} = props
    const isActive = index === currentIndex

    return (
        <Text
            // onPress={() => seekTrackTo(item.currentLine.millisecond / 1000)}
            style={{
                textAlign: 'left',
                color: isActive ? 'white' : '#FFFFFFAF',
                fontSize: isActive ? 28 : 20,
                fontFamily: FontUbuntuBold,
                paddingHorizontal: 20,
                paddingVertical: isActive ? 11 : 15,
            }}>
            {lyricLine.content}
        </Text>
    )
}

export default LRCRenderer
export {parseLrc as ParseLRC}
