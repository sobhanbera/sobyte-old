import React, {useCallback, useState} from 'react'
import {KeyboardAvoidingView, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'
import axios, {CancelTokenSource} from 'axios'

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
    const [error, setError] = useState<UserSocialMediaError>(
        InitialUserSocialMediaErrors,
    )

    /**
     * cancelToken variables for every api requests we are making....
     */
    let facebookCancelToken: CancelTokenSource = axios.CancelToken.source()
    let instagramCancelToken: CancelTokenSource = axios.CancelToken.source()
    let githubCancelToken: CancelTokenSource = axios.CancelToken.source()
    let linkedinCancelToken: CancelTokenSource = axios.CancelToken.source()
    let snapchatCancelToken: CancelTokenSource = axios.CancelToken.source()
    let twitterCancelToken: CancelTokenSource = axios.CancelToken.source()

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
    const GitHubUsernameValidator = useCallback(
        username => {
            if (typeof githubCancelToken != typeof undefined)
                githubCancelToken.cancel(
                    'Cancelling the previous token for new request.',
                )
            githubCancelToken = axios.CancelToken.source()

            // making request to github's public api endpoint
            axios
                .get(`${GITHUB_API_ENDPOINT}/users/${username}`, {
                    cancelToken: githubCancelToken.token,
                })
                .then(response => {
                    // login gives the username
                    // if the data is available then we will not show error
                    // else show error
                    if (response.data?.login === username) {
                        // setting the value of github error to false
                        // so that no error show
                        updateError({github: false})
                    } else {
                        // show error
                        updateError({github: true})
                    }
                })
                .catch(() => {
                    // show error in this case too
                    updateError({github: true})
                })
        },
        [githubUsername],
    )

    /***
     * whenever the facebook username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Facebook's database or not...
     */
    const FacebookUsernameValidator = useCallback(
        username => {
            if (typeof facebookCancelToken != typeof undefined)
                facebookCancelToken.cancel(
                    'Cancelling the previous token for new request.',
                )
            facebookCancelToken = axios.CancelToken.source()

            // making request to facebook's public api endpoint
            axios
                .get(`${FACEBOOK_API_ENDPOINT}/${username}`, {
                    cancelToken: facebookCancelToken.token,
                })
                .then(() => {
                    // login gives the username
                    // if the data is available then we will not show error
                    // else show error
                    updateError({facebook: false})
                })
                .catch(() => {
                    // show error in this case too
                    updateError({facebook: true})
                })
        },
        [facebookUsername],
    )

    /***
     * whenever the instagram username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Instagram's database or not...
     */
    const InstagramUsernameValidator = useCallback(
        username => {
            if (typeof instagramCancelToken != typeof undefined)
                instagramCancelToken.cancel(
                    'Cancelling the previous token for new request.',
                )
            instagramCancelToken = axios.CancelToken.source()

            // making request to instagram's public api endpoint
            axios
                .get(`${INSTAGRAM_API_ENDPOINT}/${username}`, {
                    cancelToken: instagramCancelToken.token,
                })
                .then(() => {
                    // login gives the username
                    // if the data is available then we will not show error
                    // else show error
                    updateError({instagram: false})
                })
                .catch(() => {
                    // show error in this case too
                    updateError({instagram: true})
                })
        },
        [instagramUsername],
    )

    /***
     * whenever the linkedin username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Linkedin's database or not...
     */
    const LinkedinUsernameValidator = useCallback(
        username => {},
        [linkedinUsername],
    )

    /***
     * whenever the snapchat username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Snapchat's database or not...
     */
    const SnapchatUsernameValidator = useCallback(
        username => {
            if (typeof snapchatCancelToken != typeof undefined)
                snapchatCancelToken.cancel(
                    'Cancelling the previous token for new request.',
                )
            snapchatCancelToken = axios.CancelToken.source()

            // making request to snapchat's public api endpoint
            axios
                .get(`${SNAPCHAT_API_ENDPOINT}/${username}`, {
                    cancelToken: snapchatCancelToken.token,
                })
                .then(() => {
                    // login gives the username
                    // if the data is available then we will not show error
                    // else show error
                    updateError({snapchat: false})
                })
                .catch(() => {
                    // show error in this case too
                    updateError({snapchat: true})
                })
        },
        [snapchatUsername],
    )

    /***
     * whenever the twitter username changes in the UI or updates
     * we will check if the username's account exists or not.
     * this function will validate the username if exists in the Twitter's database or not...
     */
    const TwitterUsernameValidator = useCallback(
        username => {},
        [twitterUsername],
    )

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
        style: [
            commonTextInputStyle,
            {
                borderColor: error.facebook
                    ? themeColors.onError[0]
                    : themeColors.placeholder[0],
            },
        ],
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
                        FacebookUsernameValidator(value)
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
                        InstagramUsernameValidator(value)
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
                        GitHubUsernameValidator(value)
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
                        LinkedinUsernameValidator(value)
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
                        SnapchatUsernameValidator(value)
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
                        TwitterUsernameValidator(value)
                    }}
                    placeholder={'Enter Twitter Username'}
                    maxLength={UsernameLengthLimit.twitter}
                    {...someTextInputDefaultAndCommonProps}
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
