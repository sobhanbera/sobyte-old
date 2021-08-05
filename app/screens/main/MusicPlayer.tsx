import React, {useState, useEffect, useCallback} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet,
    Animated,
    ListRenderItemInfo,
} from 'react-native'

import {useMusicApi, usePlayer, useTheme} from '../../context'
import {TrackPlayerController} from '../../components'
import {
    APP_LOGO_LINK,
    BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
} from '../../constants'
import {formatArtists, getHightQualityImageFromLink} from '../../utils'
import {FetchedSongObject, SongObject} from '../../interfaces'
import MusicPlayerSongCardView from '../../components/MusicPlayerSongCardView'
import BackgroundBluredImage from '../../components/MusicPlayerSongCardView/BackgroundBluredImage'
import {ListRenderItem} from 'react-native'

const {width, height} = Dimensions.get('screen')

interface PlayerProps {
    navigation?: any
}
const Player: React.FC<PlayerProps> = _props => {
    const {current, play, playSongAtIndex, getTheIndexOfCurrentSong} =
        usePlayer()
    const {themeColors} = useTheme()
    const {initMusicApi, search, error} = useMusicApi()
    const [songs, setSongs] = useState<FetchedSongObject>()

    const scrollX = React.useRef(new Animated.Value(0)).current
    const scrollReference = React.useRef<any>(null)

    const initializeMusicPlayer = () => {
        search('most listened bollywood songs', 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(err => {
                console.log('ERROR IN MUSIC PLAYER', err)
            })
    }

    useEffect(() => {
        initializeMusicPlayer()
    }, [])

    const loadInitialMusicPlayerData = () => {
        if (current.id.length <= 0) {
            console.log('Playing...')
            search('bollywood new hits', 'SONG', true)
                .then((res: SongObject) => {
                    const artist = formatArtists(res.artist)
                    const artwork = getHightQualityImageFromLink(
                        res.thumbnails[0].url,
                        '720',
                    )
                    play({
                        artist: artist,
                        artwork: artwork,
                        duration: res.duration,
                        id: res.musicId,
                        playlistId: res.playlistId,
                        title: res.name,
                        url: '',
                    })
                    // if (scrollReference !== null)
                    //     scrollReference.current.scrollTo({
                    //         animated: true,
                    //         x: 0,
                    //         y: 0,
                    //     })
                })
                .catch(_err => {})
        } else {
            console.log('Not Playing...')
        }
    }

    /**
     * we are calling the loadData -(which loads all the data for explore tab) function twice
     * because it may not be ready or compiled when we call it for the first time so indented calling
     * also with a fallback variable error whenever it changed again everything will load from beginning
     * this function is also used in explore tab UI
     */
    useEffect(() => {
        initMusicApi()
            .then(() => {
                initMusicApi()
                    .then(() => {
                        // loadInitialMusicPlayerData()
                    })
                    .catch(() => {})
            })
            .catch(() => {
                // this will only be called when the internet connectivity is very slow or not present...
                console.error(
                    '(Outer) Error Initiating Music Api... no internet connection found',
                )
            })
    }, [error])

    useEffect(() => {
        // console.log('CURRENT INDEX 1', getTheIndexOfCurrentSong())
        // const playbackQueueEnded = TrackPlayer.addEventListener(
        //     'playback-track-changed',
        //     () => {
        //         console.log('CURRENT INDEX 2', getTheIndexOfCurrentSong())
        //         // console.log(scrollReference.current)
        //         const currentIndexOfScroll: any = getTheIndexOfCurrentSong()
        //         if (currentIndexOfScroll < nextSongsList.length - 1) {
        //             scrollReference.current.scrollToIndex({
        //                 animated: true,
        //                 index: currentIndexOfScroll + 1,
        //             })
        //             console.log(
        //                 'SCROLLED: ',
        //                 currentIndexOfScroll,
        //                 nextSongsList.length,
        //             )
        //         } else {
        //             console.log(
        //                 'NOT SCROLLED: ',
        //                 currentIndexOfScroll,
        //                 nextSongsList.length,
        //             )
        //         }
        //     },
        // )
        // return () => {
        //     playbackQueueEnded.remove()
        // }
    }, [])

    /**
     * whenever the scroll position changes this code will be executed and change the song
     * according to the index or the position of scroll
     */
    const scrollChangedHandler = (event: any) => {
        const scrollPostion = event.nativeEvent.contentOffset.x
        const screenWidth = width
        if (scrollPostion % screenWidth === 0) {
            const songIndex = scrollPostion / screenWidth
            const currentSongIndex: any = getTheIndexOfCurrentSong()
            /**
             * if the song which we are gonna playing is not the currently playing song
             */
            if (songIndex !== currentSongIndex) {
                playSongAtIndex(songIndex)
            }
        }

        /**
         * TODO: when the user scroll this scroll reference to the last second song player control
         * will load more song and push them to the nextSongsList variable so that the next songs list never ends
         * and continues for much time
         */
    }

    const renderItem = useCallback(
        (itemDetails: ListRenderItemInfo<SongObject>) => {
            const {item} = itemDetails
            return (
                <View
                    style={{
                        width,
                        height: height,
                        marginBottom: HEADER_MAX_HEIGHT,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{color: 'white', backgroundColor: 'black'}}>
                        {item.name}
                    </Text>

                    <Text style={{color: 'white', backgroundColor: 'black'}}>
                        {item.name}
                    </Text>
                    <View
                        style={{
                            marginBottom: 200,
                        }}></View>
                </View>
            )
        },
        [],
    )

    const keyExtractor = useCallback((item: SongObject) => item.musicId, [])

    const getItemLayout = useCallback((data, index) => {
        return {
            length: width,
            offset: width * index,
            index,
        }
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                }}>
                {songs?.content.length &&
                songs.content[0].musicId.length > 0 ? (
                    <Animated.FlatList
                        data={songs.content}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        getItemLayout={getItemLayout}
                        ref={scrollReference}
                        pagingEnabled={true}
                        scrollEventThrottle={16}
                        scrollToOverflowEnabled
                        overScrollMode={'always'}
                        bounces={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                ) : null}
            </View>
            {/* these are the temporary data and are not reqired that much as the main UI component itself... */}
            {/* <Image
                source={{uri: current.artwork || APP_LOGO_LINK}}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        opacity: 0,
                    },
                ]}
            /> */}
            {/* main content of this particular tab */}
            {/* {songs.length > 0 && songs[0].artwork.length ? (
                <View style={StyleSheet.absoluteFillObject}>
                    {songs.map((song, _) => {
                        return (
                            <BackgroundBluredImage
                                key={`${song.id}-${_}`}
                                song={song}
                                index={_}
                                scrollX={scrollX}
                            />
                        )
                    })}
                </View>
            ) : null} */}

            {/* <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                }}>
                {songs.length && songs[0].artwork.length > 0 ? (
                    <Animated.ScrollView
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {
                                useNativeDriver: true,
                                listener: event => {
                                    scrollChangedHandler(event)
                                },
                            },
                        )}
                        {songs.map((song, index) => {
                            return (
                                <MusicPlayerSongCardView
                                    key={`${song.id}-${index}`}
                                    item={song}
                                    index={index}
                                    scrollX={scrollX}
                                />
                            )
                        })}
                    </Animated.ScrollView>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}>
                        <Image
                            source={{uri: APP_LOGO_LINK}}
                            style={[
                                {
                                    opacity: 1,
                                    width: 218 / 2,
                                    height: 276 / 2,
                                },
                            ]}
                            // blurRadius={IMAGE_BLUR_RADIUS / 5000}
                        />
                    </View>
                )} */}

            {/* <View
                    style={{
                        // height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: themeColors.themecolor[0] + '50',
                        paddingTop: 20,
                        paddingBottom: BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                    }}>
                    <TrackPlayerController
                        color={themeColors.themecolorrevert[0]}
                    />
                </View> */}

            {/* </View> */}
        </View>
    )
}

export default Player
