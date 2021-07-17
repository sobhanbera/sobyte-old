import React, {useEffect, useRef, useState} from 'react'
import {View, ScrollView, StyleSheet, RefreshControl} from 'react-native'
import {Text as BlockTitle} from 'react-native-paper'

import {
    GradientBackground,
    GridSongList,
    HeaderCollapsible,
    Block,
    CenterButtonView,
    GridCategory,
    BlockCardSongsList,
} from '../../../components'
import {
    DEFAULT_ICON_SIZE,
    HEADER_MIN_HEIGHT,
    IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW,
    PaddingBottomView,
} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
    MoodCategories,
    GenresCategories,
    SongCategory,
} from '../../../interfaces'
import {useTheme, useMusicApi} from '../../../context'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../../styles/global.styles'

interface ExploreTabProps {
    navigation?: any
}
const Explore: React.FC<ExploreTabProps> = props => {
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()

    const [loading, setLoading] = useState<boolean>(false)
    const scrollViewReference = useRef<ScrollView>(null)

    /**
     * different categories of music without search at all
     * popular, top rated, lo-fi,
     * bollywood essentials, top new songs,
     * artist list, language list,
     * last played song item
     */
    /**
     * "main" @state of the list for all the types of music list data...
     */
    const [musicData, setMusicData] = useState<FetchedSongObject[]>([
        BareFetchedSongObjectInstance, // 0 - hot songs...
        BareFetchedSongObjectInstance, // 1 - bollywood hits...
        BareFetchedSongObjectInstance, // 2 - trendings...
        BareFetchedSongObjectInstance, // 3 - romantic...
        BareFetchedSongObjectInstance, // 4 - popular songs list...
        BareFetchedSongObjectInstance, // 5 - most rated songs...
        BareFetchedSongObjectInstance, // 6 - pops...
        BareFetchedSongObjectInstance, // 7 - lo-fi songs...
        BareFetchedSongObjectInstance, // 8 - sorrow...
    ])
    // const [artistsData, setArtistsData] = useState<>([])

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     */
    const loadExploreData = React.useCallback(() => {
        Promise.all([
            search('hot songs', 'SONG'), // 1st type of song data list
            search('bollywood hits', 'SONG'), // 2nd type of song data list
            search('trendings', 'SONG'), // 3rd type of song data list
            search('top romantic songs', 'SONG'), // 4th type of song data list
            search('popular songs', 'SONG'), // 5th type of song data list
            search('most rated songs', 'SONG'), // 5th type of song data list
            search('pop', 'SONG'), // 6th type of song data list
            search('Chill beats', 'SONG'), // 6th type of song data list
            search('sorrow', 'SONG'), // 7th type of song data list
        ])
            .then((res: FetchedSongObject[]) => {
                setMusicData(res)
            })
            .catch(() => {})
    }, [error])

    /**
     * we are calling the loadData -(which loads all the data for explore tab) function twice
     * because it may not be ready or compiled when we call it for the first time so indented calling
     * also with a fallback variable error whenever it changed again everything will load from beginning
     */
    useEffect(() => {
        setLoading(true)
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
                        setLoading(false)
                        loadExploreData()
                    })
                    .catch(() => {
                        setLoading(false)
                    })
            })
            .catch(() => {
                // this will only be called when the internet connectivity is very slow or not present...
                console.error(
                    '(Outer) Error Initiating Music Api... no internet connection found',
                )
                setLoading(false)
            })
    }, [error])

    const launchSongCategoryScreen = (category: SongCategory) => {
        props.navigation.navigate('songcategory', {
            category: category,
            headerTitle: `"${category.name}"`,
        })
    }

    return (
        <View style={globalStyles.flex}>
            <HeaderCollapsible
                onPress={loadExploreData}
                headerScrollColor={themeColors.black[0]}
                headerScrollHeight={HEADER_MIN_HEIGHT}
                right={
                    // <Scaler onPress={() => props.navigation.navigate('search')}>
                    <Icon
                        onPress={() => props.navigation.navigate('search')}
                        accessibilityLabel="search songs"
                        name="search-outline"
                        color={themeColors.text[0]}
                        size={DEFAULT_ICON_SIZE}
                    />
                    // </Scaler>
                }
            />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadExploreData}
                        progressBackgroundColor={themeColors.white[0]}
                        colors={themeColors.rgbstreakgradient}
                    />
                }
                ref={scrollViewReference}
                showsVerticalScrollIndicator={false}>
                <GradientBackground>
                    {/* as per mood topics */}
                    <Block
                        style={{
                            marginHorizontal: 10,
                            marginVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 30,
                            // this is the static height of block or else it will be all horizontal scroll with one row
                            height:
                                IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW * 3 + // the image size of gridCategory component
                                3 * 5 + // top padding of image
                                3 * 5 + // bottom padding of image
                                0, // a random height to fit the items
                        }}>
                        <Block style={styles.innerBlock}>
                            <BlockTitle
                                style={[
                                    globalStyles.topicTitle,
                                    {color: themeColors.text[0]},
                                ]}>
                                Moods & Genres
                            </BlockTitle>
                        </Block>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <GridCategory
                                categories={MoodCategories.concat(
                                    GenresCategories,
                                )}
                                onPress={(category: SongCategory) =>
                                    launchSongCategoryScreen(category)
                                }
                            />
                        </ScrollView>
                    </Block>

                    {/* hot songs */}
                    <BlockCardSongsList
                        cardTitle={'Hot Tracks'}
                        musicData={musicData[0]}
                    />

                    {/* bollywood hits */}
                    <BlockCardSongsList
                        cardTitle={'Bollywood Hits'}
                        musicData={musicData[1]}
                    />

                    {/* trendings */}
                    <BlockCardSongsList
                        cardTitle={'Trendings'}
                        musicData={musicData[2]}
                    />

                    {/* romantic */}
                    <BlockCardSongsList
                        cardTitle={'Romantic Songs'}
                        musicData={musicData[3]}
                    />

                    {/* popular songs */}
                    <BlockCardSongsList
                        cardTitle={'Popular Mix'}
                        musicData={musicData[4]}
                    />

                    {/* most rated */}
                    <BlockCardSongsList
                        cardTitle={'Top Songs'}
                        musicData={musicData[5]}
                    />

                    {/* pop */}
                    <BlockCardSongsList
                        cardTitle={'Pop'}
                        musicData={musicData[6]}
                    />

                    {/* lo-fi songs */}
                    <BlockCardSongsList
                        cardTitle={'Chill Time'}
                        musicData={musicData[7]}
                    />

                    {/* are you sorrow */}
                    <BlockCardSongsList
                        cardTitle={'Are You Sad'}
                        musicData={musicData[8]}
                    />

                    <CenterButtonView
                        title="Go To Top"
                        onPress={() =>
                            scrollViewReference.current?.scrollTo({
                                x: 0,
                                y: 0,
                                animated: true,
                            })
                        }
                    />

                    {/* end of the scrollview */}
                    <PaddingBottomView />
                </GradientBackground>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerBlock: {
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
    },
    innerBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',

        borderBottomWidth: 1,
        borderBottomColor: '#7f7f7f16',
    },
})

export default Explore
