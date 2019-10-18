<template>
  <BasePage title="Capas base">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$_modalVisibilityMixin_open('modalAddBaseLayer')"
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
          v-loading="loadingBaselayers"
        >
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Autor"
            prop="author"
          />
          <el-table-column
            label="URL"
            prop="url"
          />
          <el-table-column
            prop="url"
            align="center"
          >
            <template slot="header">
              <p class="ma-0">Zoom</p>
              <small>[min, max]</small>
            </template>
            <template slot-scope="scope">{{ `[${scope.row.minZoom} - ${scope.row.maxZoom}]` }}</template>
          </el-table-column>
          <el-table-column
            label="Acción"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-tooltip
                content="Editar"
                placement="bottom"
              >
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="onLoadModalEditBaseLayer(scope.$index, scope.row)"
                />
              </el-tooltip>
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
        ></el-pagination>
      </el-container>
    </template>
    <template v-slot:modals>
      <ModalAddBaseLayer />
      <ModalEditBaseLayer :base-layer-selected="baseLayerSelected" />
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BasePage from "@/components/base/BasePage.vue";
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
import ModalAddBaseLayer from "@/components/layers/ModalAddBaseLayer.vue";
import ModalEditBaseLayer from "@/components/layers/ModalEditBaseLayer.vue";

export default {
  components: {
    BasePage,
    BtnConfirm,
    ModalAddBaseLayer,
    ModalEditBaseLayer
  },

  head: {
    title: "Capas base | GEOVISOR"
  },
  data () {
    return {
      search: "",
      pagesize: 10,
      currentPage: 1,
      baseLayerSelected: null
    };
  },

  computed: {
    ...mapState({
      loadingBaselayers: state => state.baseLayers.loadingBaselayers
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase();
      let baseLayers = this.$store.state.baseLayers.baseLayers;
      this.currentPage = 1;
      return baseLayers.filter(item => {
        // checking description
        if (
          item.lastName &&
          item.lastName
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
        // checking hs no image
        if (
          item.name &&
          item.name
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
        // checking current tax rate
        if (
          item.email &&
          item.email
            .toString()
            .toLowerCase()
            .includes(search)
        ) {
          return item;
        }
      });
    }
  },

  created () {
    this.getBaseLayers();
  },

  methods: {
    ...mapActions({
      getBaseLayers: "baseLayers/getBaseLayers"
    }),
    onLoadModalEditBaseLayer (index, item) {
      this.baseLayerSelected = item
      this.$_modalVisibilityMixin_open('modalEditBaseLayer')
    },

    deleteBaseMap (item) {
      new Promise((resolve, reject) => {
        this.$baseLayerAPI
          .delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response);
            this.getBaseLayers();
          })
          .catch(error => reject(error));
      });
    },

    // pagination
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage;
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize;
    }
  }
};
</script>
