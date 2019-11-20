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
    <el-menu-item
      v-if="user"
      index="/"
      :route="{ path: '/' }"
    >
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
      <i class="fas fa-user" />
      <span>Perfil</span>
    </el-menu-item>
    <!-- <el-divider /> -->
    <el-submenu
      index="2"
      active-text-color="#7f5ae7"
    >
      <template slot="title">
        <i class="fas fa-users" /><span slot="title">Gestión de usuarios</span>
      </template>
      <el-menu-item
        index="/managementUsers/users"
        :route="{ path: '/managementUsers/users' }"
      >
        Usuarios
      </el-menu-item>
      <el-menu-item
        index="/managementUsers/pending"
        :route="{ path: '/managementUsers/pending' }"
      >
        Solicitudes pendientes
      </el-menu-item>
      <el-menu-item
        index="/managementUsers/rejected"
        :route="{ path: '/managementUsers/rejected' }"
      >
        Solicitudes rechazadas
      </el-menu-item>
    </el-submenu>
    <!-- <el-divider /> -->
    <el-submenu index="3">
      <div slot="title">
        <i class="fas fa-layer-group" /><span slot="title">Gestión de Capas</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementLayers/vectorials' }"
        index="/managementLayers/vectorials"
      >
        Capas Vectoriales
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementLayers/rasters' }"
        index="/managementLayers/rasters"
      >
        Capas Raster
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementLayers/bases' }"
        index="/managementLayers/bases"
      >
        Capas Base
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementLayers/groups' }"
        index="/managementLayers/groups"
      >
        Grupo de Capas
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <div slot="title">
        <i class="fas fa-database" /><span slot="title">Gestión de Datos</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementData/georeferencedImages' }"
        index="/managementData/georeferencedImages"
      >
        Imágenes Georeferenciales
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementData/satelitalsImages' }"
        index="/managementData/satelitalsImages"
      >
        Imágenes Satelitales
      </el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <div slot="title">
        <i class="fas fa-users-cog" /><span slot="title">Servicios WMS</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementWMSServices/services' }"
        index="/WMSServices/services"
      >
        Servicios
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementWMSServices/authors' }"
        index="/WMSServices/authors"
      >
        Autores
      </el-menu-item>
      <el-menu-item
        :route="{ path: '/managementWMSServices/categories' }"
        index="/WMSServices/categories"
      >
        Categorías
      </el-menu-item>
    </el-submenu>

    <el-menu-item
      index="/reports"
      :active="false"
      :route="{ path: '/reports' }"
    >
      <i class="fas fa-clipboard-list" /><span>Reportes</span>
    </el-menu-item>
    <el-menu-item
      index="7"
      :active="false"
      :route="{ path: '/' }"
      @click="$auth.logout()"
    ><i class="fas fa-power-off" /><span>Cerrar Sesión</span>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  },

  watch: {
    isCollapse: function (newState, /*oldState*/) {
      this.$emit('is-collapse', newState)
    }
  },

}
</script>