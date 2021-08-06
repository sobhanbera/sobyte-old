import React from 'react'
import {StatusBar} from 'react-native'

import {GradientBackground, HeaderProfile} from '../../../components'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    return (
        <GradientBackground>
            <StatusBar backgroundColor={'black'} translucent={false} />
            <HeaderProfile navigation={props.navigation} />
        </GradientBackground>
    )
}

export default Profile
