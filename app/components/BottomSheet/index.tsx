import React from 'react'
import {
    ScrollView,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native'
import {Text, TouchableRipple} from 'react-native-paper'
import Modal from 'react-native-modal'

import {useTheme} from '../../context'
import {DEFAULT_ICON_SIZE, FontUbuntu} from '../../constants'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
}
const BottomSheet = (props: Props) => {
    const {
        surfacelight,
        text,
        placeholder,
        primary,
        onWarning,
        onError,
        onDanger,
    } = useTheme().themeColors

    return (
        <Modal
            animationInTiming={400}
            animationOutTiming={400}
            isVisible={props.isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => props.setVisible(false)}
            onBackButtonPress={() => props.setVisible(false)}
            backdropOpacity={0}
            swipeDirection="down"
            onSwipeComplete={() => props.setVisible(false)}
            style={[styles.modal]}>
            <TouchableOpacity onPress={() => props.setVisible(false)}>
                <View style={styles.takeTheInvisibleHeight}></View>
            </TouchableOpacity>
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor: surfacelight[0],
                    },
                ]}>
                <TouchableOpacity
                    onPress={() => props.setVisible(false)}
                    style={styles.flex}>
                    <View style={styles.lineArea}>
                        <View style={styles.line}></View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.flex, styles.flexEnd]}>
                <ScrollView
                    style={{
                        backgroundColor: surfacelight[0],
                        flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {props.buttons.map((button, _) => {
                        if (button.type === 'input') {
                            return (
                                <>
                                    <View key={_} style={styles.inputHolder}>
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
                                </>
                            )
                        }
                        return (
                            <TouchableOpacity
                                key={_}
                                onPress={() => {
                                    button.onPress()
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
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        width: '100%',
        // bottom: BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    takeTheInvisibleHeight: {
        height: '45%',
    },
    wrapper: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        height: 50,
    },
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: 'space-between',
    },
    lineArea: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.4,
        borderBottomColor: '#353535',
    },
    line: {
        width: 45,
        height: 4,
        backgroundColor: '#BFBFBF',
        overflow: 'hidden',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
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
