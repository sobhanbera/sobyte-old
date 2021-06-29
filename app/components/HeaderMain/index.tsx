import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import {FontRobotoBold, FontVerdana} from '../../constants'
import Scaler from '../Scaler'

interface Props {
    navigation: any
    title: string
    morebutton?: React.ReactNode
    goBack?: boolean
    color: string
    backgroundColor: string
    onPress?: Function
}
const HeaderMain = (props: Props) => {
    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: props.backgroundColor,
                },
            ]}>
            <Scaler onPress={() => props.navigation.goBack()}>
                <Entypo
                    name="chevron-thin-left"
                    color={props.color}
                    size={20}
                />
            </Scaler>
            <Text
                style={[
                    styles.title,
                    {
                        color: props.color,
                    },
                ]}>
                {props.title}
            </Text>
            <Scaler onPress={() => props.onPress()}>
                <Text
                    style={[
                        styles.title,
                        {
                            color: props.color,
                        },
                    ]}></Text>
            </Scaler>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontFamily: FontRobotoBold,
        fontSize: 19,
    },
})

export default HeaderMain
