import React, {useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'

import {
    BareFetchedArtistObjectInstance,
    BareFetchedSongObjectInstance,
    FetchedArtistObject,
    FetchedSongObject,
    SongCategory,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import {useTheme} from '../../../context'
import {
    AnimatedHeader,
    CommonSongList,
    GridArtistList,
    TopicTitle,
} from '../../../components'

interface Props {
    navigation?: any
    route: {
        params: {
            category: SongCategory
            headerTitle: string
        }
    }
}
const SongCategoryScreen = (props: Props) => {
    // the routes which are passed by the one level up navigation system manager
    const {category, headerTitle} = props.route.params

    // context api from top level parent components
    const {search, getContinuation} = useMusicApi()
    const {themeColors} = useTheme()

    // this variable will control the flow of loading data
    const [loading, setLoading] = useState<boolean>(false)
    // and this constant will control what type of data to show in the particular UI

    /**
     * songs list, artists list, playlists data, albums,
     * and many more...
     */
    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [artists, setArtists] = useState<FetchedArtistObject>(
        BareFetchedArtistObjectInstance,
    )

    const continueLoadingData = () => {
        // this function will be called each time when the user is getting closed to the
        // end of the scrollview
        // after which this function will load futhure more data and show in
        // the UI...
        if (
            loading === false &&
            songs.continuation.clickTrackingParams &&
            songs.continuation.continuation
        ) {
            setLoading(true)
            getContinuation('search', songs.continuation, 'SONG')
                .then((res: FetchedSongObject) => {
                    const data = songs.content.concat(res.content)
                    setSongs({
                        content: data,
                        continuation: res.continuation,
                    })
                    setLoading(false)
                })
                .catch(_err => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        // initial render will make a api request and fetch all the neccessary data require
        // to show in the UI for ex songs list, playlists data, artists data, etc
        search(category.name, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
                setLoading(true)
                getContinuation('search', res.continuation, 'SONG')
                    .then((res: FetchedSongObject) => {
                        const data = songs.content.concat(res.content)
                        setSongs({
                            content: data,
                            continuation: res.continuation,
                        })
                        setLoading(false)
                    })
                    .catch(_err => {
                        setLoading(false)
                    })
            })
            .catch(_err => {})

        search(category.name, 'ARTIST')
            .then((res: FetchedArtistObject) => {
                setArtists(res)
            })
            .catch(_err => {})

        return () => {
            // setSongs(BareFetchedSongObjectInstance)
            // setArtists(BareFetchedArtistObjectInstance)
            setLoading(false)
        }
    }, [category.id])

    return (
        <AnimatedHeader
            infiniteScrollOffset={1500} // 1500 px from the down of the screen when the onreachend function will be triggered
            onReachedEnd={continueLoadingData}
            headerImage={category.highimage}
            headerNameTitle={category.name}
            sortedBackgroundGradientColors={category.color}
            headerTitle={headerTitle || category.name}>
            {/* main content here */}
            <TopicTitle title={'Artists'} />
            <GridArtistList
                navigation={props.navigation}
                content={artists.content}
                contentLength={artists.content.length}
                subColor={themeColors.text[0] + '70'}
                textColor={themeColors.text[0] + 'E7'}
                shimmerDirection={'right'}
                scrollDirection="horizontal"
                id={'demo'}
            />

            <TopicTitle title={'Songs'} />
            <CommonSongList songs={songs.content} />

            {loading ? (
                <ActivityIndicator
                    color={themeColors.white[0]}
                    size={'small'}
                />
            ) : null}
        </AnimatedHeader>
    )
}

export default SongCategoryScreen
