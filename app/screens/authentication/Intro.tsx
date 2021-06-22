import Header from '../../components/Header'
import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useTheme} from '../../themes/ThemeProvider'
import globalStyles from '../../styles/global.styles'

const Intro = () => {
    const {themeColors} = useTheme()

    return (
        <LinearGradient
            style={{width: '100%', flex: 1}}
            colors={themeColors.backgroundgradient}>
            <Text
                style={[
                    globalStyles.whiteText,
                    globalStyles.textFontFocusDisplay,
                    style.appName,
                ]}>
                Sobyte
            </Text>
            <Text
                style={[
                    globalStyles.whiteText,
                    globalStyles.textFontFocusDisplay,
                    style.detailsText,
                ]}>
                Listen And Download Free Music. Anytime, Anywhere.
            </Text>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    appName: {
        fontSize: 50,
    },
    detailsText: {
        fontSize: 25,
    },
})

export default Intro
