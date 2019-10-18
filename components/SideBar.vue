<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      :collapse="isCollapse"
      style="height:100%"
      unique-opened
      mode="vertical"
    >
      <el-menu-item v-if="user">
        <img
          :src="user.image"
          alt=""
          style="height:35px;"
        >
        <span class="font-weight-bold">{{ user.username }}
          <el-badge
            class="mark"
            :value="user.userType.id === 'AD' ? 'ADMIN' : ''"
          /></span>
      </el-menu-item>
      <el-divider />
      <el-menu-item
        index="/profile"
        :route="{ path: '/profile' }"
      >
        <i class="fas fa-user"></i>
        <span>Perfil</span>
      </el-menu-item>
      <!-- <el-divider /> -->
      <el-submenu
        index="2"
        active-text-color="#7f5ae7"
        activeTextColor="#7f5ae7"
      >
        <template slot="title">
          <i class="fas fa-users"></i><span slot="title">Gestión de usuarios</span>
        </template>
        <el-menu-item
          :route="{ path: '/managementUsers/users' }"
          index="/managementUsers/users"
        >
          Usuarios
        </el-menu-item>
        <el-menu-item
          index="/managementUsers/pendingUsers"
          :route="{ path: '/managementUsers/pendingUsers' }"
        >
          Solicitudes pendientes
        </el-menu-item>
        <el-menu-item
          index="/managementUsers/rejectedUsers"
          :route="{ path: '/managementUsers/rejectedUsers' }"
        >
          Solicitudes rechazadas
        </el-menu-item>
      </el-submenu>
      <!-- <el-divider /> -->
      <el-submenu index="3">
        <div slot="title">
          <i class="fas fa-layer-group"></i><span slot="title">Gestión de Capas</span>
        </div>
        <el-menu-item
          :route="{ path: '/managementLayers/layers' }"
          index="/managementLayers/layers"
        >
          Capas Vectoriales
        </el-menu-item>
        <el-menu-item
          :route="{ path: '/managementLayers/rasterLayer' }"
          index="/managementLayers/rasterLayer"
        >
          Capas Raster
        </el-menu-item>
        <el-menu-item
          :route="{ path: '/managementLayers/baseLayers' }"
          index="/managementLayers/baseLayers"
        >
          Capas Base
        </el-menu-item>
        <el-menu-item
          :route="{ path: '/managementLayers/groupLayer' }"
          index="/managementLayers/groupLayer"
        >
          Grupo de Capas
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <div slot="title">
          <i class="fas fa-database"></i><span slot="title">Gestión de Datos</span>
        </div>
        <el-menu-item
          :route="{ path: '/managementData/georeferencedImages' }"
          index="/managementData/georeferencedImages"
        >
          Imágenes Georeferenciales
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        index="/WMSServices"
        :active="false"
        :route="{ path: '/WMSServices' }"
      >
        <i class="fas fa-users-cog"></i><span>Servicios WMS</span>
      </el-menu-item>
      <el-menu-item
        index="/reports"
        :active="false"
        :route="{ path: '/reports' }"
      >
        <i class="fas fa-clipboard-list"></i><span>Reportes</span>
      </el-menu-item>
      <el-menu-item
        index="7"
        :active="false"
        @click="$auth.logout()"
        :route="{ path: '/' }"
      ><i class="fas fa-power-off"></i><span>Cerrar Sesión</span>
      </el-menu-item>
      <el-divider />
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
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
    }
  },

  watch: {
    isCollapse: function (newState, oldState) {
      this.$emit('is-collapse', newState)
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  }
}
</script>