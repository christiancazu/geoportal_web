<template>
<page-actions
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
      label="Nombre"
      prop="name"
    />
    <el-table-column
      label="Autor"
      prop="author"
    />
    <el-table-column
      label="URL"
      prop="url"
    >
      <template slot-scope="scope">
        <span>{{ shrinkText(scope.row.description) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      align="center"
    >
      <template slot="header">
        <p class="ma-0">Zoom</p>
        <small>[min, max]</small>
      </template>
      <template slot-scope="scope">{{ `[${scope.row.minZoom} - ${scope.row.maxZoom}]` }}</template>
    </el-table-column>
    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">

        <group-actions-buttons
          :item-selected="scope.row"
          dialog-delete-title="Eliminar Mapa Base"
          dialog-delete-body-text="¿Está seguro de eliminar este mapa base?"
          @open-edit-modal="openModalEditItemContext(scope.row)"
          @confirmed-action="confirmedActionDeleteItemContext"
        />

      </template>
    </el-table-column>
  </template>
</page-actions>
</template>

<script>
import PageActionsParent from '@/components/base/parents/PageActionsParent'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: PageActionsParent,

  data () {
    return {
      pageHeader: {
        title: 'Capas base',
        btnAddName: 'Nuevo Mapa Base'
      },
      // main modal settings
      modalMain: {
        storeBase: 'baseLayers',
        addComponent: 'AddBase',
        editComponent: 'EditBase',
        folderName: 'layers'
      },
      messageToast: {
        baseName: 'LAYER'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
        'name',
        'author',
        'url'
      ]
    }
  },

  head: {
    title: 'Capas base | GEOVISOR'
  }
}
</script>
