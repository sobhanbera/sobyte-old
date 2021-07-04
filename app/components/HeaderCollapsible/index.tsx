import React from 'react'
import {View} from 'react-native'

import {HEADER_MIN_HEIGHT} from '../../constants'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
}
const HeaderCollapsible: React.FC<Props> = props => {
    return (
        <View
            style={{
                height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
                width: '100%',
                // zIndex: 999,
                // elevation: 999,
                backgroundColor: props.headerScrollColor,
            }}>
            {props.children}
        </View>
    )
}

export default HeaderCollapsible
