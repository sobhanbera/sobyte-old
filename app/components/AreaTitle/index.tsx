import React from 'react'
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {FontVerdana, FontVerdanaBold} from '../../constants'

interface Props {
    title: string
    notBold?: boolean
    containerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<TextStyle>
}

const AreaTitle = (props: Props) => {
    const {grey, themecolorrevert} = useTheme().themeColors

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 22,
                    paddingTop: 10,
                },
                props.containerStyle,
            ]}>
            {/* if there is no arguments for against bold then show bold by default */}
            <Text
                style={[
                    globalStyles.areaBoldTitle,
                    {
                        fontFamily: props.notBold
                            ? FontVerdana
                            : FontVerdanaBold,
                        color: themecolorrevert[0] + 'DF',
                    },
                    props.style,
                ]}>
                {props.title}
            </Text>
        </View>
    )
}

export default AreaTitle
