import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {useTheme} from '../../context'

interface Props {
    noBackground?: boolean
    backgroundColor?: string
    title?: string
    children?: React.ReactNode
    spacing?: boolean
    column?: boolean
    onPress?: Function
    icon?: React.ReactNode
    settingIcon?: React.ReactNode
    settingIconName?: string
    iconName?: string
    danger?: boolean
}

const Area = (props: Props) => {
    const {white, grey, surface, red} = useTheme().themeColors

    return (
        <TouchableHighlight
            onPress={() => (props.onPress ? props.onPress() : {})}
            style={{
                marginTop: 12,
                marginBottom: 3,
                marginHorizontal: 6,
                borderRadius: 10,
                overflow: 'hidden',
            }}>
            <View
                style={{
                    paddingVertical: 5,
                    paddingHorizontal: props.noBackground ? 0 : 22,
                    backgroundColor: props.danger ? red[0] : surface[0] + '33',
                    flexDirection: props.column ? 'column' : 'row',
                    justifyContent: props.spacing ? 'space-between' : 'center',
                    alignItems: 'center',
                }}>
                {props.title ? (
                    <Text
                        style={{
                            color: white[0],
                            fontSize: 16,
                            paddingBottom: 5,
                            paddingTop: 0,
                        }}>
                        {props.title}
                    </Text>
                ) : null}

                <View>
                    {props.settingIcon ? (
                        <Entypo
                            name={props.settingIconName || 'chevron-thin-right'}
                            size={20}
                            color={grey[0]}
                            style={{
                                marginHorizontal: 6,
                            }}
                        />
                    ) : null}

                    {props.children}
                </View>

                {props.icon ? (
                    <Entypo
                        name={props.iconName || 'chevron-thin-right'}
                        size={20}
                        color={props.danger ? white[0] : grey[0]}
                    />
                ) : null}
            </View>
        </TouchableHighlight>
    )
}

export default Area
