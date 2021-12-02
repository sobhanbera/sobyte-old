import React, {useEffect} from 'react'
import {Text} from 'react-native'
import Modal from 'react-native-modal'

import {FontUbuntu, PROMPT_DURATION} from '../../constants'
import {useTheme} from '../../context'

interface Props {
    title: string
    setTitle: Function
}
const Prompt = (props: Props) => {
    const {themeColors} = useTheme()
    const {setTitle, title} = props
    let timeOutObject = setTimeout(() => {}, 0)

    /**
     * whenever the title prop changes this function will be executed and if
     * the title is available to show means its length is >0 than we will clear
     * it after some interval and set the title to ''
     * else we will return from the function immediately...
     */
    const prompt = () => {
        if (title.length <= 0) return
        clearTimeout(timeOutObject)
        timeOutObject = setTimeout(() => {
            setTitle('')
        }, PROMPT_DURATION)
    }
    useEffect(() => {
        prompt()
    }, [props.title])
    const clearPrompt = () => {
        clearTimeout(timeOutObject)
        setTitle('')
    }

    return (
        <Modal
            backdropOpacity={0}
            useNativeDriverForBackdrop
            isVisible={title > ''} // title.length will take time to get the length each time so providing operator. -> this method is more efficient than previous since a string of any length > 0 will return this condition as true
            hideModalContentWhileAnimating={false}
            animationInTiming={1000}
            animationOutTiming={1000}
            animationIn="fadeInUp"
            animationOut="fadeOutUp"
            onBackdropPress={() => clearPrompt()}
            onBackButtonPress={() => clearPrompt()}
            style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                left: 0,
                right: 0,
                bottom: '20%',
                position: 'absolute',
                maxHeight: 80,
                width: '90%',
                backgroundColor: 'transparent',
                borderRadius: 7,
            }}
        >
            <Text
                onPress={() => clearPrompt()}
                style={{
                    width: '96%',
                    fontSize: 16,
                    borderRadius: 7,
                    overflow: 'hidden',
                    alignSelf: 'center',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    paddingVertical: 13,
                    paddingHorizontal: 8,
                    color: themeColors.white[0],
                    fontFamily: FontUbuntu,
                    backgroundColor: themeColors.surfacelight[0] + 'DF',
                }}
            >
                {title}
            </Text>
        </Modal>
    )
}

export default Prompt
