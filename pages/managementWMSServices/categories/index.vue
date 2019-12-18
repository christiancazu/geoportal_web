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

  data () {
    return {
      pageHeader: {
        title: 'Categorias de servicios WMS',
        btnAddName: 'Nueva categoría WMS'
      },
      storeBase: {
        name: 'WMSCategories'
      },
      // main modal settings
      modalMain: {
        addComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'AddCategory',
          store: 'WMSCategories'
        },
        editComponent: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'EditCategory',
          store: 'WMSCategories'
        }
      },
      messageToast: {
        baseName: 'CATEGORY'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
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
