import React from 'react'
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native'

import globalStyles from '../../styles/global.styles'
import Scaler from '../Scaler'
import {useTheme} from '../../context'

interface Props {
    onPress: Function
    title: string
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}
const SimpleButton = (props: Props) => {
    const {grey, themecolorrevert} = useTheme().themeColors

    return (
        <Scaler
            containerStyle={[
                globalStyles.simpleButton,
                {
                    borderColor: grey[0] + '55',
                },
                props.style,
            ]}
            onPress={() => props.onPress()}
        >
            {props.leftIcon}
            <Text
                style={[
                    globalStyles.simpleButtonText,
                    {
                        color: themecolorrevert[0] + 'EF',
                        textAlign: 'center',
                    },
                    props.textStyle,
                ]}
            >
                {props.title}
            </Text>
            {props.rightIcon}
        </Scaler>
    )
}

export default SimpleButton
