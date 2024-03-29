/**
 * © 2021 Sobyte
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
    THEME_STORAGE_KEY,
    GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH,
} from '../constants'
import {DarkTheme} from './DarkTheme'
import {LightTheme} from './LightTheme'
import {ColorGradientCodeName} from 'app/interfaces'
import ThemeColors from './ThemeProps'

type ThemeType = 'd' | 'l' | 'c'

/**
 * interface for the context api we are providing through
 * this component
 */
interface ThemeContextProps {
    theme: string
    themeColors: ThemeColors
    setTheme: (theme: ThemeType) => null
    randomGradient: string[]
    ChooseThemeOptions(
        _darkOption: any,
        _lightOption: any,
        _customOption: any,
    ): null
    /**
     * @deprecated
     * function which updated the random gradient color to a different set of random gradient colors
     */
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
    setTheme: (_theme: ThemeType) => null,
    randomGradient: DarkTheme.backgroundgradient,
    // setTheme: (_theme = 'd') => null,
    ChooseThemeOptions: (
        _darkOption: any,
        _lightOption: any,
        _customOption: any,
    ) => null,
    /**
     * @deprecated
     * function which updated the random gradient color to a different set of random gradient colors
     */
    setRandomColorScheme: () => null,
})
const ThemeProvider = (props: {children: React.ReactChild}) => {
    let random = Math.floor(
        Math.random() * GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH,
    ) // this value will be change when the user wants a different theme...
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

    /**
     * @deprecated
     * function which updated the random gradient color to a different set of random gradient colors
     */
    const setRandomColorScheme = () => {
        random = Math.floor(
            Math.random() * GRADIENT_COLOR_SCHEME_ARRAY_MAX_LENGTH,
        )
        setRandomGradient(colorsArray[random])
    }

    /**
     * @deprecated
     * this feature is not required for the first build of this application as many other colorschemes are already there present in the setting's section
     * that why I am deprecating this feature for now
     * this function may be useful in the future...
     * @param {ThemeType} themeType: the type of theme the user wants to set d for dark, l for light, c for custom and so on...
     */
    const setAppTheme = async (themeType: ThemeType) => {
        if (['d', 'l', 'c'].includes(theme)) {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, themeType)
            getTheme()
        } else {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, 'd')
            getTheme()
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
        getBackgroundTheme()
    }, [])

    const themeValue = {
        theme,
        themeColors: ChooseThemeOptions(DarkTheme, LightTheme, DarkTheme),
        randomGradient: randomGradient,
        setTheme: setAppTheme,
        ChooseThemeOptions,
        setRandomColorScheme,
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
export const useTheme = () => useContext(ThemeContext)
