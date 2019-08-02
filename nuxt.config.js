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
      href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
    },{
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Roboto&display=swap" rel="stylesheet'
    }],
    script: [{
      src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    },{
      src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
    },{
      src: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js'
    },
    {
      src: 'js/leaflet.wms.js'
    },
    {
      src: 'https://kit.fontawesome.com/3122b9c598.js'
    }
    ],
  },
  css: [
    '~/assets/sass/app.scss',
  ],

  loading: {
    color: '#fff'
  },

  plugins: [
    '~/plugins/element-ui',
    '~/plugins/axios',
    '~/plugins/api',
    '~/plugins/breakpoint',
  ],

  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //  baseURL: process.env.NODE_ENV === 'production' ? 'https://veox.com/api' : 'http://192.168.1.5:8000/geoportal/api/'
    baseURL: process.env.NODE_ENV === 'production' ? 'https://veox.com/api' : 'http://192.168.1.130:8300/geoportal/api/'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/geovisor'
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
    duration: 4000,
    action: {
      text: 'X',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }
}
