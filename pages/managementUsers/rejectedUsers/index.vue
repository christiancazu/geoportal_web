<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table
  >
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
      label="Observación"
      align="center"
    >
      <template slot-scope="scope">
        <el-popover
          trigger="hover"
          placement="top"
          width="200px"
        >
          {{ `${scope.row.observation}` }}

          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-link
              type="danger"
              icon="el-icon-view"
            >
              <div class="text-nowrap">
                {{ `${scope.row.observation}` }}
              </div>
            </el-link>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="Motivo de uso"
      align="center"
    >
      <template slot-scope="scope">
        <el-popover
          trigger="hover"
          placement="top"
          width="200px"
        >
          {{ `${scope.row.subject}` }}

          <div
            slot="reference"
            class="name-wrapper"
          >
            <el-link
              type="primary"
              icon="el-icon-view"
            >
              <div class="text-nowrap">
                {{ `${scope.row.subject}` }}
              </div>
            </el-link>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>
import pageActionsMixin from '@/mixins/pageActionsMixin'

import { mapActions } from 'vuex'

export default {
  mixins: [pageActionsMixin],

  data () {
    return {
      pageHeader: {
        title: 'Usuarios pendientes',
      },
      modalMain: {
        storeBase: 'requests',
        folderName: ''
      },

      messageToast: {
        baseName: 'REQUEST'
      },

      filterCriteriaProps: [
        'name',
        'lastName',
        'lastNameAditional',
        'institute',
        'subject',
      ]
    }
  },

  created () {
  },

  methods: {
    ...mapActions({
      getRejectedRequests: 'userRequests/getRejectedRequests',
    }),

    current_change: function (currentPage) {
      this.currentPage = currentPage
    },

    // pagination
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage
    },

    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize
    },
  },

  head: {
    title: 'Solicitudes rechazadas | GEOVISOR',
  },
}
</script>