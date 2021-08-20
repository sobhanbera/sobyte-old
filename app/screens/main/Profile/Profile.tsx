import React, {useState} from 'react'
import {ToastAndroid, View} from 'react-native'
import {ScrollView} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import QRCodeScanner from 'react-native-qrcode-scanner'
import {RNCamera} from 'react-native-camera'

import {GradientBackground, HeaderProfile} from '../../../components'
import {
    DefaultStatusBarComponent,
    DEFAULT_QR_CODE_IMAGE_SIZE,
} from '../../../constants'

const QrCodeScanningAnimation = require('../../../assets/animations/qr_scanning.json')

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const [pos, setPos] = useState<{x: number; y: number}>({x: 0, y: 0})

    return (
        <GradientBackground>
            <DefaultStatusBarComponent backgroundColor={'black'} />

            <ScrollView
                bounces
                alwaysBounceVertical
                bouncesZoom
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <HeaderProfile navigation={props.navigation} />

                {/* qr code generation and rendering view */}
                <View
                    style={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <QRCodeScanner
                        onRead={() => {}}
                        cameraType={'front'}
                        cameraStyle={{}}
                        cameraProps={{
                            flashMode: 'on',
                            onBarCodeRead: e => {
                                // console.log('DATA', e)
                                // alert(e.data)
                            },
                            onDoubleTap: e => {
                                console.log(e)
                                setPos(e)
                            },
                            autoFocus: 'on',
                            focusDepth: 1,
                        }}
                        containerStyle={{
                            position: 'relative',
                        }}
                    />
                    <View
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: '#4040ef',
                            borderRadius: 100,
                            top: pos.y,
                            left: pos.x,
                            position: 'absolute',
                        }}
                    />
                    {/* <QRCode
                        value={'68645582116258840.96939611'}
                        ecl="H"
                        color={'white'}
                        backgroundColor={'#0000007F'}
                        size={DEFAULT_QR_CODE_IMAGE_SIZE}
                        // enableLinearGradient
                        // linearGradient={['tranparent', 'tranparent']}
                        // logoSize={36}
                        // logo={AppIconConstant}
                        onError={() => {
                            // toast the message or a message showing cannot generate QR Code currently...
                            ToastAndroid.show(
                                "Can't generate QR Code currently. Sorry for your inconvenience.",
                                ToastAndroid.SHORT,
                            )
                        }}
                    /> */}
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default Profile
