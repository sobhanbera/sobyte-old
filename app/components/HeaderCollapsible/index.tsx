import React from 'react'
import {StyleSheet, Animated, ImageBackground} from 'react-native'

interface Props {
    headerScrollHeight: any
    headerScrollColor: any
}
const HeaderCollapsible: React.FC<Props> = props => {
    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: props.headerScrollHeight,
                width: '100%',
                overflow: 'hidden',
                zIndex: 999,
                backgroundColor: props.headerScrollColor,
            }}>
            <ImageBackground
                style={{flex: 1}}
                source={require('../../assets/images/phone_screen.png')}>
                {props.children}
            </ImageBackground>
        </Animated.View>
    )
}

const styles = StyleSheet.create({})

export default HeaderCollapsible
