<template>
  <div class="init">
    <NavBar />
    <div class="container-fluid height-100">
      <div class="row height-100">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 border-right height-100">
          <Information />
          <PanelTask v-if="!isPortalPage" />
        </div>
        <div class="col-xs-24 col-sm-18 col-md-18 col-lg-18">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Information from '@/components/Information.vue'
import PanelTask from '@/components/PanelTask.vue'
export default {
  components: {
    NavBar,
    Information,
    PanelTask
  },

  data () {
    return {
    }
  },

  computed: {
    isPortalPage: function () {
      return this.$route.name === 'portal'
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
