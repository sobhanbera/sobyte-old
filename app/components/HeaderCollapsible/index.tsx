import React, {useEffect} from 'react'
import {View, Animated, Pressable} from 'react-native'
import {useTranslation} from 'react-i18next'

import {HEADER_MIN_HEIGHT} from '../../constants'
import globalStyles from '../../styles/global.styles'
import {useTheme} from '../../context'
import { TextInput } from 'react-native'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    right?: React.ReactNode
    onPress: Function
    onInputFocus: Function
}
const HeaderCollapsible: React.FC<Props> = props => {
    const {t} = useTranslation()
    const {rgbstreakgradient, placeholder} = useTheme().themeColors
    /**
     * text color changing animation variables and functions
     */
    const colorAnimator = React.useRef(new Animated.Value(0)).current
    const color = colorAnimator.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
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
        <View style={{
            flexDirection: 'column',
            paddingVertical: 10,
            backgroundColor: props.headerScrollColor,
        }}>
            <View style={{
                height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
                width: '100%',
                backgroundColor: props.headerScrollColor,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingHorizontal: 10,
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
            </View>
            <View>
            <TextInput 
                style={{
                    backgroundColor: props.headerScrollColor,
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: placeholder[0],
                    borderRadius: 100,
                    fontSize: 16
                }} 
                value=""
                placeholder="Search Songs, Artists...."
                placeholderTextColor={placeholder[0]}
                onFocus={() => props.onInputFocus()}
            />
            </View>
        </View>
        // <View style={{
        //         backgroundColor: props.headerScrollColor,
        //     }}
        // >
        //     <View
        //         style={{
        //             height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
        //             width: '100%',
        //             backgroundColor: props.headerScrollColor,
        //             paddingHorizontal: 12,
        //         }}>
        //         <View
        //             style={{
        //                 paddingHorizontal: 12,
        //                 paddingVertical: 10,
        //                 flex: 1,
        //                 flexDirection: 'row',
        //                 alignItems: 'center',
        //                 justifyContent: 'space-between',
        //             }}>
        //             <Pressable
        //                 onPress={() => {
        //                     handleLogoRotateAnimation()
        //                     props.onPress()
        //                 }}>
        //                 <Animated.Image
        //                     source={require('../../assets/images/sobyte_logo_white.png')}
        //                     style={{
        //                         height: 27.6,
        //                         width: 21.8,
        //                         transform: [{rotateZ: rotate}],
        //                     }}
        //                 />
        //             </Pressable>
        //             <Animated.Text
        //                 style={[
        //                     globalStyles.appName,
        //                     {
        //                         color: color,
        //                         fontSize: 25,
        //                     },
        //                 ]}>
        //                 {t('common:appName')}
        //             </Animated.Text>
        //             {props.right}
        //         </View>
        //     </View>
        //     <TextInput 
        //         style={{
        //             backgroundColor: props.headerScrollColor,
        //             paddingHorizontal: 10,
        //             paddingVertical: 8,
        //             marginHorizontal: 20,
        //             borderWidth: 0.5,
        //             borderColor: placeholder[0],
        //             borderRadius: 100,
        //             fontSize: 16
        //         }} 
        //         value=""
        //         placeholder="Search Songs, Artists...."
        //         placeholderTextColor={placeholder[0]}
        //         onFocus={() => props.onInputFocus()}
        //     />
        // </View>
    )
}

export default React.memo(HeaderCollapsible)
