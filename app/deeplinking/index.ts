import {LinkingOptions} from '@react-navigation/native'

const DeepLinkingConfig: LinkingOptions = {
    prefixes: ['https://sobytemusic.com/android', 'sobytemusic://android'],
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
