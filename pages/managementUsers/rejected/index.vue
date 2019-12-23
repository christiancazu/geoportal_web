<template>
<page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
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
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

export default {
  extends: PageActionsSetup,

  data () {
    return {
      pageHeader: {
        title: 'Solicitudes rechazadas'
      },
      modalMain: {
        storeBase: 'requestRejected'
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
