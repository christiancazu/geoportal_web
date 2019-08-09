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
            :sm="8"
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
          :data="baseMaps.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
import ModalAddBaseMap from '@/components/layers/ModalAddBaseMap.vue'
export default {
  components: {
    BasePage,
    ModalAddBaseMap,
  },
  data () {
    return {
      search: ''
    }
  },

  computed: {
    ...mapState({
      baseMaps: state => state.baseMaps.baseMaps,
      loadingBaseMaps: state => state.baseMaps.loadingBaseMaps
    })
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
    handleDelete (index, row) {
      this.replaceShowModalDeleteUser({ show: true })
      console.log(index, row)
    }
  }
}
</script>
