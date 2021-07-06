import React, {useEffect, useRef, useState} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {Text as BlockTitle} from 'react-native-paper'

import {
    GradientBackground,
    GridSongList,
    HeaderCollapsible,
    Block,
    CenterButtonView,
    GridCategory,
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
import {
    useTheme,
    useMusicApi,
    useFetcher,
    usePlayer,
    useApp,
} from '../../../context'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../../styles/global.styles'
import {Track} from '../../../api/PlayerControls'

interface ExploreTabProps {
    navigation?: any
}
const Profile: React.FC<ExploreTabProps> = props => {
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const {fetchMusic} = useFetcher()
    const {play} = usePlayer()
    const {setShowLoading} = useApp()

    const scrollViewReference = useRef<ScrollView>(null)

    const [populars, setPopulars] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topRated, setTopRated] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [loFi, setLoFi] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    function playSong(song: Track) {
        fetchMusic(song.id)
            .then((res: any) => {
                play({
                    id: song.id,
                    url: res,
                    duration: song.duration,
                    title: song.title,
                    artist: song.artist,
                    artwork: song.artwork,
                })
            })
            .catch(err => console.log('ERROR PLAYING SONG...', err))
    }

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     */
    function loadExploreData() {
        search('popular songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setPopulars(res)
            })
            .catch(() => {})

        search('most rated songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setTopRated(res)
            })
            .catch(() => {})

        search('Chill beats', 'SONG')
            .then((res: FetchedSongObject) => {
                setLoFi(res)
            })
            .catch(() => {})
    }

    /**
     * we are calling the loadData -(which loads all the data for explore tab) function twice
     * because it may not be ready or compiled when we call it for the first time so indented calling
     * also with a fallback variable error whenever it changed again everything will load from beginning
     */
    useEffect(() => {
        setShowLoading(true)
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
                        setShowLoading(false)
                        loadExploreData()
                    })
                    .catch(() => {})
            })
            .catch(() => {
                // this will only be called when the internet connectivity is very slow or not present...
                console.error(
                    '(Outer) Error Initiating Music Api... no internet connection found',
                )
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
                                3 * 5 +
                                125, // bottom padding of image
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
                                categories={MoodCategories}
                                onPress={(category: SongCategory) =>
                                    launchSongCategoryScreen(category)
                                }
                            />
                            <GridCategory
                                categories={GenresCategories}
                                onPress={(category: SongCategory) =>
                                    launchSongCategoryScreen(category)
                                }
                            />
                        </ScrollView>
                    </Block>

                    {/* popular songs */}
                    <Block style={styles.outerBlock}>
                        <Block style={styles.innerBlock}>
                            <BlockTitle
                                style={[
                                    globalStyles.topicTitle,
                                    {color: themeColors.text[0]},
                                ]}>
                                Popular Hits
                            </BlockTitle>
                        </Block>

                        <GridSongList
                            id="populars"
                            onPress={playSong}
                            shimmerDirection="right"
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                            contentLength={populars.content.length}
                            content={populars.content}
                        />
                    </Block>

                    {/* top songs */}
                    <Block style={styles.outerBlock}>
                        <Block style={styles.innerBlock}>
                            <BlockTitle
                                style={[
                                    globalStyles.topicTitle,
                                    {color: themeColors.text[0]},
                                ]}>
                                Top Musics
                            </BlockTitle>
                        </Block>

                        <GridSongList
                            id="topRated"
                            onPress={playSong}
                            shimmerDirection="left"
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                            contentLength={topRated.content.length}
                            content={topRated.content}
                        />
                    </Block>

                    {/* lo-fi songs at the end */}
                    <Block style={styles.outerBlock}>
                        <Block style={styles.innerBlock}>
                            <BlockTitle
                                style={[
                                    globalStyles.topicTitle,
                                    {color: themeColors.text[0]},
                                ]}>
                                Chill Time
                            </BlockTitle>
                        </Block>

                        <GridSongList
                            id="loFi"
                            onPress={playSong}
                            shimmerDirection="right"
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                            contentLength={loFi.content.length}
                            content={loFi.content}
                        />
                    </Block>

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

export default Profile
