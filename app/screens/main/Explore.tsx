import React from 'react'
import {Button, Text, View} from 'react-native'
import {usePlayer} from '../../context'

interface ExploreProps {}
const Explore: React.FC<ExploreProps> = props => {
    const {play} = usePlayer()

    return (
        <View>
            <Button
                title="Play"
                onPress={() => {
                    play({
                        id: '1',
                        url: 'http://www.bigrockmusic.com/mp3/track_01.mp3',
                        duration: 67,
                        title: 'Name',
                        artist: 'Sobhan Bera',
                        artwork:
                            'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
                    })
                }}
            />
        </View>
    )
}

export default Explore
