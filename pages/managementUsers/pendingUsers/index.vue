<template>
  <BasePage title="Usuarios pendientes de aprobación">
    <template v-slot:content>
      <el-container direction="vertical">
        <el-row type="flex" justify="end" :gutter="10">
          <el-col :xs="24" :sm="8" :md="8">
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
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Name" prop="name" />
          <el-table-column label="Actions" align="center">
            <template slot-scope="scope">
              <el-button circle icon="el-icon-view" size="small" type="info" />
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
              />
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="50"
          @current-change="current_change"
        ></el-pagination>
      </el-container>
    </template>
  </BasePage>
</template>

<script>
import { mapActions } from "vuex";
import BasePage from "@/components/base/BasePage.vue";
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
export default {
  components: {
    BasePage,
    BtnConfirm
  },

  data() {
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
    dataDisplay: function(){
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

  created() {
    console.log(this.$break);
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: "modalsManagementUser/replaceShowModalAddUser",
      replaceShowModalEditUser: "modalsManagementUser/replaceShowModalEditUser",
      replaceShowModalDeleteUser:
        "modalsManagementUser/replaceShowModalDeleteUser"
    }),

    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },

    customsFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(item => {
        // checking description
        if (item.description && item.description.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking hs no image
        if (item.hs_no_image && item.hs_no_image.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking current tax rate
        if (item.current_tax_rate && item.current_tax_rate.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking current note
        if (item.current_note && item.current_note.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking tax uplift
        if (item.tax_uplift && item.tax_uplift.toString().toLowerCase().includes(search)) {
          return item
        }

        // checking updateDate
        let updateDate = this.formatDate(item.tax_update_date)
        if (updateDate && updateDate.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    },

    acceptUser(item) {
      console.log(item);
    },
    rejectUser(item) {
      console.log(item);
    }
  }
};
</script>
