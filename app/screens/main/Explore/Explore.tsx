import React, {useEffect, useState} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {Text as BlockTitle} from 'react-native-paper'

import {
    GradientBackground,
    GridSongList,
    HeaderCollapsible,
    Scaler,
    Block,
} from '../../../components'
import {
    DEFAULT_ICON_SIZE,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
    SongObject,
} from '../../../interfaces'
import {useTheme, useMusicApi, useFetcher, usePlayer} from '../../../context'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../../styles/global.styles'

interface ExploreTabProps {
    navigation?: any
}
const Profile: React.FC<ExploreTabProps> = props => {
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const {fetchMusic} = useFetcher()
    const {play} = usePlayer()

    const [populars, setPopulars] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topRated, setTopRated] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [loFi, setLoFi] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    async function playSong(song: SongObject) {
        const link = await fetchMusic(song.musicId)
        play({
            id: song.musicId,
            url: link,
            duration: song.duration,
            title: song.name,
            artist: song.artist,
            artwork: song.thumbnails,
        })
    }

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     */
    async function loadExploreData() {
        await search('popular songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setPopulars(res)
            })
            .catch(() => {})

        await search('most rated songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setTopRated(res)
            })
            .catch(() => {})

        await search('Chill beats', 'SONG')
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
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
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

    return (
        <View style={globalStyles.flex}>
            <HeaderCollapsible
                headerScrollColor={themeColors.black[0]}
                headerScrollHeight={HEADER_MIN_HEIGHT}
                right={
                    <Scaler onPress={() => props.navigation.navigate('search')}>
                        <Icon
                            accessibilityLabel="search songs"
                            name="search-outline"
                            color={themeColors.text[0]}
                            size={DEFAULT_ICON_SIZE}
                        />
                    </Scaler>
                }
            />

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <GradientBackground>
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
                            onPress={playSong}
                            shimmerDirection="right"
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                            contentLength={loFi.content.length}
                            content={loFi.content}
                        />
                    </Block>

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
    },
    innerBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
})

export default Profile
