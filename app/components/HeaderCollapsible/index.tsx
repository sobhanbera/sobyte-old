import React, {useEffect} from 'react'
import {View, Animated, Pressable} from 'react-native'
import {useTranslation} from 'react-i18next'

import {HEADER_MIN_HEIGHT} from '../../constants'
import globalStyles from '../../styles/global.styles'
import {useTheme} from '../../context'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    right?: React.ReactNode
    onPress: Function
}
const HeaderCollapsible: React.FC<Props> = props => {
    const {t} = useTranslation()
    const {rgbstreakgradient} = useTheme().themeColors
    /**
     * text color changing animation variables and functions
     */
    const colorAnimator = React.useRef(new Animated.Value(0)).current
    const color = colorAnimator.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5],
        outputRange: rgbstreakgradient,
    })
    const handleColorAnimation = () => {
        Animated.timing(colorAnimator, {
            toValue: 8,
            duration: 6000,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(colorAnimator, {
                toValue: 0,
                duration: 6000,
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
                <Pressable
                    onPress={() => {
                        handleLogoRotateAnimation()
                        props.onPress()
                    }}>
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
