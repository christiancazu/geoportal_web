<template>
  <div class="ma-3">
    <el-card shadow="always">
      <div
        class="space-between"
        slot="header"
      >
        <p class="mt-1 mb-0 font-weight-bold">Usuarios</p>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="replaceShowModalAddUser({ show: true })"
        >Nuevo Usuario</el-button>
      </div>
      <el-container direction="vertical">
        <el-row :gutter="20">
          <el-col
            :span="8"
            :offset="16"
          >
            <div>
              <el-input
                v-model="search"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="Search"
              />
            </div>
          </el-col>
        </el-row>
      </el-container>
      <el-container>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
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
            label="Actions"
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
    </el-card>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  data () {
    return {
      search: '',
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
    // console.log(this.$route)
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: 'modalsManagementUser/replaceShowModalAddUser',
      replaceShowModalEditUser: 'modalsManagementUser/replaceShowModalEditUser',
      replaceShowModalDeleteUser: 'modalsManagementUser/replaceShowModalDeleteUser',
    }),
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
