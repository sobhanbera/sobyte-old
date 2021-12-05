import React, {useMemo} from 'react'
import {View, Image, Pressable} from 'react-native'
import {Text} from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import {ArtistObject} from '../../interfaces'
import {
    getHighQualityImageFromLinkWithHeight,
    trimLargeString,
} from '../../utils/Objects'
import {styles} from './'

interface Props {
    item: ArtistObject
    index: number
    subColor: string
    textColor: string
    id?: string
    onPress: Function
}

const GridArtistItem = React.memo(
    ({item, index, subColor, textColor, onPress}: Props) => {
        if (!item.thumbnails[0].url) {
            console.log('THUMBNAIL NOT FOUND GRID ARTIST ITEM', item)
        }
        const highQualityImage = getHighQualityImageFromLinkWithHeight(
            item.thumbnails[0].url,
            item.thumbnails[0].height,
            720,
            100,
        )

        return (
            <Pressable onPress={() => onPress()}>
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
                            uri: highQualityImage,
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
                            styles.artistTitle,
                            {
                                color: textColor,
                            },
                        ]}>
                        {trimLargeString(item.name)}
                    </Text>
                </View>
            </Pressable>
        )
    },
)

export default GridArtistItem
