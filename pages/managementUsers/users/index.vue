<template>
  <BasePage title="Usuarios">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="replaceShowModalAddUser({ show: true })"
      >Nuevo Usuario</el-button>
    </template>
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
          :data="filteredData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          v-loading="loadingUsers"
        >
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Apellidos"
            prop="fullName"
          />
          <el-table-column
            label="Correo Electrónico"
            prop="email"
          />
          <el-table-column
            label="Rol"
            prop="tag"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                type="primary"
                disable-transitions
              >{{scope.row.userType.id === 'AD' ? 'Admin': 'Usuario' }}
              </el-tag>
            </template>
          </el-table-column>
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
              <BtnConfirm
                :item-selected="scope.row"
                @confirmed-action="deleteUser"
                accion="deleted"
                title="¿Eliminar cuenta de usuario?"
                body-text="¿Esta seguro?, realizada la operación no se podra revertir"
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
      <ModalAddUser />
      <ModalEditUser />
      <ModalDeleteUser />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
import ModalAddUser from '@/components/users/ModalAddUser.vue'
import ModalEditUser from '@/components/users/ModalEditUser.vue'
import ModalDeleteUser from '@/components/users/ModalDeleteUser.vue'
export default {
  components: {
    BasePage,
    BtnConfirm,
    ModalAddUser,
    ModalEditUser,
    ModalDeleteUser
  },
  data () {
    return {
      search: '',
      pagesize: 10,
      currentPage: 1
    }
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      loadingUsers: state => state.users.loadingUsers
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let users = this.$store.state.users.users
      this.currentPage = 1
      return users.filter(item => {
        // checking description
        if (item.lastName && item.lastName.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking hs no image
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking current tax rate
        if (item.email && item.email.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    },
  },

  created () {
    this.getUsers()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: 'modalsManagementUser/replaceShowModalAddUser',
      replaceShowModalEditUser: 'modalsManagementUser/replaceShowModalEditUser',
      replaceShowModalDeleteUser: 'modalsManagementUser/replaceShowModalDeleteUser',
      getUsers: 'users/getUsers',
      getUser: 'users/getUser'
    }),

    handleEdit (index, item) {
      this.getUser({ id: item.id }).then(response => {
        this.replaceShowModalEditUser({ show: true })
      })
    },

    deleteUser (item) {
      new Promise((resolve, reject) => {
        this.$userAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getUsers()
          }).catch(error => reject(error))
      })
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
