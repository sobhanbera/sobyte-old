import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'

import {useTheme} from '../../context'

interface Props {
    navigation: any
}
const HeaderProfile = (props: Props) => {
    const {surface} = useTheme().themeColors

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: surface[0],
                },
            ]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    props.navigation.navigate('setting')
                }}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/images/icons/setting.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },

    icon: {
        width: 23,
        height: 23,
        margin: 8,
    },
})

export default HeaderProfile
