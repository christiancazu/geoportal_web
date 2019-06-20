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
    link: [],
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
    '~/assets/css/main.css',
  ],
  plugins: [
    '~/plugins/element-ui',
  ],
  modules: [
    '@nuxtjs/font-awesome',
  ]
}