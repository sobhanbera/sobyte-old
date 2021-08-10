import {LinkingOptions} from '@react-navigation/native'

export const DEEP_LINKING_HTTPS_LINK = 'https://sobytemusic.com/listen'
export const DEEP_LINKING_HTTP_LINK = 'http://sobytemusic.com/listen'
export const DEEP_LINKING_LOCAL_LINK = 'sobytemusic://listen”'

export const DEEP_LINKING_PREFIXES = [
    DEEP_LINKING_HTTPS_LINK,
    DEEP_LINKING_HTTP_LINK,
    DEEP_LINKING_LOCAL_LINK,
]

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
