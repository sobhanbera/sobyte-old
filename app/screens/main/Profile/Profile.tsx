import React from 'react'
import {ToastAndroid, View, StatusBar} from 'react-native'
import {ScrollView} from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import {GradientBackground, HeaderProfile} from '../../../components'
import {
    DefaultStatusBarComponent,
    DEFAULT_QR_CODE_IMAGE_SIZE,
} from '../../../constants'

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    StatusBar.setBackgroundColor('black', true)

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
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default Profile
