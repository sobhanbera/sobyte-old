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
    appearanceType?: 'card' | 'not-card'
    noBackground?: boolean
    keyword: string
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

            <GridSongList
                id={props.keyword}
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
