import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'

import {
    Area,
    BottomSheet,
    GradientBackground,
    HeaderMain,
} from '../../../components'
import {usePrompt, useTheme} from '../../../context'
import globalStyles from '../../../styles/global.styles'

interface SettingProps {
    navigation?: any
}
const Setting: React.FC<SettingProps> = props => {
    const {themeColors} = useTheme()
    const [isVisible, setIsVisible] = useState(true)

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

            <BottomSheet
                isVisible={isVisible}
                setVisible={setIsVisible}
                buttons={[
                    {
                        text: 'Extreme',
                        onPress: () => {
                            console.log('e')
                        },
                    },
                    {
                        text: 'Good',
                        onPress: () => {
                            console.log('g')
                        },
                    },
                    {
                        text: 'Poor',
                        onPress: () => {
                            console.log('p')
                        },
                    },
                    {
                        text: 'Auto',
                        onPress: () => {
                            console.log('a')
                        },
                    },
                ]}
            />
        </GradientBackground>
    )
}

export default Setting
