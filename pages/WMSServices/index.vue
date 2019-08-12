<template>
  <BasePage title="Servicios Externos WMS">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="replaceShowModalAddWMSService({ show: true })"
      >Nuevo Servicio WMS</el-button>
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
          :data="WMSServices.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          lazy
          v-loading="loadingWMSServices"
        >
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Web ULR"
            prop="webUrl"
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
            label="Acción"
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
              <el-button
                size="small"
                circle
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <div class="text-xs-right">
          <el-pagination
            :hide-on-single-page="true"
            :total="WMSServices.length"
            layout="prev, pager, next"
          >
          </el-pagination>
        </div>
      </el-container>
    </template>

    <template v-slot:modals>
      <ModalAddWMSService />
    </template>

  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import ModalAddWMSService from '@/components/WMSServices/ModalAddWMSService.vue'
export default {
  components: {
    BasePage,
    ModalAddWMSService,
  },
  data () {
    return {
      search: '',
    }
  },

  computed: {
    ...mapState({
      WMSServices: state => state.WMSServices.WMSServices,
      loadingWMSServices: state => state.WMSServices.loadingWMSServices
    })
  },
  mounted () {
    this.getWMSServices()
  },

  created () {
  },

  methods: {
    ...mapActions({
      replaceShowModalAddWMSService: 'modalsWMSServices/replaceShowModalAddWMSService',
      getWMSServices: 'WMSServices/getWMSServices',
    }),
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
