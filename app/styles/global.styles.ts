import {
    FontElikaGorica,
    FontHelvetica,
    FontLucida,
    FontTahoma,
    FontUbuntu,
    FontVerdana,
    FontRoboto,
    FontRobotoBold,
} from '../constants'
import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({
    whiteText: {
        color: 'white',
    },
    blackText: {
        color: 'black',
    },
    highPaddingView: {
        paddingVertical: 60,
    },
    mediumPaddingView: {
        paddingVertical: 40,
    },
    smallPaddingView: {
        paddingVertical: 20,
    },
    extraPaddingView: {
        paddingVertical: 100,
    },
    textFontElikaGorica: {
        fontFamily: FontElikaGorica,
    },
    circle: {
        borderRadius: 1000,
    },
    scalerAuthButtonHolder: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 65,
        marginVertical: 10,
    },
    sobyteTextInputHolder: {
        marginHorizontal: 35,
        marginVertical: 10,
    },
    sobyteTextInput: {
        color: '#FFFFFFEF',
        fontSize: 17,
        fontFamily: FontRoboto,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 1000,
        height: 48,
        borderWidth: 0.6,
    },
})

export default globalStyles
