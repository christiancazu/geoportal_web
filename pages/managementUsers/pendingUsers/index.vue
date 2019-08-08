<template>
  <BasePage title="Usuarios pendientes de aprobación">
    <template v-slot:content>
      <el-container direction="vertical">
        <el-row
          type="flex"
          justify="end"
          :gutter="10"
        >
          <el-col
            :xs="24"
            :sm="8"
            :md="8"
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
        <el-table
          :data="pendingRequests"
          style="width: 100%"
        >
          <el-table-column
            label="Name"
            prop="name"
          />
          <el-table-column
            label="Name"
            prop="lastName"
          />
          <el-table-column
            label="Name"
            prop="email"
          />
          <el-table-column
            label="Actions"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-view"
                size="small"
                type="info"
              />
              <BtnConfirm
                :item-selected="scope.row"
                @confirmed-action="acceptUser"
                accion="accepted"
                title="Aceptar solicitud usuario"
                body-text="¿Esta seguro de aceptar la solicitud de usuario?"
              />
              <BtnConfirm
                :item-selected="scope.row"
                @confirmed-action="rejectUser"
                accion="rejected"
                title="Rechazar solicitud usuario"
                body-text="¿Esta seguro de rechazar la solicitud de usuario?"
                :input="true"
                inputType="textarea"
                inputPlaceholder="Observación"
              />
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          small
          background
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="dataDisplay.length"
          @current-change="current_change"
        ></el-pagination>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-09-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        }, {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        }, {
          date: "2016-05-04",
          name: "Maria",
          address: "No. 189, Grove St, Los Angeles"
        }, {
          date: "2016-05-04",
          name: "Carolina",
          address: "No. 189, Grove St, Los Angeles"
        }, {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        }, {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "John",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Jony deep",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-03",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-03",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Morgan",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-03",
          name: "Jessy",
          address: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      pendingRequests: state => state.userRequests.pendingRequests,
      loadingPendingRequests: state => state.userRequests.loadingPendingRequests,
    }),

    dataDisplay: function () {
      let search = this.search.toString().toLowerCase()
      return this.tableData.filter(item => {
        // checking description
        if (item.date && item.date.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking hs no image
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking current tax rate
        if (item.address && item.address.toString().toLowerCase().includes(search)) {
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
      replaceShowModalAddUser: "modalsManagementUser/replaceShowModalAddUser",
      replaceShowModalEditUser: "modalsManagementUser/replaceShowModalEditUser",
      replaceShowModalDeleteUser:
        "modalsManagementUser/replaceShowModalDeleteUser"
    }),

    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },

    acceptUser (item) {
      console.log(item)
      const data = {
        id: item.itemSelected.id
      }

      new Promise((resolve, reject) => {
        this.$userRequestAPI.approve({ data })
          .then(response => {
            resolve(response)
            this.getPendingRequests()
          }).catch(error => reject(error))
      })
    },
    rejectUser (item) {

      const data = {
        observation: item.inputValue.value,
        id: item.itemSelected.id
      }
      console.log(item);
      new Promise((resolve, reject) => {
        this.$userRequestAPI.rejected({ data })
          .then(response => {
            resolve(response)
            this.getPendingRequests()
          }).catch(error => reject(error))
      })
    }
  }
};
</script>
