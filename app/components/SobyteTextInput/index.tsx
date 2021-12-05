import React, {useState} from 'react'
import {
    Animated,
    TextInput,
    TextInputProps,
    TouchableWithoutFeedback,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import globalStyles from '../../styles/global.styles'
import {useTheme} from '../../context'

interface SobyteTextInputProps extends TextInputProps {
    error?: boolean
    errorText?: string
    reversedColor?: boolean
}
const SobyteTextInput: React.FC<SobyteTextInputProps> = props => {
    const {themeColors} = useTheme()
    const [focused, setFocused] = useState(false)

    return (
        <Animated.View style={globalStyles.sobyteTextInputHolder}>
            <LinearGradient
                style={globalStyles.circle}
                useAngle={true}
                angle={90}
                angleCenter={{x: 0.5, y: 0.5}}
                colors={
                    props.reversedColor
                        ? [
                              themeColors.primary.main[0] + 'ef',
                              themeColors.secondary.main[0] + 'ff',
                          ]
                        : [
                              themeColors.secondary.main[0] + 'ff',
                              themeColors.primary.main[0] + 'ef',
                          ]
                }>
                <TouchableWithoutFeedback>
                    <TextInput
                        allowFontScaling
                        selectionColor={
                            props.reversedColor
                                ? themeColors.secondary.main[0]
                                : themeColors.primary.main[0]
                        }
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={[
                            globalStyles.sobyteTextInput,
                            props.error
                                ? {
                                      borderColor: themeColors.red[0],
                                      borderWidth: 2,
                                  }
                                : focused && {
                                      borderColor: themeColors.primary.main[0],
                                  },
                        ]}
                        placeholder="Enter Text"
                        placeholderTextColor={themeColors.placeholder[0]}
                        {...props}
                    />
                </TouchableWithoutFeedback>
            </LinearGradient>
        </Animated.View>
    )
}

export default SobyteTextInput
