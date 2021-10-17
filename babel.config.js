module.exports = {
    presets: ['module:metro-react-native-babel-preset'],

    /** 'react-native-reanimated/plugin' should be placed last in the plugins list */
    // we are attaching the env variables modules
    plugins: [
        'react-native-reanimated/plugin',
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
                verbose: false,
            },
        ],
    ],
}
