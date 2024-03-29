import React from 'react'
import {View, Animated, Pressable} from 'react-native'
import {useTranslation} from 'react-i18next'

import {HEADER_MIN_HEIGHT} from '../../constants'
import globalStyles from '../../styles/global.styles'
import {useTheme} from '../../context'
import SimpleTextInput from '../SimpleTextInput'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    right?: React.ReactNode
    onPress: Function
    onInputFocus: Function
}
const HeaderCollapsible: React.FC<Props> = props => {
    const {t} = useTranslation()
    const {placeholder, white, themecolorrevert} = useTheme().themeColors

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
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(rotateAnimator, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }).start()
        })
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                paddingVertical: 10,
                backgroundColor: props.headerScrollColor,
                paddingTop: 25,
                marginTop: 15,
            }}>
            <View
                style={{
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
                            color: white[0],
                            fontSize: 27,
                        },
                    ]}>
                    {t('common:appName')}
                </Animated.Text>
            </View>
            <View>
                <SimpleTextInput
                    style={{
                        backgroundColor: props.headerScrollColor,
                        marginVertical: 0,
                        borderColor: themecolorrevert[0] + '60',
                        color: themecolorrevert[0] + 'DF',
                    }}
                    value=""
                    focusable
                    clearTextOnFocus
                    onChangeText={_text => {}}
                    placeholder={t('sentences:search_for_songs_artists')}
                    placeholderTextColor={placeholder[0]}
                    selectionColor="white"
                    onFocus={() => props.onInputFocus()}
                    showSoftInputOnFocus={false}
                    // keyboard will not be shown when this input will be pressed since its a trigger to open an another screen
                    // and this component is a demo or dummy or virual button not text input any more
                />
            </View>
        </View>
    )
}

export default React.memo(HeaderCollapsible)
