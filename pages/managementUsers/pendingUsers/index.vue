<template>
  <BasePage title="Solicitudes pendientes">
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
          :data="filteredData"
          v-loading="loadingPendingRequests"
        >
          <el-table-column
            label="Institución"
            prop="institute"
          />
          <el-table-column label="Nombres y Apellidos">
            <template slot-scope="scope">
              {{`${scope.row.name} ${scope.row.lastName} ${scope.row.lastNameAditional}`}}
            </template>
          </el-table-column>
          <el-table-column
            label="Correo Electrónico"
            prop="email"
          />
          <el-table-column
            label="Acción"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-view"
                size="small"
                type="primary"
                @click="onLoadModalViewRequestPending(scope.$index, scope.row)"
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
        >
        </el-pagination>
      </el-container>
    </template>
    <template v-slot:modals>
      <ModalViewPendingRequest />
    </template>
  </BasePage>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BasePage from "@/components/base/BasePage.vue";
import ModalViewPendingRequest from "@/components/users/ModalViewPendingRequest.vue";
export default {
  components: {
    BasePage,
    ModalViewPendingRequest
  },

  data () {
    return {
      search: "",
      pagesize: 10,
      currentPage: 1,
    };
  },

  computed: {
    ...mapState({
      loadingPendingRequests: state => state.userRequests.loadingPendingRequests,
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let pendingRequests = this.$store.state.userRequests.pendingRequests
      return pendingRequests.filter(item => {
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking lastName
        if (item.lastName && item.lastName.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking lastNameAditional
        if (item.lastNameAditional && item.lastNameAditional.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking institute
        if (item.institute && item.institute.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking subject
        if (item.subject && item.subject.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    }
  },

  created () {
    this.getPendingRequests()
  },

  methods: {
    ...mapActions({
      getPendingRequests: "userRequests/getPendingRequests",
      replaceCurrentPendingRequest: "userRequests/replaceCurrentPendingRequest",
      replaceShowModalViewPendingRequest: "modalsManagementUser/replaceShowModalViewPendingRequest"
    }),

    onLoadModalViewRequestPending (index, item) {
      this.replaceCurrentPendingRequest({ request: item })
      this.replaceShowModalViewPendingRequest({ show: true })
    },

    // pagination 
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage;
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize;
    },
  }
};
</script>