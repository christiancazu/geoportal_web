<template>
  <base-page page-header-title="Capas vectoriales">

    <template v-slot:page-header>
      <base-page-header 
        modal-add-state-name="modalAddLayer"
        btn-name="Nueva Capa"
      />
    </template>

    <template v-slot:page-body>
      <base-page-body-table
        :data-context="$_pageBodyTableMixin_filteredData"
        @text-to-search="pageBodyTableMixin_textToSearch = $event"
      >
        <template v-slot:table>
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
            <span v-html="$options.filters.$_pageBodyTableMixin_shrinkText(scope.row.description)"></span>
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
                  edit
                  delete
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
        </template>
      </base-page-body-table>
    </template>

    <template v-slot:page-modals>

      <modal-add-layer />
      
      <modal-edit-layer />
    
    </template>

  </base-page>
</template>

<script>
import ModalAddLayer from '@/components/layers/ModalAddLayer'
import ModalEditLayer from '@/components/layers/ModalEditLayer'

import pageBodyTableMixin from '@/mixins/pageBodyTableMixin'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ModalAddLayer,
    ModalEditLayer
  },

  mixins: [pageBodyTableMixin],
  
  head: {
    title: 'Capas vectoriales | GEOVISOR',
  },

  data () {
    return {
      storeBase: 'vectorialLayers',
      criteriaProps: ['title', 'name', 'description'],
    }
  },

  methods: {
    ...mapActions({
      replaceCurrentLayer: 'vectorialLayers/replaceCurrentLayer',
      getVectorialLayer: 'vectorialLayers/getVectorialLayer',
      publishVectorialLayer: 'vectorialLayers/publishVectorialLayer',
      deleteVectorialLayer: 'vectorialLayers/deleteVectorialLayer',
    }),

    async onLoadModalEditLayer (item) {
      try {
        await this.getItemContext(item.id)
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
            'pk': item.itemSelected.id
          } 
        })
        this.$toast.success(this.$SUCCESS.LAYER.PUBLISHED)

        await this.getVectorialLayers()
      } 
      catch (e) {}
    }
  }
}
</script>

<style scoped>
.el-tag--dark {
  font-size: 1rem !important;
}
</style>