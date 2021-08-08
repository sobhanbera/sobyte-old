import React from 'react'
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native'
import {Text} from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import BottomSheetMain, {BottomSheetScrollView} from '@gorhom/bottom-sheet'

import {useTheme} from '../../context'
import {DEFAULT_ICON_SIZE, FontUbuntu} from '../../constants'
import {Handle} from './Handle'

interface Props {
    cancelText?: string
    isVisible: boolean
    setVisible: Function
    startingTextAlign?: boolean
    buttons: Array<{
        text: string
        onPress: Function
        extraText?: string
        type?: 'input' | ''
        placeholder?: string
        setText?: Function
        inputProps?: TextInputProps
        inputStyle?: StyleProp<TextStyle>
        errorText?: string | ''
    }>
    extraFunction?: Function
}
const BottomSheet = (props: Props) => {
    const {surfacelight, text, placeholder, primary, onWarning} =
        useTheme().themeColors

    const executeExtraFunctionHelper = () =>
        props.extraFunction ? props.extraFunction() : {}

    return (
        <BottomSheetMain
            index={props.isVisible ? 0 : -1}
            snapPoints={[300, 640]}
            onChange={position => {
                if (position <= -1) props.setVisible(false)
            }}
            handleComponent={Handle}
            enableOverDrag
            enablePanDownToClose
            enableHandlePanningGesture
            enableContentPanningGesture
            style={{
                backgroundColor: surfacelight[0],
            }}
            handleHeight={40}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            animateOnMount>
            <View style={[styles.flex, styles.flexEnd]}>
                <BottomSheetScrollView
                    style={{
                        backgroundColor: surfacelight[0],
                        flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {props.buttons.map((button, _) => {
                        if (button.type === 'input') {
                            return (
                                <View key={_}>
                                    <View style={styles.inputHolder}>
                                        <TextInput
                                            placeholder={button.placeholder}
                                            value={button.text}
                                            onChangeText={e =>
                                                button.setText
                                                    ? button.setText(e)
                                                    : {}
                                            }
                                            selectionColor={primary.dark[0]}
                                            keyboardType="numeric"
                                            placeholderTextColor={
                                                placeholder[0]
                                            }
                                            {...button.inputProps}
                                            style={{
                                                flex: 1,
                                                // width: '90%',
                                                color: text[0],
                                                fontSize: 18,
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                button.onPress()
                                            }}
                                            style={{padding: 15}}>
                                            <MaterialIcon
                                                name="done"
                                                size={DEFAULT_ICON_SIZE}
                                                color={text[0]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text
                                            style={[
                                                styles.textItem,
                                                {
                                                    fontSize: 14,
                                                    color: onWarning[0],
                                                },
                                            ]}>
                                            {button.errorText
                                                ? button.errorText
                                                : ''}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                        return (
                            <TouchableOpacity
                                key={_}
                                onPress={() => {
                                    button.onPress()
                                    executeExtraFunctionHelper()
                                    props.setVisible(false)
                                }}
                                style={styles.button}>
                                <Text
                                    style={[
                                        styles.textItem,
                                        props.startingTextAlign ||
                                        button.extraText?.length
                                            ? styles.startingTextAlign
                                            : {},
                                    ]}>
                                    {button.text}
                                </Text>
                                <Text style={[styles.textItem]}>
                                    {button.extraText}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>
            </View>
        </BottomSheetMain>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.4,
        borderBottomColor: '#303030',
    },
    textItem: {
        color: '#FFFFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontFamily: FontUbuntu,
        paddingVertical: 14,
        paddingHorizontal: 25,
        // backgroundColor: 'black',
    },
    startingTextAlign: {
        textAlign: 'left',
    },
    inputHolder: {
        paddingHorizontal: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default BottomSheet
