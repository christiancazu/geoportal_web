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
      label="URL"
      prop="url"
    />
    <el-table-column
      label="Nombre"
      prop="name"
    />
    <el-table-column
      label="Categoría"
      prop="category.name"
    />
    <el-table-column
      label="Autor"
      prop="author.name"
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
      label="Habilitado"
      prop="habilitado"
      align="center"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.isEnabled ? 'success' : 'info'"
          effect="plain"
        >
          {{ scope.row.isEnabled ? 'si' : 'no' }}
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
          dialog-delete-title="Eliminar servicio"
          dialog-delete-body-text="¿Está seguro de eliminar este servicio?"
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
        title: 'Servicios externos WMS',
        btnAddName: 'Nuevo servicio WMS'
      },
      storeBase: {
        name: 'WMSServices'
      },
      modalMain: { // main modal settings
        addComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'AddService'
        },
        editComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'EditService'
        }
      },
      messageToast: {
        baseName: 'SERVICE'
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'url',
        'name',
        'author.name',
        'category.name',
        'description'
      ]
    }
  },

  head: {
    title: 'Servicios WMS | GEOVISOR'
  }
}
</script>
