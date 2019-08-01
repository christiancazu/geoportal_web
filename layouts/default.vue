<template>
  <div
    id="app"
    style="height:100vh;"
  >
    <!-- <el-container>
      <SideBar v-if="loggedIn" />
      <el-main>Principal</el-main>
    </el-container> -->
    <el-container style="min-height:100%">
      <SideBar v-if="loggedIn" />
      <el-main class="pa-0">
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar
  },

  data () {
    return {
      data: {
        width: 0,
        height: 0
      }
    };
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    }),

    innerWidth: function () {
      return this.data
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },

  created () {

  },

  methods: {
    handleResize () {
      let width = window.innerWidth;
      this.data.height = window.innerHeight;
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
