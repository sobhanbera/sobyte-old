import React from 'react'
import {View, Text, Image, Dimensions, Pressable} from 'react-native'
import ImageHeaderScrollView, {
    TriggeringView,
} from 'react-native-image-header-scroll-view'
import {useTheme} from '../../context'
import * as Animatable from 'react-native-animatable'

import {
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    PaddingBottomView,
} from '../../constants'
import globalStyles from '../../styles/global.styles'

interface Props {
    headerImage: string
    headerTitle: string
    headerNameTitle: string
    children?: React.ReactNode
}
const AnimatedHeader = (props: Props) => {
    const {themeColors} = useTheme()
    const headerTitleReference = React.useRef<any>(null)

    const showHeaderTitle = () => {
        headerTitleReference.current?.slideInDown(500)
    }
    const hideHeaderTitle = () => {
        headerTitleReference.current?.slideOutUp(500)
    }

    return (
        <ImageHeaderScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            scrollViewBackgroundColor={themeColors.surfacelight[0]}
            overlayColor={themeColors.surfacelight[0]}
            maxOverlayOpacity={1}
            minOverlayOpacity={0.4}
            maxHeight={350}
            minHeight={HEADER_MIN_HEIGHT}
            headerImage={{
                uri: props.headerImage,
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
                        source={{uri: props.headerImage}}
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
                            globalStyles.animatedHeaderTitleContainer,
                            globalStyles.lightBottomBorder,
                            {
                                height: '100%',
                            },
                        ]}>
                        <Pressable onPress={() => {}}>
                            <Text style={globalStyles.animatedHeaderTitle}>
                                {props.headerNameTitle}
                            </Text>
                        </Pressable>
                    </View>
                )
            }}
            renderFixedForeground={() => (
                <Animatable.View
                    style={[
                        globalStyles.animatedHeaderTitleContainer,
                        globalStyles.lightBottomBorder,
                        {
                            backgroundColor: themeColors.surfacelight[0],
                            borderBottomWidth: 1,
                        },
                    ]}
                    ref={headerTitleReference}>
                    <Text
                        style={[
                            globalStyles.animatedHeaderTitle,
                            {
                                fontSize: 20,
                            },
                        ]}>
                        {props.headerTitle}
                    </Text>
                </Animatable.View>
            )}>
            <TriggeringView
                onBeginHidden={showHeaderTitle}
                onHide={showHeaderTitle}
                onBeginDisplayed={hideHeaderTitle}
                onDisplay={hideHeaderTitle}>
                {props.children}

                <PaddingBottomView />
            </TriggeringView>
        </ImageHeaderScrollView>
    )
}

export default AnimatedHeader
