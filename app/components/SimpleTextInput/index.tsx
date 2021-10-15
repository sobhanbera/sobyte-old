import React from 'react'
import {View, TextInput} from 'react-native'
import {useTheme} from '../../context'

interface Props {}

const SimpleTextInput = (props: Props) => {
    const {placeholder} = useTheme().themeColors

    return (
        <View>
            <TextInput
                style={{
                    borderColor: placeholder[0],
                }}
                focusable
                clearTextOnFocus
                placeholderTextColor={placeholder[0]}
                selectionColor="white"
                showSoftInputOnFocus={false}
                // keyboard will not be shown when this input will be pressed since its a trigger to open an another screen
                // and this component is a demo or dummy or virual button not text input any more
            />
        </View>
    )
}

export default SimpleTextInput
