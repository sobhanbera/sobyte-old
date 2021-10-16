import React from 'react'
import {Pressable, Text, View} from 'react-native'
import Modal from 'react-native-modal'

import {useTheme} from '../../context'
import {FontRoboto, FontRobotoBold} from '../../constants'
import {Scaler} from '../'
import globalStyles from '../../styles/global.styles'

export interface SobyteAlertProps {
    description?: string
    confirmText?: string
    cancelText?: string
    visible: boolean

    activeOpacity?: number
    setVisibility: (value: any) => void
    onConfirm?: () => void
}
const SobyteAlert: React.FC<SobyteAlertProps> = props => {
    const {themeColors} = useTheme()

    return (
        <Modal
            isVisible={props.visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={() => props.setVisibility(false)}
            onBackButtonPress={() => props.setVisibility(false)}
            backdropOpacity={0}
            swipeDirection="right"
            onSwipeComplete={() => props.setVisibility(false)}
            style={[globalStyles.bareModal]}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Scaler onPress={() => {}} touchableOpacity={1} scale={0.96}>
                    <View
                        style={{
                            width: 310,
                            paddingTop: 10,
                            backgroundColor: themeColors.surface[0] + 'FF',
                            borderRadius: 10,
                            elevation: 5,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: themeColors.white[0],
                                width: '90%',
                                fontSize: 16,
                                paddingVertical: 15,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontFamily: FontRoboto,
                            }}>
                            {props.description ??
                                'Alert Box Description... This is the text which tell the details about the alert or in other word the meaning of the title. This is demo description.'}
                        </Text>

                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingTop: 12.5,
                            }}>
                            <Pressable
                                onPress={() => props.setVisibility(false)}
                                style={{
                                    width: '50%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 8,
                                    backgroundColor:
                                        themeColors.surfacelight[0] + 'FF',
                                    borderBottomLeftRadius: 8,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: FontRobotoBold,
                                        width: '100%',
                                        color: themeColors.white[0],
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                    }}>
                                    {props.cancelText ?? 'Cancel'}
                                </Text>
                            </Pressable>

                            {/* border between both buttons */}
                            <Text
                                style={{
                                    borderRightColor:
                                        themeColors.grey[0] + '7F',
                                    borderRightWidth: 1,
                                    backgroundColor:
                                        themeColors.surfacelight[0] + 'FF',
                                    paddingVertical: 10,
                                }}></Text>

                            <Pressable
                                onPress={() => {
                                    if (props.onConfirm) {
                                        props.onConfirm()
                                        props.setVisibility(false)
                                        return
                                    }
                                    props.setVisibility(false)
                                }}
                                style={{
                                    width: '50%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 8,
                                    backgroundColor:
                                        themeColors.surfacelight[0] + 'FF',
                                    borderBottomRightRadius: 8,
                                    borderBottomLeftRadius: 0,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: FontRobotoBold,
                                        width: '100%',
                                        color: themeColors.white[0],
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                    }}>
                                    {props.confirmText ?? 'OK'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Scaler>
            </View>
        </Modal>
    )
}

export default SobyteAlert
