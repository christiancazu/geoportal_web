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
              />
            </template>
          </el-table-column>
        </el-table>
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

  created() {
    // console.log(this.$route)
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: "modalsManagementUser/replaceShowModalAddUser",
      replaceShowModalEditUser: "modalsManagementUser/replaceShowModalEditUser",
      replaceShowModalDeleteUser:
        "modalsManagementUser/replaceShowModalDeleteUser"
    }),
    acceptUser(item) {
      console.log(item);
    },
    rejectUser(item) {
      console.log(item);
    }
  }
};
</script>
