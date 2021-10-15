import React, {useEffect, useState} from 'react'
import {View, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import CenterButtonView from '../CenterButtonView'
import SongsKeywordResultsRenderer from '../KeywordResultsRenderer/Songs'
import SimpleTextInput from '../SimpleTextInput'
import TopicTitle from '../TopicTitle'

import {USERS_CUSTOM_SONGS_LISTS} from '../../constants'

import {useTheme} from '../../context'

interface CustomSongModal {
    id: number | Date
    title: string
    query: string
}

interface Props {}
const CustomSongsListRenderer = (props: Props) => {
    const {randomGradient} = useTheme()

    /**
     * we are providing a new feature in which users could add custom queries to the existing list of queries
     * so that the list is long enough
     * @var {Array} songsList - if true than only we will be able to add new custom songs list
     * @var {boolean} canAddNewList - if true than only we will be able to add new custom songs list
     * @var {string} title - the title to show in the cards...
     * @var {string} query - the query to search for...
     */
    const [songsList, setSongsList] = useState<CustomSongModal[]>([])
    const [canAddNewList, setCanAddNewList] = useState(false)
    const [title, setTitle] = useState('')
    const [query, setQuery] = useState('')

    /**
     * get the list of custom songs
     * if there any in the local storage
     */
    const getAndUpdateCustomSongsList = () => {
        AsyncStorage.getItem(
            USERS_CUSTOM_SONGS_LISTS,
            function (error, result: any) {
                const parsedResult = JSON.parse(result)

                if (Array.isArray(parsedResult) && parsedResult.length > 0) {
                    // the data is present and is a valid array
                    // now we need to check if the elements of array which are objects is in form of {CustomSongModal} interface
                    const finalSongsList = parsedResult.filter(
                        (songListItem: CustomSongModal) => {
                            // these are the same check which were done while creating a new user custom songs list
                            if (
                                songListItem.id > 0 &&
                                songListItem.title.length > 5 &&
                                songListItem.query.length > 0
                            ) {
                                return true
                            }
                            return false
                        },
                    )
                    setSongsList(finalSongsList)
                } else {
                    // no data regarding the custom songs list is present in the local storage then create one
                    // this might be when the user has logged in just now and there is no data currently
                    // this could also be due to data cleaning of the apk...
                    // in this case we are saving a initial array to the local storage
                    console.log('INIT')
                    AsyncStorage.setItem(
                        USERS_CUSTOM_SONGS_LISTS,
                        JSON.stringify([]),
                    )
                }
            },
        )
    }

    useEffect(() => {
        getAndUpdateCustomSongsList()
    }, [])

    /**
     * add new custom songs list to the local storage
     */
    const addNewSongsList = () => {
        // checking wheather the title and the query both are valid or not...
        if (title.length < 5) {
            ToastAndroid.show('Minimum title length is 5.', ToastAndroid.SHORT)
        } else if (query.length <= 0) {
            ToastAndroid.show(
                'Please enter a valid search query.',
                ToastAndroid.SHORT,
            )
        } else {
            // if the about checks are validated then save the title and query by appending the existing array
            const localSongsList = songsList.concat({
                id: new Date().getTime(),
                title,
                query,
            })
            AsyncStorage.setItem(
                USERS_CUSTOM_SONGS_LISTS,
                JSON.stringify(localSongsList),
                error => {
                    if (error) {
                        // error occurred while adding new data to local storage
                        // maybe storage permissions are forbidden
                        ToastAndroid.show(
                            'Cannot add new songs list.',
                            ToastAndroid.SHORT,
                        )
                    } else {
                        ToastAndroid.show(
                            'Added a new songs list.',
                            ToastAndroid.SHORT,
                        )
                        // set the title and the query to ''
                        setTitle('')
                        setQuery('')
                        // load the data
                        getAndUpdateCustomSongsList()
                    }
                },
            )
        }
    }

    /**
     * delete an existing custom user's songs list from the local data
     */
    const deleteASongList = () => {}

    return (
        <View>
            {songsList.map(list => {
                return (
                    // i know what i am doing
                    // string toString...
                    // :)
                    <React.Fragment key={String(list.id.toString())}>
                        <SongsKeywordResultsRenderer
                            title={list.title}
                            keyword={list.query}
                            refreshing={false}
                        />
                    </React.Fragment>
                )
            })}

            <TopicTitle title="Add New Custom List" />
            <SimpleTextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter a Title"
            />
            <SimpleTextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Enter the Search Query"
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                <CenterButtonView
                    title="Cancel"
                    onPress={() => {}}
                    buttonColor={randomGradient[2]}
                />
                <CenterButtonView
                    title="Add New List"
                    onPress={addNewSongsList}
                    buttonColor={randomGradient[2]}
                />
            </View>

            {/* are you sorrow */}
            {title && query ? (
                <SongsKeywordResultsRenderer
                    keyword={query}
                    title={title}
                    refreshing={false} // default is false - no loading
                />
            ) : null}
        </View>
    )
}

export default CustomSongsListRenderer
