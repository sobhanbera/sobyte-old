import React from 'react'
import { View, Text } from 'react-native'

import { AnimatedHeader } from '../../../components'
import { ArtistObject } from '../../../interfaces'

interface Props {
    navigation?: any
    route: {
        params: {
            artist: ArtistObject
        }
    }
}
const ArtistDetail = (props: Props) => {
    const continueLoadingData = () => {}

    return (
        <AnimatedHeader 
            headerImage={''}
            headerNameTitle={''}
            headerTitle={''}
            infiniteScrollOffset={100}
            onReachedEnd={continueLoadingData}>

        </AnimatedHeader>
    )
}

export default ArtistDetail
