import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native'
import {Menu} from 'react-native-paper'
import {WebView} from 'react-native-webview'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {getLinkPreview, getPreviewFromContent} from 'link-preview-js'

import {Scaler} from '../../../components'
import {useTheme} from '../../../context'
import {
    DEFAULT_ICON_SIZE,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    FontRoboto,
    HEADER_MIN_HEIGHT,
} from '../../../constants'

interface URLPreviewType {
    contentType: string
    favicons: string[]
    images: string[]
    mediaType: string
    siteName: string
    title: string
    url: string
    videos: string[]
}

interface Props {
    navigation?: any
    route: {
        params: {
            webpage: string
        }
    }
}

const WebViewScreen = (props: Props) => {
    const {webpage} = props.route.params
    const {border, surfacelight, white} = useTheme().themeColors
    const url: URL = new URL(webpage)
    const trustedWebPage: boolean =
        webpage.substring(0, 8).localeCompare('https://') === 0

    const [URLData, setURLData] = useState<URLPreviewType>()

    function LoadingIndicatorView() {
        return <ActivityIndicator color="#000000" size="large" />
    }

    useEffect(() => {
        getLinkPreview(webpage, {})
            .then((data: URLPreviewType | any) => {
                setURLData(data)
            })
            .catch(err => {
                console.log('WEB VIEW', err)
            })
    }, [webpage])

    return (
        <View
            style={{
                flex: 1,
            }}>
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: surfacelight[0],
                        borderBottomColor: border[0],
                        borderBottomWidth: 1,
                        marginTop: DEVICE_STATUSBAR_HEIGHT_CONSTANT, // the height of the statusbar of the device
                    },
                ]}>
                <Scaler onPress={() => props.navigation.goBack()}>
                    <Feather
                        name="x"
                        color={white[0]}
                        size={DEFAULT_ICON_SIZE}
                    />
                </Scaler>
                <Image
                    source={{
                        uri: URLData?.images[0],
                    }}
                    style={styles.webpageIcon}
                />
                <View>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: white[0],
                            },
                        ]}
                        numberOfLines={1}>
                        {URLData?.title}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Ionicons
                            name={trustedWebPage ? 'lock-closed' : 'warning'}
                            size={8} // smaller then the size of text...
                            color={white[0] + 'BF'}
                            style={styles.trustedWebpageIcon}
                        />
                        <Text
                            style={[
                                styles.url,
                                {
                                    color: white[0] + 'BF',
                                },
                            ]}
                            numberOfLines={1}>
                            {url.hostname}
                        </Text>
                    </View>
                </View>

                {/**
                 * this component will give some space between all the other components in the flexbox
                 * eventually this flexbox's justifyContent is now space-between
                 * */}
                <View style={{flexGrow: 10}} />

                <MaterialCommunityIcons
                    name="dots-vertical"
                    color={white[0]}
                    size={DEFAULT_ICON_SIZE}
                />
            </View>

            <WebView
                originWhitelist={['*']}
                source={{uri: webpage}}
                renderLoading={LoadingIndicatorView}
                style={{
                    width: '100%',
                    height: 500,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: HEADER_MIN_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    webpageIcon: {
        marginHorizontal: 10,
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    title: {
        fontFamily: FontRoboto,
        fontSize: 17,
        fontWeight: 'bold',
    },
    url: {
        fontFamily: FontRoboto,
        fontSize: 12,
    },
    trustedWebpageIcon: {
        marginRight: 3,
        includeFontPadding: false,
        padding: 0,
    },
})

export default WebViewScreen
