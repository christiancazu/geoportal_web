<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :router="true"
    :collapse="isCollapse"
    style="height:100%"
  >
    <el-menu-item>
      <img
        src="/image/default_avatar.png"
        alt=""
        style="height:35px;"
      >
      <span class="font-weight-bold">{{ user.name }} <em style="font-size:12px; font-weight: 200;"> (Admin) </em></span>
    </el-menu-item>
    <el-divider />
    <el-menu-item
      index="/profile"
      :route="{ path: '/profile' }"
    >
      <i class="fas fa-user"></i>
      <span>Perfil</span>
    </el-menu-item>
    <transition name="el-zoom-in-top">

      <el-submenu index="" :class="{ 'is-active': managementUser }">
        <template slot="title">
          <i class="fas fa-users"></i><span slot="title">Gestión de usuarios</span>
        </template>
        <el-menu-item
          :route="{ path: '/managementUsers/users' }"
          index="/managementUsers/users"
        >
          usuarios
        </el-menu-item>
        <el-menu-item
          index="/managementUsers/pendingUsers"
          :route="{ path: '/managementUsers/pendingUsers' }"
        >
          Usuarios pendientes
        </el-menu-item>

      </el-submenu>
    </transition>

    <el-submenu index="3">
      <div slot="title">
        <i class="fas fa-layer-group"></i><span slot="title">Gestión de Capas</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementLayers/baseMap' }"
        index="/managementLayers/baseMap"
      >
        Mapas Base
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementLayers/layers' }"
        index="/managementLayers/layers"
      >
        Capas
      </el-menu-item>
      <el-menu-item
        index="/managementLayers/pendingLayers"
        :route="{ path: '/managementLayers/pendingLayers' }"
      >
        Capas pendientes
      </el-menu-item>
    </el-submenu>
    <el-submenu  index="4">
      <div slot="title">
        <i class="fas fa-database"></i><span slot="title">Gestión de Datos</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementLayers/layers' }"
        index="/managementLayers/layers"
      >
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item
        index="/managementLayers/pendingLayers"
        :route="{ path: '/managementLayers/pendingLayers' }"
      >
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-menu-item
      index="/WMSServices"
      :active="false"
      :route="{ path: '/WMSServices' }"
    >
      <i class="fas fa-users-cog"></i><span>Servicios</span>
    </el-menu-item>
    <el-menu-item
      :route="{ path: '/geovisor' }"
      index="/geovisor"
    >
      <i class="fas fa-globe"></i><span>Geoportal</span>
    </el-menu-item>
    <el-menu-item
      index="7"
      :active="false"
      @click="$auth.logout()"
      :route="{ path: '/' }"
    ><i class="fas fa-power-off"></i><span>Cerrar Sesión</span>
    </el-menu-item>
    <el-menu-item @click="isCollapse = !isCollapse">
      <i
        v-if="isCollapse"
        class="el-icon-d-arrow-right"
      />
      <i
        v-else
        class="el-icon-d-arrow-left"
      />
      <span>Ocultar</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
  },

  data () {
    return {
      isCollapse: false,
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    managementUser: function() {
      return this.$route.name === 'managementUsers-users' || this.$route.name === 'managementUsers-pendingUsers'
    }
  },

  methods: {
    ...mapActions({
      replaceShowPanelGeovisor: 'sidebar/replaceShowPanelGeovisor'
    })
  },
}
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
