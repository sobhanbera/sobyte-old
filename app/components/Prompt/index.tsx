import React, {useState} from 'react'
import {Text} from 'react-native'
import Modal from 'react-native-modal'

import {FontUbuntu} from '../../constants'
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
        }, 3000)
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
                hideModalContentWhileAnimating
                animationInTiming={1200}
                animationOutTiming={1200}
                animationIn="zoomIn"
                animationOut="zoomOut"
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
                        backgroundColor: themeColors.surfacelight[0] + 'AF',
                        width: '100%',
                        paddingVertical: 1,
                        paddingHorizontal: 6,
                        borderRadius: 7,
                        overflow: 'hidden',
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
