import React from 'react'
import {View, Text} from 'react-native'
import {Lrc} from 'react-native-lrc'
import {useCallback} from 'react'

import {usePlayerProgress} from '../../../context'

interface Props {}
const SongLyricsRenderer = (props: Props) => {
    const {
        position, // unit - second
    } = usePlayerProgress()

    const lineRenderer = useCallback(
        ({lrcLine: {content}, active}) => (
            <Text
                style={{
                    textAlign: 'center',
                    color: active ? 'green' : 'red',
                }}>
                {content}
            </Text>
        ),
        [],
    )
    //   const onCurrentLineChange = useCallback(
    //     ({ lrcLine: { millisecond, content }, index }) =>
    //       console.log(index, millisecond, content),
    //     [],
    //   );

    return (
        <View>
            <Lrc
                style={{height: 300}}
                lrc={LRC_STRING}
                currentTime={position * 1000}
                lineHeight={10}
                activeLineHeight={20}
                lineRenderer={lineRenderer}
                autoScroll={true}
                autoScrollAfterUserScroll={1000}
                //   onCurrentLineChange={onCurrentLineChange}
            />
        </View>
    )
}

export default SongLyricsRenderer

// testing
const LRC_STRING = `
[00:00.00]by RentAnAdviser.com
[00:12.10]Green was the color of the grass
[00:13.80]Where I used to read at Centennial Park
[00:17.50]I used to think I would meet somebody there
[00:23.20]Teal was the color of your shirt
[00:25.40]When you were sixteen at the yogurt shop
[00:28.90]You used to work at to make a little money
[00:35.00]Time ******* time
[00:37.30]Gave me no comp***** gave me no signs
[00:40.30]Were there clues I didn't see
[00:47.00]And isn't it just so pretty to think
[00:50.80]All along there was some
[00:54.30]Invisible string
[00:57.30]Tying you to me
[01:09.60]Bad was the blood of the song in the cab
[01:12.20]On your first trip to LA
[01:15.20]You ate at my favorite spot for dinner
[01:20.90]Bold was the waitress on our three-year trip
[01:23.60]Getting lunch down by the Lakes
[01:26.60]She said I looked like an American singer
[01:32.40]Time mystical time
[01:34.70]Cutting me open then healing me fine
[01:37.70]Were there clues I didn't see
[01:44.90]And isn't it just so pretty to think
[01:48.10]All along there was some
[01:51.60]Invisible string
[01:54.70]Tying you to me
[02:05.60]A string that pulled me
[02:08.40]Out of all the wrong arms right into that dive bar
[02:14.00]Something wrapped all of my past mistakes in barbed wire
[02:19.90]Chains around my demons
[02:22.90]Wool to brave the seasons
[02:26.80]One single thread of gold
[02:29.40]**** me to you
[02:35.50]Cold was the steel of my axe to grind
[02:38.20]For the boys who broke my heart
[02:41.50]Now I send their babies presents
[02:47.20]Gold was the color of the leaves
[02:49.00]When I showed you around Centennial Park
[02:52.60]Hell was the journey but it brought me heaven
[02:58.70]Time wondrous time
[03:00.90]Gave me the blues and then purple-pink skies
[03:04.00]And it's cool
[03:05.00]Baby with me
[03:10.20]And isn't it just so pretty to think
[03:14.60]All along there was some
[03:17.90]Invisible string
[03:21.00]Tying you to me
[03:28.50]by RentAnAdviser.com`
