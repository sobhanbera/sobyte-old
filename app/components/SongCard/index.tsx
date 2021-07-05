import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

import {useSetting} from '../../context'
import {
    getHighQualityImageFromSongImage,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {
    IMAGE_MARGIN_TO_SHOW,
    IMAGE_PADDING_TO_SHOW,
    IMAGE_SIZE_TO_SHOW,
    IMAGE_SMALL_SIZE_TO_SHOW,
} from '../../constants'
import {SongObject} from '../../interfaces'

interface Props {
    textColor: string
    subColor: string
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
    onPress: Function
    song: SongObject
}

const SongCard = ({
    song,
    onPress,
    textColor,
    subColor,
    shimmerDirection,
}: Props) => {
    const {imageQuality} = useSetting()

    const songImage = getHighQualityImageFromSongImage(
        song.thumbnails[0],
        imageQuality || '200',
    )
    const highQualityImage = getHighQualityImageFromSongImage(
        song.thumbnails[0],
        '450',
    )
    const artist = formatArtists(song.artist)

    if (song.musicId.length <= 0) return null

    return (
        <TouchableOpacity
            onPress={() =>
                onPress({
                    id: song.musicId,
                    duration: song.duration,
                    title: song.name,
                    artist: artist,
                    artwork: highQualityImage,
                })
            }
            activeOpacity={0.8}>
            <View>
                <Image
                    source={{uri: songImage}}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 5,
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default SongCard
