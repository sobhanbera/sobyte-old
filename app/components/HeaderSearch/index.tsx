import React from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import {Text} from 'react-native-paper'

const NAVBAR_HEIGHT = 50
const STATUS_BAR_HEIGHT = Platform.select({ios: 20, android: 24})

interface Props {}
const HeaderSearch: React.FC<Props> = props => {
    return <View></View>
}

const styles = StyleSheet.create({})

export default HeaderSearch
