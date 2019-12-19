<template>
<div
  id="app"
  style="height:100vh;"
>
  <el-container
    :class="isCollapse ? 'isCollapse' : 'openSidebar'"
    style="min-height:100%"
  >
    <side-bar
      v-if="loggedIn"
      @is-collapse="onChangeCollapse"
    />
    <el-main
      id="main-page"
      class="pa-0"
      :class="{'main-container': loggedIn}"
    >

      <!-- pages routing -->
      <nuxt />

      <!-- <store-viewer /> -->

    </el-main>
  </el-container>
</div>
</template>

<script>
// import StoreViewer from '@/components/tester/StoreViewer'

import { mapState } from 'vuex'
import SideBar from '@/components/SideBar'

export default {
  components: {
    SideBar,
    // StoreViewer
  },

  data () {
    return {
      isCollapse: false
    }
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    })
  },

  methods: {
    onChangeCollapse (value) {
      this.isCollapse = value
      // adjust margin left of main-page when collapse sidebar
      const $basePage = document.getElementById('main-page')
      $basePage.classList.toggle('on-collapse-sidebar')
    }
  }
}
</script>
