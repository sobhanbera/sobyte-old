import {useTheme} from '../../themes/ThemeProvider'
import React from 'react'
import {StyleSheet, View} from 'react-native'

interface HeaderProps {}
const Header = (props: HeaderProps) => {
    const {ChooseThemeOptions} = useTheme()

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: ChooseThemeOptions(
                        '#000000',
                        'white',
                        'pink',
                    ),
                },
            ]}></View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 40,
    },
})

export default Header
