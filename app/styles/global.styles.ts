import {
    FontElikaGorica,
    FontHelvetica,
    FontLucida,
    FontTahoma,
    FontUbuntu,
    FontVerdana,
    FontRoboto,
    FontRobotoBold,
    FontUbuntuBold,
    HEADER_MIN_HEIGHT,
} from '../constants'
import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({
    appName: {
        color: 'white',
        fontSize: 23,
        fontFamily: FontUbuntuBold,
        paddingHorizontal: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    whiteText: {
        color: 'white',
    },
    blackText: {
        color: 'black',
    },

    topicTitle: {
        fontSize: 20,
        fontFamily: FontRobotoBold,
        letterSpacing: 0.6,
        paddingHorizontal: 13,
        paddingVertical: 8,
        marginHorizontal: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    lightBottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#7f7f7f16',
    },

    flex: {
        flex: 1,
    },
    coverFullArea: {
        width: '100%',
        height: '100%',
    },

    header: {
        width: '100%',
        height: HEADER_MIN_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    extraPaddingView: {
        paddingVertical: 100,
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
    verySmallPaddingView: {
        paddingVertical: 10,
    },
    tinyPaddingView: {
        paddingVertical: 5,
    },
    veryTinyPaddingView: {
        paddingVertical: 3,
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

    fullImageBackground: {
        width: '100%',
        height: '100%',
    },

    areaTitle: {
        color: '#FFFFFFE0',
        fontSize: 18,
        fontFamily: FontTahoma,
        paddingVertical: 10,
        includeFontPadding: true,
    },

    searchTabTopic: {
        fontSize: 18,
        textAlign: 'center',
        width: '100%',
        textAlignVertical: 'center',
    },

    /**
     * animated header designs start
     */

    animatedHeaderImage: {
        width: '100%',
        height: 350,
    },
    animatedHeaderTitleContainer: {
        height: HEADER_MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        width: '100%',
    },
    animatedHeaderTitle: {
        color: 'white',
        fontSize: 40,
        backgroundColor: 'transparent',
        fontFamily: FontRobotoBold,
    },

    /**
     * animated header style design ends
     */
})

export default globalStyles
