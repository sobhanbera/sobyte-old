import React from 'react'
import {Text, View} from 'react-native'

import {GradientBackground, HeaderProfile} from '../../../components'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    return (
        <GradientBackground>
            <HeaderProfile navigation={props.navigation} />
        </GradientBackground>
    )
}

export default Profile
