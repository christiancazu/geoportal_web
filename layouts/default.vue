<template>
  <div
    id="app"
    style="height:100vh;"
  >
    <el-container
      direction="vertical"
      style="min-height:100%"
    >
      <el-header height="76px" class="px-0 theme-purple-pink ">
        <NavBar />
      </el-header>
      <el-container>
        <SideBar v-if="loggedIn" />
        <el-main class="pa-0">
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    NavBar,
    SideBar
  },

  data () {
    return {};
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    }),

    isGeovisor: function () {
      const name = this.$route.name
      return name === 'geovisor' || name === "index"
    }
  },

  created () {
    console.log(this.$route.name)
  }
};
</script>
<style>
.init {
  /* height: 100vh; */
  padding-top: 60px;
}
</style>
