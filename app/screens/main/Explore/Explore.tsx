import React, {useRef} from 'react'
import {Animated, Image, ScrollView, Text, View} from 'react-native'

import {
    GradientBackground,
    HeaderCollapsible,
    HeaderSearch,
} from '../../../components'
import {
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    HEADER_SCROLL_DISTANCE,
} from '../../../constants'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const scrollOffsetY = useRef(new Animated.Value(0)).current
    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    })

    return (
        <GradientBackground>
            <HeaderCollapsible headerScrollHeight={headerScrollHeight} />

            <HeaderSearch />

            <ScrollView
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {y: scrollOffsetY}}},
                ])}
                scrollEventThrottle={16}>
                <View style={{paddingTop: HEADER_MAX_HEIGHT}}>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                    <Text style={{fontSize: 40}}>AKJSHDKJAD</Text>
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default Profile
