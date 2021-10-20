import React from 'react'
import {
    View,
    ViewStyle,
    StatusBar,
    StatusBarPropsAndroid,
    StatusBarProps,
    NativeModules,
} from 'react-native'

const {StatusBarManager} = NativeModules
const DEVICE_STATUSBAR_HEIGHT_CONSTANT = StatusBarManager.HEIGHT

export const PaddingBottomView = (props: ViewStyle) => (
    <View
        style={[
            {
                paddingBottom: 120,
                backgroundColor: 'transparent',
            },
            props,
        ]}
    />
)
export const DefaultStatusBarComponent = (
    props: StatusBarPropsAndroid | StatusBarProps,
) => (
    <StatusBar
        backgroundColor={'black'}
        translucent={true}
        barStyle="light-content"
        animated={true}
        hidden={false}
        showHideTransition={'fade'}
        {...props}
    />
)

export const DefaultDeviceHeightView = () => (
    <View
        style={{
            marginBottom: DEVICE_STATUSBAR_HEIGHT_CONSTANT,
        }}
    />
)

export const Separator = (props: {color: string}) => (
    <View
        style={[
            {
                borderTopWidth: 0.5,
                paddingHorizontal: 20,
                marginVertical: 8,
                borderTopColor: props.color,
            },
        ]}
    />
)
