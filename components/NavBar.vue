<template>
  <div class="navWrapper">
    <div id="menu" :class="{ active: isActive }">
      <el-menu mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item id="logo" index="/" :route="{ name: 'Root'}">
          <div class="logo-header">
            <div id="logo">
              <img class="el-menu-item" src="/image/unat_blanco.png" style="max-height:100%;" alt />
            </div>
          </div>
        </el-menu-item>
        <el-menu-item index="1" :route="{ path: '/' }">Hello</el-menu-item>
        <el-menu-item index="2" :route="{ path: '/' }">Projects</el-menu-item>
        <el-menu-item index="3" :route="{ path: '/' }">About</el-menu-item>
        <el-menu-item index="4" :route="{ path: '/' }">Contact</el-menu-item>
      </el-menu>
    </div>
    <div id="toggle" @click="select()">
      <div class="span" id="top" :class="{ active: isActive }"></div>
      <div class="span" id="middle" :class="{ active: isActive }"></div>
      <div class="span" id="bottom" :class="{ active: isActive }"></div>
    </div>
  </div>
</template>

<script>
// import Logo from '@/components/Logo'

export default {
  components: {
    // Logo
  },

  data() {
    return {
      activeIndex: "/hello",
      isActive: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    select: function() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
