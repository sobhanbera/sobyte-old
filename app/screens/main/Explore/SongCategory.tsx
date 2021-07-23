import React from 'react'

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
            headerImage={category.highimage}
            headerNameTitle={category.name}
            headerTitle={headerTitle || category.name}></AnimatedHeader>
    )
}

export default SongCategoryScreen
