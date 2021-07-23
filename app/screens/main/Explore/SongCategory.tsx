import React, {useEffect, useState} from 'react'

import {AnimatedHeader} from '../../../components'
import {
    BareFetchedSongObjectInstance,
    FetchedSongObject,
    SongCategory,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import CommonSongList from '../../../components/CommonSongList'

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
    const {search} = useMusicApi()

    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    useEffect(() => {
        search(category.name, 'SONG')
            .then((res: FetchedSongObject) => {
                console.log(res.content.length)
                setSongs(res)
            })
            .catch(_err => {})
    }, [category.id])

    let i = 0

    return (
        <AnimatedHeader
            infiniteScrollOffset={550} // 550 px from the down of the screen when the onreachend function will be triggered
            onReachedEnd={() => {
                console.log(i++)
            }}
            headerImage={category.highimage}
            headerNameTitle={category.name}
            headerTitle={headerTitle || category.name}>
            <CommonSongList songs={songs.content} />
        </AnimatedHeader>
    )
}

export default SongCategoryScreen
