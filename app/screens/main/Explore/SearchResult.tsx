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
    Block,
    GradientBackground,
    HeaderSearch,
    SongCard,
} from '../../../components'
import {useMusicApi, usePrompt, useTheme} from '../../../context'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_SMALL_ICON_SIZE,
    HEADER_MIN_HEIGHT,
} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
} from '../../../interfaces'
import globalStyles from '../../../styles/global.styles'

interface Props {}
const SearchResult: React.FC<Props> = props => {
    const {surfacelight, text} = useTheme().themeColors
    const {getSearchSuggestions, search} = useMusicApi()
    const {setTitle, setDescription} = usePrompt()

    const [searchText, setSearchText] = useState<string>('')
    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [showSearchSuggestions, setShowSearchSuggestions] =
        useState<boolean>(false)

    useEffect(() => {
        getSearchSuggestions(searchText)
            .then((res: string[]) => {
                setShowSearchSuggestions(true)
                setSearchSuggestions(res)
            })
            .catch(err => {
                console.log('ERROR ON GETTING SEARCH SUGGESTION', err)
            })
    }, [searchText])

    const searchResults = (query: string = searchText) => {
        if (query.length <= 0) return null

        Keyboard.dismiss()
        setShowSearchSuggestions(false)
        setLoading(true)
        console.log(showSearchSuggestions)

        search(query, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
                setLoading(false)
            })
            .catch(_err => {
                setTitle('Sorry! Cannot load data currently.')
                setDescription('error')
                setLoading(false)
            })
    }

    const startSearch = () => {
        searchResults()
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
                                onPress={() => searchResults(suggestion)}
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
                    <HeaderSearch
                        onSubmit={searchResults}
                        text={searchText}
                        onChangeText={setSearchText}
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
                        <GradientBackground uniformColor>
                            <Block
                                noBackground
                                style={globalStyles.searchTabTopic}>
                                <Text
                                    style={[
                                        globalStyles.topicTitle,
                                        {color: text[0]},
                                    ]}>
                                    Popular Hits
                                </Text>
                            </Block>

                            {songs.content.map(song => {
                                return (
                                    <SongCard
                                        onPress={() => {}}
                                        shimmerDirection="right"
                                        song={song}
                                        textColor={text[0] + 'E7'}
                                        subColor={text[0] + '70'}
                                        key={song.musicId}
                                    />
                                )
                            })}
                        </GradientBackground>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default SearchResult
