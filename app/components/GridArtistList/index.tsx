import React from 'react'
import {FlatList, StyleSheet} from 'react-native'

import {ArtistObject} from '../../interfaces'
import {useSetting} from '../../context'
import {
    IMAGE_SIZE_TO_SHOW,
    IMAGE_MARGIN_TO_SHOW,
    IMAGE_PADDING_TO_SHOW,
} from '../../constants'
import GridArtistItem_SelfShimmer from './SelfShimmer'
import GridArtistItem from './GridArtistItem'

interface Props {
    content: Array<ArtistObject>
    contentLength: number | 0
    scrollDirection?: 'horizontal' | 'vertical'
    textColor: string
    subColor: string
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
    id: string
    imageQuality?: string
}
const GridArtistList = React.memo(
    ({
        subColor,
        textColor,
        content,
        id,
        shimmerDirection,
        imageQuality,
    }: Props) => {
        return content[0].browseId.length <= 0 ? (
            <GridArtistItem_SelfShimmer shimmerDirection={shimmerDirection} />
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
                keyExtractor={(item, _) => item.browseId}
                renderItem={({item, index}) => {
                    return (
                        <GridArtistItem
                            id={id}
                            item={item}
                            index={index}
                            subColor={subColor}
                            textColor={textColor}
                        />
                    )
                }}
            />
        )
    },
)

function select() {
    const {imageQuality} = useSetting()
    return {
        imageQuality: imageQuality,
    }
}
function connect(WrappedComponent: React.ElementType, select: Function) {
    return function (props: any) {
        const selectors = select()
        return <WrappedComponent {...selectors} {...props} />
    }
}

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
        borderRadius: 180,
        maxWidth: IMAGE_SIZE_TO_SHOW,
        maxHeight: IMAGE_SIZE_TO_SHOW,
        width: IMAGE_SIZE_TO_SHOW,
        height: IMAGE_SIZE_TO_SHOW,
        overflow: 'hidden',
    },
    artistTitle: {
        width: IMAGE_SIZE_TO_SHOW,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
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

// export default connect(GridArtistList, select)
export default GridArtistList
