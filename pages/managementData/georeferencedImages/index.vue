<template>
<base-page title="Imágenes Georeferenciales">
  <template v-slot:itemsActions>
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="$_modalVisibilityMixin_open('modalAddGeoreferencedImage')"
    >Nuevo imagen georeferencial</el-button>
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
        v-loading="loadingUsers"
        :data="filteredData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column
          label="Nombre"
          prop="name"
        />
        <el-table-column
          label="Título"
          prop="title"
        />
        <el-table-column
          label="Descripción"
          prop="description"
        />
        <el-table-column
          label="Acción"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              circle
              icon="el-icon-edit"
              size="small"
              type="primary"
              @click="onLoadModalGeoreferencedImage(scope.$index, scope.row)"
            />
            <btn-confirm
              :item-selected="scope.row"
              accion="deleted"
              title="¿Eliminar cuenta de usuario?"
              body-text="¿Esta seguro?, realizada la operación no se podra revertir"
              @confirmed-action="deleteGeoreferencedImage"
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
    <modal-add-georeferenced-image />
    <modal-edit-georeferenced-image />
  </template>
</base-page>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/pages/BasePage.vue'
import BtnConfirm from '@/components/base/BaseBtnConfirm.vue'
import ModalAddGeoreferencedImage from '@/components/data/ModalAddGeoreferencedImage.vue'
import ModalEditGeoreferencedImage from '@/components/data/ModalEditGeoreferencedImage.vue'
export default {
  components: {
    BasePage,
    BtnConfirm,
    ModalAddGeoreferencedImage,
    ModalEditGeoreferencedImage
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

    filteredData () {
      let search = this.search.toString().toLowerCase()
      let users = this.$store.state.users.users
      this.currentPage = 1
      return users.filter(item => {
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
    },
  },

  created () {
    this.getGeoreferentialImages()
  },

  methods: {
    ...mapActions({
      getGeoreferentialImages: 'georeferencedImages/getGeoreferentialImages',
    }),

    onLoadModalGeoreferencedImage (index, item) {
      this.$_modalVisibilityMixin_open('modalEditGeoreferencedImage')
    },

    deleteGeoreferencedImage (item) {
      new Promise((resolve, reject) => {
        this.$userAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getGeoreferentialImages()
          }).catch(error => reject(error))
      })
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
    title: 'Imágenes | GEOVISOR',
  },
}
</script>
