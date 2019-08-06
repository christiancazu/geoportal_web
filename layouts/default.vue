<template>
  <div id="app" style="height:100vh;">
    <!-- <el-container>
      <SideBar v-if="loggedIn" />
      <el-main>Principal</el-main>
    </el-container>-->
    <el-container style="min-height:100%">
      <!-- <SideBar v-if="loggedIn" /> -->
      <SideBar />
      <el-main class="pa-0">
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    })
  },
  mounted() {
    // window.addEventListener("resize", this.handleResize);
    // this.handleResize();
  },

  created() {},

  methods: {
    ...mapActions({
      replaceBreakpoints: "modalsManagementUser/replaceBreakpoints"
    }),
    handleResize() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      // let data = this.$breakpoint(width, height);
      // console.log(data, "data");
      // this.replaceBreakpoints({ data })
    }
  }
};
</script>
<style>
.init {
  /* height: 100vh; */
  padding-top: 60px;
}
</style>
