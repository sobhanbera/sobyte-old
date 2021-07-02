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
import {useTheme, useMusicApi as mainUserm} from '../../../context'
import {useMusicApi} from '../../../api/fetcher'
import Icon from 'react-native-vector-icons/Ionicons'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {search} = useMusicApi()
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

    // const [topHits, setTopHits] = useState<FetchedSongObject>()
    // const [topHindi, setTopHindi] = useState<FetchedSongObject>()
    // const [topEnglish, setTopEnglish] = useState<FetchedSongObject>()
    // const [topPunjabi, setTopPunjabi] = useState<FetchedSongObject>()
    // const [topTelegu, setTopTelegu] = useState<FetchedSongObject>()
    // const [topRegional, setTopRegional] = useState<FetchedSongObject>()

    async function func() {
        await search('hindi songs')
            .then(res => {
                console.log('RES', res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        func()
    }, [t])

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
