import React, {useMemo} from 'react'
import {View, Image, Pressable} from 'react-native'
import {Text} from 'react-native-paper'
import FastImage from 'react-native-fast-image'

import {SongObject} from '../../interfaces'
import {
    formatArtists,
    trimLargeString,
    getHightQualityImageFromLinkWithHeight,
} from '../../utils/Objects'
import {styles} from './'
import {DEFAULT_IMAGE_QUALITY} from '../../constants'
import {usePlayer} from '../../context'

interface Props {
    item: SongObject
    imageQuality: string
    index: number
    subColor: string
    textColor: string
    id?: string
    play: Function
}

const GridSongItem = React.memo(
    ({item, imageQuality, index, subColor, textColor, play, id}: Props) => {
        const songImage = useMemo(
            () =>
                getHightQualityImageFromLinkWithHeight(
                    item.thumbnails[0].url,
                    item.thumbnails[0].height,
                    imageQuality || DEFAULT_IMAGE_QUALITY,
                    100,
                ),
            [],
        )
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
        const artist = useMemo(() => formatArtists(item.artist), [])

        return (
            <Pressable
                onPress={() =>
                    play({
                        id: item.musicId,
                        duration: item.duration,
                        title: item.name,
                        artist: artist,
                        artwork: highQualityImage,
                        playlistId: item.playlistId,
                    })
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
