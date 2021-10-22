import React, {useCallback, useEffect, useState} from 'react'
import {ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'

import {useSetting, useTheme, useUserData} from '../../../context'

import globalStyles from '../../../styles/global.styles'
import {
    DefaultStatusBarComponent,
    FACEBOOK_API_ENDPOINT,
    INSTAGRAM_API_ENDPOINT,
    GITHUB_API_ENDPOINT,
    LINKEDIN_API_ENDPOINT,
    SNAPCHAT_API_ENDPOINT,
    TWITTER_API_ENDPOINT,
    PaddingBottomView,
} from '../../../constants'
import {
    AreaTitle,
    HeaderMain,
    SimpleButton,
    SimpleTextInput,
} from '../../../components'
import axios from 'axios'

interface UserSocialMediaError {
    facebook?: boolean
    instagram?: boolean
    github?: boolean
    linkedin?: boolean
    snapchat?: boolean
    twitter?: boolean
}
const InitialUserSocialMediaErrors: UserSocialMediaError = {
    facebook: false,
    github: false,
    instagram: false,
    linkedin: false,
    snapchat: false,
    twitter: false,
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
    const [error, setError] = useState<UserSocialMediaError>(
        InitialUserSocialMediaErrors,
    )

    const updateError = (update: UserSocialMediaError) => {
        setError(value => ({
            ...value,
            ...update,
        }))
    }

    /***
     * whenever the github username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the GitHub's database or not...
     */
    const GitHubUsernameValidator = useCallback(() => {
        // making request to github's public api endpoint
        axios
            .get(`${GITHUB_API_ENDPOINT}/users/${githubUsername}`)
            .then(response => {
                console.log(response.data)
                // login gives the username
                // if the login is equal to githubUsername variable then the entered username is correct
                // else show error
                if (response.data?.login === githubUsername) {
                    // setting the value of github error to false
                    // so that no error show
                    updateError({github: true})
                } else {
                    // show error
                    updateError({github: false})
                }
            })
            .catch(error => {
                // show error in this case too
                updateError({github: false})
            })
    }, [githubUsername])
    useEffect(() => GitHubUsernameValidator(), [githubUsername])

    /***
     * whenever the facebook username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Facebook's database or not...
     */
    const FacebookUsernameValidator = useCallback(() => {}, [facebookUsername])
    useEffect(() => FacebookUsernameValidator(), [facebookUsername])

    /***
     * whenever the instagram username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Instagram's database or not...
     */
    const InstagramUsernameValidator = useCallback(() => {}, [
        instagramUsername,
    ])
    useEffect(() => InstagramUsernameValidator(), [instagramUsername])

    /***
     * whenever the linkedin username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Linkedin's database or not...
     */
    const LinkedinUsernameValidator = useCallback(() => {}, [linkedinUsername])
    useEffect(() => LinkedinUsernameValidator(), [linkedinUsername])

    /***
     * whenever the snapchat username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Snapchat's database or not...
     */
    const SnapchatUsernameValidator = useCallback(() => {}, [snapchatUsername])
    useEffect(() => SnapchatUsernameValidator(), [snapchatUsername])

    /***
     * whenever the twitter username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Twitter's database or not...
     */
    const TwitterUsernameValidator = useCallback(() => {}, [twitterUsername])
    useEffect(() => TwitterUsernameValidator(), [twitterUsername])

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
                    value={facebookUsername}
                    onChangeText={setFacebookUsername}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Facebook Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* instagram link update */}
                <AreaTitle title={'Instagram Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={instagramUsername}
                    onChangeText={setInstagramUsername}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Instagram Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* github link update */}
                <AreaTitle title={'GitHub Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={githubUsername}
                    onChangeText={setGitHubUsername}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter GitHub Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* linkedin link update */}
                <AreaTitle title={'Linkedin Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={linkedinUsername}
                    onChangeText={setLinkedinUsername}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Linkedin Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* snapchat link update */}
                <AreaTitle title={'Snapchat Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={snapchatUsername}
                    onChangeText={setSnapchatUsername}
                    placeholderTextColor={themeColors.placeholder[0] + 'AF'}
                    placeholder={'Enter Snapchat Username'}
                    selectionColor={themeColors.themecolorrevert[0] + '7F'}
                />

                {/* twitter link update */}
                <AreaTitle title={'Twitter Username'} notBold />
                <SimpleTextInput
                    style={commonTextInputStyle}
                    value={twitterUsername}
                    onChangeText={setTwitterUsername}
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
