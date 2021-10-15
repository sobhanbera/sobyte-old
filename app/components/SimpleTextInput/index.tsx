import React from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'

const SimpleTextInput = (props: TextInputProps) => {
    const {placeholder} = useTheme().themeColors

    return (
        <TextInput
            focusable
            clearTextOnFocus
            placeholderTextColor={placeholder[0]}
            selectionColor="white"
            {...props}
            // some props needs to be selected by line by line code
            // or by the best sequencially
            style={[
                globalStyles.simpleTextInput,
                {
                    borderColor: placeholder[0],
                },
                props.style,
            ]}
            // keyboard will not be shown when this input will be pressed since its a trigger to open an another screen
            // and this component is a demo or dummy or virual button not text input any more
        />
    )
}

export default SimpleTextInput
