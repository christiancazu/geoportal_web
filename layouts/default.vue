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

      <!-- dynamic current modals -->
      <template v-if="loggedIn">
        <!-- <component
          :is="mainModalDynamicComponent"
          modal-base-actions-mixin_mounted-on="mainModal"
        />
        <component
          :is="secondModalDynamicComponent"
          modal-base-actions-mixin_mounted-on="secondModal"
        /> -->
        <!-- <el-dialog
          :title="'gaaaaaa'"
          :close-on-click-modal="false"
          :visible="true"
          top="2vh"
          class="dialog-responsive"
        >
          <component
            :is="myComponent"
          />
        </el-dialog> -->
      </template>

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
    }),

    myComponent () {
      return () => import('@/pages/managementLayers/groups')
    },

    /**
     * load dynamic main modal component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer
     */
    // mainModalDynamicComponent () {
    //   const { folderName, component } = this.$store.state.modalsVisibilities.mainModal
    //   return () => import(`@/components/${folderName}/${component}`)
    // },

    // /**
    //  * load dynamic second modal component from the state setted
    //  * example: @/components/layers/ModalAddVectorialLayer
    //  */
    // secondModalDynamicComponent () {
    //   const { folderRoot, folderName, component } = this.$store.state.modalsVisibilities.secondModal
    //   console.warn(folderRoot, folderName, component)
    //   return () => import(`@/components/${folderName}/${component}`)
    // }
  },

  async mounted () {
    // console.warn(await this.$userAPI.get())
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
