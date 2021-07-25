import React, {useEffect, useState} from 'react'
import {Text} from 'react-native-paper'
import {
    ScrollView,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import {
    GradientBackground,
    HeaderSearch,
    TopicTitle,
    GridArtistList,
    CommonSongList,
} from '../../../components'
import {useMusicApi, usePrompt, useTheme} from '../../../context'
import {
    DEFAULT_SMALL_ICON_SIZE,
    HEADER_MIN_HEIGHT,
    INFINITE_SCROLL_OFFSET,
    PaddingBottomView,
} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
    FetchedArtistObject,
    BareFetchedArtistObjectInstance,
} from '../../../interfaces'
import globalStyles from '../../../styles/global.styles'

// const BOTTOM_PADDING = 100
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
}
const SearchResult: React.FC<Props> = props => {
    const {surfacelight, text} = useTheme().themeColors
    const {getSearchSuggestions, search, getContinuation} = useMusicApi()
    const {prompt} = usePrompt()

    const [searchText, setSearchText] = useState<string>('')
    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [artists, setArtists] = useState<FetchedArtistObject>(
        BareFetchedArtistObjectInstance,
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [showSearchSuggestions, setShowSearchSuggestions] =
        useState<boolean>(false)

    const getSearchSuggestionsList = () => {
        if (searchText.length > 0)
            getSearchSuggestions(searchText)
                .then((res: string[]) => {
                    if (!showSearchSuggestions)
                        setShowSearchSuggestions(searchText.length > 0)
                    setSearchSuggestions(res)
                })
                .catch(err => {
                    console.log('ERROR ON GETTING SEARCH SUGGESTION', err)
                })
    }

    useEffect(() => {
        getSearchSuggestionsList()
    }, [searchText])

    const hideSuggestions = () => {
        setShowSearchSuggestions(false)
        Keyboard.dismiss()
    }

    const searchResults = (query: string = searchText) => {
        if (query.length <= 0) return null

        search(query, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
                setLoading(false)
            })
            .catch(_err => {
                prompt('Sorry! Cannot load data currently.', 'error')
                setLoading(false)
            })
    }

    const searchArtists = (query: string = searchText) => {
        if (query.length <= 0) return null

        Keyboard.dismiss()
        setShowSearchSuggestions(false)

        search(query, 'ARTIST')
            .then((res: FetchedArtistObject) => {
                setArtists(res)
            })
            .catch(_err => {
                prompt('Sorry! Cannot load data currently.', 'error')
                setLoading(false)
            })
    }

    const startSearch = (query: string = searchText) => {
        Keyboard.dismiss()

        setShowSearchSuggestions(false)
        setLoading(true)

        searchResults(query)
        searchArtists(query)
    }

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

    const checkEndReached = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: OnScrollProps) => {
        // if the scroll position reach some offset position where the data needs to be loaded
        // this function will call the continue loading data function
        if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - INFINITE_SCROLL_OFFSET
        )
            continueLoadingData()
    }

    return (
        <>
            {showSearchSuggestions === true ? (
                <View
                    style={{
                        position: 'absolute',
                        top: HEADER_MIN_HEIGHT,
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: surfacelight[0],
                        paddingVertical: 0,
                        zIndex: 1000,
                    }}>
                    {searchSuggestions.map(suggestion => {
                        return (
                            <TouchableOpacity
                                key={suggestion}
                                onPress={() => startSearch(suggestion)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#7f7f7f16',
                                    paddingHorizontal: 20,
                                    paddingVertical: 2,
                                }}>
                                <Icon
                                    accessibilityLabel="search songs"
                                    name="search-outline"
                                    color={text[0]}
                                    size={DEFAULT_SMALL_ICON_SIZE}
                                />
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: text[0],
                                        paddingHorizontal: 20,
                                        paddingVertical: 13,
                                        fontSize: 17,
                                    }}>
                                    {suggestion}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ) : null}

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={globalStyles.coverFullArea}>
                    <GradientBackground uniformColor>
                        <HeaderSearch
                            onSubmit={startSearch}
                            onCancel={hideSuggestions}
                            text={searchText}
                            onChangeText={setSearchText}
                            goBack={() =>
                                showSearchSuggestions
                                    ? hideSuggestions()
                                    : props.navigation.goBack()
                            }
                        />

                        {/* tracking when the scroll reaches end */}
                        <ScrollView
                            onScroll={({nativeEvent}) => checkEndReached(nativeEvent)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={startSearch}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {/* all the songs which are loaded are shown here */}
                            {/* main content here */}
                            {artists.content[0].browseId.length > 0 ||
                            loading ? (
                                <TopicTitle title={'Artists'} />
                            ) : null}
                            {artists.content[0].browseId.length > 0 &&
                            <GridArtistList
                                navigation={props.navigation}
                                content={artists.content}
                                contentLength={artists.content.length}
                                subColor={text[0] + '70'}
                                textColor={text[0] + 'E7'}
                                shimmerDirection={'right'}
                                scrollDirection="horizontal"
                                id={'demo'}
                            />}

                            {songs.content[0].musicId.length > 0 || loading ? (
                                <TopicTitle title={'Songs'} />
                            ) : null}
                            
                            {songs.content[0].musicId.length > 0 &&
                                <CommonSongList songs={songs.content} />
                            }
                            {/* below padding for more spacing... */}
                            <PaddingBottomView />
                        </ScrollView>
                    </GradientBackground>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default SearchResult
