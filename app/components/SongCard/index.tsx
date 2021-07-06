import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {useSetting} from '../../context'
import {
    getHighQualityImageFromSongImage,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_SMALL_ICON_SIZE,
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
            activeOpacity={0.75}>
            <View style={styles.card}>
                <View style={styles.cardMain}>
                    <Image
                        source={{uri: songImage}}
                        style={{
                            width: IMAGE_SMALL_SIZE_TO_SHOW,
                            height: IMAGE_SMALL_SIZE_TO_SHOW,
                            borderRadius: 5,

                            borderWidth: 0.2,
                            borderColor: subColor,
                        }}
                    />

                    <View style={styles.songDetails}>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.songName,
                                {
                                    color: textColor,
                                },
                            ]}>
                            {song.name}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.songDetailsText,
                                {
                                    color: subColor,
                                },
                            ]}>
                            {artist}
                        </Text>
                    </View>
                </View>

                <Entypo
                    size={DEFAULT_SMALL_ICON_SIZE - 2}
                    name="dots-three-vertical"
                    color={subColor}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardMain: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    songDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    songName: {
        fontSize: 17,
        maxWidth: 225,
        marginVertical: 2,
    },
    songDetailsText: {
        fontSize: 15,
        maxWidth: 225,
        width: 225,
    },
})

export default SongCard
