<template>
<div class="store-viewer">
  <pre>{{ currentStore }}</pre>
</div>
</template>

<script>
export default {
  computed: {
    currentStore () {
      return this.$store.state.WMSServices.modalInner
    },
  }
}
</script>

<style>
.store-viewer {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: gray;
  color:white;
  min-width: 200px;
  min-height: 100px;
  z-index: 5000;
}
</style>