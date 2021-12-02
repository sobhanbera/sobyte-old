import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import {Scaler} from '../'

interface HeaderProps {
    headerTitle?: string
    noHeaderTitle?: boolean
    navigation?: any
    iconColor?: string
    iconSize?: number
    color?: string
    transparency?: string
    goBack: boolean
    rightIconsList?: Array<React.ReactNode>
}
const Header = (props: HeaderProps) => {
    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: '#000000' + props.transparency || '00',
                },
            ]}
        >
            <View style={styles.innerHeader}>
                <Scaler
                    scale={0.9}
                    onPress={() =>
                        props.goBack ? props.navigation.goBack() : null
                    }
                >
                    <Icon
                        style={styles.headerIcon}
                        name="arrow-left"
                        size={props.iconSize ?? 20}
                        color={props.iconColor ?? '#ffffff'}
                    />
                </Scaler>
                <Text
                    style={[
                        styles.headerTitle,
                        {color: props.color ?? '#ffffff'},
                    ]}
                >
                    {props.headerTitle ?? ''}
                </Text>
            </View>
            {props.rightIconsList
                ? props.rightIconsList.map((icon, _) => {
                      return <View key={_}>{icon}</View>
                  })
                : null}
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
