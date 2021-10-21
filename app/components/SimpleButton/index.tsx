import React from 'react'
import {StyleProp, Text, ViewStyle} from 'react-native'

import globalStyles from '../../styles/global.styles'
import Scaler from '../Scaler'
import {useTheme} from '../../context'

interface Props {
    onPress: Function
    style?: StyleProp<ViewStyle>
}
const SimpleButton = (props: Props) => {
    const {grey, themecolorrevert} = useTheme().themeColors

    return (
        <Scaler
            containerStyle={[
                globalStyles.simpleButton,
                {
                    borderColor: grey[0] + '50',
                },
                props.style,
            ]}
            onPress={() => props.onPress()}>
            <Text
                style={{
                    color: themecolorrevert[0] + 'BF',
                }}>
                Edit Profile
            </Text>
        </Scaler>
    )
}

export default SimpleButton
