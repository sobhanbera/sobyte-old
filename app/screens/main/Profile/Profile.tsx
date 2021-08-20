import React from 'react'
import {
    ToastAndroid,
    View,
    Linking,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {ScrollView} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import QRCodeScanner from 'react-native-qrcode-scanner'
import {RNCamera} from 'react-native-camera'

import {GradientBackground, HeaderProfile} from '../../../components'
import {
    DefaultStatusBarComponent,
    DEFAULT_QR_CODE_IMAGE_SIZE,
} from '../../../constants'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
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
                {/* <HeaderProfile navigation={props.navigation} /> */}

                <QRCodeScanner
                    onRead={e => {
                        console.log(e)
                    }}
                    cameraType={'back'}
                    cameraStyle={{}}
                    cameraProps={{
                        flashMode: 'on',
                        onBarCodeRead: e => {
                            console.log('DATA', e)
                        },
                    }}
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
                {/* qr code generation and rendering view */}
                {/* <View
                    style={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <QRCode
                        value={'1'}
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
                    />
                </View> */}
            </ScrollView>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
})

export default Profile
