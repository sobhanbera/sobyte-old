import React, {useEffect, useRef, useState} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    KeyboardAvoidingView,
} from 'react-native'
import {Text as BlockTitle} from 'react-native-paper'

import {
    GradientBackground,
    HeaderCollapsible,
    Block,
    CenterButtonView,
    GridCategory,
    SongsKeywordResultsRenderer,
    ArtistsKeywordResultsRenderer,
    CustomSongsListRenderer,
} from '../../../components'
import {DefaultStatusBarComponent, PaddingBottomView} from '../../../constants'
import {
    MoodCategories,
    GenresCategories,
    SongCategory,
} from '../../../interfaces'
import {useTheme, useMusicApi} from '../../../context'
import globalStyles from '../../../styles/global.styles'

interface ExploreTabProps {
    navigation?: any
}
const Explore: React.FC<ExploreTabProps> = props => {
    const {themeColors, randomGradient, setRandomColorScheme} = useTheme()
    const {initMusicApi, error} = useMusicApi()

    const [loading, setLoading] = useState<boolean>(false)
    const scrollViewReference = useRef<ScrollView>(null)

    /**
     * music player initializer function
     */
    const loacalMusicApiInit = () => {
        setLoading(true)
        initMusicApi()
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        loacalMusicApiInit()
    }, [error])

    /**
     * code that opens the song category tab
     */
    const launchSongCategoryScreen = (category: SongCategory) => {
        props.navigation.navigate('songcategory', {
            category: category,
            headerTitle: `"${category.name}"`,
        })
    }

    /**
     * function to launch the search songs, artists screen
     */
    const launchSearchScreen = () => {
        props.navigation.navigate('search')
    }

    return (
        <View style={globalStyles.flex}>
            <DefaultStatusBarComponent backgroundColor={'transparent'} />

            <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={loacalMusicApiInit}
                            progressBackgroundColor={themeColors.white[0]}
                            colors={themeColors.rgbstreakgradient}
                        />
                    }
                    ref={scrollViewReference}
                    showsVerticalScrollIndicator={false}>
                    <GradientBackground>
                        <HeaderCollapsible
                            onPress={() => {
                                // nothing for now
                                // actually this function was to change the random gradient color to a
                                // different set of random gradient color array
                                setRandomColorScheme()
                            }}
                            headerScrollColor={themeColors.transparent[0]}
                            onInputFocus={launchSearchScreen}
                        />

                        {/* as per mood topics */}
                        <Block
                            style={{
                                marginHorizontal: 0,
                                marginVertical: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // elevation: 30,

                                /**
                                 * below is needed to make this list double grid horizontally
                                 */
                                // this is the static height of block or else it will be all horizontal scroll with one row
                                // height:
                                //     IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW * 3 + // the image size of gridCategory component
                                //     3 * 5 + // top padding of image
                                //     3 * 5 + // bottom padding of image
                                //     0, // a random height to fit the items
                            }}
                            noBackground={true}>
                            <Block
                                style={globalStyles.blockOrCardinnerBlock}
                                noBackground={true}>
                                <BlockTitle
                                    style={[
                                        globalStyles.topicTitle,
                                        {color: themeColors.text[0]},
                                    ]}>
                                    {'Moods & Genres'}
                                </BlockTitle>
                            </Block>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}>
                                <GridCategory
                                    categories={MoodCategories.concat(
                                        GenresCategories,
                                    )}
                                    onPress={(category: SongCategory) =>
                                        launchSongCategoryScreen(category)
                                    }
                                />
                            </ScrollView>
                        </Block>

                        {/* these are the seperated component for 
                        all kinds of music data or card blocks
                        or card which hold songs list, music list, etc */}

                        {/* gradient background could only hold 5 child componets of BlockCardSongsList
                        or else it produces a black background and then what is the need of gradient then */}

                        {/* trendings */}
                        <SongsKeywordResultsRenderer
                            keyword="bollywood trending hits"
                            title="Trendings"
                            refreshing={loading}
                        />

                        {/* bollywood hits */}
                        <SongsKeywordResultsRenderer
                            keyword="bollywood top new songs"
                            title="Bollywood Hits"
                            refreshing={loading}
                        />

                        {/* artists list */}
                        <ArtistsKeywordResultsRenderer
                            keywords={[
                                'new bollywood songs',
                                'trending bollywood songs',
                                'new english songs',
                            ]}
                            title="Artists You May Like"
                            refreshing={loading}
                            navigation={props.navigation}
                        />

                        {/* romantic */}
                        <SongsKeywordResultsRenderer
                            keyword="top romantic songs"
                            title="Romantic Songs"
                            refreshing={loading}
                        />
                    </GradientBackground>

                    {/* separate same component because inside single it produces a black
                    gradient which is not needed */}
                    <GradientBackground angle={135}>
                        {/* popular songs */}
                        <SongsKeywordResultsRenderer
                            keyword="popular songs"
                            title="Popular Mix"
                            refreshing={loading}
                        />

                        {/* pop */}
                        <SongsKeywordResultsRenderer
                            keyword="pop beats"
                            title="Pop"
                            refreshing={loading}
                        />

                        {/* lo-fi songs */}
                        <SongsKeywordResultsRenderer
                            keyword="Chill beats"
                            title="Chill Time"
                            refreshing={loading}
                        />

                        {/* are you sorrow */}
                        <SongsKeywordResultsRenderer
                            keyword="sad songs"
                            title="Are You Sad?"
                            refreshing={loading}
                        />

                        {/* user's custom songs list based on custom queries */}
                        <CustomSongsListRenderer />

                        {/* button to go to the top of the scoll view */}
                        <CenterButtonView
                            title="Go To Top"
                            onPress={() =>
                                scrollViewReference.current?.scrollTo({
                                    x: 0,
                                    y: 0,
                                    animated: true,
                                })
                            }
                            buttonColor={randomGradient[2]}
                        />

                        {/* end of the scrollview we are providing some spacing to look nice */}
                        <PaddingBottomView />
                    </GradientBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Explore

//
