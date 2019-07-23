<template>
  <div class="ma-3">
    <el-card shadow="always">
      <div
        class="space-between"
        slot="header"
      >
        <p class="mt-1 mb-0 font-weight-bold">Mapas Base</p>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="replaceShowModalAddBaseMap({ show: true })"
        >Nuevo Mapa Base</el-button>
      </div>
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
      </el-container>
      <el-container>
        <el-table
          :data="baseMaps.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
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
    </el-card>

    <ModalAddBaseMap />
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalAddBaseMap from '@/components/layers/ModalAddBaseMap.vue'
export default {
  components: {
    ModalAddBaseMap,
  },
  data () {
    return {
     
      search: '',
      tableData: [{
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-03',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles'
      }]

    }
  },

  computed: {
    ...mapState({
      showModalAddBaseMap: state => state.modalsManagementLayer.showModalAddBaseMap,
      baseMaps: state => state.baseMaps.baseMaps
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
