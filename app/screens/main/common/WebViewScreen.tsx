import React from 'react'
import {View, Text} from 'react-native'
import {WebView} from 'react-native-webview'

interface Props {}

const WebViewScreen = (props: Props) => {
    return (
        <View>
            <WebView
                source={{uri: 'https://logrocket.com/'}}
                style={{marginTop: 20}}
            />
        </View>
    )
}

export default WebViewScreen
