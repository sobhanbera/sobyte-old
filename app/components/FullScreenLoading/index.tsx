import React from 'react'
import {ActivityIndicator, Modal, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'
import {Scaler} from '../'

interface LoadingProps {
    visible: boolean
}
const FullScreenLoading: React.FC<LoadingProps> = props => {
    const {themeColors} = useTheme()

    return (
        <Modal visible={props.visible} style={{flex: 1}}>
            <LinearGradient
                angle={320}
                angleCenter={{x: 0.5, y: 0.5}}
                useAngle={true}
                style={{width: '100%', flex: 1}}
                colors={themeColors.backgroundgradient}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000026',
                    }}>
                    <Scaler autoAnimate>
                        <View
                            style={{
                                padding: 30,
                                backgroundColor:
                                    themeColors.primary.main[0] + '1f',
                                borderRadius: 8,
                                borderWidth: 0.8,
                                borderColor: themeColors.primary.main[0] + '5f',
                            }}>
                            <ActivityIndicator color="white" size={40} />
                        </View>
                    </Scaler>
                </View>
            </LinearGradient>
        </Modal>
    )
}

export default FullScreenLoading
