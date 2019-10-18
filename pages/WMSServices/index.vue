<template>
  <base-page title="Servicios Externos WMS">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$_modalVisibilityMixin_open('modalAddWMSService')"
      >
        Nuevo Servicio WMS
      </el-button>
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
            <el-input
              v-model="search"
              prefix-icon="el-icon-search"
              size="small"
              placeholder="Buscar..."
              clearable
            />
          </el-col>
        </el-row>
        <el-table
          :data="filteredData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
          lazy
          v-loading="loadingWMSServices"
        >
          <el-table-column
            label="URL"
            prop="url"
          />
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Categoría"
            prop="category.name"
          />
          <el-table-column
            label="Autor"
            prop="author.name"
          />
          <el-table-column
            label="Estado"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isEnabled"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="Acción"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <btn-confirm
                :item-selected="scope.row"
                @confirmed-action="deleteWMSServices"
                accion="deleted"
                title="¿Eliminar el servicio seleccionado?"
                body-text="¿Esta seguro?, esta operación no se podra revertir"
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

      <modal-add-w-m-s-service />

    </template>

  </base-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage'
import BtnConfirm from "@/components/base/BaseBtnConfirm";
import ModalAddWMSService from '@/components/WMSServices/ModalAddWMSService'

export default {
  components: {
    BasePage,
    ModalAddWMSService,
    BtnConfirm
  },

   head: {
    title: 'Servicios WMS | GEOVISOR',
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
      loadingWMSServices: state => state.WMSServices.loadingWMSServices
    }),

    filteredData () {
      let search = this.search.toString().toLowerCase()
      let WMSServices = this.$store.state.WMSServices.WMSServices
      this.currentPage = 1
      return WMSServices.filter(item => {
        // checking url
        if (item.url && item.url.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    },
  },
  created () {
    this.getWMSServices()
  },

  methods: {
    ...mapActions({
      getWMSServices: 'WMSServices/getWMSServices',
    }),

    deleteWMSServices (item) {
      new Promise((resolve, reject) => {
        this.$WMSServiceAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getWMSServices()
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
