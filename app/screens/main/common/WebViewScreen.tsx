import React, {useEffect, useRef, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Linking,
    Clipboard,
    ToastAndroid,
    Share,
} from 'react-native'
import {Menu, Divider} from 'react-native-paper'
import {WebView} from 'react-native-webview'
import {getLinkPreview} from 'link-preview-js'

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    description?: string | undefined
}

interface Props {
    navigation?: any
    route: {
        params: {
            webpage: string
        }
    }
}

/**
 * while any link for downloading file is pressed the app crashes
 * @deprecated
 * the use of this component is deprecated for now since there is no fix for the downloading files crash issue.
 */
const WebViewScreen = (props: Props) => {
    const {webpage} = props.route.params
    const {border, surfacelight, white} = useTheme().themeColors
    const url: URL = new URL(webpage)
    const trustedWebPage: boolean =
        webpage.substring(0, 8).localeCompare('https://') === 0

    const webViewReference = useRef<WebView>(null)

    const [URLData, setURLData] = useState<URLPreviewType>()
    const [visible, setVisible] = React.useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    function LoadingIndicatorView() {
        return <ActivityIndicator color="#000000" size="large" />
    }

    const reloadWebPage = () => {
        webViewReference.current?.reload()
    }

    const openLinkInBrowser = () => {
        Linking.openURL(webpage)
    }

    const copyLink = () => {
        Clipboard.setString(webpage)
        ToastAndroid.showWithGravity(
            'Link Copied',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
    }

    const shareLink = async () => {
        // if the website data isn't laoded then will not share the link too..
        // if (!URLData?.title) {
        //     ToastAndroid.show(
        //         'Please wait till the webpage loads.',
        //         ToastAndroid.SHORT,
        //     )
        //     return
        // }
        // console.log(URLData)
        // website data is now loaded share the link
        await Share.share({
            message: webpage,
        })
    }

    const clearFormdata = () => {
        webViewReference.current?.clearFormData()
    }

    const clearHistory = () => {
        webViewReference.current?.clearHistory()
    }

    const clearCache = () => {
        webViewReference.current?.clearCache(true)
    }

    const goForward = () => {
        webViewReference.current?.goForward()
    }
    const goBackward = () => {
        webViewReference.current?.goBack()
    }
    const stopLoading = () => {
        webViewReference.current?.stopLoading()
    }

    /**
     * getting the link details
     */
    useEffect(() => {
        getLinkPreview(webpage, {})
            .then((data: URLPreviewType | any) => {
                // setting the state after getting the full data
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
            }}
        >
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: surfacelight[0],
                        borderBottomColor: border[0],
                        borderBottomWidth: 1,
                        marginTop: DEVICE_STATUSBAR_HEIGHT_CONSTANT, // the height of the statusbar of the device
                    },
                ]}
            >
                <Feather
                    name="x"
                    color={white[0] + 'BF'}
                    size={DEFAULT_ICON_SIZE}
                    onPress={() => props.navigation.goBack()}
                />
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
                        numberOfLines={1}
                    >
                        {URLData?.title || 'Loading...'}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
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
                            numberOfLines={1}
                        >
                            {url.hostname}
                        </Text>
                    </View>
                </View>

                {/**
                 * this component will give some space between all the other components in the flexbox
                 * eventually this flexbox's justifyContent is now space-between
                 * */}
                <View style={{flexGrow: 10}} />

                <Menu
                    contentStyle={{
                        backgroundColor: surfacelight[0],
                        paddingHorizontal: 12,
                    }}
                    visible={visible}
                    onDismiss={closeMenu}
                    statusBarHeight={HEADER_MIN_HEIGHT + 19}
                    anchor={
                        <MaterialCommunityIcons
                            name={'dots-vertical'}
                            size={DEFAULT_ICON_SIZE} // smaller then the size of text...
                            color={white[0] + 'BF'}
                            onPress={openMenu}
                        />
                    }
                >
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => reloadWebPage()}
                        title="Refresh"
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => openLinkInBrowser()}
                        title="Open In Browser"
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => copyLink()}
                        title="Copy Link..."
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => shareLink()}
                        title="Share Link..."
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => clearFormdata()}
                        title="Clear Formdata?"
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => clearHistory()}
                        title="Clear History"
                    />
                    <Divider />
                    <Menu.Item
                        style={{height: 40}}
                        onPress={() => clearCache()}
                        title="Clear Cache"
                    />
                    <Divider />

                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <MaterialCommunityIcons
                            name={'arrow-left'}
                            size={DEFAULT_ICON_SIZE} // smaller then the size of text...
                            color={white[0] + 'BF'}
                            onPress={() => goBackward()}
                        />
                        <MaterialCommunityIcons
                            name={'arrow-right'}
                            size={DEFAULT_ICON_SIZE} // smaller then the size of text...
                            color={white[0] + 'BF'}
                            onPress={() => goForward()}
                        />
                        <MaterialCommunityIcons
                            name={'refresh'}
                            size={DEFAULT_ICON_SIZE} // smaller then the size of text...
                            color={white[0] + 'BF'}
                            onPress={() => reloadWebPage()}
                        />
                        <Feather
                            name="x"
                            color={white[0] + 'BF'}
                            size={DEFAULT_ICON_SIZE}
                            onPress={() => stopLoading()}
                        />
                    </View>
                </Menu>
            </View>

            <WebView
                ref={webViewReference}
                originWhitelist={['*']}
                source={{uri: webpage}}
                renderLoading={LoadingIndicatorView}
                style={{
                    width: '100%',
                    height: 500,
                }}
                onMessage={msg => {
                    console.log(msg)
                }}
                onHttpError={err => {
                    console.error(err)
                }}
                onError={e => {
                    console.log('EEE', e)
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
