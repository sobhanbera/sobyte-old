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

            <HeaderProfile navigation={props.navigation} />
        </GradientBackground>
    )
}

export default Profile
