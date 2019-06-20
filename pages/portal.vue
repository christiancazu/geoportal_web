<template>
  <section>
    <div id="helpDijit"></div>
  </section>
</template>

<script>
export default {
  head () {
    return {
      bodyAttrs: {
        class: 'cmv flat'
      },
      titleTemplate: 'test',
      script: [
        {
          src: 'js/scriptOnLoad.js',
          type: "text/javascript"
        },
        {
          src: "https://js.arcgis.com/3.28compact/",
          type: "text/javascript"
        },
        {
          src: 'js/config/app.js',
          type: "text/javascript"
        }
      ],
      link: [
        { rel: 'favicon', href: 'favicon.ico' },
        { rel: 'stylesheet', href: 'https://js.arcgis.com/3.28compact/esri/css/esri.css' },
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.4.0/css/all.css' },
        { rel: "stylesheet", href: "css/app.css" }
      ]
    };
  },
  mounted () {
    var s = window.location.search,
      q = s.match(/locale=([^&]*)/i);
    var locale = q && q.length > 0 ? q[1] : null;
    window.dojoConfig = {
      locale: locale,
      async: true
    };
  }
};
</script>

<style scoped>
  #helpDijit {
    position: absolute;
    z-index: 1;
    bottom: 0px;
    padding: 10px;
  }
</style>
