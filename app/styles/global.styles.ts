import {FontElikaGorica} from '../constants'
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
        fontSize: 19,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 1000,
        height: 50,
        borderWidth: 0.6,
    },
})

export default globalStyles
