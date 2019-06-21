<template>
  <div class="init">
    <NavBar />
      <nuxt />
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
