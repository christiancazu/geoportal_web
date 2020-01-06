<template>
<div
  id="app"
  style="min-height:100vh;"
>
  <el-container
    :class="isCollapse ? 'isCollapse' : 'openSidebar'"
    style="min-height:100%"
  >
    <side-bar
      @is-collapse="onChangeCollapse"
    />
    <el-main
      id="main-page"
      class="pa-0"
      :class="{'main-container': loggedIn}"
    >

      <!-- pages routing -->
      <nuxt />

    </el-main>
  </el-container>
</div>
</template>

<script>
import SideBar from '@/components/SideBar'

import { mapState } from 'vuex'

export default {
  components: {
    SideBar
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
