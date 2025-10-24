module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // 1. Otros plugins (como worklets) deben ir antes
            'react-native-worklets/plugin',

            // 🔥 2. EL PLUGIN DE REANIMATED DEBE SER EL ÚLTIMO
            'react-native-reanimated/plugin',
        ],
    };
};
