import React from 'react'
import {SafeAreaView} from 'react-native'

import {GradientBackground, HeaderProfile} from '../../../components'
import {DefaultStatusBarComponent} from '../../../constants'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    return (
        <GradientBackground>
            <DefaultStatusBarComponent backgroundColor={'black'} />
            <SafeAreaView style={{flex: 1}}>
                <HeaderProfile navigation={props.navigation} />
            </SafeAreaView>
        </GradientBackground>
    )
}

export default Profile
