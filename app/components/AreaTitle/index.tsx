import React from 'react'
import {View, Text} from 'react-native'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {FontVerdana, FontVerdanaBold} from '../../constants'

interface Props {
    title: string
    notBold?: boolean
}

const AreaTitle = (props: Props) => {
    const {grey} = useTheme().themeColors

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 22,
                paddingTop: 10,
            }}>
            {/* if there is no arguments for against bold then show bold by default */}
            <Text
                style={[
                    globalStyles.areaBoldTitle,
                    {
                        fontFamily: props.notBold
                            ? FontVerdana
                            : FontVerdanaBold,
                    },
                ]}>
                {props.title}
            </Text>
        </View>
    )
}

export default AreaTitle
