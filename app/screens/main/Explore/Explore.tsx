import React, {useEffect, useRef, useState} from 'react'
import {Animated, Image, ScrollView, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {
    GradientBackground,
    HeaderCollapsible,
    Scaler,
} from '../../../components'
import {
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    HEADER_SCROLL_DISTANCE,
} from '../../../constants'
import {FetchedSongObject} from '../../../interfaces'
import {useTheme, useMusicApi, usePrompt} from '../../../context'
import Icon from 'react-native-vector-icons/Ionicons'

interface ExploreTabProps {
    navigation?: any
}
const Profile: React.FC<ExploreTabProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const scrollOffsetY = useRef(new Animated.Value(0)).current
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    })
    const headerScrollColor = scrollOffsetY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [themeColors.transparent[0], themeColors.surface[0]],
        extrapolate: 'clamp',
    })

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

    return (
        <>
            <HeaderCollapsible
                headerScrollColor={headerScrollColor}
                headerScrollHeight={headerScrollHeight}>
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Image
                        style={{
                            width: 97.75, // real width - 782, multiple - 7
                            height: 31.94375, // real height - 255.5, multiple - 7
                            // marginVertical: 22,
                        }}
                        source={require('../../../assets/images/logo_name.png')}
                    />
                    <Scaler scale={0.95} touchableOpacity={1}>
                        <Icon
                            accessibilityLabel="search songs"
                            name="search-outline"
                            color={themeColors.text[0]}
                            size={25}
                        />
                    </Scaler>
                </View>
            </HeaderCollapsible>

            <ScrollView
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                    {useNativeDriver: true},
                )}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <GradientBackground
                    style={{
                        paddingTop: HEADER_MAX_HEIGHT,
                    }}></GradientBackground>
            </ScrollView>
        </>
    )
}

export default Profile
