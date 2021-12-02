import React from 'react'
import {View} from 'react-native'
import globalStyles from '../../styles/global.styles'

interface HighPaddingViewProps {
    children?: React.ReactNode
    padding?: 'high' | 'medium' | 'small' | 'extra'
}
const PaddingView = (props: HighPaddingViewProps) => {
    return (
        <View
            style={
                props.padding === 'high'
                    ? globalStyles.highPaddingView
                    : props.padding === 'medium'
                    ? globalStyles.mediumPaddingView
                    : props.padding === 'extra'
                    ? globalStyles.extraPaddingView
                    : globalStyles.smallPaddingView
            }
        >
            {props.children}
        </View>
    )
}
export default PaddingView
