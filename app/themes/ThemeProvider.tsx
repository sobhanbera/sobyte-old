import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {THEME_STORAGE_KEY} from '../constants'
import {DarkTheme} from './DarkTheme'

/**
 * @d - dark theme
 * @l - light theme
 * @c - custom theme
 */
const ThemeContext = createContext({
    theme: 'd',
    themeColors: {
        ...DarkTheme,
    },
    randomGradient: DarkTheme.backgroundgradient,
    // setTheme: (_theme = 'd') => null,
    ChooseThemeOptions: (
        _darkOption: any,
        _lightOption: any,
        _customOption: any,
    ) => null,
})
const ThemeProvider = (props: {children: React.ReactChild}) => {
    const random = Math.floor(Math.random() * 6)
    const colorsArray = [
        DarkTheme.blueGradient,
        DarkTheme.pinkGradient,
        DarkTheme.redGradient,
        DarkTheme.greenGradient,
        DarkTheme.yellowGradient,
        DarkTheme.greyGradient,
    ]

    const [theme, setTheme] = useState<string>('d')
    const [randomGradient] = useState<string[]>(colorsArray[random])

    const getTheme = useCallback(async () => {
        const tempTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)

        if (!tempTheme) {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, 'd')
            setTheme('d')
        } else if (['d', 'l', 'c'].includes(tempTheme)) {
            setTheme(tempTheme)
        } else {
            setTheme('d')
        }
    }, [])

    // const setAppTheme = async (theme: string) => {
    //     if (['d', 'l', 'c'].includes(theme)) {
    //         setTheme(theme)
    //         await AsyncStorage.setItem(THEME_STORAGE_KEY, theme)
    //     } else {
    //         await AsyncStorage.setItem(THEME_STORAGE_KEY, 'd')
    //         setTheme('d')
    //     }
    // }

    function ChooseThemeOptions(
        darkOption: any,
        lightOption: any,
        customOption: any,
    ) {
        return theme === 'd'
            ? darkOption
            : theme === 'l'
            ? lightOption
            : customOption
    }

    useEffect(() => {
        getTheme()
    }, [])

    const themeValue = {
        theme,
        themeColors: ChooseThemeOptions(DarkTheme, DarkTheme, DarkTheme),
        randomGradient: randomGradient,
        // setTheme: setAppTheme,
        ChooseThemeOptions,
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
export const useTheme = () => useContext(ThemeContext)
