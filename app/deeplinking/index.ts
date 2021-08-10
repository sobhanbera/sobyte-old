export default {
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
