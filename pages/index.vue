<template>
  <BasePage title="PORTAL ADMINISTRADOR">
    <!-- <template v-slot:itemsActions>
    </template> -->
    <template v-slot:content>
      <el-container direction="vertical">
        <el-row
          :gutter="14"
          class="btn-admin"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/managementUsers/users"
            >
              <el-card shadow="hover">
                <p class="ma-0"> Ver usuarios </p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/managementUsers/layers"
            >
              <el-card shadow="hover">
                <p class="ma-0">Ver capas</p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/managementData/georeferentialImages"
            >
              <el-card shadow="hover ">
                <p class="ma-0">Ver Imagenes Georeferenciadas</p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100 p"
              href="/managementData/georeferentialImages"
            >
              <el-card shadow="hover">
                <p class="ma-0"> Ver Reportes </p>
              </el-card>
            </el-link>
          </el-col>
        </el-row>
        <el-row
          :gutter="14"
          class="btn-admin"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/WMSServices"
            >
              <el-card shadow="hover">
                <p class="ma-0"> Ver Servicios </p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/managementUsers/pendingUsers"
            >
              <el-card shadow="hover">
                <p class="ma-0">Ver Solicitudes pendientes</p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100"
              href="/managementLayers/baseMap"
            >
              <el-card shadow="hover ">
                <p class="ma-0">Capas Base</p>
              </el-card>
            </el-link>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="6"
            :lg="6"
            class="my-2"
          >
            <el-link
              type="primary"
              class="w-100 p"
              href="/managementLayers/rasterLayer"
            >
              <el-card shadow="hover">
                <p class="ma-0"> Ver Capas rastes </p>
              </el-card>
            </el-link>
          </el-col>
        </el-row>
      </el-container>
    </template>
  </BasePage>
</template>

<script>
import BasePage from '@/components/base/BasePage.vue'

export default {
  components: {
    BasePage
  },
  head: {
    title: 'Inicio',
  }
};
</script>

<style lang="scss">
.btn-admin {
  .el-link--inner {
    width: 100%;
  }
}
</style>
