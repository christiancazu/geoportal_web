<template>
  <base-page :page-header-title="pageTitle">

    <template v-slot:page-header>
      <base-page-header 
        :modal-add-state-name="modalAddStateName"
        :btn-add-name="btnAddName"
      />
    </template>

    <template v-slot:page-body>
      <base-page-body-table
        :data-context="$_pageBodyTableMixin_filteredDataContext"
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
            width="120"
          >
            <template slot-scope="scope">
              <el-tooltip content="Editar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="$_pageBodyTableMixin_onLoadModalEditItemContext(scope.row)"
                />
              </el-tooltip>

              <el-tooltip content="Eliminar" placement="bottom">
                <el-button
                  edit
                  delete
                />
                <btn-confirm
                  :item-selected="scope.row"
                  @confirmed-action="$_pageBodyTableMixin_confirmedActionDeleteItemContext"
                  accion="deleted"
                  title="Eliminar Capa"
                  body-text="¿Está seguro de eliminar esta capa?"
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
      pageTitle: 'Capas vectoriales',
      btnAddName: 'Nueva capa vectorial',
      messageBaseName: 'LAYER',
      storeBase: 'vectorialLayers',
      modalAddStateName: 'modalAddLayer',
      modalEditStateName: 'modalEditLayer',
      filterCriteriaProps: ['title', 'name', 'description'],
    }
  },

  methods: {
    // # TODO fix data to send to endpoint
    async publishSelectedLayer ({ itemSelected }) {
      try {
        await this.publishVectorialLayer({ 
          data: {
            pk: itemSelected.id
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
