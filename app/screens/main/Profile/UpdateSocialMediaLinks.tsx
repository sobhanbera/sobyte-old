import React, {useState} from 'react'
import {KeyboardAvoidingView, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {useSetting, useTheme, useUserData} from '../../../context'

import globalStyles from '../../../styles/global.styles'
import {DefaultStatusBarComponent, PaddingBottomView} from '../../../constants'
import {
    AreaTitle,
    HeaderMain,
    SimpleButton,
    SimpleTextInput,
} from '../../../components'

const UsernameLengthLimit = {
    facebook: 50,
    github: 39,
    instagram: 30,
    linkedin: 60,
    snapchat: 15,
    twitter: 15,
}

interface Props {
    navigation?: any
}

const UpdateSocialMediaLinks = (props: Props) => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {data} = useUserData()

    const [facebookUsername, setFacebookUsername] = useState(
        data.facebook || '',
    )
    const [instagramUsername, setInstagramUsername] = useState(
        data.instagram || '',
    )
    const [githubUsername, setGitHubUsername] = useState(data.github || '')
    const [linkedinUsername, setLinkedinUsername] = useState(
        data.linkedin || '',
    )
    const [snapchatUsername, setSnapchatUsername] = useState(
        data.snapchat || '',
    )
    const [twitterUsername, setTwitterUsername] = useState(data.twitter || '')

    const updateSocialMediaLinksInDatabase = () => {}

    const commonTextInputStyle = [
        globalStyles.border5,
        globalStyles.smallPaddingHor,
        {
            borderColor: themeColors.themecolorrevert[0] + '45',
            color: themeColors.themecolorrevert[0] + 'DF',
            paddingVertical: 10,
        },
    ]
    /**
     * since there are many text inputs in this UI
     * therefore we are creating a common variable which will store the common props of all this
     * text input component
     *
     * this is an optimized way I have discovered to create common text inputs in same UI
     * without any children component
     * and it also gives the look of code more small and elegant
     **/
    const someTextInputDefaultAndCommonProps = {
        style: commonTextInputStyle,
        placeholderTextColor: themeColors.placeholder[0] + 'AF',
        selectionColor: themeColors.themecolorrevert[0] + '7F',
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <HeaderMain
                navigation={props.navigation}
                title={'Update Social Media Links'}
                color={themeColors.themecolorrevert[0] + 'DF'}
                backgroundColor={themeColors.themecolor[0]}
                borderColor={themeColors.themecolorrevert[0] + '17'}
            />
            <ScrollView
                style={globalStyles.flex}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <DefaultStatusBarComponent backgroundColor={'black'} />

                {/* facebook link update */}
                <AreaTitle title={'Facebook Username'} notBold />
                <SimpleTextInput
                    value={facebookUsername}
                    onChangeText={value => {
                        setFacebookUsername(value)
                    }}
                    placeholder={'Enter Facebook Username'}
                    maxLength={UsernameLengthLimit.facebook}
                    {...someTextInputDefaultAndCommonProps}
                />

                {/* instagram link update */}
                <AreaTitle title={'Instagram Username'} notBold />
                <SimpleTextInput
                    value={instagramUsername}
                    onChangeText={value => {
                        setInstagramUsername(value)
                    }}
                    placeholder={'Enter Instagram Username'}
                    maxLength={UsernameLengthLimit.instagram}
                    {...someTextInputDefaultAndCommonProps}
                />

                {/* github link update */}
                <AreaTitle title={'GitHub Username'} notBold />
                <SimpleTextInput
                    value={githubUsername}
                    onChangeText={value => {
                        setGitHubUsername(value)
                    }}
                    placeholder={'Enter GitHub Username'}
                    maxLength={UsernameLengthLimit.github}
                    {...someTextInputDefaultAndCommonProps}
                />

                {/* linkedin link update */}
                <AreaTitle title={'Linkedin Username'} notBold />
                <SimpleTextInput
                    value={linkedinUsername}
                    onChangeText={value => {
                        setLinkedinUsername(value)
                    }}
                    placeholder={'Enter Linkedin Username'}
                    maxLength={UsernameLengthLimit.linkedin}
                    {...someTextInputDefaultAndCommonProps}
                />

                {/* snapchat link update */}
                <AreaTitle title={'Snapchat Username'} notBold />
                <SimpleTextInput
                    value={snapchatUsername}
                    onChangeText={value => {
                        setSnapchatUsername(value)
                    }}
                    placeholder={'Enter Snapchat Username'}
                    maxLength={UsernameLengthLimit.snapchat}
                    {...someTextInputDefaultAndCommonProps}
                />

                {/* twitter link update */}
                <AreaTitle title={'Twitter Username'} notBold />
                <SimpleTextInput
                    value={twitterUsername}
                    onChangeText={value => {
                        setTwitterUsername(value)
                    }}
                    placeholder={'Enter Twitter Username'}
                    maxLength={UsernameLengthLimit.twitter}
                    {...someTextInputDefaultAndCommonProps}
                />

                <SimpleButton
                    title={'Update Links'}
                    onPress={() => updateSocialMediaLinksInDatabase()}
                    style={{
                        paddingVertical: 12,
                        marginHorizontal: 20,
                        marginVertical: 20,
                        backgroundColor: themeColors.themecolorrevert[0] + 'EF',
                    }}
                    textStyle={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: themeColors.themecolor[0],
                    }}
                />

                <AreaTitle
                    title={
                        'NOTE: These data are optional. Even then if you are providing please provide the correct data. Also you can only update these data once in a week.'
                    }
                    style={{
                        textAlign: 'center',
                        color: themeColors.themecolorrevert[0] + 'AF',
                    }}
                    notBold
                />

                <PaddingBottomView />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UpdateSocialMediaLinks
