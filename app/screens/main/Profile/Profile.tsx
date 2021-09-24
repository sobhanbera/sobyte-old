import React, {useState} from 'react'
import {ScrollView} from 'react-native'

import {GradientBackground, HeaderProfile} from '../../../components'
import {DefaultStatusBarComponent} from '../../../constants'

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
