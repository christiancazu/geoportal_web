<template>
  <div class="background-neutro">
    <el-aside
      width=""
      class="el-aside__adjust-width"
    >
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo height-100"
        :router="true"
        :collapse="isCollapse"
      >
        <el-menu-item
          index="1"
          :route="{ path: '/profile' }"
        >
          <i class="el-icon-menu" />
          <span>Perfil</span>
        </el-menu-item>
        <el-submenu index="2">
          <div slot="title">
            <i class="el-icon-s-custom" />
            <span slot="title">Gestión de usuarios</span>
          </div>
          <el-menu-item
            :route="{ path: '/managementUsers/users' }"
            index="2-1"
          >
            usuarios
          </el-menu-item>
          <el-menu-item
            index="2-2"
            :route="{ path: '/managementUsers/pendingUsers' }"
          >
            Usuarios pendientes
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <div slot="title">
            <i class="el-icon-s-custom" />
            <span slot="title">Gestión de Capas</span>
          </div>
          <el-menu-item
            :route="{ path: '/managementLayers/layers' }"
            index="3-1"
          >
            Capas
          </el-menu-item>
          <el-menu-item
            index="3-2"
            :route="{ path: '/managementLayers/pendingLayers' }"
          >
            Capas pendientes
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          :route="{ path: '/geovisor' }"
          index="4"
        >
          <i class="el-icon-menu" />
          <span>Geoportal</span>
        </el-menu-item>
        <el-menu-item
          index="5"
          :route="{ path: '/report' }"
        >
          <i class="el-icon-menu" />
          <span>Reportar</span>
        </el-menu-item>
        <el-menu-item index="6" :route="{ path: '/' }">
          <i class="el-icon-document" />
          <span>Cerrar Sesión</span>
        </el-menu-item>
        <el-menu-item @click="isCollapse = !isCollapse">
          <i v-if="isCollapse" class="el-icon-d-arrow-right" />
          <i v-else class="el-icon-d-arrow-left" />
          <span>Ocultar</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 100px;
}
</style>

<script>
export default {
  data () {
    return {
      isCollapse: true,

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
            { name: 'Usuarios Pendientes', path: '/pendingUsers' }
          ]
        },
        {
          name: 'Gestión de Capas',
          iconClass: '',
          subMenu: [
            { name: 'Capas', path: '/layers' },
            { name: 'Capas Pendientes', path: '/pendingLayers' }
          ]
        },
        {
          name: 'Estado de Datos',
          iconClass: '',
          subMenu: [
            { name: 'Copias de Seguridad', path: '/backups' },
            { name: 'Crear', path: '/createBackups' },
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
