import React from 'react'
import {View, FlatList, Image, StyleSheet} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'

import {SongObject} from '../../interfaces'
import {
    getHighQualityImageFromSongImage,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {useSetting} from '../../context'
import {
    IMAGE_SIZE_TO_SHOW,
    IMAGE_MARGIN_TO_SHOW,
    IMAGE_PADDING_TO_SHOW,
    DEFAULT_ICON_SIZE,
    DEFAULT_LARGE_ICON_SIZE,
    DEFAULT_SMALL_ICON_SIZE,
} from '../../constants'
import {Scaler} from '../'

interface Props {
    content: Array<SongObject>
    contentLength: number | 0
    scrollDirection?: 'horizontal' | 'vertical'
    textColor: string
    subColor: string
}
const GridSongList = (props: Props) => {
    const {imageQuality} = useSetting()

    return props.content[0].musicId.length <= 0 ? null : (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            // numColumns={GRID_COLUMNS}
            snapToInterval={
                IMAGE_SIZE_TO_SHOW +
                IMAGE_MARGIN_TO_SHOW +
                IMAGE_PADDING_TO_SHOW +
                IMAGE_PADDING_TO_SHOW * 2
            }
            data={props.content}
            keyExtractor={(item, _) => item.musicId}
            renderItem={({item, index}) => {
                const songImage = getHighQualityImageFromSongImage(
                    item.thumbnails[0],
                    imageQuality || '200',
                )
                const artist = formatArtists(item.artist)

                return (
                    <Scaler onPress={() => {}}>
                        <View
                            style={[
                                styles.contentWrapper,
                                index === 0
                                    ? styles.firstContent
                                    : index === props.contentLength - 1
                                    ? styles.lastContent
                                    : {},
                            ]}>
                            <Scaler onPress={() => {}}>
                                <Image
                                    source={{uri: songImage}}
                                    style={styles.contentImage}
                                />
                            </Scaler>
                            <Text
                                style={[
                                    styles.songTitle,
                                    {
                                        color: props.textColor,
                                    },
                                ]}>
                                {trimLargeString(item.name)}
                            </Text>
                            <Text
                                style={[
                                    styles.artist,
                                    {
                                        color: props.subColor,
                                    },
                                ]}>
                                {artist}
                            </Text>
                        </View>
                    </Scaler>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        // backgroundColor: '#0000007f',
        paddingTop: 10,
        borderRadius: 6,

        paddingHorizontal: IMAGE_PADDING_TO_SHOW,
        marginHorizontal: IMAGE_MARGIN_TO_SHOW,
    },
    firstContent: {
        paddingLeft: IMAGE_PADDING_TO_SHOW * 2,
        marginLeft: IMAGE_MARGIN_TO_SHOW * 2,
    },
    lastContent: {
        paddingRight: IMAGE_PADDING_TO_SHOW * 2,
        marginRight: IMAGE_MARGIN_TO_SHOW * 2,
    },
    contentImage: {
        borderRadius: 6,
        maxWidth: IMAGE_SIZE_TO_SHOW,
        maxHeight: IMAGE_SIZE_TO_SHOW,
        width: IMAGE_SIZE_TO_SHOW,
        height: IMAGE_SIZE_TO_SHOW,
    },
    songTitle: {
        width: IMAGE_SIZE_TO_SHOW,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 2,
    },
    artist: {
        width: IMAGE_SIZE_TO_SHOW,
        fontSize: 14,
        paddingTop: 3,
        paddingBottom: 2,
    },
})

export default GridSongList
