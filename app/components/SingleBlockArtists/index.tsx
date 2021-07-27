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
    navigation: any
    appearanceType?: 'card' | 'not-card'
    noBackground?: boolean
}
const SingleBlockSongs = (props: Props) => {
    const {themeColors} = useTheme()

    return (
        <Block
            style={[
                globalStyles.blockOrCardOuterBlock,
                props.appearanceType === 'card'
                    ? {}
                    : {
                          marginHorizontal: 0,
                          elevation: props.noBackground ? 0 : 30,
                      },
            ]}
            noBackground={props.noBackground}>
            <Block
                style={[
                    globalStyles.blockOrCardinnerBlock,
                    {
                        borderBottomColor:
                            props.appearanceType === 'card'
                                ? '#7f7f7f16'
                                : themeColors.themecolorrevert[0] + '16',
                    },
                ]}
                noBackground={props.noBackground}>
                <BlockTitle
                    style={[
                        globalStyles.topicTitle,
                        {color: themeColors.text[0]},
                    ]}>
                    {props.cardTitle}
                </BlockTitle>
            </Block>

            <GridArtistList
                navigation={props.navigation}
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
