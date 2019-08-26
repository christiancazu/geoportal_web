<template>
  <BasePage title="Capas Raster">
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
          v-loading="loadingRasterLayers"
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
            label="Nombre style"
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
                :disabled="scope.row.status"
                type="primary"
                @click="onLoadModalPublishRasterLayer(scope.$index, scope.row)"
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
      <ModalPublishRasterLayer />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
import ModalPublishRasterLayer from '@/components/layers/ModalPublishRasterLayer.vue'
export default {
  components: {
    BasePage,
    ModalPublishRasterLayer
  },
  data() {
    return {
      search: "",
      pagesize: 10,
      currentPage: 1
    };
  },

  computed: {
    ...mapState({
      // rasterLayers: state => state.rasterLayer.rasterLayers,
      loadingRasterLayers: state => state.rasterLayer.loadingRasterLayers
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let rasterLayers = this.$store.state.rasterLayer.rasterLayers
      this.currentPage = 1
      return rasterLayers.filter(item => {
        // checking title
        if (
          item.title &&
          item.title
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
        // checking name
        if (
          item.name &&
          item.name
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
        // checking description
        if (
          item.description &&
          item.description
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
      });
    }
  },

  created() {
    this.getRasterLayers();
  },

  methods: {
    ...mapActions({
      getRasterLayers: "rasterLayer/getRasterLayers",
      replaceCurrentRasterLayer: "rasterLayer/replaceCurrentRasterLayer",
      replaceShowModalPublishRasterLayer:
        "modalsManagementLayer/replaceShowModalPublishRasterLayer"
    }),

    onLoadModalPublishRasterLayer (index, item) {
      this.replaceCurrentRasterLayer({ rasterLayer: item })
      this.replaceShowModalPublishRasterLayer({ show: true })
    },

    // pagination 
    onChangeCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize;
    },
  }
}
</script>
