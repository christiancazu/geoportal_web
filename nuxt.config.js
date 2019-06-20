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
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      },
    ],
    script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        type: "text/javascript"
      },
      {
        src: 'bootstrapJS/bootstrap.min.js',
        type: "text/javascript"
      }
    ],
  },
  css: [
    '~/assets/css/bootstrap.min.css',
  ],
  plugins: [],
  modules: []
}