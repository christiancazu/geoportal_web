<template>
  <el-container
    direction="horizontal"
    class="container"
    style="justify-content: space-between;"
  >
    <div class="hover-remove mt-1" @click="$router.push('/')">
      <img
        class="el-menu-item"
        src="/image/unat_blanco.png"
        style="max-height:100%;"
        alt=""
      >
    </div>
    <!-- <div class="container"> -->
    <el-menu
      class="el-menu-demo hover-remove"
      mode="horizontal"
      menu-trigger="click"
      :router="true"
      style="z-index:1; float: right;"
      backgroundColor="transparent"
    >
      <el-menu-item activeTextColor="#ffffff">
        <template slot="title">Contacto</template>
      </el-menu-item>
      <el-menu-item>
        <template slot="title">Quienes somos</template>
      </el-menu-item>
      <el-menu-item>
        <template slot="title">Componentes</template>
      </el-menu-item>
    </el-menu>
    <!-- </div> -->
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
