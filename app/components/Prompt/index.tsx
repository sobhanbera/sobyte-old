import React, {useState} from 'react'
import {View} from 'react-native'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MarqueeText from 'react-native-marquee'

import {
    FontHelvetica,
    PROMPT_DURATION,
    MARQUEE_TEXT_PROGRESS_DURATION,
    DEFAULT_SMALL_ICON_SIZE,
} from '../../constants'
import {useTheme} from '../../context'
import Scaler from '../Scaler'

type PropmptDescriptionType =
    | 'primary'
    | 'success'
    | 'error'
    | 'danger'
    | 'warning'
const PromptContext = React.createContext({
    prompt: (
        _title: string,
        _description: PropmptDescriptionType = 'success',
    ) => {},
    clearPrompt: () => {},
})

interface Props {
    children?: React.ReactChild
}
const Prompt = (props: Props) => {
    const {themeColors} = useTheme()
    const [title, setTitle] = useState('')
    const [description, setDescription] =
        useState<PropmptDescriptionType>('primary')
    let timeOutObject = setTimeout(() => {}, 0)

    const prompt = (
        title: string = '',
        description: PropmptDescriptionType = 'success',
    ) => {
        clearTimeout(timeOutObject)
        setDescription(description)
        setTitle(title)
        timeOutObject = setTimeout(() => {
            setTitle('')
            setDescription('primary')
        }, PROMPT_DURATION)
    }
    const clearPrompt = () => {
        clearTimeout(timeOutObject)
        setTitle('')
    }
    const promptValues = {
        prompt: prompt,
        clearPrompt: clearPrompt,
    }

    return (
        <PromptContext.Provider value={promptValues}>
            {props.children}
            <Modal
                animationInTiming={500}
                animationOutTiming={250}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => clearPrompt()}
                onBackButtonPress={() => clearPrompt()}
                useNativeDriverForBackdrop
                isVisible={title.length > 0}
                backdropOpacity={0}
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    left: 0,
                    right: 0,
                    bottom: 40,
                    position: 'absolute',
                    maxHeight: 80,
                    width: '90%',
                    backgroundColor: 'transparent',
                    borderRadius: 7,
                }}>
                <Scaler
                    touchableOpacity={1}
                    scale={1}
                    onPress={() => clearPrompt()}
                    containerStyle={{
                        backgroundColor: themeColors.surfacelight[0],
                        width: '100%',
                        paddingVertical: 1,
                        paddingHorizontal: 6,
                        borderRadius: 7,
                        overflow: 'hidden',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 6,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                width: '90%',
                                paddingVertical: 5,
                                paddingHorizontal: 6,
                                paddingRight: DEFAULT_SMALL_ICON_SIZE, // this is the width of the icon next to this component
                                // because this text should be clear to the user not overflowed by the cross icon
                            }}>
                            <View
                                style={{
                                    paddingRight: 10,
                                    marginRight: 3,
                                    borderRightWidth: 0.5,
                                    borderRightColor: themeColors.grey[0],
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {description === 'error' ? (
                                    <MaterialIcons
                                        name="error-outline"
                                        size={DEFAULT_SMALL_ICON_SIZE}
                                        color={themeColors.onError[0]}
                                    />
                                ) : description === 'danger' ? (
                                    <MaterialIcons
                                        name="dangerous"
                                        size={DEFAULT_SMALL_ICON_SIZE}
                                        color={themeColors.onDanger[0]}
                                    />
                                ) : description === 'warning' ? (
                                    <AntDesign
                                        name="warning"
                                        size={DEFAULT_SMALL_ICON_SIZE}
                                        color={themeColors.onWarning[0]}
                                    />
                                ) : description === 'success' ? (
                                    <MaterialIcons
                                        name="thumb-up-alt"
                                        size={DEFAULT_SMALL_ICON_SIZE}
                                        color={themeColors.onSuccess[0]}
                                    />
                                ) : (
                                    <AntDesign
                                        name="check"
                                        size={DEFAULT_SMALL_ICON_SIZE}
                                        color={themeColors.primary.dark[0]}
                                    />
                                )}
                            </View>

                            <MarqueeText
                                style={{
                                    textAlign: 'left',
                                    textAlignVertical: 'center',
                                    // paddingVertical: 5,
                                    paddingHorizontal: 6,
                                    fontSize: 16,
                                    fontFamily: FontHelvetica,
                                    color: themeColors.white[0],
                                }}
                                duration={MARQUEE_TEXT_PROGRESS_DURATION}
                                marqueeOnStart
                                loop
                                marqueeDelay={500}
                                marqueeResetDelay={500}>
                                {title}
                            </MarqueeText>
                        </View>
                        <View>
                            <MaterialIcons
                                name="cancel"
                                size={DEFAULT_SMALL_ICON_SIZE}
                                color={themeColors.grey[0]}
                            />
                        </View>
                    </View>
                </Scaler>
            </Modal>
        </PromptContext.Provider>
    )
}

export default Prompt
export const usePrompt = () => React.useContext(PromptContext)
