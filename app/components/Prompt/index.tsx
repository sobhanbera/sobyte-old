import React, {useState} from 'react'
import {Text, View} from 'react-native'
import Modal from 'react-native-modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MarqueeText from 'react-native-marquee'

import {
    FontHelvetica,
    PROMPT_DURATION,
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
    prompt: (_title: string, _description: PropmptDescriptionType) => {},
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
        description: PropmptDescriptionType,
    ) => {
        clearTimeout(timeOutObject)
        setTitle(title)
        setDescription(description)
        timeOutObject = setTimeout(() => {
            setTitle('')
            setDescription('primary')
        }, PROMPT_DURATION)
    }
    const promptValues = {
        prompt: prompt,
    }

    return (
        <PromptContext.Provider value={promptValues}>
            {props.children}
            <Modal
                animationInTiming={1000}
                animationOutTiming={1000}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => setTitle('')}
                onBackButtonPress={() => setTitle('')}
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
                    onPress={() => setTitle('')}
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
                                paddingVertical: 5,
                                paddingHorizontal: 6,
                                width: '90%',
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
                                duration={PROMPT_DURATION}
                                marqueeOnStart
                                loop
                                marqueeDelay={1000}
                                marqueeResetDelay={1000}>
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
