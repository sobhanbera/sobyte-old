import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'

import {useTheme} from '../../context'
import {FontUbuntuBold} from '../../constants'

interface Props {
    onPress: Function
    title: string
    buttonColor?: string
}
const CenterButtonView = (props: Props) => {
    const {text, primary} = useTheme().themeColors

    return (
        <View style={styles.centerButtonWrapper}>
            <TouchableOpacity onPress={() => props.onPress()}>
                <View
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                props.buttonColor ?? primary.dark[0],
                        },
                    ]}>
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: text[0],
                            },
                        ]}>
                        {props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centerButtonWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 8,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 50,
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FontUbuntuBold,
    },
})

export default CenterButtonView
