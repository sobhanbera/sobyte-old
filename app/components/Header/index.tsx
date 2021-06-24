import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import {useTheme} from '../../themes/ThemeProvider'

interface HeaderProps {
    headerTitle?: string
    noHeaderTitle?: boolean
    navigation?: any
    iconColor?: string
    iconSize?: number
    color?: string
    transparency?: string
    goBack: boolean
}
const Header = (props: HeaderProps) => {
    const {ChooseThemeOptions} = useTheme()

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: ChooseThemeOptions(
                        '#000000' + props.transparency ?? '00',
                        '#efefef' + props.transparency ?? '00',
                        'pink',
                    ),
                },
            ]}>
            <View style={styles.innerHeader}>
                <Icon
                    onPress={() =>
                        props.goBack ? props.navigation.goBack() : null
                    }
                    style={styles.headerIcon}
                    name="arrow-left"
                    size={props.iconSize ?? 20}
                    color={props.iconColor ?? '#ffffff'}
                />
                <Text
                    style={[
                        styles.headerTitle,
                        {color: props.color ?? '#ffffff'},
                    ]}>
                    {!props.noHeaderTitle
                        ? props.headerTitle ?? 'Header Title'
                        : ''}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    innerHeader: {
        flex: 1,
        paddingHorizontal: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerIcon: {
        paddingHorizontal: 8,
    },
    headerTitle: {
        color: '#ffffffff',
        fontSize: 21,
        paddingLeft: 10,
    },
})

export default Header
