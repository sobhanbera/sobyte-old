import React from 'react'

import {SongObject} from '../../interfaces'
import CommonSongItem from '../CommonSongItem'
import SelfShimmer from './SelfShimmer'
import {useSetting, useTheme} from '../../context'

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
        <>
            {songs[0].musicId.length <= 0 ? (
                <SelfShimmer shimmerDirection="right" />
            ) : (
                songs.map(song => {
                    return (
                        <CommonSongItem
                            song={song}
                            onPress={onPressSong}
                            imageQuality={imageQuality}
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                        />
                    )
                })
            )}
        </>
    )
}

export default CommonSongList
