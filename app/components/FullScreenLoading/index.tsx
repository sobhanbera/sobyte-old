import React from 'react'
import {Modal, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {useTheme} from '../../context'
import {Loader} from '..'

interface LoadingProps {}
const FullScreenLoading: React.FC<LoadingProps> = props => {
    const {themeColors} = useTheme()

    return (
        <Modal style={{flex: 1}}>
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
                    }}>
                    <Loader />
                </View>
            </LinearGradient>
        </Modal>
    )
}

export default FullScreenLoading
