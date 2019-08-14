<template>
  <BasePage title="Capas">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="replaceShowModalAddLayer({ show: true })"
      >Nuevo Capa</el-button>
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
          v-loading="loadingLayers"
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
            label="Acción"
            align="center"
          >
            <template slot-scope="scope">
              <BtnConfirm
                :item-selected="scope.row"
                @confirmed-action="deleteLayer"
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
      <ModalAddLayer />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
import ModalAddLayer from '@/components/layers/ModalAddLayer.vue'
export default {
  components: {
    BasePage,
    BtnConfirm,
    ModalAddLayer,
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
      layers: state => state.layers.layers,
      loadingLayers: state => state.layers.loadingLayers
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let layers = this.$store.state.layers.layers
      this.currentPage = 1
      return layers.filter(item => {
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
    this.getLayers()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddLayer: 'modalsManagementLayer/replaceShowModalAddLayer',
      getLayers: 'layers/getLayers',
    }),

    deleteLayer (item) {
      new Promise((resolve, reject) => {
        this.$layerAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getLayers()
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
