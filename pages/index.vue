<template>
<base-page
  :page-header-title="pageHeaderTitle"
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
          <el-card shadow="hover">
            <p class="ma-0">{{ item.title }}</p>
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
      pageHeaderTitle: 'PORTAL ADMINISTRADOR',
      items: [
        { title: 'Ver usuarios', link: '/managementUsers/users' },
        { title: 'Ver capas', link: '/managementUsers/layers' },
        { title: 'Ver Imágenes Georeferenciadas', link: '/managementData/georeferencedImages' },
        { title: 'Ver Reportes', link: '/managementData/georeferencedImages' },
        { title: 'Ver Servicios', link: '/WMSServices' },
        { title: 'Ver Solicitudes pendientes', link: '/managementUsers/pendingUsers' },
        { title: 'Capas Base', link: '/managementLayers/baseLayers' },
        { title: 'Ver Capas rastes', link: '/managementLayers/rasterLayer' }
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
