import React, {useEffect, useState} from 'react'
import {View, ScrollView} from 'react-native'
import {Text as BlockTitle} from 'react-native-paper'
import {useTranslation} from 'react-i18next'

import {
    GradientBackground,
    GridSongList,
    HeaderCollapsible,
    Scaler,
    Block,
} from '../../../components'
import {DEFAULT_ICON_SIZE, HEADER_MIN_HEIGHT} from '../../../constants'
import {
    FetchedSongObject,
    BareFetchedSongObjectInstance,
} from '../../../interfaces'
import {useTheme, useMusicApi} from '../../../context'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../../styles/global.styles'

interface ExploreTabProps {
    navigation?: any
}
const Profile: React.FC<ExploreTabProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()

    const [topHits, setTopHits] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topHindi, setTopHindi] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topEnglish, setTopEnglish] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topPunjabi, setTopPunjabi] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )
    const [topTelegu, setTopTelegu] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     */
    async function loadExploreData() {
        await search('Top hindi songs', 'song')
            .then((res: FetchedSongObject) => {
                setTopHindi(res)
            })
            .catch(() => {
                console.trace('Error loading explore tab data...')
            })
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
                        console.log('Music Api Initiated...')
                        loadExploreData()
                    })
                    .catch(() => {
                        console.error('(Inner) Error Initiating Music Api..')
                    })
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
                    <Block
                        style={{
                            marginHorizontal: 10,
                            marginVertical: 10,
                        }}>
                        <Block>
                            <BlockTitle
                                style={[
                                    globalStyles.topicTitle,
                                    {color: themeColors.text[0]},
                                ]}>
                                Popular Hits
                            </BlockTitle>
                        </Block>

                        <GridSongList
                            textColor={themeColors.text[0] + 'E7'}
                            subColor={themeColors.text[0] + '70'}
                            contentLength={topHindi.content.length}
                            content={topHindi.content}
                        />
                    </Block>
                </GradientBackground>
            </ScrollView>
        </View>
    )
}

export default Profile
