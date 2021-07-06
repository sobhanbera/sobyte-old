import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native'
import ImageHeaderScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view'
import * as Animatable from 'react-native-animatable'

import {SongCategory as SongCategoryObject} from '../../../interfaces'
import {
    FontRoboto,
    FontRobotoBold,
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
} from '../../../constants'
import {useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'

const SongCategory = props => {
    const {category} = props.route.params
    const {themeColors} = useTheme()
    const headerTitleReference = React.useRef(null)

    return (
        <ImageHeaderScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces
            maxOverlayOpacity={1}
            minOverlayOpacity={0.4}
            maxHeight={350}
            minHeight={HEADER_MIN_HEIGHT}
            headerImage={{
                uri: category.highimage,
            }}
            renderHeader={() => (
                <View
                    style={[
                        {
                            backgroundColor: 'black',
                        },
                        globalStyles.lightBottomBorder,
                    ]}>
                    <Image
                        source={category.highimage}
                        style={{
                            height: HEADER_MAX_HEIGHT,
                            width: Dimensions.get('window').width,
                            alignSelf: 'stretch',
                            resizeMode: 'cover',
                        }}
                    />
                </View>
            )}
            renderForeground={() => {
                return (
                    <View
                        style={[
                            styles.headerTitleContainer,
                            globalStyles.lightBottomBorder,
                            {
                                height: '100%',
                            },
                        ]}>
                        <TouchableOpacity
                            activeOpacity={0.95}
                            onPress={() => {}}>
                            <Text style={styles.headerTitle}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
            renderFixedForeground={() => (
                <Animatable.View
                    style={[
                        styles.headerTitleContainer,
                        globalStyles.lightBottomBorder,
                        {
                            backgroundColor: themeColors.surfacelight[0],
                            borderBottomWidth: 1,
                        },
                    ]}
                    ref={headerTitleReference}>
                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                fontSize: 20,
                            },
                        ]}>
                        {category.name}
                    </Text>
                </Animatable.View>
            )}>
            <TriggeringView
                style={{
                    backgroundColor: themeColors.surfacelight[0],
                }}
                onHide={() => headerTitleReference.current.slideInDown(500)}
                onBeginDisplayed={() =>
                    headerTitleReference.current.slideOutUp(500)
                }>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>
                <Text
                    style={{
                        fontSize: 100,
                        color: 'white',
                    }}>
                    Scroll Me!
                </Text>

                <PaddingBottomView />
            </TriggeringView>
        </ImageHeaderScrollView>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 350,
    },
    headerTitleContainer: {
        height: HEADER_MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        width: '100%',
    },
    headerTitle: {
        color: 'white',
        fontSize: 40,
        backgroundColor: 'transparent',
        fontFamily: FontRobotoBold,
    },
})

export default SongCategory
