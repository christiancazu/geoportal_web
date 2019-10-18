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
          v-loading="loadingLayers"
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
            label="Nombre style"
            prop="description"
          />
          <el-table-column
            label="Acción"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-tooltip content="Editar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="onLoadModalEditLayer(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="Eliminar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-delete"
                  size="small"
                  type="danger"
                  @click="onLoadModalDeleteLayer(scope.$index, scope.row)"
                />

                <btn-confirm
                  :item-selected="scope.row"
                  @confirmed-action="deleteSelectedLayer"
                  accion="deleted"
                  title="¿Eliminar Capa?"
                  body-text="¿Esta seguro de continuar con la operación?"
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
import BasePage from '@/components/base/BasePage.vue'
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
  data () {
    return {
      search: '',
      pagesize: 10,
      currentPage: 1
    }
  },

  computed: {
    ...mapState({
      layers: state => state.layers.layers,
      loadingLayers: state => state.layers.loadingLayers,
      currentLayer: state => state.layers.currentLayer
    }),

    filteredData () {
      let search = this.search.toString().toLowerCase()
      let layers = this.$store.state.layers.layers
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
    this.getLayers()
  },

  methods: {
    ...mapActions({
      replaceCurrentLayer: 'layers/replaceCurrentLayer',
      getLayers: 'layers/getLayers',
      getLayer: 'layers/getLayer',
      deleteLayer: 'layers/deleteLayer'
    }),

    async onLoadModalEditLayer (index, item) {
      try {
        // #TODO: spinner onRequest
        await this.getLayer({ id: item.id })
        this.$_modalVisibilityMixin_open('modalEditLayer')
      
      } catch (error) {
        const errorMessage = typeof error.response !== 'undefined' ? error.response.data : this.$ERRORS.ERROR_TRY_LATER
        this.$toast.error(errorMessage)

      } finally {
        // #TODO: spinner offRequest
      }
    },

    async onLoadModalDeleteLayer (index, item) {
      try {
        // #TODO: spinner onRequest
        await this.getLayer({ id: item.id })
        // this.$_modalVisibilityMixin_open('modalDeleteLayer')
      
      } catch (error) {
        const errorMessage = typeof error.response !== 'undefined' ? error.response.data : this.$ERRORS.ERROR_TRY_LATER
        this.$toast.error(errorMessage)

      } finally {
        // #TODO: spinner offRequest
      }
    },

    async deleteSelectedLayer(item) {
      try {
        // #TODO: spinner onRequest
        await this.deleteLayer({ id: item.itemSelected.id })
        this.$toast.success(this.$SUCCESS.LAYER.DELETED)

        await this.getLayers()

      } catch (error) {
        const errorMessage = typeof error.response !== 'undefined' ? error.response.data : this.$ERRORS.ERROR_TRY_LATER
        this.$toast.error(errorMessage)

      } finally {
        // #TODO: spinner offRequest
      }
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
