import React from 'react'
import {Text, StyleSheet} from 'react-native'

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
        <AnimatedHeader
            category={category}
            headerTitle={headerTitle}></AnimatedHeader>
    )
}

export default SongCategoryScreen
