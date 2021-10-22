import React, {useState} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {useSetting, useTheme, useUserData} from '../../../context'

import globalStyles from '../../../styles/global.styles'
import {DefaultStatusBarComponent} from '../../../constants'
import {AreaTitle, HeaderMain, SimpleTextInput} from '../../../components'

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
        <View style={globalStyles.flex}>
            <DefaultStatusBarComponent backgroundColor={'black'} />
            <HeaderMain
                navigation={props.navigation}
                title={'Update Social Media Links'}
                color={themeColors.themecolorrevert[0] + 'BF'}
                backgroundColor={themeColors.themecolor[0]}
                borderColor={themeColors.themecolorrevert[0] + '17'}
            />

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
        </View>
    )
}

export default UpdateSocialMediaLinks
