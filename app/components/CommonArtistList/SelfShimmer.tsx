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
                    animationOpacity={0.1}
                >
                    <TouchableOpacity>
                        <View
                            style={{
                                marginHorizontal: 25,
                                marginVertical: 10,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={[
                                    songComponentsStyles.imageTinyDummy,
                                    songComponentsStyles.contentWrapper,
                                ]}
                            />
                            <View
                                style={[
                                    songComponentsStyles.textTinyDummy,
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
