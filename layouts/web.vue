<template>
  <div id="v-app">
    <div class="app-wrapper">
      <el-header>
        <navbar></navbar>
      </el-header>
      <div class="main-container">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Navbar from "@/components/NavBar.vue";
export default {
  components: {
    Navbar
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
