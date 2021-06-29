import React, {useEffect} from 'react'
import {Text, View} from 'react-native'

import {Area, GradientBackground, HeaderMain} from '../../../components'
import {usePrompt, useTheme} from '../../../context'

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
            </View>
        </GradientBackground>
    )
}

export default Setting
