import React, {useEffect} from 'react'
import {View, Text, Animated, Image, Pressable} from 'react-native'
import {useTranslation} from 'react-i18next'

import {HEADER_MIN_HEIGHT} from '../../constants'
import globalStyles from '../../styles/global.styles'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    right?: React.ReactNode
}
const HeaderCollapsible: React.FC<Props> = props => {
    const {t} = useTranslation()

    /**
     * text color changing animation variables and functions
     */
    const colorAnimator = React.useRef(new Animated.Value(0)).current
    const color = colorAnimator.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        outputRange: [
            '#ff0900',
            '#ff6200',
            '#ffb300',
            '#fffb00',
            '#5aff01',
            '#04ffee',
            '#1d04ff',
            '#cc01ff',
            '#ff008c',
        ],
    })
    const handleColorAnimation = () => {
        Animated.timing(colorAnimator, {
            toValue: 8,
            duration: 4500,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(colorAnimator, {
                toValue: 0,
                duration: 4500,
                useNativeDriver: false,
            }).start(handleColorAnimation)
        })
    }
    useEffect(() => {
        handleColorAnimation()
    }, [])

    /**
     * logo animation rotate property variables and functions
     */
    const rotateAnimator = React.useRef(new Animated.Value(0)).current
    const rotate = rotateAnimator.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })
    const handleLogoRotateAnimation = () => {
        Animated.timing(rotateAnimator, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(rotateAnimator, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start()
        })
    }

    return (
        <View
            style={{
                height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
                width: '100%',
                backgroundColor: props.headerScrollColor,
            }}>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Pressable onPress={handleLogoRotateAnimation}>
                    <Animated.Image
                        source={require('../../assets/images/sobyte_logo_white.png')}
                        style={{
                            height: 27.6,
                            width: 21.8,
                            transform: [{rotateZ: rotate}],
                        }}
                    />
                </Pressable>
                <Animated.Text
                    style={[
                        globalStyles.appName,
                        {
                            color: color,
                            fontSize: 25,
                        },
                    ]}>
                    {t('common:appName')}
                </Animated.Text>
                {props.right}
            </View>
        </View>
    )
}

export default React.memo(HeaderCollapsible)
