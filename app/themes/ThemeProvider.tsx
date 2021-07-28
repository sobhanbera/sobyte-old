import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {
    BACKGROUND_COLOR_OR_THEME_STORAGE_KEY,
    THEME_STORAGE_KEY,
} from '../constants'
import {DarkTheme} from './DarkTheme'
import {ColorGradientCodeName} from 'app/interfaces'

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
    const random = Math.floor(Math.random() * 8)
    const colorsArray = [
        DarkTheme.blueGradient, // 1
        DarkTheme.pinkGradient, // 2
        DarkTheme.redGradient, // 3
        DarkTheme.greenGradient, // 4
        DarkTheme.yellowGradient, // 5
        DarkTheme.cyanGradient, // 6
        DarkTheme.greyGradient, // 7
        DarkTheme.mixGradient, // 8
    ]

    const [theme, setTheme] = useState<string>('d')
    const [randomGradient, setRandomGradient] = useState<string[]>(
        colorsArray[random],
    )

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

    const getBackgroundTheme = useCallback(async () => {
        const backgroundTheme: ColorGradientCodeName | string | null =
            await AsyncStorage.getItem(BACKGROUND_COLOR_OR_THEME_STORAGE_KEY)
        switch (backgroundTheme) {
            case 'bisman':
                setRandomGradient(colorsArray[0])
                break
            case 'flamingo':
                setRandomGradient(colorsArray[1])
                break
            case 'phoenix':
                setRandomGradient(colorsArray[2])
                break
            case 'emerald':
                setRandomGradient(colorsArray[3])
                break
            case 'canary':
                setRandomGradient(colorsArray[4])
                break
            case 'celeste':
                setRandomGradient(colorsArray[5])
                break
            case 'graphite':
                setRandomGradient(colorsArray[6])
                break
            case 'disco':
                setRandomGradient(colorsArray[7])
                break
            case '':
                setRandomGradient(colorsArray[random])
                break
            default:
                setRandomGradient(colorsArray[random])
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
        getBackgroundTheme()
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
