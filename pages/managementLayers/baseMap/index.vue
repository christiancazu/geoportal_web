<template>
  <BasePage title="Mapas base">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="replaceShowModalAddBaseMap({ show: true })"
      >Nuevo Mapa Base</el-button>
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
          v-loading="loadingBaseMaps"
        >
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="URL"
            prop="url"
          />
          <el-table-column
            label="Autor"
            prop="author"
          />
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
                @confirmed-action="deleteBaseMap"
                accion="deleted"
                title="¿Eliminar Mapa Base?"
                body-text="¿Esta seguro de continuar con la operación?"
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
      <ModalAddBaseMap />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
import ModalAddBaseMap from '@/components/layers/ModalAddBaseMap.vue'
export default {
  components: {
    BasePage,
    BtnConfirm,
    ModalAddBaseMap,
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
      loadingBaseMaps: state => state.baseMaps.loadingBaseMaps
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let baseMaps = this.$store.state.baseMaps.baseMaps
      this.currentPage = 1
      return baseMaps.filter(item => {
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
    this.getBaseMaps()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddBaseMap: 'modalsManagementLayer/replaceShowModalAddBaseMap',
      replaceShowModalEditUser: 'modalsManagementLayer/replaceShowModalEditUser',
      replaceShowModalDeleteUser: 'modalsManagementLayer/replaceShowModalDeleteUser',
      getBaseMaps: 'baseMaps/getBaseMaps',
    }),
    handleEdit (index, row) {
      this.replaceShowModalEditUser({ show: true })
      console.log(index, row)
    },

    deleteBaseMap (item) {
      new Promise((resolve, reject) => {
        this.$baseMapAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getBaseMaps()
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
