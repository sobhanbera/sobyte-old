import React from 'react'
import {View, Dimensions} from 'react-native'

import {SongObject} from '../../interfaces'
import CommonSongItem from '../CommonSongItem'
import SelfShimmer from './SelfShimmer'
import {useSetting, useTheme} from '../../context'

const {width} = Dimensions.get('window')

interface Props {
    songs: Array<SongObject>
}
const CommonSongList = ({songs}: Props) => {
    const {imageQuality} = useSetting()
    const {themeColors} = useTheme()

    const onPressSong = (song: any) => {
        console.log(song)
    }

    return (
        <View style={{width}}>
            {songs[0].musicId.length <= 0 ? (
                <SelfShimmer shimmerDirection="right" />
            ) : (
                songs.map((song, index) => {
                    return (
                        <CommonSongItem
                            key={`${song.musicId}-${song.playlistId}-${index}`}
                            song={song}
                            onPress={onPressSong}
                            imageQuality={imageQuality}
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                        />
                    )
                })
            )}
        </View>
    )
}

export default CommonSongList
