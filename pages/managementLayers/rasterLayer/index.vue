<template>
  <base-page-actions 
    :page-header="pageHeader"
    :modal-main="modalMain"
    :filter-criteria-props="filterCriteriaProps"
    :messageToast="messageToast"
  >
    <template v-slot:page-table="{ 
      openModalEditItemContext,
      confirmedActionDeleteItemContext,
      shrinkText
    }">
      <el-table-column
        label="Nombre"
        prop="name"
      />
      <el-table-column
        label="Título"
        prop="title"
      />
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
          <group-actions-buttons
            :item-selected="scope.row"
            dialog-delete-title="Eliminar Capa Raster"
            dialog-delete-body-text="¿Está seguro de eliminar esta capa?"
            @open-edit-modal="openModalEditItemContext(scope.row)"
            @confirmed-action="confirmedActionDeleteItemContext"
          />
        </template>
      </el-table-column>
    </template>
  </base-page-actions>
</template>

<script>
import pageActionsMixin from '@/mixins/pageActionsMixin'
import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
   components: {
    GroupActionsButtons
  },

  mixins: [pageActionsMixin],

  head: {
    title: 'Capas raster | GEOVISOR',
  },

  data () {
    return {
      pageHeader: {
        title: 'Capas raster',
        btnAddName: 'Nueva capa raster'
      },
      // main modal settings
      modalMain: {
        storeBase: 'rasterLayers',
        addComponent: 'ModalAddRasterLayer',
        editComponent: 'ModalEditRasterLayer',
        folderName: 'layers',
      },
      messageToast: {
        baseName: 'LAYER'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: ['title', 'name'],
    }
  }
}
</script>
