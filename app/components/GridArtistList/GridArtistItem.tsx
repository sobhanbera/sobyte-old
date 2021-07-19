import React, {useMemo} from 'react'
import {View, Image, Pressable} from 'react-native'
import {Text} from 'react-native-paper'

import {ArtistObject} from '../../interfaces'
import {
    getHightQualityImageFromLinkWithHeight,
    trimLargeString,
} from '../../utils/Objects'
import {styles} from './'

interface Props {
    item: ArtistObject
    index: number
    subColor: string
    textColor: string
    id?: string
}

const GridArtistItem = React.memo(
    ({item, index, subColor, textColor}: Props) => {
        const highQualityImage = useMemo(
            () =>
                getHightQualityImageFromLinkWithHeight(
                    item.thumbnails[0].url,
                    item.thumbnails[0].height,
                    720,
                    100,
                ),
            [],
        )

        return (
            <Pressable onPress={() => {}}>
                <View
                    style={[
                        styles.contentWrapper,
                        index === 0
                            ? styles.firstContent
                            : //     : index === contentLength - 1
                              //     ? styles.lastContent
                              {},
                    ]}>
                    <Image
                        source={{uri: highQualityImage}}
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
