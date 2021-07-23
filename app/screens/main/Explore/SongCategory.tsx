import React, {useEffect, useState} from 'react'
import {Dimensions, ScrollView, ActivityIndicator} from 'react-native'

import {AnimatedHeader} from '../../../components'
import {
    BareFetchedSongObjectInstance,
    FetchedSongObject,
    SongCategory,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import CommonSongList from '../../../components/CommonSongList'
import {useTheme} from '../../../context'

const {width} = Dimensions.get('window')

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
    const {category, headerTitle} = props.route.params
    const {search, getContinuation} = useMusicApi()
    const {themeColors} = useTheme()

    const [loading, setLoading] = useState<boolean>(false)

    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    let i = 0
    const continueLoadingData = () => {
        console.log('MORE DATA LOADING', i++)
        if (
            loading === false &&
            songs.continuation.clickTrackingParams &&
            songs.continuation.continuation
        ) {
            console.log('REACHED', i++)
            setLoading(true)
            getContinuation('search', songs.continuation)
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
        search(category.name, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(_err => {})
    }, [category.id])

    return (
        <AnimatedHeader
            infiniteScrollOffset={550} // 550 px from the down of the screen when the onreachend function will be triggered
            onReachedEnd={continueLoadingData}
            headerImage={category.highimage}
            headerNameTitle={category.name}
            headerTitle={headerTitle || category.name}>
            <ScrollView
                horizontal
                pagingEnabled
                bounces={true}
                snapToAlignment={'end'}
                scrollEventThrottle={16}
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* songs list */}
                <CommonSongList songs={songs.content} />

                {/* artists list */}
                <CommonSongList songs={songs.content} />

                {loading ? (
                    <ActivityIndicator
                        color={themeColors.white[0]}
                        size={'small'}
                    />
                ) : null}
            </ScrollView>
        </AnimatedHeader>
    )
}

export default SongCategoryScreen
