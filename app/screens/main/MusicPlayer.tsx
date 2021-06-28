import React, {useEffect, useState} from 'react'
import {ImageBackground, Text, View} from 'react-native'

import {ProgressSlider} from '../../components'
import {usePlayer} from '../../context'
import globalStyles from '../../styles/global.styles'

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const [screenFocused, setScreenFocused] = useState(true)
    const {current} = usePlayer()

    useEffect(() => {
        let i = 0

        // props.navigation.addListener('tabPress', () => {
        //     if (screenFocused) {
        //         console.log('PLAYING', screenFocused, ++i)
        //     } else {
        //         console.log('JUST FOCUSED', screenFocused, ++i)
        //     }
        // })

        // props.navigation.addListener('focus', () => {
        //     setScreenFocused(true)
        //     console.log('FOCUSED', screenFocused, ++i)
        // })

        // props.navigation.addListener('blur', () => {
        //     setScreenFocused(focused => false)
        //     console.log('BLURED', screenFocused, ++i)
        // })
    }, [])

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
