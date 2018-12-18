module.exports = {
    baseUrl: process.env.NODE_ENV === "production" ? '' : 'dev',
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: [{
                    name: 'vux-ui'
                },
                {
                    name: 'less-theme',
                    path: 'src/styles/theme.less'
                }
            ]
        })
    },
    devServer: {
        port: 8086,
        proxy: {
            '/api': {
                target: 'https://192.168.10.103:8076',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        }
    }
}