import React, {useCallback, useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
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

interface Props {
    navigation?: any
}

const UpdateSocialMediaLinks = (props: Props) => {
    const {t} = useTranslation()
    const {themeColors} = useTheme()
    const {data} = useUserData()

    const [facebookLink, setFacebookLink] = useState(data.facebook || '')
    const [instagramLink, setInstagramLink] = useState(data.instagram || '')
    const [githubLink, setGitHubLink] = useState(data.github || '')
    const [linkedinLink, setLinkedinLink] = useState(data.linkedin || '')
    const [snapchatLink, setSnapchatLink] = useState(data.snapchat || '')
    const [twitterLink, setTwitterLink] = useState(data.twitter || '')

    /***
     * whenever the github username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the GitHub's database or not...
     */
    const GitHubUsernameValidator = useCallback(() => {}, [githubLink])
    useEffect(() => GitHubUsernameValidator(), [githubLink])

    /***
     * whenever the facebook username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Facebook's database or not...
     */
    const FacebookUsernameValidator = useCallback(() => {}, [facebookLink])
    useEffect(() => FacebookUsernameValidator(), [facebookLink])

    /***
     * whenever the instagram username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Instagram's database or not...
     */
    const InstagramUsernameValidator = useCallback(() => {}, [instagramLink])
    useEffect(() => InstagramUsernameValidator(), [instagramLink])

    /***
     * whenever the linkedin username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Linkedin's database or not...
     */
    const LinkedinUsernameValidator = useCallback(() => {}, [linkedinLink])
    useEffect(() => LinkedinUsernameValidator(), [linkedinLink])

    /***
     * whenever the snapchat username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Snapchat's database or not...
     */
    const SnapchatUsernameValidator = useCallback(() => {}, [snapchatLink])
    useEffect(() => SnapchatUsernameValidator(), [snapchatLink])

    /***
     * whenever the twitter username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Twitter's database or not...
     */
    const TwitterUsernameValidator = useCallback(() => {}, [twitterLink])
    useEffect(() => TwitterUsernameValidator(), [twitterLink])

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
    return (
        <>
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
                    style={commonTextInputStyle}
                    value={facebookLink}
                    onChangeText={setFacebookLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Facebook Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* instagram link update */}
                <AreaTitle title={'Instagram Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={instagramLink}
                    onChangeText={setInstagramLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Instagram Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* github link update */}
                <AreaTitle title={'GitHub Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={githubLink}
                    onChangeText={setGitHubLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter GitHub Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* linkedin link update */}
                <AreaTitle title={'Linkedin Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={linkedinLink}
                    onChangeText={setLinkedinLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Linkedin Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* snapchat link update */}
                <AreaTitle title={'Snapchat Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={snapchatLink}
                    onChangeText={setSnapchatLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Snapchat Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* twitter link update */}
                <AreaTitle title={'Twitter Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={twitterLink}
                    onChangeText={setTwitterLink}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Twitter Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                <SimpleButton
                    title={'Update Social Media Links'}
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

                <PaddingBottomView />
            </ScrollView>
        </>
    )
}

export default UpdateSocialMediaLinks
