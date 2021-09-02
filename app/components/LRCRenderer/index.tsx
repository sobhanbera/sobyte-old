import React, {useRef, useEffect, useState, useMemo} from 'react'
import {StyleProp, ViewStyle, Animated} from 'react-native'

import {LrcLine} from '../../interfaces'
import {FontUbuntuBold} from '../../constants'
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

    // since the auto scroll is enabled by default for now...
    useEffect(() => {
        lrcRef.current?.scrollToIndex({
            index: currentIndex <= 0 ? 0 : currentIndex - 1, // here 1 is the offset of the number lyrics lines to show before current lyrics line
            animated: true,
        })
    }, [currentIndex])

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
            bounces
            alwaysBounceVertical
            bouncesZoom
            alwaysBounceHorizontal
            snapToStart
            snapToAlignment="start"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            scrollToOverflowEnabled
            overScrollMode={'never'}
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
