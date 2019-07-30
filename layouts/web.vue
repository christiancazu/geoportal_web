<template>
  <div id="v-app">
    <header class="header">
      <Navbar />
    </header>
    <nuxt />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Navbar from "@/components/NavBar.vue";
export default {
  components: {
    Navbar
  },

  head() {
    return {
      title: "UNAT Geoportal",
      link: [
        {
          rel: "stylesheet",
          href:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
          integrity:
            "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
          async: true,
          defer: true
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
          async: true,
          defer: true
        },
        {
          src:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
          async: true,
          defer: true
        }
      ]
    };
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    }),

    isGeovisor: function() {
      const name = this.$route.name;
      return name === "geovisor" || name === "index";
    }
  },

  created() {}
};
</script>
<style>
.init {
  /* height: 100vh; */
  padding-top: 60px;
}
</style>
