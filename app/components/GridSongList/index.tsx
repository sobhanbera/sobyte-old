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
                // horizontal
                numColumns={GRID_COLUMNS}
                data={props.content}
                keyExtractor={(item, _) => item.musicId}
                renderItem={({item}) => {
                    // console.log(item.thumbnails[1].url)

                    return (
                        <View>
                            <Image
                                source={{uri: item.thumbnails[1].url}}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default GridSongList
