<template>
  <div class="background-neutro">
    <el-aside
      width=""
      class="el-aside__adjust-width"
    >
      <MenuGeoportal v-if="showPanelGeovisor" />
      <MenuUser v-else />
    </el-aside>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 275px;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
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
      showPanel: false
    }
  },

  computed: {
    ...mapState({
      showPanelGeovisor: state => state.sidebar.showPanelGeovisor
    })
  },
  methods: {
    
  }
}
</script>
