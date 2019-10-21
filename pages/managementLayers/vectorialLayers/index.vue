<template>
  <BasePage title="Capas vectoriales">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$_modalVisibilityMixin_open('modalAddLayer')"
      >
        Nueva Capa
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
            :xs="24" :sm="12" :md="8"
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
          v-loading="$store.state.spinners.loadingTable"
        >
          <el-table-column
            label="N°"
            align="center"
            width="50px"
            prop="order"
          />
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Título"
            prop="title"
          />
          <el-table-column
            label="Descripción"
            prop="description"
          >
          <template slot-scope="scope">
            <span v-html="$options.filters.shrinkText(scope.row.description)"></span>
          </template>
          </el-table-column>
          <el-table-column
            label="Publicado"
            prop="publicado"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isPublished ? 'success' : 'info'"
                effect="plain">
                {{ scope.row.isPublished ? 'si' : 'no' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="Acción"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <el-tooltip content="Editar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="onLoadModalEditLayer(scope.row)"
                />
              </el-tooltip>

              <el-tooltip content="Eliminar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-delete"
                  size="small"
                  type="danger"
                  @click="onLoadModalDeleteLayer(scope.row)"
                />
                <btn-confirm
                  :item-selected="scope.row"
                  @confirmed-action="deleteSelectedLayer"
                  accion="deleted"
                  title="Eliminar Capa"
                  body-text="¿Está seguro de eliminar esta capa?"
                />                
              </el-tooltip>

              <el-tooltip content="Publicar" placement="bottom">
                <el-button
                  circle
                  icon="shared"
                  size="small"
                  type="accepted"
                />
               <btn-confirm
                  :item-selected="scope.row"
                  :disabled="scope.row.isPublished"
                  @confirmed-action="publishSelectedLayer"
                  accion="shared"
                  title="Publicar Capa"
                  body-text="¿Está seguro de publicar esta capa?"
                />
              </el-tooltip>

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

      <modal-add-layer />
      
      <modal-edit-layer />
    
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage'
import ModalAddLayer from '@/components/layers/ModalAddLayer'
import ModalEditLayer from '@/components/layers/ModalEditLayer'
import BtnConfirm from "@/components/base/BaseBtnConfirm";

export default {
  components: {
    BasePage,
    ModalAddLayer,
    ModalEditLayer,
    BtnConfirm
  },
  head: {
    title: 'Capas vectoriales | GEOVISOR',
  },

  filters: {
    shrinkText (text) {
      return text.length > 16 ? `${text.substring(0, 16)} <i class="fas fa-ellipsis-h"></i>` : text
    }
  },

  data () {
    return {
      val: true,
      search: '',
      pagesize: 10,
      currentPage: 1
      
    }
  },

  computed: {
    ...mapState({
      layers: state => state.vectorialLayers.layers,
      currentLayer: state => state.vectorialLayers.currentLayer
    }),

    filteredData () {
      let search = this.search.toString().toLowerCase()
      let layers = this.$store.state.vectorialLayers.layers
      this.currentPage = 1

      return layers.filter(item => {
        // checking title
        if (item.title && item.title.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking description
        if (item.description && item.description.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    },
  },

  created () {
    this.fetchVectorialLayers()
  },

  methods: {
    ...mapActions({
      replaceCurrentLayer: 'vectorialLayers/replaceCurrentLayer',
      getVectorialLayers: 'vectorialLayers/getVectorialLayers',
      getVectorialLayer: 'vectorialLayers/getVectorialLayer',
      publishVectorialLayer: 'vectorialLayers/publishVectorialLayer',
      deleteVectorialLayer: 'vectorialLayers/deleteVectorialLayer'
    }),

    async fetchVectorialLayers () {
      try {
        await this.getVectorialLayers()
        currentFilteredData
      } 
      catch (e) {}
    },

    async onLoadModalEditLayer (item) {
      try {
        await this.getVectorialLayer({ id: item.id })
        this.$_modalVisibilityMixin_open('modalEditLayer')
      } 
      catch (e) {}
    },

    async onLoadModalDeleteLayer (item) {
      try {
        await this.getVectorialLayer({ id: item.id })      
      } 
      catch (e) {}
    },

    async deleteSelectedLayer (item) {
      try {
        await this.deleteVectorialLayer({ id: item.itemSelected.id })
        this.$toast.success(this.$SUCCESS.LAYER.DELETED)

        await this.getVectorialLayers()
      } 
      catch (e) {}
    },

    // # TODO fix data to send to endpoint
    async publishSelectedLayer (item) {
      try {
        await this.publishVectorialLayer({ 
          data: {
            pk: item.itemSelected.id
          } 
        })
        this.$toast.success(this.$SUCCESS.LAYER.PUBLISHED)

        await this.getVectorialLayers()
      } 
      catch (e) {}
    },

    // pagination 
    onChangeCurrentPage (currentPage) {
      this.currentPage = currentPage;
    },

    onChangePageSize (pagesize) {
      this.pagesize = pagesize;
    },
  }
}
</script>

<style scoped>
.el-tag--dark {
  font-size: 1rem !important;
}
</style>