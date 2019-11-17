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
import pageActionsMixin from '@/mixins/pageActionsMixin'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  mixins: [pageActionsMixin],

  data () {
    return {
      pageHeader: {
        title: 'Imágenes georeferenciales',
        btnAddName: 'Nueva imagen georeferencial'
      },
      // main modal settings
      modalMain: {
        storeBase: 'georeferencedImages',
        addComponent: 'ModalAddGeoreferencedImage',
        editComponent: 'ModalEditGeoreferencedImage',
        folderName: 'data',
      },
      messageToast: {
        baseName: 'IMAGE'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
        'title',
        'description'
      ]
    }
  },

  head: {
    title: 'Capas vectoriales | GEOVISOR',
  }
}
</script>
