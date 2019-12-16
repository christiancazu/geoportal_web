<template>
<base-page-actions
  :page-header="pageHeader"
  :modal="modal"
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
          @confirmed-action="confirmedActionDeleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>
import BasePageActionsParent from '@/components/base/parents/BasePageActionsParent'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: BasePageActionsParent,

  data () {
    return {
      pageHeader: {
        title: 'Autores de servicios WMS',
        btnAddName: 'Nuevo autor WMS'
      },
      // main modal settings
      modal: {
        folderRoot: 'components',
        folderName: 'WMSServices',
        store: 'WMSAuthors',
        addComponent: 'AddAuthor',
        editComponent: 'EditAuthor'
      },
      messageToast: {
        baseName: 'AUTHOR'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
        'name',
        'webUrl',
        'description'
      ]
    }
  },

  mounted () {
    console.warn('author mounted')
  },

  head: {
    title: 'AUTORES WMS | GEOVISOR'
  }
}
</script>
