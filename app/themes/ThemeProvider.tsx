/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - theme related component (provides what theme and all such good stuffs)
 */

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
    THEME_STORAGE_KEY,GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH
} from '../constants'
import {DarkTheme} from './DarkTheme'
import {ColorGradientCodeName} from 'app/interfaces'
import ThemeColors from './ThemeProps'


/**
 * interface for the context api we are providing through
 * this component
 */
interface ThemeContextProps {
    theme: string
    themeColors: ThemeColors
    randomGradient: string[]
    ChooseThemeOptions(
        _darkOption: any,
        _lightOption: any,
        _customOption: any,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ): null
    setRandomColorScheme(): void
}
/**
 * @d - dark theme
 * @l - light theme
 * @c - custom theme
 */
const ThemeContext = createContext<ThemeContextProps>({
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
    setRandomColorScheme: () => null
})
const ThemeProvider = (props: {children: React.ReactChild}) => {
    let random = Math.floor(Math.random() * GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH) // this value will be change when the user wants a different theme...
    const colorsArray = [
        DarkTheme.blueGradient, // 0
        DarkTheme.pinkGradient, // 1
        DarkTheme.redGradient, // 2
        DarkTheme.greenGradient, // 3
        DarkTheme.yellowGradient, // 4
        DarkTheme.cyanGradient, // 5
        DarkTheme.greyGradient, // 6
        DarkTheme.mixGradient, // 7
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

    const setRandomColorScheme = () => {
        random = Math.floor(Math.random() * GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH)
        setRandomGradient(colorsArray[random])
    }

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
        setRandomColorScheme
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
export const useTheme = () => useContext(ThemeContext)
