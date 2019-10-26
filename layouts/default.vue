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
          <component :is="componentFile" />
        </template>

      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
import SideBar from "@/components/SideBar"
import ModalAddVectorialLayer from '@/components/layers/ModalAddVectorialLayer'

export default {
  components: {
    SideBar,
    ModalAddVectorialLayer
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
    componentFile() {
      return () => import(`@/components/${this.$store.state.modalsVisibilities.pageModalsFolderName}/${this.currentMainModalCapitalize}`)
    }
  },

  methods: {
    onChangeCollapse (value) {
      this.isCollapse = value
    }
  }
}
</script>
