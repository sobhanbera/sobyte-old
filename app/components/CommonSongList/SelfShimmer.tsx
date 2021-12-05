import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import Shimmer from 'react-native-shimmer'

import {CasualDemoList} from '../../interfaces'
import {songComponentsStyles} from '../../styles/global.styles'

interface Props {
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
}
const SelfShimmer = ({shimmerDirection}: Props) => {
    return (
        <View>
            {CasualDemoList.map(demo => (
                <Shimmer
                    key={demo.id}
                    opacity={1}
                    animating
                    direction={shimmerDirection}
                    animationOpacity={0.1}>
                    <TouchableOpacity activeOpacity={0.75} onPress={() => {}}>
                        <View style={songComponentsStyles.commonCard}>
                            <View style={songComponentsStyles.commonCardMain}>
                                <View
                                    style={[
                                        songComponentsStyles.imageDummy,
                                        songComponentsStyles.contentWrapper,
                                        {
                                            borderRadius: 5,
                                        },
                                    ]}></View>

                                <View
                                    style={
                                        songComponentsStyles.commonSongDetails
                                    }>
                                    <View
                                        style={[
                                            songComponentsStyles.textDummy,
                                            songComponentsStyles.contentWrapper,
                                        ]}
                                    />
                                    <View
                                        style={[
                                            songComponentsStyles.textDummy,
                                            songComponentsStyles.largeTextDummy,
                                            songComponentsStyles.contentWrapper,
                                        ]}
                                    />
                                </View>
                            </View>

                            <View
                                style={[
                                    songComponentsStyles.commonSongDummyIcon,
                                    songComponentsStyles.contentWrapper,
                                ]}
                            />
                        </View>
                    </TouchableOpacity>
                </Shimmer>
            ))}
        </View>
    )
}

export default SelfShimmer
