import React, {useEffect, useState} from 'react'
import {ImageBackground, Text, View} from 'react-native'

import {DoubleTap, ProgressSlider} from '../../components'
import {usePlayer} from '../../context'
import globalStyles from '../../styles/global.styles'
import {MUSIC_PLAYER_BLUR} from '../../constants'

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = props => {
    const {current, playonly} = usePlayer()

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            playonly()
        })
    }, [])

    return (
        <DoubleTap
            onDoubleTap={() => {
                console.log('TAPPED')
            }}>
            <ImageBackground
                source={{
                    uri:
                        current.artwork ||
                        'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
                }}
                style={globalStyles.fullImageBackground}
                blurRadius={MUSIC_PLAYER_BLUR}>
                <ProgressSlider />
            </ImageBackground>
        </DoubleTap>
    )
}

export default Player
