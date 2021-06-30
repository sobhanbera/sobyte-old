import React, {useState} from 'react'
import {Text} from 'react-native'
import Modal from 'react-native-modal'

import {FontHelvetica, PROMPT_DURATION} from '../../constants'
import {useTheme} from '../../context'
import Scaler from '../Scaler'

const PromptContext = React.createContext({
    setTitle: (title: string = '') => {},
    setDescription: (
        title: 'primary' | 'success' | 'error' | 'danger' | 'warning',
    ) => {},
})

interface Props {
    children?: React.ReactChild
}
const Prompt = (props: Props) => {
    const {themeColors} = useTheme()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState<
        'primary' | 'success' | 'error' | 'danger' | 'warning'
    >('primary')

    const setPromptTitle = (title: string = '') => {
        setTitle(title)
        setTimeout(() => {
            setTitle('')
        }, PROMPT_DURATION)
    }
    const setPromptDescription = (
        description: 'primary' | 'success' | 'error' | 'danger' | 'warning',
    ) => {
        setDescription(description)
    }

    const promptValues = {
        setTitle: setPromptTitle,
        setDescription: setPromptDescription,
    }

    return (
        <PromptContext.Provider value={promptValues}>
            {props.children}
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                onBackdropPress={() => setTitle('')}
                onBackButtonPress={() => setTitle('')}
                useNativeDriverForBackdrop
                isVisible={title.length > 0}
                backdropOpacity={0}
                style={{
                    justifyContent: 'flex-end',
                    // bottom: 35,
                    left: 0,
                    right: 0,
                    top: 50,
                    position: 'absolute',
                    maxHeight: 80,
                    backgroundColor: 'transparent',
                    borderRadius: 7,
                    borderWidth: 0.5,
                    borderColor: '#7f7f7f',
                    elevation: 3,
                }}>
                <Scaler
                    touchableOpacity={1}
                    scale={1}
                    onPress={() => setTitle('')}
                    containerStyle={{
                        backgroundColor:
                            description === 'error'
                                ? themeColors.onError[0]
                                : description === 'danger'
                                ? themeColors.onDanger[0]
                                : description === 'warning'
                                ? themeColors.onWarning[0]
                                : description === 'success'
                                ? themeColors.onSuccess[0]
                                : themeColors.primary.dark[0],
                        borderRadius: 7,
                        overflow: 'hidden',
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 6,
                            fontSize: 16,
                            fontFamily: FontHelvetica,
                            color:
                                description === 'error'
                                    ? themeColors.white[0]
                                    : description === 'danger'
                                    ? themeColors.white[0]
                                    : description === 'warning'
                                    ? themeColors.black[0]
                                    : description === 'success'
                                    ? themeColors.white[0]
                                    : themeColors.white[0],
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
