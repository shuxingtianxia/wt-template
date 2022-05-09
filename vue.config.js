const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VueFilenameInjector = require('@d2-projects/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

// 设置不参与构建的库
const externals = {}

// 多页配置，默认未开启，如需要请参考 https://cli.vuejs.org/zh/config/#pages
const pages = undefined
const IsProd = process.env.NODE_ENV === 'production'

module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath, // 和 publicPath 保持一致
    disableHostCheck: process.env.NODE_ENV === 'development', // 关闭 host check，方便使用 ngrok 之类的内网转发工具
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    port: 8889,
    proxy: {
      '/service1': {
        // target: "http://192.168.130.220:30101", //原始 dev
        target: 'http://srmgatewaydev.wingtech.com', // dev环境
        // target: " http://192.168.46.65:30001", //x
        // target: " http://192.168.47.70:30001", //s
        changeOrigin: true,
        timeout: 60000,
        ws: false, // 是否代理websockets
        pathRewrite: {
          '^/service1': '/service1'
        },
        secure: false // 如果是https接口，需要配置这个参数 是否验证SSL Certs
      },
      '/i18n': {
        target: 'http://192.168.47.94:8080', // 泽邦
        changeOrigin: true,
        timeout: 60000,
        websocket: false,
        pathRewrite: {
          '^/i18n': '/i18n'
        },
        secure: false
      },
      '/srm': {
        target: 'https://srmdev.wingtech.com', // 泽邦
        changeOrigin: true,
        timeout: 60000,
        websocket: false,
        pathRewrite: {
          '^/srm': '/service1'
        },
        secure: false
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/style/public.scss\';'
      }
    }
  },
  pages,
  configureWebpack: config => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }
    return configNew
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@assets', resolve('./src/assets'))
      .set('@components', resolve('./src/components'))
      .set('@public', resolve('./public'))
      .set('@routePath', resolve(`./src/router/${IsProd ? 'index' : 'index'}.js`))

    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      .plugin('theme-color-replacer')
      .use(ThemeColorReplacer, [{
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
        ],
        externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector
      }])
    config
      // 开发环境 sourcemap 不包含列信息
      .when(process.env.NODE_ENV === 'development',
        configItem => configItem.devtool('cheap-source-map')
      )
      // 预览环境构建 vue-loader 添加 filename
      .when(
        process.env.VUE_APP_SCOURCE_LINK === 'TRUE',
        configItem => VueFilenameInjector(configItem, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // 分析工具
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // 不输出 map 文件
  productionSourceMap: false,
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
