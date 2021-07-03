import React from 'react'
import {View, FlatList, Image} from 'react-native'

import {SongObject} from '../../interfaces'
import globalStyles from '../../styles/global.styles'
import {GRID_COLUMNS} from '../../constants'

interface Props {
    content: Array<SongObject> | undefined
    scrollDirection?: 'horizontal' | 'vertical'
}
const GridSongList = (props: Props) => {
    return (
        <View style={globalStyles.tinyPaddingView}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal
                data={props.content}
                keyExtractor={(item, _) => item.musicId}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Image source={{uri: item.thumbnails[0].url}} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default GridSongList
