import React from 'react'
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'

import {SongCategory} from '../../interfaces'
import {
    FontRobotoBold,
    IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW,
} from '../../constants'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    categories: Array<SongCategory>
    onPress: Function
}
const GridCategory = (props: Props) => {
    return (
        <View>
            <View style={styles.mainGridContainer}>
                {props.categories.map(category => {
                    return (
                        <LinearGradient
                            key={category.id}
                            angle={165}
                            useAngle
                            angleCenter={{x: 0.5, y: 0.5}}
                            colors={category.color}
                            style={styles.linearGradient}>
                            <Pressable onPress={() => props.onPress(category)}>
                                <ImageBackground
                                    fadeDuration={500}
                                    source={{uri: category.image}}
                                    style={[styles.image]}>
                                    <View style={styles.background}>
                                        <Text
                                            style={styles.text}
                                            numberOfLines={10}>
                                            {category.name}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        </LinearGradient>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainGridContainer: {
        paddingLeft: 6,
        paddingVertical: 5,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    linearGradient: {
        borderRadius: 5,
        overflow: 'hidden',
        margin: 6,
        elevation: 7,
        borderWidth: 0.5,
        borderColor: '#efefef',
    },
    image: {
        width: IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW,
        height: IMAGE_CATEGORY_SMALL_SIZE_TO_SHOW,
    },
    background: {
        flex: 1,
        backgroundColor: '#00000060',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    text: {
        fontSize: 17,
        textTransform: 'uppercase',
        fontFamily: FontRobotoBold,
        color: 'white', // white text since the it's background if dark the above style...
    },
})

export default GridCategory
