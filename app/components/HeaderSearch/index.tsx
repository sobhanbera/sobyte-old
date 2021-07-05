import React from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {DEFAULT_SMALL_ICON_SIZE, HEADER_MIN_HEIGHT} from '../../constants'

interface Props {
    text: string
    onChangeText: Function
    onSubmit: Function
    goBack: Function
}
const HeaderSearch: React.FC<Props> = props => {
    const {white, black, surfacelight, border, text, primary, placeholder} =
        useTheme().themeColors

    return (
        <View
            style={[
                globalStyles.header,
                {
                    backgroundColor: surfacelight[0],
                    borderBottomColor: black[0] + '40',
                    borderBottomWidth: 1,
                },
            ]}>
            <Entypo
                onPress={() => props.goBack()}
                name="chevron-thin-left"
                color={white[0] + 'DD'}
                size={DEFAULT_SMALL_ICON_SIZE}
            />
            <TextInput
                placeholder={'Search for songs, artists...'}
                value={props.text}
                onChangeText={e => props.onChangeText(e)}
                selectionColor={primary.dark[0]}
                placeholderTextColor={placeholder[0]}
                style={{
                    flex: 1,
                    color: text[0],
                    fontSize: 18,
                    marginLeft: 10,
                    backgroundColor: black[0] + '40',
                    paddingHorizontal: 15,
                    borderRadius: 100,
                    height: HEADER_MIN_HEIGHT - 12,
                }}
                onSubmitEditing={() => props.onSubmit()}
            />
        </View>
    )
}

export default HeaderSearch
