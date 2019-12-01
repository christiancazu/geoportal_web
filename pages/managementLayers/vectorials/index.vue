<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      openModalEditItemContext,
      confirmedActionDeleteItemContext,
      shrinkText
    }"
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
          @confirmed-action="confirmedActionDeleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>
import BasePageActions from '@/pages/base/BasePageActions'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: BasePageActions,

  data () {
    return {
      pageHeader: {
        title: 'Capas vectoriales',
        btnAddName: 'Nueva capa vectorial'
      },
      // main modal settings
      modalMain: {
        storeBase: 'vectorialLayers',
        addComponent: 'ModalAddVectorialLayer',
        editComponent: 'ModalEditVectorialLayer',
        folderName: 'layers'
      },
      messageToast: {
        baseName: 'LAYER'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
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
