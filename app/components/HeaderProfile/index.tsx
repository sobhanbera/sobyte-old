import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface Props {}
const HeaderProfile = (props: Props) => {
    return <View style={styles.header}></View>
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 55,
    },
})

export default HeaderProfile
