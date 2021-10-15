import React, {useState} from 'react'
import {View, Text} from 'react-native'

interface Props {}
const CustomSongsListRenderer = (props: Props) => {
    /**
     * we are providing a new feature in which users could add custom queries to the existing list of queries
     * so that the list is long enough
     * @var {boolean} canAddNewList - if true than only we will be able to add new custom songs list
     * @var {string} title - the title to show in the cards...
     * @var {string} query - the query to search for...
     */
    const [title, setTitle] = useState('')
    const [query, setQuery] = useState('')

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default CustomSongsListRenderer
