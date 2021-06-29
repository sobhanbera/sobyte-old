import React, {useEffect} from 'react'
import {Text, View} from 'react-native'

import {Area, GradientBackground, HeaderMain} from '../../../components'
import {usePrompt, useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {themeColors} = useTheme()

    return (
        <GradientBackground>
            <View>
                <HeaderMain
                    navigation={props.navigation}
                    title="Settings"
                    color={themeColors.white[0]}
                    backgroundColor={themeColors.background[0] + '80'}
                />

                <Area>
                    <Text style={globalStyles.areaTitle}>
                        Streaming Quality
                    </Text>
                </Area>
            </View>
        </GradientBackground>
    )
}

export default Setting
