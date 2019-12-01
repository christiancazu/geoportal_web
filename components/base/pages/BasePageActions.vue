<template>
<base-page
  :page-header="pageHeader"
  @open-add-modal="openMainModalAddItemContext()"
>
  <el-container direction="vertical">
    <el-row
      type="flex"
      justify="end"
      :gutter="10"
    >
      <el-col
        :xs="24" :sm="12" :md="8"
      >
        <div>
          <el-input
            v-model="textToSearch"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="Buscar..."
            clearable
            @input="textToSearch = $event"
          />
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="$store.state.spinners.loadingTable"
      :data="filteredDataContext.slice((currentPage-1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >

      <slot
        name="page-table"
        :openModalEditItemContext="openModalEditItemContext"
        :confirmedActionDeleteItemContext="confirmedActionDeleteItemContext"
        :shrinkText="$options.filters.shrinkText"
      />

    </el-table>

    <el-pagination
      small
      class="pt-4 text-xs-right"
      :pager-size="100"
      :page-size="pagesize"
      layout="prev, pager, next, sizes"
      :total="dataContext.length"
      :current-page="currentPage"
      @current-change="onChangeCurrentPage"
      @size-change="onChangePageSize"
    />

  </el-container>
</base-page>
</template>

<script>
import Base from './Base'

import { mapActions } from 'vuex'

import { SET_CURRENT_PAGE_ON_TABLE } from '@/types/mutation-types'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  extends: Base,

  props: {
    pageHeader: {
      type: Object,
      default: () => ({
        title: { type: String, required: true },
        btnAddName: { type: String, required: false }
      })
    },
    modalMain: {
      type: Object,
      default: () => ({
        storeBase: { type: String, required: true },
        addComponent: { type: String, required: true },
        editComponent: { type: String, required: true },
        folderName: { type: String, required: true }
      })
    },
    messageToast: {
      type: Object,
      default: () => ({
        baseName: { type: String, required: true }
      })
    },
    filterCriteriaProps: {
      type: Array, default: () => []
    },
    fitContent: {
      type: Boolean, default: false
    }
  },

  data () {
    return {
      pagesize: ROWS_PER_PAGE_ON_TABLE,
      textToSearch: '',
      criteriaLength: 0
    }
  },

  methods: {
    ...mapActions({
      async deleteItemContext ({}, id) {
        await this.$store.dispatch(`${this.modalMain.storeBase}/deleteItemContext`, id)
      }
    }),

    /**
     * set the name of modalMain.addComponent as dynamic main modal component
     * on layouts/default.vue & set his visibility state
     *
     */
    openMainModalAddItemContext () {
      this.setDynamicMainModalComponent(this.modalMain.addComponent)
    },

    /**
     * fetching the itemContext by his id
     * set the name of editComponent as dynamic component
     * on layouts/default.vue & set his visibility state
     *
     * @param {Number} id
     */
    async openModalEditItemContext ({ id }) {
      try {
        await this.getItemContext(id)

        this.setDynamicMainModalComponent(this.modalMain.editComponent)
      }
      catch (e) {}
    },

    /**
     * receives the selected itemContext from btn-confirm component
     * to be deleted & fetch DataContext again to update everything
     *
     * @param {Object} itemSelected
     */
    async confirmedActionDeleteItemContext ({ itemSelected }) {
      try {
        await this.deleteItemContext(itemSelected.id)
        this.$toast.success(this.$SUCCESS[this.messageToast.baseName].DELETED)

        // getting dataContext again to see updates
        await this.getDataContext()

        let currentPage = this.$store.state[this.modalMain.storeBase].currentPageOnTable

        // if number of pages is minor that the current page, (when delete)
        if (this.dataContext.length / ROWS_PER_PAGE_ON_TABLE <= (currentPage - 1)) {
          currentPage--
        }
        // setting currentPage before to submit deleteItemContext and getDataContext
        // to set it again as currentPage to prevent go to page 1 when fetch the dataContext
        this.$store.commit(`${this.modalMain.storeBase}/${SET_CURRENT_PAGE_ON_TABLE}`, currentPage)
      }
      catch (e) {}
    }
  }
}
</script>
