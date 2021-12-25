import {
    FontElikaGorica,
    FontRoboto,
    FontRobotoBold,
    FontUbuntuBold,
    HEADER_MIN_HEIGHT,
    IMAGE_SMALL_SIZE_TO_SHOW,
    DEFAULT_TINY_ICON_SIZE,
    IMAGE_TINY_SIZE_TO_SHOW,
    DEVICE_STATUSBAR_HEIGHT_CONSTANT,
    IMAGE_MARGIN_TO_SHOW,
    FontVerdana,
    FontVerdanaBold,
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

    loadingArea: {
        width: '100%',
        paddingVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 120,
    },
    appLogoAnimation: {
        width: 35,
    },
    loadingText: {
        fontSize: 19,
        color: 'white',
    },

    topicTitle: {
        fontSize: 20,
        fontFamily: FontRobotoBold,
        letterSpacing: 0.6,
        paddingHorizontal: IMAGE_MARGIN_TO_SHOW,
        paddingVertical: 8,
        marginHorizontal: IMAGE_MARGIN_TO_SHOW,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    lightBottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#7f7f7f16',
    },

    boldText: {
        fontWeight: 'bold',
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
        marginTop: DEVICE_STATUSBAR_HEIGHT_CONSTANT,
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

    extraPaddingHor: {
        paddingHorizontal: 100,
    },
    highPaddingHor: {
        paddingHorizontal: 60,
    },
    mediumPaddingHor: {
        paddingHorizontal: 40,
    },
    smallPaddingHor: {
        paddingHorizontal: 20,
    },
    verySmallPaddingHor: {
        paddingHorizontal: 10,
    },
    tinyPaddingHor: {
        paddingHorizontal: 5,
    },
    veryTinyPaddingHor: {
        paddingHorizontal: 3,
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

    /**
     * simple textinput styles
     */
    simpleTextInput: {
        marginHorizontal: 20,
        marginVertical: 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 100,
        fontSize: 16,
    },

    fullImageBackground: {
        width: '100%',
        height: '100%',
    },

    areaBoldTitle: {
        fontSize: 14,
        fontFamily: FontVerdanaBold,
        paddingTop: 10,
        paddingBottom: 0,
        // includeFontPadding: true,
    },
    areaTitle: {
        fontSize: 16,
        fontFamily: FontVerdana,
        paddingBottom: 4,
        includeFontPadding: true,
    },
    areaDescription: {
        color: '#B7B7B7',
        fontSize: 13,
        fontFamily: FontVerdana,
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
     * explore tab all cards designs
     */
    blockOrCardOuterBlock: {
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
    },
    blockOrCardinnerBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',

        borderBottomWidth: 1,
        borderBottomColor: '#7f7f7f16',
    },

    /**
     * modal designs for the application are here-
     */
    bareModal: {
        height: '100%',
        width: '100%',
        // bottom: BOTTOM_TAB_BAR_NAVIGATION_HEIGHT,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },

    /**
     * buttons
     */
    simpleButton: {
        borderRadius: 8,
        borderWidth: 0.65,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    simpleButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    border5: {
        borderRadius: 6,
    },

    /**
     * animated header style design ends
     */
})

export const songComponentsStyles = StyleSheet.create({
    commonCard: {
        paddingHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commonCardMain: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    commonSongDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    commonSongName: {
        fontSize: 17,
        maxWidth: 225,
        width: 225,
        marginVertical: 2,
    },
    commonSongDetailsText: {
        fontSize: 15,
        maxWidth: 225,
        width: 225,
    },
    commonArtistName: {
        fontSize: 17,
        maxWidth: 225,
        marginVertical: 2,
        paddingHorizontal: 15,
    },

    contentWrapper: {
        backgroundColor: '#0000007f',
    },
    imageDummy: {
        width: IMAGE_SMALL_SIZE_TO_SHOW,
        height: IMAGE_SMALL_SIZE_TO_SHOW,
    },
    imageTinyDummy: {
        width: IMAGE_TINY_SIZE_TO_SHOW,
        height: IMAGE_TINY_SIZE_TO_SHOW,
        borderRadius: 100,
    },
    textDummy: {
        width: 200,
        height: 7,
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 6,
    },
    textTinyDummy: {
        width: 200,
        height: 7,
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 6,
        marginHorizontal: 15,
    },
    largeTextDummy: {
        height: 12,
        borderRadius: 3,
    },
    commonSongDummyIcon: {
        width: DEFAULT_TINY_ICON_SIZE,
        height: DEFAULT_TINY_ICON_SIZE,
        paddingVertical: 12,
    },

    containerTopicTextHolderSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 10,
        // flexWrap: 'wrap',
    },
    containerTopicText: {
        fontSize: 16,
        borderRadius: 1000,
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginHorizontal: 8,
        marginVertical: 5,
    },
    containerTopicTextSelected: {
        color: 'white',
        backgroundColor: 'black',
    },
})

export default globalStyles
