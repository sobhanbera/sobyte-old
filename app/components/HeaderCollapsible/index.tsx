import React from 'react'
import {StyleSheet, ImageBackground} from 'react-native'
import Animated from 'react-native-reanimated'

import {HEADER_MIN_HEIGHT} from '../../constants'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    headerY: Animated.Node<number> // this is the header position in Y-axis.
}
const HeaderCollapsible: React.FC<Props> = props => {
    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
                width: '100%',
                overflow: 'hidden',
                zIndex: 999,
                elevation: 999,
                backgroundColor: props.headerScrollColor,
                transform: [{translateY: props.headerY}],
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
