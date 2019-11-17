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

      <!-- dynamic current modals -->
      <template v-if="loggedIn">
        <component
          :is="mainModalDynamicComponent"
          modal-base-actions-mixin_mounted-on="mainModal"
        />
        <component
          :is="secondModalDynamicComponent"
          modal-base-actions-mixin_mounted-on="secondModal"
        />
      </template>

    </el-main>
  </el-container>
</div>
</template>
<script>
import { mapState } from 'vuex'
import SideBar from '@/components/SideBar'

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
    }),

    /**
     * load dynamic main modal component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer
     */
    mainModalDynamicComponent () {
      const { folderName, component } = this.$store.state.modalsVisibilities.mainModal
      return () => import(`@/components/${folderName}/${component}`)
    },

    /**
     * load dynamic second modal component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer
     */
    secondModalDynamicComponent () {
      const { folderName, component } = this.$store.state.modalsVisibilities.secondModal
      return () => import(`@/components/${folderName}/${component}`)
    }
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
