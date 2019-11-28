<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template v-slot:page-table>
    <el-table-column
      label="Institución"
      prop="institute"
    />
    <el-table-column label="Nombres y Apellidos">
      <template slot-scope="scope">
        {{ `${scope.row.name} ${scope.row.lastName} ${scope.row.lastNameAditional}` }}
      </template>
    </el-table-column>
    <el-table-column
      label="Correo Electrónico"
      prop="email"
    />
    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <el-tooltip
          content="Ver solicitud"
          placement="bottom"
        >
          <el-button
            circle
            icon="el-icon-view"
            size="small"
            type="primary"
            @click="onLoadModalApproveItem(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>

import pageActionsMixin from '@/mixins/pageActionsMixin'
import { SET_ITEM_CONTEXT } from '@/types/mutation-types'

export default {
  mixins: [pageActionsMixin],
  data () {
    return {
      pageHeader: {
        title: 'Solicitudes pendientes',
      },
      modalMain: {
        storeBase: 'requests',
        approveComponent: 'ModalApproveRequest',
        folderName: 'users',
      },

      messageToast: {
        baseName: 'REQUEST'
      },

      filterCriteriaProps: [
        'name',
        'lastName',
        'lastNameAditional',
        'institute',
        'subject'
      ]
    }
  },

  methods: {
    onLoadModalApproveItem (item) {
      this.$store.commit(`${this.modalMain.storeBase}/${SET_ITEM_CONTEXT}`, { itemContext: item })

      this.$store.dispatch('modalsVisibilities/openModal', {
        modalType: 'mainModal',
        component: this.modalMain.approveComponent,
        folderName: this.modalMain.folderName
      })
    }
  },

  head: {
    title: 'Solicitudes | GEOVISOR'
  },
}
</script>