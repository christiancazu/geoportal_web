export default {
  // "dev": "nuxt --hostname 0.0.0.0 --port 9100",
  server: {
    // port: 8400,  default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'spa',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Roboto&display=swap" rel="stylesheet'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
      },
      {
        src: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js'
      },
      {
        src: 'https://kit.fontawesome.com/3122b9c598.js'
      }
    ]
  },
  css: ['~/assets/sass/app.scss'],

  loading: {
    color: '#6376f7'
  },

  plugins: [
    '~/plugins/element-ui',
    '~/plugins/axios',
    '~/plugins/api',
    '~/plugins/messages',
    { src: '~plugins/leaflet.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //(baseURL: process.env.NODE_ENV === 'production' ? 'https://veox.com/api' : 'http://192.168.1.125:8300/geoportal/api/'
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://104.197.114.116:9100/api/'
        : 'http://104.197.114.116:9100/api/'
  },

  auth: {
    plugins: [],
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: 'user/logout/',
            method: 'post'
          },
          user: {
            url: 'user/info/',
            method: 'GET',
            propertyName: 'user'
          }
        }
      }
    }
  },

  router: {
    middleware: ['checkAuth']
  },

  toast: {
    position: 'top-right',
    className: 'app-toast',
    duration: 4000,
    action: {
      text: 'X',
      // eslint-disable-next-line
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
