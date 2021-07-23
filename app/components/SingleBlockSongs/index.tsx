import React from 'react'
import {Text as BlockTitle} from 'react-native-paper'

import Block from '../Block'
import GridSongList from '../GridSongList'
import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {FetchedSongObject} from '../../interfaces'

interface Props {
    musicData: FetchedSongObject
    cardTitle: string
}
const SingleBlockSongs = (props: Props) => {
    const {themeColors} = useTheme()

    return (
        <Block style={globalStyles.blockOrCardOuterBlock}>
            <Block style={globalStyles.blockOrCardinnerBlock}>
                <BlockTitle
                    style={[
                        globalStyles.topicTitle,
                        {color: themeColors.text[0]},
                    ]}>
                    {props.cardTitle}
                </BlockTitle>
            </Block>

            <GridSongList
                id={props.cardTitle}
                shimmerDirection="left"
                textColor={themeColors.text[0] + 'E7'}
                subColor={themeColors.text[0] + '70'}
                contentLength={props.musicData.content.length}
                content={props.musicData.content}
            />
        </Block>
    )
}

export default SingleBlockSongs
