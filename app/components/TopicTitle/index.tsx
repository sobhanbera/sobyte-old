import React from 'react'
import {Text} from 'react-native'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'

interface Props {
    title: string
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
}

const TopicTitle = (props: Props) => {
    const {text} = useTheme().themeColors

    return (
        <Text
            style={[
                globalStyles.topicTitle,
                globalStyles.verySmallPaddingView,
                globalStyles.lightBottomBorder,
                {color: text[0], textAlign: props.textAlign || 'center'},
            ]}>
            {props.title}
        </Text>
    )
}

export default TopicTitle
