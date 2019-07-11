<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :router="true"
    :collapse="isCollapse"
  >
    <el-menu-item>
      <i class="el-icon-arrow-left font-weight-bold" />
      <span class="font-weight-bold">GEOVISOR UNAT</span>
    </el-menu-item>
    <el-divider />
    <el-submenu index="2">
      <div slot="title">
        <i class="material-icons">layers</i>
        <span slot="title">Capas</span>
      </div>
      <el-menu-item>
        Capas 1
      </el-menu-item>
      <el-menu-item>
        Capas pendientes
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <div slot="title">
        <i class="material-icons">
          location_searching
        </i>
        <span slot="title">Búsqueda por coordenadas</span>
      </div>
      <el-menu-item>
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item>
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <div slot="title">
        <i class="material-icons">
          find_replace
        </i>
        <span slot="title">Consultas</span>
      </div>
      <el-menu-item>
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item>
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <div slot="title">
        <i class="material-icons">
          edit
        </i>
        <span slot="title">Dibujos y Trazos</span>
      </div>
      <el-menu-item>
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item>
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <div slot="title">
        <i class="material-icons">
          timeline
        </i>
        <span slot="title">Reporte de Estadísticas</span>
      </div>
      <el-menu-item>
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item>
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <div slot="title">
        <i class="material-icons">
          cloud_upload
        </i>
        <span slot="title">Información Geográfica</span>
      </div>
      <el-menu-item>
        Copias de Seguridad
      </el-menu-item>
      <el-menu-item>
        Crear Copia de Seguridad
      </el-menu-item>
    </el-submenu>

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
