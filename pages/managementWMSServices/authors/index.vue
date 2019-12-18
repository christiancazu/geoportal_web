<template>
<base-page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      openModalEdit,
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
          @open-edit-modal="openModalEdit(scope.row)"
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

  props: {
    mountedAs: {
      type: String,
      default: 'view'
    },
  },

  data () {
    return {
      pageHeader: {
        title: 'Autores de servicios WMS',
        btnAddName: 'Nuevo autor WMS'
      },
      storeBase: {
        name: 'WMSAuthors'
      },
      // main modal settings
      modalMain: {
        addComponent: {
          type: 'page',
          folderPath: 'managementWMSServices/categories',
          name: 'index',
          store: 'WMSAuthors'
        },
        editComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'EditAuthor',
          store: 'WMSAuthors'
        }
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

  head: {
    title: 'AUTORES WMS | GEOVISOR'
  }
}
</script>
