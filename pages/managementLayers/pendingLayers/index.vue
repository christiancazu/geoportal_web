<template>
  <BasePage title="Capas pendientes de Aprobación">
    <template v-slot:content>
      <el-container direction="vertical">
        <el-row
          type="flex"
          justify="end"
          :gutter="10"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
          >
            <div>
              <el-input
                v-model="search"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="Buscar..."
                clearable
              />
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            label="Date"
            prop="date"
          />
          <el-table-column
            label="Name"
            prop="name"
          />
          <el-table-column
            label="Acción"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-edit"
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              />
              <el-button
                size="small"
                circle
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </template>
  </BasePage>
</template>
<script>
import BasePage from '@/components/base/BasePage.vue'
export default {
  components: {
    BasePage
  },
  data () {
    return {
      search: '',
      loading: true,
      tableData: [{
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-03',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles'
      }]

    }
  },

  created () {
  },

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
