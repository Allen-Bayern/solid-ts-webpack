const exportLocalsConvention = 'camelCase';
// key for css-modules
const moduleKey = 'css-modules';
// key for css-normal
const normalKey = 'css-normal';

/**
 * @description config style loads
 * @param {import('webpack-chain')} confInstance
 * @param {import('./LoadStyles_types').OtherConf} otherConf
 * @returns the config
 */
const loadStyles = (confInstance, { isDev = true, styleType = 'css', styleResourcePatterns = [] }) => {
    const { loader: miniLoader } = require('mini-css-extract-plugin');
    const sourceMap = !isDev;

    if (styleType === 'sass') {
        return confInstance.module
            .rule('sass')
            .test(/\.sass$/i)
            .oneOf(moduleKey)
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.sass'),
                    localIdentName: '[local]__[hash:base64]',
                    exportLocalsConvention,
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('sass')
            .loader('sass-loader')
            .options({
                sourceMap,
                sassOptions: {
                    indentedSyntax: true,
                },
            })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf(normalKey)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('sass')
            .loader('sass-loader')
            .options({
                sourceMap,
                sassOptions: {
                    indentedSyntax: true,
                },
            })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'scss') {
        return confInstance.module
            .rule('scss')
            .test(/\.scss$/i)
            .oneOf(moduleKey)
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.scss'),
                    localIdentName: '[local]__[hash:base64]',
                    exportLocalsConvention,
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('resolve-url-loader')
            .loader('resolve-url-loader')
            .end()
            .use('scss')
            .loader('sass-loader')
            .options({ sourceMap: true })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf(normalKey)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('resolve-url-loader')
            .loader('resolve-url-loader')
            .end()
            .use('scss')
            .loader('sass-loader')
            .options({ sourceMap: true })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'less') {
        const lessLoaderBasicOptions = {
            sourceMap,
            lessOptions: {
                javascriptEnabled: true,
            },
        };

        return confInstance.module
            .rule('less')
            .test(/\.less$/i)
            .oneOf(moduleKey)
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.less'),
                    localIdentName: '[local]__[hash:base64]',
                    exportLocalsConvention,
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('less-loader')
            .options({ ...lessLoaderBasicOptions })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf(normalKey)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('less-loader')
            .options({ ...lessLoaderBasicOptions })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    if (styleType === 'stylus') {
        return confInstance.module
            .rule('stylus')
            .test(/\.styl(us)?$/i)
            .oneOf(moduleKey)
            .test(/\.module\.\w+$/i)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: {
                    auto: resourcePath => resourcePath.endsWith('.styl') || resourcePath.endsWith('.stylus'),
                    localIdentName: '[local]__[hash:base64]',
                    exportLocalsConvention,
                },
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('less')
            .loader('stylus-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .oneOf(normalKey)
            .use('style')
            .loader(isDev ? 'style-loader' : miniLoader)
            .end()
            .use('css')
            .loader('css-loader')
            .options({
                sourceMap,
                importLoaders: 2,
                // css-module hash
                modules: false,
            })
            .end()
            .use('postcss')
            .loader('postcss-loader')
            .options({ sourceMap })
            .end()
            .use('stylus')
            .loader('stylus-loader')
            .options({ sourceMap })
            .end()
            .use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
            })
            .end()
            .end()
            .end()
            .end();
    }

    return confInstance.module
        .rule('css')
        .test(/\.css$/i)
        .oneOf(moduleKey)
        .test(/\.module\.\w+$/i)
        .use('style')
        .loader(isDev ? 'style-loader' : miniLoader)
        .end()
        .use('css')
        .loader('css-loader')
        .options({
            sourceMap,
            importLoaders: 1,
            // css-module hash
            modules: {
                auto: resourcePath => resourcePath.endsWith('.css'),
                localIdentName: '[local]__[hash:base64]',
                exportLocalsConvention,
            },
        })
        .end()
        .use('postcss')
        .loader('postcss-loader')
        .options({ sourceMap })
        .end()
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
        })
        .end()
        .end()
        .oneOf(normalKey)
        .use('style')
        .loader(isDev ? 'style-loader' : miniLoader)
        .end()
        .use('css')
        .loader('css-loader')
        .options({
            sourceMap,
            importLoaders: 1,
            // css-module hash
            modules: false,
        })
        .end()
        .use('postcss')
        .loader('postcss-loader')
        .options({ sourceMap })
        .end()
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: Array.isArray(styleResourcePatterns) ? styleResourcePatterns : [],
        })
        .end()
        .end()
        .end()
        .end();
};

module.exports = {
    loadStyles,
};
