import React from 'react'
import {Text as BlockTitle} from 'react-native-paper'

import Block from '../Block'
import {GridArtistList} from '../'
import {useTheme} from '../../context'
import globalStyles from '../../styles/global.styles'
import {ArtistObject} from '../../interfaces'

interface Props {
    artistsData: ArtistObject[]
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

            <GridArtistList
                id="artistsList1"
                shimmerDirection="left"
                textColor={themeColors.text[0] + 'E7'}
                subColor={themeColors.text[0] + '70'}
                contentLength={props.artistsData.length}
                content={props.artistsData}
            />
        </Block>
    )
}

export default SingleBlockSongs
