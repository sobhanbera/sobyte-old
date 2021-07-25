import React, {useState} from 'react'
import {useEffect} from 'react'
import {ActivityIndicator} from 'react-native'

import {AnimatedHeader, CommonSongList, TopicTitle} from '../../../components'
import {
    ArtistObject,
    BareFetchedSongObjectInstance,
    FetchedSongObject,
} from '../../../interfaces'
import {getHightQualityImageFromLinkWithHeight} from '../../../utils'
import {useMusicApi} from '../../../api'
import {useTheme} from '../../../context'

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

    // context api from top level parent components
    const {search, getContinuation} = useMusicApi()
    const {themeColors} = useTheme()

    /**
     * songs data related to the artist
     */
    const [songsByArtist, setSongsByArtist] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    // this variable will control the flow of loading data
    const [loading, setLoading] = useState<boolean>(false)
    // and this constant will control what type of data to show in the particular UI

    /**
     * whenever the user seem to be scrolling towards the end of the scrollview this function will be called and more
     * songs data will be loaded and rendered
     */
    const continueLoadingData = () => {}

    /**
     * high quality image of the artist
     * which will be passed to its children components wherever needed and here too...
     */
    const highQualityArtistImage = getHightQualityImageFromLinkWithHeight(
        artist.thumbnails[0].url,
        artist.thumbnails[0].height,
        720,
        100,
    )

    useEffect(() => {
        search(artist.name, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongsByArtist(res)
            })
            .catch(_err => {})
    }, [])

    return (
        <AnimatedHeader
            headerImage={highQualityArtistImage}
            headerNameTitle={''}
            headerTitle={''}
            infiniteScrollOffset={100}
            onReachedEnd={continueLoadingData}>
            <TopicTitle title="Hits By Artist" />
            <CommonSongList songs={songsByArtist.content} />

            {loading ? (
                <ActivityIndicator
                    color={themeColors.white[0]}
                    size={'small'}
                />
            ) : null}
        </AnimatedHeader>
    )
}

export default ArtistDetail
