import React from 'react'
import {View, Text} from 'react-native'
import {TouchableRipple} from 'react-native-paper'
import Entypo from 'react-native-vector-icons/Entypo'

import {useTheme} from '../../context'
import {DEFAULT_TINY_ICON_SIZE} from '../../constants'
import globalStyles from '../../styles/global.styles'

interface Props {
    backgroundColor?: string
    title: string
    description?: string
    onPress?: Function
    icon?: React.ReactNode
    iconName?: string
    danger?: boolean
    disabled?: boolean
}

const Area = (props: Props) => {
    const {grey, surface, red} = useTheme().themeColors

    return (
        <TouchableRipple
            disabled={props.disabled}
            rippleColor={props.danger ? red[0] : surface[0]}
            onPress={() => (props.onPress ? props.onPress() : {})}
            style={{
                marginBottom: 10,
                marginHorizontal: 0,
                overflow: 'hidden',
                paddingVertical: 10,
                paddingHorizontal: 22,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
        >
            <>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={globalStyles.areaTitle}>{props.title}</Text>

                    {/**
                     * if the component `icon` props is not defined then it will be displayed
                     * also if the value is false then only the icon will be disabled not in other cases
                     */}
                    {props.icon !== false ? (
                        <Entypo
                            name={props.iconName || 'chevron-thin-right'}
                            size={DEFAULT_TINY_ICON_SIZE}
                            color={grey[0]}
                        />
                    ) : null}
                </View>

                {props.description ? (
                    <Text style={globalStyles.areaDescription}>
                        {props.description}
                    </Text>
                ) : null}
            </>
        </TouchableRipple>
    )
}

export default Area
