import {LinkingOptions} from '@react-navigation/native'

/**
 * all types of the links which will trigger to
 * give an option to open with sobyte in android
 * while opening the following links
 */
export const DEEP_LINKING_HTTPS_LINK = 'https://sobytemusic.com/listen'
export const DEEP_LINKING_HTTP_LINK = 'http://sobytemusic.com/listen'
export const DEEP_LINKING_LOCAL_LINK = 'sobytemusic://listen”'

export const DEEP_LINKING_PREFIXES = [
    DEEP_LINKING_HTTPS_LINK,
    DEEP_LINKING_HTTP_LINK,
    DEEP_LINKING_LOCAL_LINK,
]

/**
 * every path in this deep linking configuration are the
 * related paths from AppLaunchingNavigation.tsx or simply
 * from where the main NavigationContainer exists...
 */
const DeepLinkingConfig: LinkingOptions = {
    prefixes: DEEP_LINKING_PREFIXES,
    config: {
        screens: {
            Profile: {
                path: 'Profile',
                screens: {
                    profile: {
                        path: 'profile/:id',
                    },
                },
            },
        },
    },
}

export default DeepLinkingConfig
