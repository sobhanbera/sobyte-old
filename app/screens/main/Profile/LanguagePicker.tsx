import React from 'react'
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import {GradientBackground, HeaderMain} from '../../../components'
import {useTheme} from '../../../context'
import {DefaultStatusBarComponent} from '../../../constants'

interface LanguageDataType {
    lang: string
    color: string
}
const AVAIL_LANGUAGES_DATA: LanguageDataType[] = [
    {
        lang: 'Bengali',
        color: '#3030307F',
    },
    {
        lang: 'English',
        color: '#3030307F',
    },
    {
        lang: 'Gujrati',
        color: '#3030307F',
    },
    {
        lang: 'Hindi',
        color: '#3030307F',
    },
    {
        lang: 'Kannada',
        color: '#3030307F',
    },
    {
        lang: 'Punjabi',
        color: '#3030307F',
    },
    {
        lang: 'Tamil',
        color: '#3030307F',
    },
    {
        lang: 'Telugu',
        color: '#3030307F',
    },
]

interface Props {
    navigation?: any
}
const LanguagePicker: React.FC<Props> = props => {
    const {surfacelight, white} = useTheme().themeColors

    const renderItem = (data: ListRenderItemInfo<LanguageDataType>) => {
        const {item} = data
        return (
            <View
                key={item.lang}
                style={{
                    backgroundColor: item.color,
                    paddingVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
                    height: 100,
                    marginVertical: 10,
                    borderRadius: 4,
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: 'white',
                        fontSize: 16,
                    }}>
                    {item.lang}
                </Text>
            </View>
        )
    }

    return (
        <GradientBackground uniformColor>
            <DefaultStatusBarComponent backgroundColor={surfacelight[0]} />
            <HeaderMain
                navigation={props.navigation}
                title={'Music Languages'}
                color={white[0] + 'DD'}
            />

            <Text>Choose At least one language</Text>

            <FlatList
                horizontal={false}
                data={AVAIL_LANGUAGES_DATA}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly',
                }}
                style={{
                    paddingVertical: 20,
                }}
            />
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: 'space-between',
    },
})

export default LanguagePicker
