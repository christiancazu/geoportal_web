<template>
  <PanelUser />

  <!-- <div>
    <div class="container-fluid height-100">
      <div class="row height-100">
        <div
          class="col-xs-6 col-sm-6 col-md-6 col-lg-6 border-right height-100"
        >
          <PanelUser />
        </div>
        <div class="col-xs-24 col-sm-18 col-md-18 col-lg-18">
          <nuxt />
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import PanelUser from '@/components/PanelUser.vue'

export default {
  components: {
    PanelUser
  },

  mounted () {

  }
};
</script>

<style lang="css" scoped>
</style>