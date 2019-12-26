<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
>
  <template v-slot:page-table>
    <el-table-column
      label="Institución"
      prop="institute"
    />
    <el-table-column label="Nombres y apellidos">
      <template slot-scope="scope">
        {{ `${scope.row.name} ${scope.row.lastName} ${scope.row.lastNameAditional}` }}
      </template>
    </el-table-column>
    <el-table-column
      label="Correo electrónico"
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
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

import { SET_ITEM_CONTEXT } from '@/types/mutations'

export default {
  extends: PageActionsSetup,

  data () {
    return {
      /** PAGE ACTIONS SETTINGS */
      pageHeader: {
        title: 'Solicitudes pendientes'
      },
      storeBase: {
        name: 'requests'
      },
      modalMain: { // main modal settings
        approveRequestComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'ApproveRequest'
        }
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'name',
        'lastName',
        'lastNameAditional',
        'institute',
        'subject'
      ]
    }
  },

  methods: {
    /**
     * custom function to open approveRequestComponent modal
     */
    onLoadModalApproveItem (item) {
      this.$store.commit(`${this.storeBase.name}/${SET_ITEM_CONTEXT}`, item)

      this.$store.dispatch(`${this.storeBase.name}/setDynamicModal`, {
        typeModal: 'modalMain',
        component: this.modalMain.approveRequestComponent
      })
    }
  },

  head: {
    title: 'Solicitudes | GEOVISOR'
  }
}
</script>
