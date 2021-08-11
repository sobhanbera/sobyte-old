import React from 'react'
import {View} from 'react-native'
import {ScrollView, Text} from 'react-native'

import {GradientBackground, HeaderProfile, Scaler} from '../../../components'
import {DefaultStatusBarComponent} from '../../../constants'
import EMOJIS_STRING from '../../../constants/emojis'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    return (
        <GradientBackground>
            <DefaultStatusBarComponent backgroundColor={'black'} />

            <ScrollView
                bounces
                alwaysBounceVertical
                bouncesZoom
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <HeaderProfile navigation={props.navigation} />

                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 100,
                    }}>
                    {/* {Array.from(EMOJIS_STRING.substring(0, 12)).map(item => {
                        return (
                            <Scaler
                                onPress={() => {
                                    console.log(item)
                                }}>
                                <Text
                                    style={{
                                        fontSize: 23,
                                        padding: 6,
                                        margin: 5,
                                        backgroundColor: '#00000060',
                                        borderRadius: 50,
                                        width: 50,
                                        height: 50,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                    }}>
                                    {item}
                                </Text>
                            </Scaler>
                        )
                    })} */}
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default Profile
