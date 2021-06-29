import React, {useState} from 'react'
import {View, Text} from 'react-native'
import Modal from 'react-native-modal'

import {PROMPT_DURATION} from '../../constants'

const PromptContext = React.createContext({
    setTitle: (title: string = '') => {},
    setDescription: (title: string = '') => {},
})

interface Props {
    children?: React.ReactChild
}
const Prompt = (props: Props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const setPromptTitle = (title: string = '') => {
        setTitle(title)
        console.log('ASD')
        // setTimeout(() => {
        //     setTitle('')
        // }, PROMPT_DURATION)
    }
    const setPromptDescription = (description: string = '') => {
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
                animationIn="bounce"
                onBackdropPress={() => setTitle('')}
                isVisible={title.length > 0}
                animationOut="bounceOut">
                <Text>{title}</Text>
            </Modal>
        </PromptContext.Provider>
    )
}

export default Prompt
export const usePrompt = () => React.useContext(PromptContext)
