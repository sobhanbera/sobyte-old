import React from 'react'
import {ScrollView, View} from 'react-native'

interface Props {}
const SearchResult: React.FC<Props> = props => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}></ScrollView>
    )
}

export default SearchResult
