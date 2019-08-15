<template>
  <BasePage title="Grupos de Capas">
    <template v-slot:itemsActions>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="replaceShowModalAddGroupLayer({ show: true })"
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
            label="Categoria"
            prop="categoryId"
          />
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
          >
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-edit"
                size="small"
                type="primary"
                @click="editGroupLayer(scope.$index, scope.row)"
              />
              <BtnConfirm
                :item-selected="scope.row"
                @confirmed-action="deleteGroupLayer"
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
        // checking name
        if (item.name && item.name.toString().toLowerCase().includes(search)) {
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
      replaceShowModalAddGroupLayer: "modalsManagementLayer/replaceShowModalAddGroupLayer",
      replaceShowModalEditGroupLayer: "modalsManagementLayer/replaceShowModalEditGroupLayer"
    }),

    onLoadModalViewRequestPending (index, item) {
      this.replaceCurrentPendingRequest({ request: item })
      this.replaceShowModalViewPendingRequest({ show: true })
    },

    editGroupLayer: function () {
      this.replaceShowModalEditGroupLayer({ show: true })
    },

    deleteGroupLayer: function () {

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