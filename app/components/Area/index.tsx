import React from 'react'
import {View, Text} from 'react-native'

import {useTheme} from '../../context'

interface Props {
    noBackground?: boolean
    backgroundColor?: string
    title?: string
    children?: React.ReactNode
    spacing?: boolean
    column?: boolean
}

const Area = (props: Props) => {
    const {
        background,
        white,
        transparent,
        primary,
        secondary,
        surfacegradient,
    } = useTheme().themeColors

    return (
        <View
            style={{
                paddingVertical: 6,
                paddingHorizontal: props.noBackground ? 0 : 4,
                marginVertical: 6,
                marginHorizontal: 5,
                borderRadius: 6,
                backgroundColor: !props.noBackground
                    ? props.backgroundColor ||
                      surfacegradient[surfacegradient.length - 1]
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
    )
}

export default Area
