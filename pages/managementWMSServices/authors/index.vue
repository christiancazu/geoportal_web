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
      label="URL"
      prop="webUrl"
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
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <group-actions-buttons
          :item-selected="scope.row"
          dialog-delete-title="Eliminar autor"
          dialog-delete-body-text="¿Está seguro de eliminar este autor?"
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
        title: 'Autores de servicios WMS',
        btnAddName: 'Nuevo autor WMS'
      },
      storeBase: {
        name: 'WMSAuthors'
      },
      modalMain: { // main modal settings
        addComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'AddAuthor'
        },
        editComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'EditAuthor'
        }
      },
      messageToast: {
        baseName: 'AUTHOR'
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'name',
        'webUrl',
        'description'
      ]
    }
  },

  head: {
    title: 'Autores WMS | GEOVISOR'
  }
}
</script>
