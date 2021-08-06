import React from 'react'
import {StatusBar, SafeAreaView} from 'react-native'

import {GradientBackground, HeaderProfile} from '../../../components'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    return (
        <GradientBackground>
            <StatusBar
                backgroundColor={'black'}
                translucent={true}
                barStyle="light-content"
            />
            <SafeAreaView style={{flex: 1}}>
                <HeaderProfile navigation={props.navigation} />
            </SafeAreaView>
        </GradientBackground>
    )
}

export default Profile
