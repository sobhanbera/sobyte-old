/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';

import styled from 'styled-components/native';
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background-color: #0f60b6;
    margin: 0 auto;
    border-radius: 5px;
    &:hover {
        background-color: black;
    }
`;

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <View style={styles.view}>
                <Container />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

export default App;
