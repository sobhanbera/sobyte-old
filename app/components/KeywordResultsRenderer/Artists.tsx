import React, {useState, useEffect} from 'react'
import {BlockCardArtistList} from '..'
import {useMusicApi} from '../../api'
import {
    ArtistObject,
    BareArtistObject,
    FetchedArtistObject,
} from '../../interfaces'

interface Props {
    keywords: string[]
    title: string
    refreshing: boolean
    navigation: any
}
const SongsKeywordResultsRenderer = ({
    keywords,
    title,
    refreshing,
    navigation,
}: Props) => {
    const {search, error} = useMusicApi()

    /**
     * "main" @state of the list for all the types of music list data...
     */
    const [artistsData, setArtistsData] = useState<ArtistObject[]>([
        BareArtistObject,
    ])

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     * now also saving the data to the local storage for offline usage later on...
     */
    const loadArtistsData = () => {
        // search results for the keyword provided in the props
        // promising all because we need many type of artists data like romance, hits, mashups, pops, etc... in one variable.
        Promise.all(
            keywords.map(keyword => search(keyword, 'ARTIST', false, true)), // providing an array of the promises
        )
            .then((res: FetchedArtistObject[]) => {
                // this is the list which would be assigned to the main UI component or the state of this component
                const DiffTypesOfArtistsList: ArtistObject[] = []
                for (let i in res) {
                    // if the list contains more than 10 artists that's enough to show
                    // In the UI
                    if (DiffTypesOfArtistsList.length >= 10) break
                    for (let j in res[i].content) {
                        if (DiffTypesOfArtistsList.length >= 10) break
                        // check weather the artist already exists in the list if not
                        // then extend the list with the new artists...
                        const ArtistAlreadyExistsInList =
                            DiffTypesOfArtistsList.filter(
                                artist =>
                                    artist.browseId ===
                                    res[i].content[j].browseId,
                            )
                        /**
                         * if @variable ArtistAlreadyExistsInList length is more than 0 than the artist is already present in the list no
                         * need to add it again...
                         */
                        if (ArtistAlreadyExistsInList.length <= 0) {
                            DiffTypesOfArtistsList.push(res[i].content[j])
                        }
                    }
                }
                setArtistsData(DiffTypesOfArtistsList)
            })
            .catch(_err => {})
    }

    useEffect(() => {
        // loading the songs data or the music data after rendering the component skeleton
        // or each time when the keyword or any error occurs...
        loadArtistsData()
    }, [keywords, error]) // because whenever the value of error changes the init function of the music api is called... in most cases...

    // if the user has done a task named - pull to refresh then this function will be execute
    useEffect(() => {
        if (refreshing) loadArtistsData()
    }, [refreshing])

    return (
        <BlockCardArtistList
            navigation={navigation}
            cardTitle={title}
            artistsData={artistsData}
            noBackground={true}
            appearanceType="not-card"
        />
    )
}

export default SongsKeywordResultsRenderer
