export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
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
    link: [{
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Material+Icons'
    }
    ],
    script: [{
      src: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js'
    },
    {
      src: 'js/leaflet.wms.js'
    }
    ],
  },
  css: [
    '~/assets/sass/app.scss',
    'element-ui/lib/theme-chalk/index.css',
  ],

  loading: {
    color: '#fff'
  },

  plugins: [
    '~/plugins/axios',
    '~/plugins/element-ui',
  ],

  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //baseURL: process.env.NODE_ENV === 'production' ? 'https://veox.com/api' : 'http://192.168.1.117:8080/geoportal/api/'
    baseURL: process.env.NODE_ENV === 'production' ? 'https://veox.com/api' : 'http://192.168.1.130:8300/geoportal/api/'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/geovisor'
    },
    refresh_token: {
      prefix: '_refresh_token.',
      options: {

      }
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
            url: 'logout',
            method: 'post'
          },
          user: {
            url: 'user/',
            method: 'get',
            propertyName: 'data'
          }
        },
      }
    },
  },

  router: {
    middleware: ['auth']
  },

  toast: {
    position: "top-right",
    className: 'app-toast',
    duration: 3000,
    action: {
      text: 'Cerrar',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }

}
