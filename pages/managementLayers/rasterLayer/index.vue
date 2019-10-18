<template>
  <BasePage title="Capas Raster">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$_modalVisibilityMixin_open('modalAddRasterLayer')"
      >
        Nueva capa raster
      </el-button>
    </template>
    <template v-slot:content>
      <el-container direction="vertical">
        <el-row
          type="flex"
          justify="end"
          :gutter="10"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
          >
            <div>
              <el-input
                v-model="search"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="Buscar..."
                clearable
              />
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="filteredData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          v-loading="loadingRasterLayers"
        >
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Título"
            prop="title"
          />
          <el-table-column
            label="¿Publicado?"
            prop="status"
          >
            <template slot-scope="scope">
              <el-switch
                disabled
                v-model="scope.row.status"
                :active-text="scope.row.status? 'Si' :'No'"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="Acción"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-edit"
                size="small"
                type="primary"
                @click="onLoadModalEditRasterLayer(scope.$index, scope.row)"
              />
              <el-button
                circle
                icon="el-icon-edit"
                size="small"
                :disabled="scope.row.status"
                type="primary"
                @click="onLoadModalPublishRasterLayer(scope.$index, scope.row)"
              />
              <btn-confirm
                :item-selected="scope.row"
                @confirmed-action="deleteSelectedRasterLayer"
                accion="deleted"
                title="¿Eliminar Capa Raster?"
                body-text="¿Esta seguro de continuar con la operación?"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          class="pt-4 text-xs-right"
          :pager-size="100"
          :page-size="pagesize"
          layout="prev, pager, next, sizes"
          :total="filteredData.length"
          :current-page="currentPage"
          @current-change="onChangeCurrentPage"
          @size-change="onChangePageSize"
        />
      </el-container>
    </template>
    <template v-slot:modals>
      <ModalPublishRasterLayer />
      <ModalAddRasterLayer />
      <ModalEditRasterLayer />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import ModalPublishRasterLayer from '@/components/layers/ModalPublishRasterLayer.vue'
import ModalAddRasterLayer from '@/components/layers/ModalAddRasterLayer.vue'
import ModalEditRasterLayer from '@/components/layers/ModalEditRasterLayer.vue'
export default {
  components: {
    BasePage,
    ModalPublishRasterLayer,
    ModalAddRasterLayer,
    ModalEditRasterLayer
  },
  head: {
    title: 'Capas raster | GEOVISOR',
  },
  data () {
    return {
      search: "",
      pagesize: 10,
      currentPage: 1
    };
  },

  computed: {
    ...mapState({
      loadingRasterLayers: state => state.rasterLayers.loadingRasterLayers
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let rasterLayers = this.$store.state.rasterLayers.rasterLayers
      this.currentPage = 1
      return rasterLayers.filter(item => {
        // checking title
        if (item.title && item.title.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
      });
    }
  },

  created () {
    this.getRasterLayers();
  },

  methods: {
    ...mapActions({
      replaceCurrentRasterLayer: 'rasterLayers/replaceCurrentRasterLayer',
      getRasterLayers: 'rasterLayers/getRasterLayers',
    }),

    onLoadModalPublishRasterLayer (index, item) {
      this.replaceCurrentRasterLayer({ rasterLayer: item })
      this.$_modalVisibilityMixin_open('modalPublishRasterLayer')
    },

    onLoadModalEditRasterLayer: function (index, groupLayer) {
      this.replaceCurrentRasterLayer({ rasterLayer: item })
      this.$_modalVisibilityMixin_open('modalEditRasterLayer')
    },

    deleteSelectedRasterLayer: function (item) {
      new Promise((resolve, reject) => {
        this.$rasterLayerAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getRasterLayers()
          }).catch(error => reject(error))
      })
    },

    // pagination 
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage;
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize;
    },
  }
}
</script>
