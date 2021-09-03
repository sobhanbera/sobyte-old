import React from 'react'
import {View, ViewStyle, StatusBar, StatusBarPropsAndroid} from 'react-native'

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
export const DefaultStatusBarComponent = (props: StatusBarPropsAndroid) => (
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
