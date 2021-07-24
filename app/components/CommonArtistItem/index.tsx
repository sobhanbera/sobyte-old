import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {ArtistObject} from '../../interfaces'
import {
    firstLetterCap,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils'
import {songComponentsStyles} from '../../styles/global.styles'
import {DEFAULT_IMAGE_QUALITY, IMAGE_TINY_SIZE_TO_SHOW} from '../../constants'

interface Props {
    artist: ArtistObject
    onPress: Function
    subColor: string
    textColor: string
    imageQuality: string
}
const CommonSongItem = ({
    artist,
    onPress,
    subColor,
    textColor,
    imageQuality,
}: Props) => {
    const artistImage = getHightQualityImageFromLinkWithHeight(
        artist.thumbnails[0].url,
        artist.thumbnails[0].height,
        imageQuality || DEFAULT_IMAGE_QUALITY,
        90,
    )
    const highQualityImage = getHightQualityImageFromLinkWithHeight(
        artist.thumbnails[0].url,
        artist.thumbnails[0].height,
        imageQuality || DEFAULT_IMAGE_QUALITY,
        100,
    )

    if (artist.browseId.length <= 0) return null

    return (
        <TouchableOpacity
            key={artist.browseId}
            onPress={() =>
                onPress({
                    ...artist,
                    image: highQualityImage,
                })
            }
            activeOpacity={0.75}>
            <View style={songComponentsStyles.commonCard}>
                <View style={songComponentsStyles.commonCardMain}>
                    <Image
                        source={{uri: artistImage}}
                        style={{
                            width: IMAGE_TINY_SIZE_TO_SHOW,
                            height: IMAGE_TINY_SIZE_TO_SHOW,
                            borderRadius: 100,

                            borderWidth: 0.2,
                            borderColor: subColor,
                        }}
                    />

                    <Text
                        numberOfLines={1}
                        style={[
                            songComponentsStyles.commonArtistName,
                            {
                                color: textColor,
                            },
                        ]}>
                        {firstLetterCap(artist.name)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CommonSongItem
