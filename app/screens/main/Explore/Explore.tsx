import React, {useEffect, useRef, useState} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import Animated, {Extrapolate} from 'react-native-reanimated'

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

    const scrollY = new Animated.Value(0)
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_MIN_HEIGHT)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
        inputRange: [0, HEADER_MIN_HEIGHT],
        outputRange: [0, -HEADER_MIN_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
    })

    // const [topHits, setTopHits] = useState<FetchedSongObject>()
    const [topHindi, setTopHindi] = useState<FetchedSongObject>()
    // const [topEnglish, setTopEnglish] = useState<FetchedSongObject>()
    // const [topPunjabi, setTopPunjabi] = useState<FetchedSongObject>()
    // const [topTelegu, setTopTelegu] = useState<FetchedSongObject>()
    // const [topRegional, setTopRegional] = useState<FetchedSongObject>()

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
                console.error('(Outer) Error Initiating Music Api..')
            })
    }, [error])

    useEffect(() => {
        console.log(headerY)
    }, [headerY])

    return (
        <View style={globalStyles.flex}>
            <HeaderCollapsible
                headerScrollColor={themeColors.black[0]}
                headerScrollHeight={HEADER_MIN_HEIGHT}
                headerY={headerY}>
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

            <Animated.ScrollView
                onScroll={() =>
                    Animated.event(
                        [
                            {
                                nativeEvent: {contentOffset: {y: scrollY}},
                            },
                        ],
                        {useNativeDriver: true},
                    )
                }
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <GradientBackground
                    style={
                        {
                            // paddingTop: HEADER_MAX_HEIGHT,
                        }
                    }>
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
                    <GridSongList content={topHindi?.content} />
                </GradientBackground>
            </Animated.ScrollView>
        </View>
    )
}

export default Profile
