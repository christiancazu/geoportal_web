
<template>
<div class="sidebar-container">
  <el-menu
    background-color="whitesmoke"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    router
    :collapse="isCollapse"
    style="height:100%"
    unique-opened
    mode="vertical"
  >
    <el-menu-item
      v-if="user"
      index="1"
      :route="{ path: '/' }"
    >
      <el-image
        class="img-profile-sidebar"
        :src="user.image"
      />
      <span class="font-weight-bold">{{ user.username }}
        <el-badge
          type="warning"
          :value="user.userType.id === 'AD' ? 'ADMIN' : ''"
        /></span>
    </el-menu-item>

    <el-divider />
    <!-- eslint-disable-next-line -->
    <template
      v-for="(nav) in navs"
    >
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <el-menu-item
        v-if="!nav.items"
        :index="nav.route"
        :route="{ path: nav.route }"
      >
        <i :class="`fas fa-${nav.icon}`" />
        <span>{{ nav.label }}</span>
      </el-menu-item>

      <!-- eslint-disable-next-line -->
      <el-submenu
        v-else
        :index="nav.label"
      >
        <template slot="title">
          <i :class="`fas fa-${nav.icon}`" />
          <span slot="title">{{ nav.label }}</span>
        </template>
        <el-menu-item
          v-for="(item, menuIndex) in nav.items" :key="menuIndex"
          :index="item.route"
          :route="{ path: item.route }"
        >
          {{ item.label }}
        </el-menu-item>

      </el-submenu>

    </template>


    <el-menu-item
      index="7"
      :route="{ path: '/' }"
      @click="logout()"
    >
      <i class="fas fa-power-off" />
      <span>Cerrar Sesión</span>
    </el-menu-item>

    <el-divider />

    <el-menu-item
      @click="isCollapse = !isCollapse"
    >
      <i :class="`el-icon-d-arrow-${isCollapse ? 'right' : 'left'}`" />
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
      navs: [
        { label: 'Perfil', icon: 'user', route: '/profile' },
        {
          label: 'Gestión de usuarios',
          icon: 'users',
          items: [
            { label: 'Usuarios', route: '/managementUsers/users' },
            { label: 'Solicitudes pendientes', route: '/managementUsers/pending' },
            { label: 'Solicitudes rechazadas', route: '/managementUsers/rejected' }
          ]
        },
        {
          label: 'Gestión de Capas',
          icon: 'layer-group',
          items: [
            { label: 'Capas Vectoriales', route: '/managementLayers/vectorials' },
            { label: 'Capas Raster', route: '/managementLayers/rasters' },
            { label: 'Capas Base', route: '/managementLayers/bases' },
            { label: 'Grupo de Capas', route: '/managementLayers/groups' },
          ]
        },
        {
          label: 'Gestión de Datos',
          icon: 'database',
          items: [
            { label: 'Imágenes Georeferenciales', route: '/managementData/georeferencedImages' },
            { label: 'Imágenes Satelitales', route: '/managementData/satelitalsImages' },
            { label: 'Carpeta Temporal', route: '/managementData/temporalFolder' }
          ]
        },
        {
          label: 'Servicios WMS',
          icon: 'users-cog',
          items: [
            { label: 'Servicios', route: '/managementWMSServices/services' },
            { label: 'Autores', route: '/managementWMSServices/authors' },
            { label: 'Categorías', route: '/managementWMSServices/categories' }
          ]
        },
        { label: 'Reportes', icon: 'clipboard-list', route: '/reports' },
      ]
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  },

  watch: {
    isCollapse (newState) {
      this.$emit('is-collapse', newState)
    }
  },

  methods: {
    async logout () {
      await this.$auth.logout()
      this.$toast.success(this.$SUCCESS.LOGOUT)
      this.$router.push({ to: '/login' })
    }
  },
}
</script>
