import React from 'react'
import {ImageBackground, Text, View} from 'react-native'

import {ProgressSlider} from '../../components'
import {usePlayer} from '../../context'
import globalStyles from '../../styles/global.styles'

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current} = usePlayer()

    return (
        <ImageBackground
            source={{uri: current.artwork}}
            style={globalStyles.fullImageBackground}
            blurRadius={18}>
            <ProgressSlider />
        </ImageBackground>
    )
}

export default Player
