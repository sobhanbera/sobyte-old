import React from 'react'
import {
    Linking,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'

import {PRIVACY_POLICY_LINK, TERM_AND_CONDITIONS_LINK} from '../../constants'

interface Props {
    padding?: number
}
const TC_AND_PRIVACY_POLICY = (props: Props) => {
    const openLink = async (url: string) => {
        if (await Linking.canOpenURL(url)) {
            Linking.openURL(url)
        } else {
            ToastAndroid.show(
                "Looks like you device doesn't support opening this link.",
                ToastAndroid.SHORT,
            )
        }
    }

    return (
        <View
            style={[
                styles.privacyHolder,
                {paddingVertical: props.padding ?? 25},
            ]}
        >
            <Text style={styles.privacyAndTCText}>
                By signing up, you agree to our{' '}
                <TouchableOpacity
                    onPress={() => openLink(TERM_AND_CONDITIONS_LINK)}
                >
                    <Text
                        style={[
                            styles.privacyAndTCText,
                            styles.privacyKeyWords,
                        ]}
                    >
                        Terms & Conditions
                    </Text>
                </TouchableOpacity>
                {' and '}
                <TouchableOpacity onPress={() => openLink(PRIVACY_POLICY_LINK)}>
                    <Text
                        style={[
                            styles.privacyAndTCText,
                            styles.privacyKeyWords,
                        ]}
                    >
                        Privacy Policy.
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    privacyHolder: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    privacyAndTCText: {
        color: '#afafaf',
        fontFamily: 'Ubuntu Light',
        textAlign: 'center',
        // lineHeight: 22,
        fontSize: 14,
    },
    privacyKeyWords: {
        textDecorationLine: 'underline',
    },
})

export default TC_AND_PRIVACY_POLICY
