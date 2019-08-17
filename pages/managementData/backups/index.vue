<template>
  <BasePage title="Copias de seguridad">
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
          :data="users.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            label="Usuario"
            prop="username"
          />
          <el-table-column
            label="Fecha"
            prop="date"
          />
          <el-table-column
            label="Estado"
            prop="state"
          />
          <el-table-column
            label="Acción"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-view"
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
export default {
  components: {
    BasePage
  },
  data () {
    return {
      loading: true,
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

  computed: {
    ...mapState({
      showModalAddUser: state => state.modals.showModalAddUser,
      users: state => state.users.users
    })
  },
  mounted () {
    this.getUsers()

  },

  created () {
    // console.log(this.$route)
    // this.getUsers()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: 'modalsManagementUser/replaceShowModalAddUser',
      replaceShowModalEditUser: 'modalsManagementUser/replaceShowModalEditUser',
      getUsers: 'users/getUsers',
    }),
    handleEdit (index, row) {
      this.replaceShowModalEditUser({ show: true })
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
