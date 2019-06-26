<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <NavBar />
      </el-header>
      <el-container>
        <SideBar />
        <el-container>
          <el-main>
            <nuxt />
          </el-main>
          <el-footer height="32px">
            <p>footer</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
export default {
  components: {
    NavBar,
    SideBar
  },

  data () {
    return {
    }
  },

  computed: {
  },

  created () {
  }
}
</script>
<style>
.init {
  /* height: 100vh; */
  padding-top: 60px;
}
</style>
