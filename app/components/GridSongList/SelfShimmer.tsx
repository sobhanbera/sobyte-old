import React from 'react'
import {View, Pressable, ScrollView} from 'react-native'
import Shimmer from 'react-native-shimmer'
import {styles} from './'

interface Props {
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
}
const GridSongList_SelfShimmer = (props: Props) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // snapToInterval={
            // IMAGE_SIZE_TO_SHOW +
            // IMAGE_MARGIN_TO_SHOW +
            // IMAGE_PADDING_TO_SHOW +
            // IMAGE_PADDING_TO_SHOW * 2
            // }
        >
            <Shimmer
                opacity={1}
                animating
                direction={props.shimmerDirection}
                animationOpacity={0.1}
                tilt={
                    props.shimmerDirection === 'right' ||
                    props.shimmerDirection === 'down'
                        ? 10
                        : -10
                }>
                <Pressable onPress={() => {}}>
                    <View
                        style={[
                            styles.contentWrapper,
                            // index === 0
                            // ?
                            styles.firstContent,
                            // : index === props.contentLength - 1
                            // ? styles.lastContent
                            // : {},
                        ]}>
                        <View
                            style={[
                                styles.contentImage,
                                styles.dummyBackground,
                            ]}
                        />

                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                    </View>
                </Pressable>
            </Shimmer>

            <Shimmer
                opacity={1}
                animating
                direction={props.shimmerDirection}
                animationOpacity={0.1}
                tilt={
                    props.shimmerDirection === 'right' ||
                    props.shimmerDirection === 'down'
                        ? 10
                        : -10
                }>
                <Pressable onPress={() => {}}>
                    <View
                        style={[
                            styles.contentWrapper,
                            // index === 0
                            //     ? styles.firstContent
                            //     : index === props.contentLength - 1
                            //     ? styles.lastContent
                            //     : {},
                        ]}>
                        <View
                            style={[
                                styles.contentImage,
                                styles.dummyBackground,
                            ]}
                        />

                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                    </View>
                </Pressable>
            </Shimmer>

            <Shimmer
                opacity={1}
                animating
                direction={props.shimmerDirection}
                animationOpacity={0.1}
                tilt={
                    props.shimmerDirection === 'right' ||
                    props.shimmerDirection === 'down'
                        ? 10
                        : -10
                }>
                <Pressable onPress={() => {}}>
                    <View
                        style={[
                            styles.contentWrapper,
                            // index === 0
                            //     ? styles.firstContent
                            //     : index === props.contentLength - 1
                            // ?
                            styles.lastContent,
                            // : {},
                        ]}>
                        <View
                            style={[
                                styles.contentImage,
                                styles.dummyBackground,
                            ]}
                        />

                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                        <View
                            style={[styles.dummyBackground, styles.dummyText]}
                        />
                    </View>
                </Pressable>
            </Shimmer>
        </ScrollView>
    )
}

export default GridSongList_SelfShimmer
