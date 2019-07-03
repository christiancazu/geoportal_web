<template>
  <div id="app" style="height:100vh;">
    <el-container direction="vertical" style="min-height:100%">
      <el-header>
        <NavBar />
      </el-header>
      <el-container>
        <SideBar />
        <el-container>
          <el-main>
            <nuxt />
          </el-main>
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
