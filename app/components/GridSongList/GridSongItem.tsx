import React, {useMemo} from 'react'
import {View, Pressable} from 'react-native'
import {Text} from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import {SongObject} from '../../interfaces'
import {
    formatArtists,
    trimLargeString,
    getHighQualityImageFromLinkWithHeight,
} from '../../utils/Objects'
import {styles} from './'
import {DEFAULT_IMAGE_SIZE, DEFAULT_HIGH_IMAGE_QUALITY} from '../../constants'
import {usePlayer} from '../../context'

interface Props {
    item: SongObject
    imageQuality: string
    index: number
    subColor: string
    textColor: string
    id: string // here id is the search query for the search means the keyword of song searching...
}

const GridSongItem = React.memo(
    ({item, imageQuality, index, subColor, textColor, id}: Props) => {
        const {play} = usePlayer()

        const songImage = useMemo(
            () =>
                getHighQualityImageFromLinkWithHeight(
                    item.thumbnails[0].url,
                    item.thumbnails[0].height,
                    imageQuality || DEFAULT_IMAGE_SIZE,
                    DEFAULT_HIGH_IMAGE_QUALITY,
                ),
            [],
        )
        const artist = useMemo(() => formatArtists(item.artist), [])

        return (
            <Pressable
                onPress={() =>
                    play(
                        {
                            id: item.musicId,
                            duration: item.duration,
                            title: item.name,
                            artist: artist,
                            artwork: songImage,
                            playlistId: item.playlistId,
                            url: '',
                        },
                        {
                            ...item,
                            keyword: id,
                        },
                    )
                }>
                <View
                    style={[
                        styles.contentWrapper,
                        index === 0
                            ? styles.firstContent
                            : //     : index === contentLength - 1
                              //     ? styles.lastContent
                              {},
                    ]}>
                    <FastImage
                        source={{
                            uri: songImage,
                            priority: FastImage.priority.normal,
                            cache: 'immutable',
                        }}
                        style={[
                            styles.contentImage,
                            {
                                borderWidth: 0.2,
                                borderColor: subColor,
                            },
                        ]}
                    />
                    <Text
                        style={[
                            styles.songTitle,
                            {
                                color: textColor,
                            },
                        ]}>
                        {trimLargeString(item.name)}
                    </Text>
                    <Text
                        style={[
                            styles.artist,
                            {
                                color: subColor,
                            },
                        ]}>
                        {artist}
                    </Text>
                </View>
            </Pressable>
        )
    },
)

export default GridSongItem
