<template>
<base-page title="Reportes">
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
        v-loading="loadingReports"
        :data="filteredData"
      >
        <el-table-column
          label="Usuario"
          prop="user"
        />
        <el-table-column
          label="Asunto"
          prop="subject"
        />
        <el-table-column
          label="Descripción"
          prop="description"
          align="center"
        >
          <template slot-scope="scope">
            <div
              slot="reference"
              class="name-wrapper"
            >
              <div class="text-nowrap">
                {{ `${scope.row.description}` }}
              </div>
            </div>
          </template>
        </el-table-column>
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
  <template v-slot:modals>
    <modal-view-report />
  </template>
</base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BasePage from '@/components/base/pages/BasePage.vue'
import ModalViewReport from '@/components/reports/ModalViewReport.vue'
export default {
  components: {
    BasePage,
    ModalViewReport
  },
  data () {
    return {
      search: '',
      pagesize: 10,
      currentPage: 1,
    }
  },

  computed: {
    ...mapState({
      loadingReports: state => state.reports.loadingReports,
    }),
    filteredData: function () {
      const reports = this.$store.state.reports.reports
      let search = this.search.toString().toLowerCase()
      return reports.filter(item => {
        // checking user
        if (item.user && item.user.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking subject
        if (item.subject && item.subject.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking lastNameAditional
        if (item.lastNameAditional && item.lastNameAditional.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking description
        if (item.description && item.description.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    }
  },

  created () {
    this.getReports()
  },

  methods: {
    ...mapActions({
      getReports: 'reports/getReports',
      replaceCurrentReport: 'reports/replaceCurrentReport',
    }),

    onLoadModalViewReport: function (report) {
      this.replaceCurrentReport({ report })
      this.$_modalVisibilityMixin_open('modalViewReport')
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
    title: 'Reportes | GEOVISOR',
  },
}
</script>
