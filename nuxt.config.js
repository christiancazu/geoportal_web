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
    }],
    script: [
      { src: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js' }, 
      { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", type: "text/javascript" },
      { src: 'bootstrapJS/bootstrap.min.js', type: "text/javascript" },
      { src: 'js/leaflet.wms.js' }
    ],
  },
  css: [
    '~/assets/sass/app.scss'
  ],

  loading: {
    color: '#fff'
  },

  plugins: [
    '~/plugins/element-ui',
  ],
  modules: [
    '@nuxtjs/font-awesome',
  ]
}