import React from 'react'
import {View, FlatList, Image, StyleSheet, Pressable} from 'react-native'
import {Text} from 'react-native-paper'

import {SongObject} from '../../interfaces'
import {
    getHighQualityImageFromSongImage,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {styles} from './'

interface Props {
    item: SongObject
    imageQuality: string
    onPress: Function
    index: number
    subColor: string
    textColor: string
    id?: string
}
const GridSongItem = (props: Props) => {
    const {id, item, index, imageQuality, onPress, subColor, textColor} = props
    const songImage = getHighQualityImageFromSongImage(
        item.thumbnails[0],
        imageQuality || '200',
    )
    const highQualityImage = getHighQualityImageFromSongImage(
        item.thumbnails[0],
        '450',
    )
    const artist = formatArtists(item.artist)

    console.log(`${id} - ${index}`)

    return (
        <Pressable
            onPress={() =>
                onPress({
                    id: item.musicId,
                    duration: item.duration,
                    title: item.name,
                    artist: artist,
                    artwork: highQualityImage,
                })
            }>
            <View
                style={[
                    styles.contentWrapper,
                    // index === 0
                    //     ? styles.firstContent
                    //     : index === contentLength - 1
                    //     ? styles.lastContent
                    //     : {},
                ]}>
                <Image
                    source={{uri: songImage}}
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
}

export default React.memo(GridSongItem)
