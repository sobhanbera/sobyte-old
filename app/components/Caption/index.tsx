import React from 'react'
import {Text, StyleProp, TextStyle} from 'react-native'

import {useTheme} from '../../context'

type TextAlignment = 'auto' | 'left' | 'right' | 'center' | 'justify'
interface Props {
    title: string
    onPress: Function
    align?: TextAlignment
    style?: StyleProp<TextStyle>
    color?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}
const Caption = (props: Props) => {
    const {text} = useTheme().themeColors

    return (
        <Text
            onPress={() => props.onPress()}
            style={[
                {
                    color: props.color || text[0] + 'AF',
                    fontSize: 15,
                    paddingVertical: 10,
                    textAlign: props.align || 'center'
                },
                props.style,
            ]}>
            {props.leftIcon}

            {props.title}
            
            {props.rightIcon}
        </Text>
    )
}

export default Caption
