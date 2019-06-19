<template>
  <section>
    <div class="cmv flat">
      <div class="appHeader">
        <img class="headerLogo" alt="logo" src="images/rocket-logo.png">
        <div class="headerTitle">
          <span id="headerTitleSpan">Configurable Map Viewer</span>
          <div id="subHeaderTitleSpan" class="subHeaderTitle">make it your own</div>
        </div>
        <div class="search">
          <div id="geocodeDijit"></div>
        </div>
        <div class="headerLinks">
          <div id="helpDijit"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: "https://js.arcgis.com/3.28compact/" },
        { src: "js/config/appmap.js" }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://js.arcgis.com/3.28compact/esri/css/esri.css"
        },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.4.0/css/all.css"
        },
        { rel: "stylesheet", href: "css/app.css" }
      ]
    };
  },
  mounted() {
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
</style>
