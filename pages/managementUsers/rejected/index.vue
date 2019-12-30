<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
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
      label="Observación"
      align="center"
    >
      <template slot-scope="scope">
        <el-popover
          title="Observación"
          trigger="hover"
          placement="top"
          width="200px"
          :content="scope.row.observation"
        >
          <el-link
            slot="reference"
            type="danger"
            icon="el-icon-view"
          >
            <div
              class="text-nowrap"
              style="text-align: justify"
            >
              {{ scope.row.observation }}
            </div>
          </el-link>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="Motivo de uso"
      align="center"
    >
      <template slot-scope="scope">
        <el-popover
          title="Motivo de uso"
          trigger="hover"
          placement="top"
          width="200px"
          :content="scope.row.subject"
        >
          <el-link
            slot="reference"
            type="primary"
            icon="el-icon-view"
          >
            <div
              class="text-nowrap"
              style="text-align: justify"
            >
              {{ scope.row.subject }}
            </div>
          </el-link>
        </el-popover>
      </template>
    </el-table-column>
  </template>
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

export default {
  extends: PageActionsSetup,

  data () {
    return {
      /** PAGE ACTIONS SETTINGS */
      pageHeader: {
        title: 'Solicitudes rechazadas'
      },
      storeBase: {
        name: 'requestRejected'
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

  head: {
    title: 'Solicitudes rechazadas | GEOVISOR'
  }
}
</script>

<style>
.el-popover {
  max-width: 200px;
}
</style>
