import React, {useEffect, useState} from 'react'
import {View, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Text} from 'react-native-paper'

import CenterButtonView from '../CenterButtonView'
import SongsKeywordResultsRenderer from '../KeywordResultsRenderer/Songs'
import SimpleTextInput from '../SimpleTextInput'
import TopicTitle from '../TopicTitle'
import SobyteAlert from '../SobyteAlert'

import {
    USERS_CUSTOM_SONGS_LISTS,
    MAXIMUM_USERS_CUSTOM_SONGS_LISTS,
    DEFAULT_TINY_ICON_SIZE,
    PaddingBottomView,
} from '../../constants'
import {useTheme} from '../../context'

interface CustomSongModal {
    id: number | Date
    title: string
    query: string
}

interface Props {}
const CustomSongsListRenderer = (_props: Props) => {
    const {randomGradient, themeColors} = useTheme()

    /**
     * we are providing a new feature in which users could add custom queries to the existing list of queries
     * so that the list is long enough
     * @var {Array} songsList - if true than only we will be able to add new custom songs list
     * @var {boolean} showAddSongsSection - if the section to add songs to show or not
     * @var {string} title - the title to show in the cards...
     * @var {string} query - the query to search for...
     */
    const [songsList, setSongsList] = useState<CustomSongModal[]>([])
    const [showAddSongsSection, setShowAddSongsSection] = useState(false)
    const [title, setTitle] = useState('')
    const [query, setQuery] = useState('')

    /**
     * get the list of custom songs
     * if there any in the local storage
     */
    const getAndUpdateCustomSongsList = () => {
        AsyncStorage.getItem(
            USERS_CUSTOM_SONGS_LISTS,
            function (_error, result: any) {
                const parsedResult = JSON.parse(result)
                if (
                    (Array.isArray(parsedResult) || parsedResult === []) &&
                    parsedResult.length >= 0
                ) {
                    // the data is present and is a valid array
                    // now we need to check if the elements of array which are objects is in form of {CustomSongModal} interface
                    const finalSongsList = parsedResult.filter(
                        (songListItem: CustomSongModal) => {
                            // these are the same check which were done while creating a new user custom songs list
                            if (
                                songListItem.id > 0 &&
                                songListItem.title.length > 0 &&
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
            const finalSongsList = JSON.stringify(localSongsList)
            AsyncStorage.setItem(
                USERS_CUSTOM_SONGS_LISTS,
                finalSongsList,
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
                        setShowAddSongsSection(false)
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
    const deleteASongList = (id: number | Date) => {
        // itterate over the songs list
        // and find where is the song list with id is found and remove it
        const finalSongsList = songsList.filter(item => {
            return item.id !== id
        })

        // saving to the local storage
        const stringifyValue = JSON.stringify(finalSongsList)
        AsyncStorage.setItem(USERS_CUSTOM_SONGS_LISTS, stringifyValue)

        // after filtering the array we are updating the state
        // optional..............
        setSongsList(finalSongsList)

        // loading the data from local storage again so that the data is synced
        // BTW this code below could replace the state update in this function
        // only one thing is needed
        // the state update or the getAndUpdateCustomSongsList() function
        getAndUpdateCustomSongsList()
    }

    const showAddSongsSectionPart = () => {
        if (songsList.length < MAXIMUM_USERS_CUSTOM_SONGS_LISTS)
            setShowAddSongsSection(true)
        else
            ToastAndroid.show(
                'The number of list limits exceeded. Delete some lists to add a new one.',
                ToastAndroid.SHORT,
            )
    }

    const deleteAllSongsList = () => {
        const confirmDeleteAllSongsLists = () => {
            AsyncStorage.setItem(USERS_CUSTOM_SONGS_LISTS, JSON.stringify([]))
            getAndUpdateCustomSongsList()
        }
        // Alert.alert(
        //     'Delete Songs?',
        //     'Are you sure! All songs list you have created will be deleted permanently.',
        //     [
        //         {
        //             text: 'Cancel',
        //             style: 'destructive',
        //         },
        //         {
        //             text: 'Delete',
        //             style: 'default',
        //         },
        //     ],
        // )
    }

    return (
        <View>
            <SobyteAlert
                visible={true}
                setVisibility={() => {}}
                // title="Delete Songs?"
                // title="asdf"
                description="Are you sure! All songs list you have created will be deleted permanently."
                onConfirm={() => {}}
                // onlyConfirmButton
                activeOpacity={1}
            />

            {songsList.map(list => {
                return (
                    // i know what i am doing
                    // string toString :)
                    <React.Fragment key={String(list.id.toString())}>
                        <SongsKeywordResultsRenderer
                            title={list.title}
                            keyword={list.query}
                            refreshing={false}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                alignSelf: 'flex-end',
                            }}>
                            <MaterialCommunityIcons
                                onPress={() => deleteASongList(list.id)}
                                name="delete-outline"
                                size={DEFAULT_TINY_ICON_SIZE}
                                color={themeColors.themecolorrevert[0] + '7F'}
                            />
                            <Text
                                onPress={() => deleteASongList(list.id)}
                                style={{
                                    color:
                                        themeColors.themecolorrevert[0] + '7F',
                                    paddingHorizontal: 6,
                                }}>
                                Delete List
                            </Text>
                        </View>
                    </React.Fragment>
                )
            })}

            {showAddSongsSection ? (
                <>
                    <TopicTitle title="Add More Songs" />
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
                            onPress={() => setShowAddSongsSection(false)}
                            buttonColor={randomGradient[2]}
                        />
                        <CenterButtonView
                            title="Add New List"
                            onPress={addNewSongsList}
                            buttonColor={randomGradient[2]}
                        />
                    </View>
                </>
            ) : (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 15, // padding so that the above small buttons are not pressed by mistake
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <MaterialCommunityIcons
                            onPress={showAddSongsSectionPart}
                            name="filter-variant-plus"
                            size={DEFAULT_TINY_ICON_SIZE}
                            color={themeColors.themecolorrevert[0] + '7F'}
                        />
                        <Text
                            onPress={showAddSongsSectionPart}
                            style={{
                                color: themeColors.themecolorrevert[0] + '7F',
                                paddingHorizontal: 6,
                            }}>
                            {`Add New List (${songsList.length}/${MAXIMUM_USERS_CUSTOM_SONGS_LISTS})`}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <MaterialCommunityIcons
                            onPress={deleteAllSongsList}
                            name="delete-outline"
                            size={DEFAULT_TINY_ICON_SIZE}
                            color={themeColors.themecolorrevert[0] + '7F'}
                        />
                        <Text
                            onPress={deleteAllSongsList}
                            style={{
                                color: themeColors.themecolorrevert[0] + '7F',
                                paddingHorizontal: 6,
                            }}>
                            {`Delete All Lists`}
                        </Text>
                    </View>
                </View>
            )}

            {/* demo / preview of the card */}
            {title && query ? (
                <SongsKeywordResultsRenderer
                    keyword={query}
                    title={title}
                    refreshing={false} // default is false - no loading
                />
            ) : null}

            {/* without this padding components press is overlapping */}
            <PaddingBottomView paddingBottom={40} />
        </View>
    )
}

export default CustomSongsListRenderer
