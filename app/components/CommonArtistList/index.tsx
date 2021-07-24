import React from 'react'
import {View, Dimensions} from 'react-native'

import {ArtistObject} from '../../interfaces'
import CommonArtistItem from '../CommonArtistItem'
import SelfShimmer from './SelfShimmer'
import {useSetting, useTheme} from '../../context'

const {width} = Dimensions.get('window')

interface Props {
    artists: Array<ArtistObject>
}
const CommonArtistList = ({artists}: Props) => {
    const {imageQuality} = useSetting()
    const {themeColors} = useTheme()

    const onPressArtist = (artist: any) => {
        console.log(artist)
    }

    return (
        <View style={{width}}>
            {artists[0].browseId.length <= 0 ? (
                <SelfShimmer shimmerDirection="right" />
            ) : (
                artists.map((artist, index) => {
                    return (
                        <CommonArtistItem
                            key={`${artist.browseId}-${index}`}
                            artist={artist}
                            onPress={onPressArtist}
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

export default CommonArtistList
