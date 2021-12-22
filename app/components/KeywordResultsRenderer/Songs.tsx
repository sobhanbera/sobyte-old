import React, {useState, useEffect} from 'react'
import {BlockCardSongsList} from '..'
import {useMusicApi} from '../../api'
import {
    BareFetchedSongObjectInstance,
    FetchedSongObject,
} from '../../interfaces'
import {INITIAL_NUMBER_OF_TRACKS_TO_LOAD_IN_EXPLORE_TAB} from '../../constants'
import {formatArtists} from '../../utils'

interface Props {
    keyword: string
    title: string
    refreshing: boolean
}
const SongsKeywordResultsRenderer = ({keyword, title, refreshing}: Props) => {
    const {search, error} = useMusicApi()

    /**
     * "main" @state of the list for all the types of music list data...
     */
    const [musicData, setMusicData] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     * now also saving the data to the local storage for offline usage later on...
     */
    const loadMusicData = () => {
        // search results for the keyword provided in the props
        search(keyword, 'SONG', false, true, '', [
            0,
            INITIAL_NUMBER_OF_TRACKS_TO_LOAD_IN_EXPLORE_TAB,
        ])
            .then((results: FetchedSongObject) => {
                setMusicData(results)
                console.log(keyword, title)
                // for(let i in results.content) {
                //     console.log(results.content[i].name, formatArtists(results.content[i].artist), results.content[i].thumbnails[0].url)
                // }
            })
            .catch(_err => {})
    }

    useEffect(() => {
        // loading the songs data or the music data after rendering the component skeleton
        // or each time when the keyword or any error occurs...
        loadMusicData()
    }, [keyword, error]) // because whenever the value of error changes the init function of the music api is called... in most cases...

    // if the user has done a task named - pull to refresh then this function will be execute
    useEffect(() => {
        if (refreshing) loadMusicData()
    }, [refreshing])

    return (
        <BlockCardSongsList
            keyword={keyword}
            cardTitle={title}
            musicData={musicData}
            noBackground={true}
            appearanceType="not-card"
        />
    )
}

export default SongsKeywordResultsRenderer
