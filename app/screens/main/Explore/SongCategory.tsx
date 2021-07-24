import React, {useEffect, useState} from 'react'
import {
    Dimensions,
    ScrollView,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
} from 'react-native'

import {AnimatedHeader} from '../../../components'
import {
    BareFetchedSongObjectInstance,
    FetchedSongObject,
    SongCategory,
} from '../../../interfaces'
import {useMusicApi} from '../../../api'
import CommonSongList from '../../../components/CommonSongList'
import {useTheme} from '../../../context'
import {songComponentsStyles} from '../../../styles/global.styles'

const {width} = Dimensions.get('screen')

const DataList = [
    {
        name: 'Songs',
        id: 'songs',
        selected: 0,
    },
    {
        name: 'Artists',
        id: 'artists',
        selected: 1,
    },
    {
        name: 'Playlists',
        id: 'playlists',
        selected: 2,
    },
]
interface OnScrollProps {
    layoutMeasurement: {
        height: number
        width: number
    }
    contentOffset: {
        x: number
        y: number
    }
    contentSize: {
        height: number
        width: number
    }
}
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

    const {search, getContinuation} = useMusicApi()
    const {themeColors} = useTheme()

    const [loading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(DataList[0].selected)

    const [songs, setSongs] = useState<FetchedSongObject>(
        BareFetchedSongObjectInstance,
    )

    const contentScroll = React.useRef<ScrollView>(null)

    const continueLoadingData = () => {
        if (
            loading === false &&
            songs.continuation.clickTrackingParams &&
            songs.continuation.continuation
        ) {
            // console.log('REACHED', i++)
            setLoading(true)
            getContinuation('search', songs.continuation)
                .then((res: FetchedSongObject) => {
                    const data = songs.content.concat(res.content)
                    setSongs({
                        content: data,
                        continuation: res.continuation,
                    })
                    setLoading(false)
                })
                .catch(_err => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        search(category.name, 'SONG')
            .then((res: FetchedSongObject) => {
                setSongs(res)
            })
            .catch(_err => {})
    }, [category.id])

    const onScroll = (scrollProps: OnScrollProps) => {
        const currentRoughEstimatedScrollPosition = Math.floor(
            scrollProps.contentOffset.x,
        )

        if (currentRoughEstimatedScrollPosition % Math.floor(width) <= 5) {
            const currSelected = Math.floor(
                currentRoughEstimatedScrollPosition / Math.floor(width),
            )
            setSelected(currSelected)
        }
    }

    const changeData = (selector: any) => {
        setSelected(selector)
        contentScroll.current?.scrollTo({
            animated: true,
            x: width * selector,
            y: 0,
        })
    }

    return (
        <AnimatedHeader
            infiniteScrollOffset={1500} // 1500 px from the down of the screen when the onreachend function will be triggered
            onReachedEnd={continueLoadingData}
            headerImage={category.highimage}
            headerNameTitle={category.name}
            headerTitle={headerTitle || category.name}>
            {/* different topics or tags */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View
                    style={
                        songComponentsStyles.containerTopicTextHolderSection
                    }>
                    {DataList.map(data => {
                        return (
                            <Text
                                key={data.id}
                                onPress={() => changeData(data.selected)}
                                style={[
                                    songComponentsStyles.containerTopicText,
                                    selected == data.selected
                                        ? songComponentsStyles.containerTopicTextSelected
                                        : {},
                                ]}>
                                {data.name}
                            </Text>
                        )
                    })}
                </View>
            </ScrollView>

            {/* main content here */}
            <ScrollView
                ref={contentScroll}
                onScroll={({nativeEvent}) => onScroll(nativeEvent)}
                horizontal
                pagingEnabled
                bounces={true}
                snapToAlignment={'center'}
                scrollEventThrottle={16}
                snapToInterval={width}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* songs list */}
                <CommonSongList songs={songs.content} />

                {/* artists list */}
                <CommonSongList songs={songs.content} />

                {/* playlists list */}
                <CommonSongList songs={songs.content} />
            </ScrollView>

            {loading ? (
                <ActivityIndicator
                    color={themeColors.white[0]}
                    size={'small'}
                />
            ) : null}
        </AnimatedHeader>
    )
}

export default SongCategoryScreen
