import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FastImage from 'react-native-fast-image'

import {SongObject} from '../../interfaces'
import {
    formatArtists,
    getHightQualityImageFromLinkWithHeight,
    trimLargeString,
} from '../../utils'
import {songComponentsStyles} from '../../styles/global.styles'
import {
    DEFAULT_IMAGE_QUALITY,
    DEFAULT_TINY_ICON_SIZE,
    IMAGE_SMALL_SIZE_TO_SHOW,
} from '../../constants'

interface Props {
    song: SongObject
    onPress: Function
    subColor: string
    textColor: string
    imageQuality: string
}
const CommonSongItem = ({
    song,
    onPress,
    subColor,
    textColor,
    imageQuality,
}: Props) => {
    const songImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        imageQuality || DEFAULT_IMAGE_QUALITY,
        90,
    )
    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        song.thumbnails[0].url,
        song.thumbnails[0].height,
        720,
        100,
    )
    const artist = formatArtists(song.artist)

    return (
        <TouchableOpacity
            key={song.musicId}
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
            <View style={songComponentsStyles.commonCard}>
                <View style={songComponentsStyles.commonCardMain}>
                    <FastImage
                        source={{
                            uri: songImage,
                            priority: FastImage.priority.normal,
                        }}
                        style={{
                            width: IMAGE_SMALL_SIZE_TO_SHOW,
                            height: IMAGE_SMALL_SIZE_TO_SHOW,
                            borderRadius: 5,

                            borderWidth: 0.2,
                            borderColor: subColor,
                        }}
                    />

                    <View style={songComponentsStyles.commonSongDetails}>
                        <Text
                            numberOfLines={1}
                            style={[
                                songComponentsStyles.commonSongName,
                                {
                                    color: textColor,
                                },
                            ]}>
                            {trimLargeString(song.name)}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={[
                                songComponentsStyles.commonSongDetailsText,
                                {
                                    color: subColor,
                                },
                            ]}>
                            {artist}
                        </Text>
                    </View>
                </View>

                <Entypo
                    size={DEFAULT_TINY_ICON_SIZE}
                    name="dots-three-vertical"
                    color={subColor}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CommonSongItem
