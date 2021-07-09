import React, {useEffect} from 'react'
import {View, Text, Animated} from 'react-native'
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

    const handleAnimation = () => {
        Animated.timing(colorAnimator, {
            toValue: 8,
            duration: 3000,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(colorAnimator, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: false,
            }).start(handleAnimation)
        })
    }

    useEffect(() => {
        handleAnimation()
    }, [])

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
                <Animated.Text
                    style={[
                        globalStyles.appName,
                        {
                            color: color,
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
