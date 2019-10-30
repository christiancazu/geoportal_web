<template>
  <base-page-actions 
    :page-header-title="pageHeaderTitle"
    :page-header-btn-add-name="pageHeaderBtnAddName"
    :store-base="storeBase"
    :modal-add-state-name="modalAddStateName"
    :modal-edit-state-name="modalEditStateName"
    :filter-criteria-props="filterCriteriaProps"
    :page-modals-folder-name="pageModalsFolderName"
    :message-base-name="messageBaseName"
  >
    <template v-slot:page-table="{ 
      openModalEditItemContext,
      confirmedActionDeleteItemContext,
      shrinkText
    }">

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
          <span v-html="shrinkText(scope.row.description)"></span>
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
              @click="openModalEditItemContext(scope.row)"
            />
          </el-tooltip>

          <el-tooltip content="Eliminar" placement="bottom">
            <el-button
              edit
              delete
            />
            <base-btn-confirm
              :item-selected="scope.row"
              @confirmed-action="confirmedActionDeleteItemContext"
              accion="deleted"
              title="Eliminar Capa"
              body-text="¿Está seguro de eliminar esta capa?"
            />                
          </el-tooltip>
        </template>
      </el-table-column>
    </template>
  </base-page-actions>
</template>

<script>
import pageActionsMixin from '@/mixins/pageActionsMixin'

export default {
  mixins: [pageActionsMixin],
  
  head: {
    title: 'Capas vectoriales | GEOVISOR',
  },

  data () {
    return {
      //page-header
      pageHeaderTitle: 'Capas vectoriales',
      pageHeaderBtnAddName: 'Nueva capa vectorial',
      // toast
      messageBaseName: 'LAYER',
      // store module
      storeBase: 'vectorialLayers',
      modalAddStateName: 'modalAddVectorialLayer',
      modalEditStateName: 'modalEditVectorialLayer',
      // criterias to search based on columns of table
      filterCriteriaProps: ['title', 'name', 'description'],
      // current page modals folder name
      pageModalsFolderName: 'layers'
    }
  }
}
</script>
