import React from 'react'
import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import {HEADER_MIN_HEIGHT} from '../../constants'
import globalStyles from '../../styles/global.styles'
import {Scaler} from '../'

interface Props {
    headerScrollHeight?: any
    headerScrollColor: any
    right?: React.ReactNode
}
const HeaderCollapsible: React.FC<Props> = props => {
    const {t} = useTranslation()

    return (
        <View
            style={{
                height: props.headerScrollHeight || HEADER_MIN_HEIGHT,
                width: '100%',
                backgroundColor: props.headerScrollColor,
            }}>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Text style={globalStyles.appName}>{t('common:appName')}</Text>
                <Scaler scale={0.95} touchableOpacity={1}>
                    {props.right}
                </Scaler>
            </View>
        </View>
    )
}

export default HeaderCollapsible
