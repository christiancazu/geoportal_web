<template>
<base-page
  :page-header="pageHeader"
>
  <!-- <template v-slot:itemsActions>
    </template> -->
  <el-container
    direction="vertical"
    class="card-dashboard"
  >
    <el-row
      :gutter="14"
      class="btn-admin"
    >
      <!-- panel items -->
      <el-col
        v-for="(item, i) in items" :key="i"
        :xs="24" :sm="12" :md="6" :lg="6"
        class="my-2"
      >
        <nuxt-link
          type="primary"
          class="w-100"
          :to="item.link"
        >
          <el-card
            shadow="hover"
            class="card-dashboard"
          >
            <i
              :class="`my-2 fas fa-${item.icon}`"
              style="font-size: 1.5rem !important"
            />
            <p class="my-2 mb-0">{{ item.title }}</p>
          </el-card>
        </nuxt-link>
      </el-col>
    </el-row>
  </el-container>
</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'

export default {
  components: {
    BasePage
  },

  data () {
    return {
      pageHeader: {
        title: 'PORTAL ADMINISTRADOR'
      },

      items: [
        { title: 'Perfil', link: '/profile', icon: 'user' },
        { title: 'Solicitudes pendientes', link: '/managementUsers/pending', icon: 'users' },
        { title: 'Capas Vectoriales', link: '/managementLayers/vectorials', icon: 'layer-group' },
        { title: 'Capas Raster', link: '/managementLayers/rasters', icon: 'layer-group' },
        { title: 'Datos', link: '/managementData/georeferencedImages', icon: 'database' },
        { title: 'Reportes', link: '/reports', icon: 'clipboard-list' },
        { title: 'Servicios', link: '/managementWMSServices/services', icon: 'users-cog' },
        // { title: 'Ver Solicitudes pendientes', link: '/managementUsers/pendingUsers', icon: '' },
        // { title: 'Capas Base', link: '/managementLayers/baseLayers', icon: 'layer-group' },
        // { title: 'Ver Capas rastes', link: '/managementLayers/rasterLayer', icon: 'layer-group' }
      ]
    }
  },

  head: {
    title: 'Inicio',
  }
}
</script>

<style lang="scss">
.btn-admin {
  .el-link--inner {
    width: 100%;
  }
}
.card-dashboard {
  .el-card {
    min-height: 82px;
    display: flex;
    align-items: center;
  }
  a {
    text-decoration: none;
  }
}
</style>
