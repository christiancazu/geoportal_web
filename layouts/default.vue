<template>
  <div class="init">
    <NavBar v-if="!isLoginPage" />
    <div class="container-fluid height-100">
      <div class="row height-100">
        <div
          v-if="!isPortalPage"
          class="col-xs-6 col-sm-6 col-md-6 col-lg-6 border-right height-100"
        >
          <PanelUser />
        </div>
        <div :class="[!isLoginPage ? 'col-sm-18 col-md-18 col-lg-18' : '', 'col-xs-24']">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import PanelUser from '@/components/PanelUser.vue'
export default {
  components: {
    NavBar,
    PanelUser
  },

  data () {
    return {
    }
  },

  computed: {
    isPortalPage: function () {
      const name = this.$route.name
      return name === 'portal' || name === 'login'
    },

    isLoginPage: function () {
      const name = this.$route.name
      return name === 'login'
    }
  },

  created () {
  }
}
</script>
<style>
.init {
  height: 100vh;
  padding-top: 60px;
}
</style>
