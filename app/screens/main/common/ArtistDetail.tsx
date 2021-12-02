import React, {useState} from 'react'
import {useEffect} from 'react'
import {ActivityIndicator} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {
    AnimatedHeader,
    Caption,
    CommonSongList,
    TopicTitle,
} from '../../../components'
import {
    ArtistObject,
    BareFetchedSongObjectInstance,
    FetchedSongObject,
} from '../../../interfaces'
import {getHighQualityImageFromLinkWithHeight} from '../../../utils'
import {useMusicApi} from '../../../api'
import {useTheme} from '../../../context'
import {EXTRA_SONGS_SCREEN} from '../../../constants'

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
    const {search} = useMusicApi()
    const {themeColors} = useTheme()

    /**
     * songs data related to the artist
     */
    const [songsByArtist, setSongsByArtist] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    /**
     * high quality image of the artist
     * which will be passed to its children components wherever needed and here too...
     */
    const highQualityArtistImage = getHighQualityImageFromLinkWithHeight(
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

    const launchExtraSongsScreen = () => {
        props.navigation.navigate(EXTRA_SONGS_SCREEN, {
            data: {
                title: artist.name,
                image: highQualityArtistImage,
            },
        })
    }

    return (
        <AnimatedHeader
            headerImage={highQualityArtistImage}
            headerNameTitle={artist.name}
            headerTitle={artist.name}
            infiniteScrollOffset={100}
            onReachedEnd={() => {}}
        >
            <TopicTitle title="Hits By Artist" />
            <CommonSongList songs={songsByArtist.content} />

            <Caption
                title={'Load More'}
                onPress={launchExtraSongsScreen}
                rightIcon={
                    <Entypo
                        size={18}
                        name="chevron-small-right"
                        color={themeColors.text[0] + 'AF'}
                    />
                }
            />
        </AnimatedHeader>
    )
}

export default ArtistDetail
