import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    Pressable,
} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import {DEVICE_STATUSBAR_HEIGHT_CONSTANT, FontRobotoBold} from '../../constants'
import {useTheme} from '../../context'

interface Props {
    navigation: any
    title: string
    morebutton?: React.ReactNode
    goBack?: boolean
    color: string
    backgroundColor?: string
    borderColor?: string
    onPress?: Function
    style?: StyleProp<ViewStyle>
}
const HeaderMain = (props: Props) => {
    const {border, surfacelight} = useTheme().themeColors

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: props.backgroundColor || surfacelight[0],
                    borderBottomColor: props.borderColor || border[0],
                    borderBottomWidth: 1,
                    marginTop: DEVICE_STATUSBAR_HEIGHT_CONSTANT, // the height of the statusbar of the device
                },
                props.style,
            ]}>
            <Pressable onPress={() => props.navigation.goBack()}>
                <Entypo
                    name="chevron-thin-left"
                    color={props.color}
                    size={20}
                />
            </Pressable>
            <Text
                style={[
                    styles.title,
                    {
                        color: props.color,
                        paddingHorizontal: 20,
                    },
                ]}
                numberOfLines={1}>
                {props.title}
            </Text>
            {/* this below is a temporary component for making the parent center the title text component */}
            <Text style={{fontSize: 20}}>{'   '}</Text>
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
        fontSize: 18,
    },
})

export default HeaderMain
