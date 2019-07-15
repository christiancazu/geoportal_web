<template>
  <el-card shadow="always">
    Pagina de inicio del geoportal
    <div class="label-text pa-3">
      <nuxt-link to="/login">Iniciar Sesión</nuxt-link>
    </div>
  </el-card>
</template>
<script>
export default {
  auth: false,
  components: {},

  mounted() {}
};
</script>

<style lang="css" scoped>
</style>
