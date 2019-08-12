<template>
  <div
    id="app"
    style="height:100vh;"
  >
    <el-container
      :class="{ 'hideSidebar': isCollapse, 'openSidebar': !isCollapse }"
      style="min-height:100%"
    >
      <SideBar
        v-if="loggedIn"
        @is-collapse="onChangeCollapse"
      />
      <el-main
        class="pa-0"
        :class="{'main-container': loggedIn}"
      >
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar
  },

  data () {
    return {
      isCollapse: false
    };
  },

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    })
  },

  methods: {
    ...mapActions({
      replaceBreakpoints: "modalsManagementUser/replaceBreakpoints",
    }),

    onChangeCollapse (value) {
      this.isCollapse = value
    }
  }
};
</script>
