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
    setTheme: (theme = 'd') => null,
    ChooseThemeOptions: (
        darkOption: any,
        lightOption: any,
        customOption: any,
    ) => null,
})
const ThemeProvider = (props: {children: React.ReactChild}) => {
    const [theme, setTheme] = useState('d')

    const getTheme = useCallback(async () => {
        const tempTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (!tempTheme) {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, 'd')
            setTheme('d')
        } else if (['d', 'l', 'c'].includes(tempTheme)) {
            setTheme(tempTheme)
        } else setTheme('d')
    }, [])

    const setAppTheme = async (theme: string) => {
        if (['d', 'l', 'c'].includes(theme)) {
            setTheme(theme)
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme)
        } else {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, 'd')
            setTheme('d')
        }
    }

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
        setTheme: setAppTheme,
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
