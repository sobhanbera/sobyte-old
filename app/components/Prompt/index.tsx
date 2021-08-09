import React, {useEffect} from 'react'
import {Text} from 'react-native'
import Modal from 'react-native-modal'

import {FontUbuntu, PROMPT_DURATION} from '../../constants'
import {useTheme} from '../../context'
import Scaler from '../Scaler'

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
    )
}

export default Prompt
