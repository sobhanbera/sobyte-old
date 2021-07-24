import React, {useEffect, useState} from 'react'
import {
    Dimensions,
    ScrollView,
    ActivityIndicator,
    View,
    Text,
} from 'react-native'

import {AnimatedHeader} from '../../../components'
import {
    BareFetchedArtistObjectInstance,
    BareFetchedSongObjectInstance,
    FetchedArtistObject,
    FetchedSongObject,
    SongCategory,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import CommonSongList from '../../../components/CommonSongList'
import CommonArtistList from '../../../components/CommonArtistList'
import {useTheme} from '../../../context'
import {songComponentsStyles} from '../../../styles/global.styles'

const {width} = Dimensions.get('screen')

const DataList = [
    {
        name: 'Songs',
        id: 'songs',
        selected: 0,
    },
    {
        name: 'Artists',
        id: 'artists',
        selected: 1,
    },
]
interface OnScrollProps {
    layoutMeasurement: {
        height: number
        width: number
    }
    contentOffset: {
        x: number
        y: number
    }
    contentSize: {
        height: number
        width: number
    }
}
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
    const [selected, setSelected] = useState<any>(DataList[0].selected)

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

    // scrollview reference variable to perform button pressed and auto scroll animation
    // and many more...
    const contentScroll = React.useRef<ScrollView>(null)

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
            console.log('LOADING MORE SONGS')
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
                    console.log('ERR CONTINUE FETCH SONGS')
                })
        }
    }

    useEffect(() => {
        // initial render will make a api request and fetch all the neccessary data require
        // to show in the UI for ex songs list, playlists data, artists data, etc
        search(category.name, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(_err => {
                console.log('ERR FETCH SONGS')
            })

        search(category.name, 'ARTIST')
            .then((res: FetchedArtistObject) => {
                setArtists(res)
            })
            .catch(_err => {
                console.log('ERR FETCH ARTISTS')
            })

        return () => {
            setSongs(BareFetchedSongObjectInstance)
            setArtists(BareFetchedArtistObjectInstance)
            setLoading(false)
            setSelected(DataList[0].selected)
        }
    }, [category.id])

    const onScroll = (scrollProps: OnScrollProps) => {
        // this is the current position of the scroll view on the UI
        const currentRoughEstimatedScrollPosition = Math.floor(
            scrollProps.contentOffset.x,
        )
        // we are checking if the scroll view is around any offset of any type of content
        // in this way we are not setting state many time
        // if the difference is around 5px we will set the state
        if (currentRoughEstimatedScrollPosition % Math.floor(width) <= 5) {
            const currSelected = Math.floor(
                currentRoughEstimatedScrollPosition / Math.floor(width),
            )
            setSelected(currSelected)
        }
    }

    const changeData = (selector: any) => {
        // when the user clicks on any data type button
        // scrollview will scroll to that position
        // for ex: for songs it will move to `width*0 = 0` position
        // and for artists it will move to `width*1 = width` position
        // and playlist it will move to `width*2` position
        // and so on.
        setSelected(selector)
        contentScroll.current?.scrollTo({
            animated: true,
            x: width * selector,
            y: 0,
        })
    }

    return (
        <AnimatedHeader
            infiniteScrollOffset={1500} // 1500 px from the down of the screen when the onreachend function will be triggered
            onReachedEnd={continueLoadingData}
            headerImage={category.highimage}
            headerNameTitle={category.name}
            headerTitle={headerTitle || category.name}>
            {/* different topics or tags */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View
                    style={
                        songComponentsStyles.containerTopicTextHolderSection
                    }>
                    {DataList.map(data => {
                        return (
                            <Text
                                key={data.id}
                                onPress={() => changeData(data.selected)}
                                style={[
                                    songComponentsStyles.containerTopicText,
                                    selected == data.selected
                                        ? songComponentsStyles.containerTopicTextSelected
                                        : {},
                                ]}>
                                {data.name}
                            </Text>
                        )
                    })}
                </View>
            </ScrollView>

            {/* main content here */}
            <ScrollView
                ref={contentScroll}
                onScroll={({nativeEvent}) => onScroll(nativeEvent)}
                horizontal
                pagingEnabled
                bounces={true}
                snapToAlignment={'center'}
                scrollEventThrottle={16}
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* songs list */}
                <CommonSongList songs={songs.content} />

                {/* artists list */}
                <CommonArtistList artists={artists.content} />
            </ScrollView>

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
