import React, {useEffect, useState} from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
} from 'react-native'
import axios, {CancelTokenSource} from 'axios'
import SearchMusicType from 'app/api/types'

const App = () => {
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        fetch('http://192.168.43.184:8000', {
            headers: {
                query: search,
            },
        })
            .then(res => res.json())
            .then(res => {
                setSearchResults(res.content)
            })
            .catch(err => {
                console.error(err)
            })
    }, [search])

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <TextInput
                style={{
                    backgroundColor: '#efefef',
                    padding: 10,
                    fontSize: 20,
                }}
                onChangeText={text => setSearch(text)}
                value={search}
                placeholder="Insert your text!"
            />

            {/* {searchResults.length > 0 ? ( */}
            <FlatList
                data={searchResults}
                renderItem={item => {
                    const realitem: SearchMusicType = item.item

                    return (
                        <Text style={{color: '#272727'}}>{realitem.name}</Text>
                    )
                }}
            />
            {/* ) : null} */}
        </SafeAreaView>
    )
}

export default App
