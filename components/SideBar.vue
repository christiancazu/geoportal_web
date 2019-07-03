<template>
  <div class="background-neutro">
    <el-aside
      width=""
      class="el-aside__adjust-width"
    >
      <MenuUser />
      <!-- <MenuGeoportal /> -->
    </el-aside>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 275px;
}
</style>

<script>
import MenuUser from '@/components/SideBar/User.vue'
import MenuGeoportal from '@/components/SideBar/Geoportal.vue'
export default {
  components: {
    MenuUser,
    MenuGeoportal
  },

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
