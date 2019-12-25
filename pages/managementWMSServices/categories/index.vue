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
          dialog-delete-title="Eliminar categoría"
          dialog-delete-body-text="¿Está seguro de eliminar esta categoría?"
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
        title: 'Categorias de servicios WMS',
        btnAddName: 'Nueva categoría WMS'
      },
      storeBase: {
        name: 'WMSCategories'
      },
      modalMain: { // main modal settings
        addComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'AddCategory'
        },
        editComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'EditCategory'
        }
      },
      messageToast: {
        baseName: 'CATEGORY'
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'name',
        'description'
      ]
    }
  },

  head: {
    title: 'CATEGORÍAS WMS | GEOVISOR'
  }
}
</script>
