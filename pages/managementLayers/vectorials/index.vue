<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      openModalEditItemContext,
      deleteItemContext,
      shrinkText
    }"
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
      label="Descripción"
      prop="description"
    >
      <template slot-scope="scope">
        <span>{{ shrinkText(scope.row.description) }}</span>
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
          effect="plain"
        >
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
          dialog-delete-title="Eliminar Capa Vectorial"
          dialog-delete-body-text="¿Está seguro de eliminar esta capa?"
          @open-edit-modal="openModalEditItemContext(scope.row)"
          @confirmed-action="deleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: PageActionsSetup,

  data () {
    return {
      /** PAGE ACTIONS COMPONENT SETTINGS */
      pageHeader: {
        title: 'Capas vectoriales',
        btnAddName: 'Nueva capa vectorial'
      },
      storeBase: {
        name: 'vectorialLayers'
      },
      modalMain: { // main modal settings
        addComponent: {
          type: 'component',
          folderPath: 'layers',
          name: 'AddVectorial'
        },
        editComponent: {
          type: 'component',
          folderPath: 'layers',
          name: 'EditVectorial'
        }
      },
      messageToast: {
        baseName: 'LAYER'
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'title',
        'name',
        'description'
      ]
    }
  },

  head: {
    title: 'Capas vectoriales | GEOVISOR'
  }
}
</script>
