import React from 'react'
import {View, Text, Touchable, TouchableHighlight} from 'react-native'

import {useTheme} from '../../context'

interface Props {
    noBackground?: boolean
    backgroundColor?: string
    title?: string
    children?: React.ReactNode
    spacing?: boolean
    column?: boolean
    onPress?: Function
}

const Area = (props: Props) => {
    const {background, white, transparent} = useTheme().themeColors

    return (
        <TouchableHighlight onPress={() => props.onPress()}>
            <View
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: props.noBackground ? 0 : 22,
                    marginTop: 10,
                    marginHorizontal: 6,
                    borderRadius: 10,
                    backgroundColor: !props.noBackground
                        ? props.backgroundColor || background[0]
                        : transparent[0],
                    flexDirection: props.column ? 'column' : 'row',
                    justifyContent: props.spacing ? 'space-between' : 'center',
                    alignItems: 'center',
                }}>
                {props.title ? (
                    <Text
                        style={{
                            color: white[0],
                            fontSize: 16,
                            paddingBottom: 5,
                            paddingTop: 0,
                        }}>
                        {props.title}
                    </Text>
                ) : null}

                {props.children}
            </View>
        </TouchableHighlight>
    )
}

export default Area
