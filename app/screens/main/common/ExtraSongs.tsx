import React, {useState} from 'react'
import {useEffect} from 'react'
import {ActivityIndicator} from 'react-native'

import {AnimatedHeader, CommonSongList, TopicTitle} from '../../../components'
import {
    BareFetchedSongObjectInstance,
    FetchedSongObject,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import {useTheme} from '../../../context'

// this interface is the data type which should be passed from the parent when
// launching this screen
export interface ExtraSongsScreenRouteDataProps {
    image: string
    title: string
}
interface Props {
    navigation?: any
    route: {
        params: {
            data: ExtraSongsScreenRouteDataProps
        }
    }
}
const ExtraSongs = (props: Props) => {
    const {data} = props.route.params

    // context api from top level parent components
    const {search, getContinuation} = useMusicApi()
    const {themeColors} = useTheme()

    /**
     * songs data related to the artist
     */
    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    // this variable will control the flow of loading data
    const [loading, setLoading] = useState<boolean>(false)
    // and this constant will control what type of data to show in the particular UI

    /**
     * whenever the user seem to be scrolling towards the end of the scrollview this function will be called and more
     * songs data will be loaded and rendered
     */
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
        search(data.title, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(_err => {})
    }, [])

    return (
        <AnimatedHeader
            headerImage={data.image}
            headerNameTitle={''}
            headerTitle={''}
            infiniteScrollOffset={100}
            onReachedEnd={continueLoadingData}>
            <TopicTitle title="Hits By Artist" />
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

export default ExtraSongs
