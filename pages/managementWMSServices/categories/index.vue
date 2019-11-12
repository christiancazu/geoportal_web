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
          @confirmed-action="confirmedActionDeleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>
import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

import pageActionsMixin from '@/mixins/pageActionsMixin'

export default {
  components: {
    GroupActionsButtons
  },

  mixins: [pageActionsMixin],

  data () {
    return {
      pageHeader: {
        title: 'Categorias de servicios WMS',
        btnAddName: 'Nueva categoría WMS'
      },
      // main modal settings
      modalMain: {
        storeBase: 'WMSCategories',
        addComponent: 'ModalAddWMSCategory',
        editComponent: 'ModalEditWMSCategory',
        folderName: 'WMSServices'
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
    title: 'CATEGORÍAS WMS | GEOVISOR',
  }
}
</script>
