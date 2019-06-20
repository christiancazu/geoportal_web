<template>
  <div style="height: 300px;">
    <el-steps
      direction="vertical"
      :active="active"
    >
      <el-step></el-step>
      <el-step></el-step>
      <el-step></el-step>
    </el-steps>
    <div v-if="active === 1">
      <div class="panel-body text-center">
      <img
        src="https://bulma.io/images/placeholders/128x128.png"
        alt=""
        class="img-circle"
      >
      <h3>Maribel</h3>
      <p>Administrador</p>
    </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      active: 1
    };
  },

  methods: {
    next () {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>