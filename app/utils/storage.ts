import AsyncStorage from '@react-native-community/async-storage'
import {
    THEME_STORAGE_KEY,
    AUDIO_QUALITY_STORAGE_KEY,
    LANGUAGE_CODE_STORAGE_KEY,
} from '../constants'

export async function setStorage(key: string, value: string) {
    await AsyncStorage.setItem(key, value)
}

export async function getStorage() {
    await AsyncStorage.multiGet(
        [
            THEME_STORAGE_KEY,
            LANGUAGE_CODE_STORAGE_KEY,
            AUDIO_QUALITY_STORAGE_KEY,
        ],
        (error, result) => {
            return error ? null : result
        },
    )
}
