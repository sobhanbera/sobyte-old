import React from 'react'
import {FlatList, StyleSheet, ListRenderItemInfo} from 'react-native'

import {SongObject} from '../../interfaces'
import {
    IMAGE_SIZE_TO_SHOW,
    IMAGE_MARGIN_TO_SHOW,
    IMAGE_PADDING_TO_SHOW,
    DEFAULT_IMAGE_BORDER_RADIUS,
    COMMON_COLORS,
    DEFAULT_TITLE_MARGIN,
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
        const renderItem = React.useCallback(
            (itemDetails: ListRenderItemInfo<SongObject>) => {
                return (
                    <GridSongItem
                        id={id}
                        item={itemDetails.item}
                        index={itemDetails.index}
                        imageQuality={imageQuality}
                        subColor={subColor}
                        textColor={textColor}
                    />
                )
            },
            [],
        )

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
                    IMAGE_PADDING_TO_SHOW
                }
                data={content}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        )
    },
)

export const styles = StyleSheet.create({
    contentWrapper: {
        // backgroundColor: '#0000007f',
        flex: 1,
        paddingBottom: 8,
        overflow: 'hidden',
        borderRadius: DEFAULT_IMAGE_BORDER_RADIUS,

        paddingHorizontal: 0,
        marginHorizontal: IMAGE_MARGIN_TO_SHOW,
    },
    firstContent: {
        marginLeft: IMAGE_MARGIN_TO_SHOW,
    },
    lastContent: {
        marginRight: IMAGE_MARGIN_TO_SHOW,
    },
    surrounding: {
        borderWidth: 1,
        backgroundColor: COMMON_COLORS.black[0] + '60',
        borderColor: COMMON_COLORS.white[0] + '10',
    },
    contentImage: {
        borderRadius: 6,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        maxWidth: IMAGE_SIZE_TO_SHOW,
        maxHeight: IMAGE_SIZE_TO_SHOW,
        width: IMAGE_SIZE_TO_SHOW,
        height: IMAGE_SIZE_TO_SHOW,
    },
    songTitle: {
        width: IMAGE_SIZE_TO_SHOW,
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 1,
        paddingHorizontal: DEFAULT_TITLE_MARGIN,
    },
    artist: {
        width: IMAGE_SIZE_TO_SHOW,
        fontSize: 12,
        paddingTop: 1,
        paddingBottom: IMAGE_MARGIN_TO_SHOW + 3,
        paddingHorizontal: DEFAULT_TITLE_MARGIN,
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
