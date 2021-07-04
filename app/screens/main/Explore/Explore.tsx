import React, {useEffect, useState} from 'react'
import {Text, View, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    GradientBackground,
    GridSongList,
    HeaderCollapsible,
    Scaler,
} from '../../../components'
import {DEFAULT_ICON_SIZE, HEADER_MIN_HEIGHT} from '../../../constants'
import {FetchedSongObject} from '../../../interfaces'
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

    const [topHits, setTopHits] = useState<FetchedSongObject>()
    const [topHindi, setTopHindi] = useState<FetchedSongObject>()
    const [topEnglish, setTopEnglish] = useState<FetchedSongObject>()
    const [topPunjabi, setTopPunjabi] = useState<FetchedSongObject>()
    const [topTelegu, setTopTelegu] = useState<FetchedSongObject>()
    const [topRegional, setTopRegional] = useState<FetchedSongObject>()

    /**
     * Function which loads all sutaible data required in this tab (explore tab)
     * like songs list in different languages, preference wise songs list, and many more...
     */
    async function loadExploreData() {
        console.log('Loading Initiated...')
        await search('Top hindi songs', 'song')
            .then((res: FetchedSongObject) => {
                setTopHindi(res)
                // console.log(res)
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
                console.error('(Outer) Error Initiating Music Api..')
            })
    }, [error])

    return (
        <View style={globalStyles.flex}>
            <HeaderCollapsible
                headerScrollColor={themeColors.black[0]}
                headerScrollHeight={HEADER_MIN_HEIGHT}>
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={globalStyles.appName}>
                        {t('common:appName')}
                    </Text>
                    <Scaler scale={0.95} touchableOpacity={1}>
                        <Icon
                            accessibilityLabel="search songs"
                            name="search-outline"
                            color={themeColors.text[0]}
                            size={DEFAULT_ICON_SIZE}
                            onPress={() => props.navigation.navigate('search')}
                        />
                    </Scaler>
                </View>
            </HeaderCollapsible>

            <ScrollView
                // bounces={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <GradientBackground
                    style={
                        {
                            // paddingTop: HEADER_MAX_HEIGHT,
                        }
                    }>
                    <Text>AAAAAAAAAAAAAAAAAAA</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>ASDFASIUYTYUG</Text>
                    <Text>AAAAAAAAAAAAAAAAAAA</Text>
                    {/* <GridSongList content={topHindi?.content} /> */}
                </GradientBackground>
            </ScrollView>
        </View>
    )
}

export default Profile
