import React from 'react'
import {ActivityIndicator, Modal, View} from 'react-native'
import {useTheme} from '../../context'
import {DEFAULT_ICON_SIZE} from '../../constants'

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
                    backgroundColor: '#00000033',
                }}>
                <View
                    style={{
                        padding: 30,
                        backgroundColor: themeColors.surfacelight[0] + 'EF',
                        borderRadius: 8,
                    }}>
                    <ActivityIndicator color="white" size={DEFAULT_ICON_SIZE} />
                </View>
            </View>
        </Modal>
    )
}

export default Loader
