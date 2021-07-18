import React from 'react'
import {View, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {usePlayer} from '../../context'
import {Scaler} from '../'

interface Props {
    theme: string
    color: string
}
const MainControls = (props: Props) => {
    const {playing, paused, seekInterval, playonly, pause} = usePlayer()

    return (
        <View style={styles.wrapper}>
            <View style={styles.iconWrapper}>
                <FontAwesome5
                    size={20}
                    color={props.color}
                    name={'backward'}
                    onPress={() => seekInterval(-10)}
                />
            </View>

            <View style={styles.iconWrapper}>
                {playing ? (
                    <Scaler onPress={pause} touchableOpacity={0.2}>
                        <Ionicons
                            size={32}
                            color={props.color}
                            name={'pause'}
                        />
                    </Scaler>
                ) : (
                    <Scaler onPress={playonly} touchableOpacity={0.2}>
                        <Ionicons size={32} color={props.color} name={'play'} />
                    </Scaler>
                )}
            </View>

            <View style={styles.iconWrapper}>
                <FontAwesome5
                    size={20}
                    color={props.color}
                    name={'forward'}
                    onPress={() => seekInterval(10)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    iconWrapper: {
        padding: 12,
        borderRadius: 100,
    },
    icon: {},
})

export default MainControls
