import React, {useEffect, useState} from 'react'
import {Text} from 'react-native-paper'
import {
    ScrollView,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import {
    GradientBackground,
    HeaderSearch,
    CardSong,
    CardArtist,
} from '../../../components'
import {useMusicApi, usePrompt, useTheme} from '../../../context'
import {
    DEFAULT_SMALL_ICON_SIZE,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
    FetchedArtistObject,
    BareFetchedArtistObjectInstance,
} from '../../../interfaces'
import globalStyles from '../../../styles/global.styles'

interface Props {
    navigation?: any
}
const SearchResult: React.FC<Props> = props => {
    const {surfacelight, text} = useTheme().themeColors
    const {getSearchSuggestions, search} = useMusicApi()
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

                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={startSearch}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {/* all the songs which are loaded are shown here */}
                            {songs.content[0].musicId.length > 0 || loading ? (
                                <Text
                                    style={[
                                        globalStyles.topicTitle,
                                        globalStyles.lightBottomBorder,
                                        {color: text[0]},
                                    ]}>
                                    Songs
                                </Text>
                            ) : null}
                            <CardSong
                                onPress={() => {}}
                                shimmerDirection="right"
                                songs={songs.content}
                                textColor={text[0] + 'E7'}
                                subColor={text[0] + '70'}
                                loading={loading}
                            />

                            {/* moreover artists are displayed here after songs card list */}
                            {artists.content[0].browseId.length > 0 ||
                            loading ? (
                                <Text
                                    style={[
                                        globalStyles.topicTitle,
                                        globalStyles.lightBottomBorder,
                                        {color: text[0]},
                                    ]}>
                                    Artists
                                </Text>
                            ) : null}
                            <CardArtist
                                onPress={() => {}}
                                shimmerDirection="right"
                                artists={artists.content}
                                textColor={text[0] + 'E7'}
                                subColor={text[0] + '70'}
                                loading={loading}
                            />

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
