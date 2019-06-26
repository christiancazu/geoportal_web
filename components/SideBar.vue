<template>
  <div>
    <el-aside
      width=""
      class="el-aside__adjust-width"
    >
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-submenu
          index="1"
        >
          <div slot="title">
            <i class="el-icon-s-custom" />
            <span slot="title">Gestión de usuarios</span>
          </div>
          <el-menu-item
            :route="{ path: '/users' }"
            index="1-1"
          >
            usuarios
          </el-menu-item>
          <el-menu-item
            index="1-2"
            :route="{ path: '/register' }"
          >
            Usuarios pendientes 
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          index="2"
        >
          <i class="el-icon-menu" />
          <span>Reportar</span>
        </el-menu-item>
        <el-menu-item
          index="3"
        >
          <i class="el-icon-document" />
          <span>Cerrar Sesión</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 100vh;
  }
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false,

      menu: [
        {
          name: 'Perfil',
          path: '/profile',
          iconClass: ''
        },
        {
          name: 'Gestión de usuarios',
          iconClass: '',
          subMenu: [
            { name: 'Usuarios', path: '/users' },
            { name: 'Usuarios Pendientes', path: '/users' }
          ]
        },
        {
          name: 'Gestión de Capas',
          iconClass: '',
          subMenu: [
            { name: 'Capas', path: '/layers' },
            { name: 'Capas Pendientes', path: '/layers' }
          ]
        },
        {
          name: 'Estado de Datos',
          iconClass: '',
          subMenu: [
            { name: 'Copias de Seguridad', path: '/layers' },
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    test (e) {
      console.log('test', e)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
