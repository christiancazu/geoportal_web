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

        <!-- dynamic current modal -->
        <template v-if="loggedIn">
          <component :is="formDynamicComponent" />
        </template>

      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
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
    ...mapGetters({
      currentMainModalCapitalize: 'modalsVisibilities/currentMainModalCapitalize'
    }),

    /**
     * load dynamic component from the state setted
     * example: @/components/layers/ModalAddVectorialLayer
     */
    formDynamicComponent () {
      const componentNameCapitalized = this.capitalize(this.$store.state.modalsVisibilities.mainModal)
      return () => import(`@/components/${this.$store.state.modalsVisibilities.pageModalsFolderName}/${componentNameCapitalized}`)
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
