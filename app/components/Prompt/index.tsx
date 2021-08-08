import React, {useState} from 'react'
import {Text} from 'react-native'
import Modal from 'react-native-modal'

import {FontUbuntu, PROMPT_DURATION} from '../../constants'
import {useTheme} from '../../context'
import Scaler from '../Scaler'

const PromptContext = React.createContext({
    prompt: (_title: string) => {},
    clearPrompt: () => {},
})

interface Props {
    children?: React.ReactChild
}
const Prompt = (props: Props) => {
    const {themeColors} = useTheme()
    const [title, setTitle] = useState('')
    let timeOutObject = setTimeout(() => {}, 0)

    /**
     * @param title the main string which should be shown in the prompt
     */
    const prompt = (title: string = '') => {
        clearTimeout(timeOutObject)
        setTitle(title)
        timeOutObject = setTimeout(() => {
            setTitle('')
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
                backdropOpacity={0}
                useNativeDriverForBackdrop
                isVisible={title.length > 0}
                hideModalContentWhileAnimating
                animationInTiming={500}
                animationOutTiming={500}
                animationIn="fadeIn"
                animationOut="fadeOut"
                onBackdropPress={() => clearPrompt()}
                onBackButtonPress={() => clearPrompt()}
                style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    left: 0,
                    right: 0,
                    bottom: '50%',
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
                        width: '100%',
                        paddingVertical: 1,
                        paddingHorizontal: 6,
                        borderRadius: 7,
                        overflow: 'hidden',
                        backgroundColor: themeColors.surfacelight[0] + 'DF',
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            paddingHorizontal: 9,
                            paddingVertical: 12,
                            fontSize: 16,
                            color: themeColors.white[0],
                            fontFamily: FontUbuntu,
                            width: '100%',
                            alignSelf: 'center',
                        }}>
                        {title}
                    </Text>
                </Scaler>
            </Modal>
        </PromptContext.Provider>
    )
}

export default Prompt
export const usePrompt = () => React.useContext(PromptContext)
