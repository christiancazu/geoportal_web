<template>
<div
  id="app"
  style="min-height:100vh;"
>
  <el-container
    :class="isCollapse ? 'isCollapse' : 'openSidebar'"
    style="min-height:100%"
  >

    <el-main
      id="main-page"
      class="pa-0"
    >
      <!-- pages routing -->
      <nuxt />

    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>
