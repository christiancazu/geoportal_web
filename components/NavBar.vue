<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      :router="true"
    >
      <el-menu-item index="1">
        Portal
      </el-menu-item>
      <el-submenu
        index="2"
        style="float: right"
        popper-class="adjust-popper"
      >
        <template slot="title">
          Carol
          <i class="fa fa-user-circle-o fa-2x" />
        </template>
        <el-menu-item index="2-1">
          Profile
        </el-menu-item>
        <el-menu-item index="2-2">
          Settings
        </el-menu-item>
        <el-menu-item
          index="2-3"
          :route="{
            name: 'login'
          }"
        >
          Log Out
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
