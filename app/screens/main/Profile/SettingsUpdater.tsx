import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    TextStyle,
    StyleProp,
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import {GradientBackground, HeaderMain} from '../../../components'
import {useTheme} from '../../../context'
import {
    DEFAULT_ICON_SIZE,
    FontUbuntu,
    DefaultStatusBarComponent,
} from '../../../constants'

interface Props {
    route: {
        params: {
            title: string
            extraFunction?: Function
            buttons: Array<{
                text: string
                onPress: Function
                extraText?: string
                type?: 'input' | ''
                placeholder?: string
                setText?: Function
                inputProps?: TextInputProps
                inputStyle?: StyleProp<TextStyle>
                errorText?: string | ''
            }>
        }
    }
    navigation?: any
}
const SettingsUpdater: React.FC<Props> = realProps => {
    const props = realProps.route.params

    const {surfacelight, text, placeholder, primary, border, onWarning, white} =
        useTheme().themeColors

    const executeExtraFunctionHelper = () =>
        props.extraFunction ? props.extraFunction() : {}

    return (
        <GradientBackground uniformColor>
            <DefaultStatusBarComponent backgroundColor={surfacelight[0]} />
            <HeaderMain
                navigation={realProps.navigation}
                title={props.title}
                color={white[0] + 'DD'}
            />

            <View style={{backgroundColor: surfacelight[0]}}>
                {props.buttons.map((button, _) => {
                    if (button.type === 'input') {
                        return (
                            <View key={_}>
                                <View style={styles.inputHolder}>
                                    <TextInput
                                        placeholder={button.placeholder}
                                        value={button.text}
                                        onChangeText={e =>
                                            button.setText
                                                ? button.setText(e)
                                                : {}
                                        }
                                        selectionColor={primary.dark[0]}
                                        keyboardType="numeric"
                                        placeholderTextColor={placeholder[0]}
                                        {...button.inputProps}
                                        style={{
                                            flex: 1,
                                            // width: '90%',
                                            color: text[0],
                                            fontSize: 18,
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            button.onPress()
                                            realProps.navigation.goBack()
                                        }}
                                        style={{padding: 15}}>
                                        <MaterialIcon
                                            name="done"
                                            size={DEFAULT_ICON_SIZE}
                                            color={text[0]}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text
                                        style={[
                                            styles.textItem,
                                            {
                                                fontSize: 14,
                                                color: onWarning[0],
                                            },
                                        ]}>
                                        {button.errorText
                                            ? button.errorText
                                            : ''}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                    return (
                        <TouchableOpacity
                            key={_}
                            onPress={() => {
                                button.onPress()
                                executeExtraFunctionHelper()
                                realProps.navigation.goBack()
                            }}
                            style={[
                                styles.button,
                                {
                                    borderBottomColor: border[0],
                                },
                            ]}>
                            <Text style={[styles.textItem]}>{button.text}</Text>
                            <Text style={[styles.textItem]}>
                                {button.extraText}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.4,
    },
    textItem: {
        color: '#FFFFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontFamily: FontUbuntu,
        paddingVertical: 14,
        paddingHorizontal: 25,
        // backgroundColor: 'black',
    },
    startingTextAlign: {
        textAlign: 'left',
    },
    inputHolder: {
        paddingHorizontal: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default SettingsUpdater
