<template>
  <BasePage title="Solicitudes rechazadas">
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
            label="Observación"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                trigger="hover"
                placement="top"
                width="200px"
              >
                {{`${scope.row.observation}`}}

                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-link
                    type="danger"
                    icon="el-icon-view"
                  >
                    <div class="text-nowrap">
                      {{`${scope.row.observation}`}}
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
                {{`${scope.row.subject}`}}

                <div
                  slot="reference"
                  class="name-wrapper"
                >
                  <el-link
                    type="primary"
                    icon="el-icon-view"
                  >
                    <div class="text-nowrap">
                      {{`${scope.row.subject}`}}
                    </div>
                  </el-link>
                </div>
              </el-popover>
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
  </BasePage>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BasePage from "@/components/base/BasePage.vue";
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
export default {
  components: {
    BasePage,
    BtnConfirm
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
      const rejectedRequests = this.$store.state.userRequests.rejectedRequests
      let search = this.search.toString().toLowerCase()
      return rejectedRequests.filter(item => {
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
    this.getRejectedRequests()
  },

  methods: {
    ...mapActions({
      getRejectedRequests: "userRequests/getRejectedRequests",
    }),

    current_change: function (currentPage) {
      this.currentPage = currentPage;
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
