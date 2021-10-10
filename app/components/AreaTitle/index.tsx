import React from 'react'
import {View, Text} from 'react-native'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'

interface Props {
    title: string
}

const AreaTitle = (props: Props) => {
    const {grey} = useTheme().themeColors

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 22,
                paddingTop: 10,
            }}>
            <Text style={globalStyles.areaBoldTitle}>{props.title}</Text>
        </View>
    )
}

export default AreaTitle
