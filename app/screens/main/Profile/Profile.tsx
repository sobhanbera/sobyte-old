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
            </ScrollView>
        </GradientBackground>
    )
}

export default Profile
