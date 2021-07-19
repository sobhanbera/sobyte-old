import React, {useMemo} from 'react'
import {View, Image, Pressable} from 'react-native'
import {Text} from 'react-native-paper'

import {ArtistObject} from '../../interfaces'
import {
    getHighQualityImageFromSongImage,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {styles} from './'
import {DEFAULT_IMAGE_QUALITY} from '../../constants'
import {usePlayer} from '../../context'

interface Props {
    item: ArtistObject
    imageQuality: string
    index: number
    subColor: string
    textColor: string
    id?: string
    play: Function
}

const GridSongItem = React.memo(
    ({item, imageQuality, index, subColor, textColor, play}: Props) => {
        const songImage = useMemo(
            () =>
                getHighQualityImageFromSongImage(
                    item.thumbnails[0],
                    imageQuality || DEFAULT_IMAGE_QUALITY,
                ),
            [],
        )
        const highQualityImage = useMemo(
            () => getHighQualityImageFromSongImage(item.thumbnails[0], '720'),
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
                </View>
            </Pressable>
        )
    },
)

function select() {
    const {play} = usePlayer()
    return {
        play: play,
    }
}
function connect(WrappedComponent: React.ElementType, select: Function) {
    return function (props: any) {
        const selectors = select()
        return <WrappedComponent {...selectors} {...props} />
    }
}

export default connect(GridSongItem, select)
