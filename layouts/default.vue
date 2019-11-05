<template>
  <div
    id="app"
    style="height:100vh;"
  >
    <el-container
      :class="isCollapse ? 'isCollapse' : 'openSidebar'"
      style="min-height:100%"
    >
      <SideBar
        @is-collapse="onChangeCollapse"
        v-if="loggedIn"
      />
      <el-main
        class="pa-0"
        :class="{'main-container': loggedIn}"
      >

        <!-- pages routing -->
        <nuxt />

        <!-- dynamic current modals -->
        <template v-if="loggedIn">
          <component :is="mainModalDynamicComponent" />
          
          <component :is="secondModalDynamicComponent" />
        </template>
        

      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex"
import SideBar from "@/components/SideBar"

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
      loggedIn: state => state.auth.loggedIn,    
    }),

    /**
     * load dynamic main modal component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer
     */
    mainModalDynamicComponent () {
      const componentNameCapitalized = this.capitalize(this.$store.state.modalsVisibilities.mainModal)
      return () => import(`@/components/${this.$store.state.modalsVisibilities.modalMainFolderName}/${componentNameCapitalized}`)
    },

    /**
     * load dynamic second modal component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer 
     */
    secondModalDynamicComponent () {
      const componentNameCapitalized = this.capitalize(this.$store.state.modalsVisibilities.secondModal)
      return () => import(`@/components/${this.$store.state.modalsVisibilities.modalSecondFolderName}/${componentNameCapitalized}`)
    }
  },

  methods: {
    onChangeCollapse (value) {
      this.isCollapse = value
    },

    capitalize (text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  }
}
</script>
