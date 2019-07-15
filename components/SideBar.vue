<template>
  <div class="background-neutro">
    <el-aside
      width=""
      class="el-aside__adjust-width"
    >
      <MenuUser />
      <!-- <MenuGeoportal /> -->
    </el-aside>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 275px;
}
</style>

<script>
import MenuUser from '@/components/SideBar/User.vue'
import MenuGeoportal from '@/components/SideBar/Geoportal.vue'
export default {
  components: {
    MenuUser,
    MenuGeoportal
  },

  data () {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    test (e) {
      console.log('test', e)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
