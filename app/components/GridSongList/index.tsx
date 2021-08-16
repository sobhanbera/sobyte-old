import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'

import {SongObject} from '../../interfaces'
import {useSetting} from '../../context'
import {
    IMAGE_SIZE_TO_SHOW,
    IMAGE_MARGIN_TO_SHOW,
    IMAGE_PADDING_TO_SHOW,
} from '../../constants'
import GridSongList_SelfShimmer from './SelfShimmer'
import GridSongItem from './GridSongItem'

interface Props {
    content: Array<SongObject>
    contentLength: number | 0
    scrollDirection?: 'horizontal' | 'vertical'
    textColor: string
    subColor: string
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
    id: string
    imageQuality: string
}
const GridSongList = React.memo(
    ({
        subColor,
        textColor,
        content,
        id,
        shimmerDirection,
        imageQuality,
    }: Props) => {
        // const renderItem = React.useCallback(({item, index}) => {
        //     return (
        //         <GridSongItem
        //             id={id}
        //             item={item}
        //             index={index}
        //             imageQuality={imageQuality}
        //             subColor={subColor}
        //             textColor={textColor}
        //         />
        //     )
        // }, [])

        const keyExtractor = React.useCallback(
            (item: SongObject, _: number) => item.musicId,
            [],
        )

        return content[0].musicId.length <= 0 ? (
            <GridSongList_SelfShimmer shimmerDirection={shimmerDirection} />
        ) : (
            <FlatList
                key={id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                snapToInterval={
                    IMAGE_SIZE_TO_SHOW +
                    IMAGE_MARGIN_TO_SHOW +
                    IMAGE_PADDING_TO_SHOW +
                    IMAGE_PADDING_TO_SHOW * 2
                }
                data={content}
                keyExtractor={keyExtractor}
                renderItem={({item, index}) => {
                    return (
                        <GridSongItem
                            id={id}
                            item={item}
                            index={index}
                            imageQuality={imageQuality}
                            subColor={subColor}
                            textColor={textColor}
                        />
                    )
                }}
            />
        )
    },
)

export const styles = StyleSheet.create({
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

    dummyBackground: {
        backgroundColor: '#00000025',
        borderRadius: 6,
    },
    dummyText: {
        width: IMAGE_SIZE_TO_SHOW,
        height: 10,
        borderRadius: 2,
        marginVertical: 5,
        overflow: 'hidden',
    },
})

export default GridSongList
