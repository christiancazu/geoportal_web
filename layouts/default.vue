<template>
  <div class="init">
    <NavBar />
    <div class="container-fluid">
      <nuxt />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  created () {
  }
}
</script>
<style>
.init {
  /* height: 100vh; */
  padding-top: 60px;
}
</style>
