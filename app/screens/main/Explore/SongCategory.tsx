import React from 'react'
import {Text, StyleSheet} from 'react-native'

import {FontRobotoBold, HEADER_MIN_HEIGHT} from '../../../constants'
import {AnimatedHeader} from '../../../components'
import {SongCategory} from '../../../interfaces'

interface Props {
    navigation?: any
    route: {
        params: {
            category: SongCategory
            headerTitle: string
        }
    }
}
const SongCategoryScreen = (props: Props) => {
    const {category, headerTitle} = props.route.params

    return (
        <AnimatedHeader category={category} headerTitle={headerTitle}>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
            <Text
                style={{
                    fontSize: 100,
                    color: 'white',
                }}>
                Scroll Me!
            </Text>
        </AnimatedHeader>
    )
}

export default SongCategoryScreen
