import React, {createContext, useContext, useState} from 'react'
import {ActivityIndicator, Modal, View} from 'react-native'
import {useTheme} from '../../context'

const Loader = () => {
    const {themeColors} = useTheme()

    return (
        <Modal
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            transparent>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000046',
                }}>
                <View
                    style={{
                        padding: 30,
                        backgroundColor: themeColors.primary.main[0] + '1f',
                        borderRadius: 8,
                    }}>
                    <ActivityIndicator color="white" size={40} />
                </View>
            </View>
        </Modal>
    )
}

export default Loader
