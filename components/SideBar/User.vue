<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo height-100"
    :router="true"
    :collapse="isCollapse"
  >
    <el-menu-item>
      <img
        src="/img/unat.jpg"
        alt=""
        style="height:35px;"
      >
      <span class="font-weight-bold">Carol <em style="font-size:12px; font-weight: 200;"> (Admin) </em></span>
    </el-menu-item>
    <el-divider />
    <el-menu-item
      index="1"
      :route="{ path: '/profile' }"
    >
      <i class="el-icon-user-solid" />
      <span>Perfil</span>
    </el-menu-item>
    <el-submenu index="2">
      <div slot="title">
        <i class="material-icons">
          supervised_user_circle
        </i>
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
        <i class="material-icons">layers</i>
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
    <el-submenu index="4">
      <div slot="title">
        <i class="material-icons">
          streetview
        </i>
        <span slot="title">Gestión de Datos</span>
      </div>
      <el-menu-item
        :route="{ path: '/managementLayers/layers' }"
        index="3-1"
      >
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item
        index="3-2"
        :route="{ path: '/managementLayers/pendingLayers' }"
      >
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-menu-item
      :route="{ path: '/geovisor' }"
      index="4"
    >
      <i class="material-icons">
        public
      </i>
      <span>Geoportal</span>
    </el-menu-item>
    <el-menu-item
      index="5"
      :route="{ path: '/report' }"
    >
      <i class="material-icons">
        info
      </i>
      <span>Reportar</span>
    </el-menu-item>
    <el-menu-item
      index="6"
      :route="{ path: '/' }"
    >
      <i class="material-icons">
        power_settings_new
      </i>
      <span>Cerrar Sesión</span>
    </el-menu-item>
    <el-menu-item
      @click="isCollapse = !isCollapse"
      class="menu-item-absoluted-b"
    >
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
export default {
  data () {
    return {
      isCollapse: false,
    }
  },
}
</script>
