import React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-paper'
import Modal from 'react-native-modal'
import {useTranslation} from 'react-i18next'

import {useTheme} from '../../context'
import {FontUbuntu} from '../../constants'

interface Props {
    cancelText?: string
    isVisible: boolean
    setVisible: Function
    buttons: Array<{
        text: string
        onPress: Function
    }>
}
const BottomSheet = (props: Props) => {
    const {themeColors} = useTheme()
    const {t} = useTranslation()

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
            style={[
                styles.modal,
                // {backgroundColor: themeColors.black[0] + '50'},
            ]}>
            <TouchableOpacity onPress={() => props.setVisible(false)}>
                <View style={styles.takeTheInvisibleHeight}></View>
            </TouchableOpacity>
            <View
                style={[
                    styles.wrapper,
                    {
                        backgroundColor: themeColors.surfacelight[0],
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
                        backgroundColor: themeColors.surfacelight[0],
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {props.buttons.map((button, _) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    button.onPress()
                                    props.setVisible(false)
                                }}>
                                <Text key={_} style={styles.textItem}>
                                    {button.text}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                    }}
                    activeOpacity={0.65}
                    onPress={() => props.setVisible(false)}>
                    <Text style={[styles.textItem, styles.cancelTextItem]}>
                        {props.cancelText || t('words:cancel')}
                    </Text>
                </TouchableOpacity>
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
        width: 50,
        height: 5,
        backgroundColor: '#BFBFBF',
        overflow: 'hidden',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    textItem: {
        color: '#FFFFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 19,
        fontFamily: FontUbuntu,
        paddingVertical: 14,
        paddingHorizontal: 15,
        // backgroundColor: 'black',
        borderBottomWidth: 0.4,
        borderBottomColor: '#303030',
    },
    cancelTextItem: {
        backgroundColor: '#000000',
        color: '#FF2030',
    },
})

export default BottomSheet
