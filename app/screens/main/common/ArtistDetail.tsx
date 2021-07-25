import React from 'react'
import {View, Text} from 'react-native'

import {AnimatedHeader} from '../../../components'
import {ArtistObject} from '../../../interfaces'
import {getHightQualityImageFromLinkWithHeight} from '../../../utils'

interface Props {
    navigation?: any
    route: {
        params: {
            artist: ArtistObject
        }
    }
}
const ArtistDetail = (props: Props) => {
    const {artist} = props.route.params

    const continueLoadingData = () => {}

    const highQualityArtistImage = getHightQualityImageFromLinkWithHeight(
        artist.thumbnails[0].url,
        artist.thumbnails[0].height,
        720,
        100,
    )

    return (
        <AnimatedHeader
            headerImage={highQualityArtistImage}
            headerNameTitle={''}
            headerTitle={''}
            infiniteScrollOffset={100}
            onReachedEnd={continueLoadingData}></AnimatedHeader>
    )
}

export default ArtistDetail
