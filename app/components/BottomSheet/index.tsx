import React from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'
import RealBottomSheet from 'react-native-simple-bottom-sheet'

interface Props {
    isOpen: boolean
    buttons: Array<{
        text: string
        onPress: Function
    }>
}
const BottomSheet = (props: Props) => {
    return (
        <RealBottomSheet isOpen={props.isOpen}>
            {props.buttons.map(text => {
                return (
                    <Text
                        onPress={() => text.onPress()}
                        style={styles.textItem}>
                        {text.text}
                    </Text>
                )
            })}
        </RealBottomSheet>
    )
}

const styles = StyleSheet.create({
    textItem: {
        color: '#FFFFFFFF',
    },
})

export default BottomSheet
