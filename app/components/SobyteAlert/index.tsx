import React, {createContext, useState} from 'react'
import {
    ImageBackground,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {useTheme} from '../../context'
import {FontRoboto} from '../../constants'
import {Scaler} from '../'

export interface SobyteAlertProps {
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    visible: boolean

    onlyConfirmButton?: boolean
    activeOpacity?: number
    setVisibility: (value: any) => void
    onConfirm?: () => void
}
const SobyteAlert: React.FC<SobyteAlertProps> = props => {
    const {themeColors} = useTheme()

    return (
        <Modal visible={props.visible} transparent>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000050',
                }}>
                <Scaler touchableOpacity={1} scale={0.96}>
                    <ImageBackground
                        source={require('../../assets/images/phone_screen.png')}
                        blurRadius={100}
                        style={{
                            width: 310,
                            paddingTop: 10,
                            backgroundColor: themeColors.surface[0] + 'FF',
                            borderRadius: 10,
                            elevation: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                width: '85%',
                                fontSize: 18,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                paddingBottom: 8,
                                paddingTop: 3,
                                color: themeColors.white[0],
                                fontFamily: FontRoboto,
                                borderBottomColor: themeColors.white[0] + '0f',
                                borderBottomWidth: 1,
                            }}>
                            {props.title ?? 'Alert Box Title'}
                        </Text>

                        <Text
                            style={{
                                color: themeColors.white[0],
                                width: '85%',
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
                                flexDirection: 'row',
                                paddingTop: 12.5,
                            }}>
                            {!props.onlyConfirmButton && (
                                <TouchableOpacity
                                    activeOpacity={props.activeOpacity ?? 0.75}
                                    onPress={() => props.setVisibility(false)}
                                    style={{
                                        width: '50%',
                                        paddingVertical: 10,
                                        paddingHorizontal: 8,
                                        backgroundColor:
                                            themeColors.onDanger[0] + '7F',
                                        borderBottomLeftRadius: 8,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: FontRoboto,
                                            width: '100%',
                                            color: themeColors.white[0],
                                            textAlignVertical: 'center',
                                            textAlign: 'center',
                                        }}>
                                        {props.cancelText ?? 'Cancel'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                activeOpacity={props.activeOpacity ?? 0.75}
                                onPress={() => {
                                    if (props.onConfirm) {
                                        props.onConfirm()
                                        props.setVisibility(false)
                                        return
                                    }
                                    props.setVisibility(false)
                                }}
                                style={{
                                    width: props.onlyConfirmButton
                                        ? '100%'
                                        : '50%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 8,
                                    backgroundColor: props.onlyConfirmButton
                                        ? themeColors.black[0] + '2F'
                                        : themeColors.primary.dark[0] + 'FF',
                                    borderBottomRightRadius: 8,
                                    borderBottomLeftRadius:
                                        props.onlyConfirmButton ? 8 : 0,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: FontRoboto,
                                        width: '100%',
                                        color: themeColors.white[0],
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                    }}>
                                    {props.confirmText ?? 'OK'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Scaler>
            </View>
        </Modal>
    )
}

export default SobyteAlert
