import React from 'react'
import {StyleProp} from 'react-native'
import {View, Text, ViewStyle} from 'react-native'

import {useTheme} from '../../context'

interface Props {
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
    padding?: boolean
    noBackground?: boolean
}

const Block = (props: Props) => {
    const {surfacelight, transparent} = useTheme().themeColors

    return (
        <View
            style={[
                {
                    paddingVertical: 5,
                    paddingHorizontal: 0,
                    paddingBottom: props.padding ? 20 : 8,
                    marginVertical: 5,
                    marginHorizontal: 8,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: props.noBackground
                        ? transparent[0]
                        : surfacelight[0],
                },
                props.style,
            ]}
        >
            {props.children}
        </View>
    )
}

export default Block
