<template>
  <BasePage title="Grupos de Capas">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$_modalVisibilityMixin_open('modalAddGroupLayer')"
      >Nuevo Grupo de capa</el-button>
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
          :data="filteredData"
          v-loading="loadingGroupLayers"
        >
          <el-table-column
            label="N°"
            align="center"
            width="50px"
            prop="order"
          />
          <el-table-column
            label="Categoria"
            prop="categoryTitle"
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
              <div v-if="scope.row.categoryGroup.id">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="onLoadModalEditGroupLayer(scope.$index, scope.row)"
                />
                <BtnConfirm
                  :item-selected="scope.row"
                  @confirmed-action="deleteGroupLayer"
                  accion="deleted"
                  title="¿Eliminar grupo de capas?"
                  body-text="¿Esta seguro?, realizada la operación no se podra revertir"
                />
              </div>
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
      <ModalAddGroupLayer />
      <ModalEditGroupLayer />
    </template>
  </BasePage>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BasePage from "@/components/base/BasePage.vue";
import BtnConfirm from "@/components/base/BaseBtnConfirm.vue";
import ModalAddGroupLayer from "@/components/layers/ModalAddGroupLayer.vue";
import ModalEditGroupLayer from "@/components/layers/ModalEditGroupLayer.vue";
export default {
  components: {
    BasePage,
    ModalAddGroupLayer,
    ModalEditGroupLayer,
    BtnConfirm
  },

   head: {
    title: 'Grupo de Capas | GEOVISOR',
  },

  data () {
    return {
      search: "",
      pagesize: 10,
      currentPage: 1,
    };
  },

  computed: {
    ...mapState({
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers,
    }),

    filteredData: function () {
      let search = this.search.toString().toLowerCase()
      let groupLayers = this.$store.state.groupLayers.groupLayers
      return groupLayers.filter(item => {
        // checking categoryTitle
        if (item.categoryTitle && item.categoryTitle.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking title
        if (item.title && item.title.toString().toLowerCase().includes(search)) {
          return item
        }
        // checking description
        if (item.description && item.description.toString().toLowerCase().includes(search)) {
          return item
        }
      })
    }
  },

  created () {
    this.getGroupLayers()
  },

  methods: {
    ...mapActions({
      getGroupLayers: "groupLayers/getGroupLayers",
      replaceCurrentGroupLayer: "groupLayers/replaceCurrentGroupLayer",
    }),

    onLoadModalViewRequestPending (index, item) {
      this.replaceCurrentPendingRequest({ request: item })
      this.$_modalVisibilityMixin_open('modalViewPendingRequest')
    },

    onLoadModalEditGroupLayer: function (index, groupLayer) {
      this.replaceCurrentGroupLayer({ groupLayer })
      this.$_modalVisibilityMixin_open('modalEditGroupLayer')
    },

    deleteGroupLayer: function (item) {
      new Promise((resolve, reject) => {
        this.$groupLayerAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getGroupLayers()
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
};
</script>