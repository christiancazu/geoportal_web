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
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
        >
          <el-table-column
            label="Usuario"
            prop="user"
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
                @click="onLoadModalViewReport(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          class="pt-4 text-xs-right"
          :pager-size="100"
          :page-size="pagesize"
          layout="prev, pager, next, sizes"
          :total="filteredData.length"
          :current-page="currentPage"
          @current-change="onChangeCurrentPage"
          @size-change="onChangePageSize"
        />
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
   head: {
    title: 'Copias de Seguridad | GEOVISOR',
  },
  data () {
    return {
      loading: true,
      search: '',
      pagesize: 10,
      currentPage: 1,
      tableData: [{
        date: '2016-05-02',
        user: 'Tom',
        state: 'Completado'
      }, {
        date: '2016-05-04',
        user: 'John',
        state: 'En proceso...'
      }, {
        date: '2016-05-01',
        user: 'Morgan',
        state: 'Pendiente'
      }, {
        date: '2016-05-03',
        user: 'Jessy',
        state: 'Completado'
      }]
    }
  },

  computed: {
    ...mapState({
      loadingBackups: state => state.backups.loadingBackups,
      backups: state => state.backups.backups,
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let backups = this.$store.state.backups.backups
      // let backups = this.$store.state.backups.backups
      this.currentPage = 1
      return backups.filter(item => {
        // checking lastName
        if (item.lastName && item.lastName.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking email
        if (item.email && item.email.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    }
  },

  created () {
    // this.getUsers()
  },

  methods: {
    ...mapActions({
      replaceCurrentBackup: 'backups/replaceCurrentBackup',
      replaceShowModalEditUser: 'modalsManagementUser/replaceShowModalEditUser',
      getUsers: 'backups/getUsers',
    }),

    onLoadModalViewReport: function (backup) {
      this.replaceCurrentBackup({ backup })
      // this.replaceShowModalViewReport({ show: true })
    },
    // pagination 
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage;
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize;
    },
  }
}
</script>
