// babel.config.js (Crear este archivo en la raíz del proyecto)

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // 🔥 ESTE DEBE SER EL ÚLTIMO PLUGIN
            'react-native-reanimated/plugin',
        ],
    };
};