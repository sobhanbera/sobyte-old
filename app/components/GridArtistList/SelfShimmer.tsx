import React from 'react'
import {View, Pressable, ScrollView} from 'react-native'
import Shimmer from 'react-native-shimmer'
import {styles} from './'

interface Props {
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
}
class GridArtistList_SelfShimmer extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
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
                    direction={this.props.shimmerDirection}
                    animationOpacity={0.1}
                    tilt={
                        this.props.shimmerDirection === 'right' ||
                        this.props.shimmerDirection === 'down'
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
                                // : index === this.props.contentLength - 1
                                // ? styles.lastContent
                                // : {},
                            ]}>
                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.contentImage,
                                ]}
                            />

                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.dummyText,
                                ]}
                            />
                        </View>
                    </Pressable>
                </Shimmer>

                <Shimmer
                    opacity={1}
                    animating
                    direction={this.props.shimmerDirection}
                    animationOpacity={0.1}
                    tilt={
                        this.props.shimmerDirection === 'right' ||
                        this.props.shimmerDirection === 'down'
                            ? 10
                            : -10
                    }>
                    <Pressable onPress={() => {}}>
                        <View
                            style={[
                                styles.contentWrapper,
                                // index === 0
                                // ?
                                // styles.firstContent,
                                // : index === this.props.contentLength - 1
                                // ? styles.lastContent
                                // : {},
                            ]}>
                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.contentImage,
                                ]}
                            />

                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.dummyText,
                                ]}
                            />
                        </View>
                    </Pressable>
                </Shimmer>

                <Shimmer
                    opacity={1}
                    animating
                    direction={this.props.shimmerDirection}
                    animationOpacity={0.1}
                    tilt={
                        this.props.shimmerDirection === 'right' ||
                        this.props.shimmerDirection === 'down'
                            ? 10
                            : -10
                    }>
                    <Pressable onPress={() => {}}>
                        <View
                            style={[
                                styles.contentWrapper,
                                // index === 0
                                // ?
                                // styles.firstContent,
                                // : index === this.props.contentLength - 1
                                styles.lastContent,
                                // : {},
                            ]}>
                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.contentImage,
                                ]}
                            />

                            <View
                                style={[
                                    styles.dummyBackground,
                                    styles.dummyText,
                                ]}
                            />
                        </View>
                    </Pressable>
                </Shimmer>
            </ScrollView>
        )
    }
}

export default GridArtistList_SelfShimmer
