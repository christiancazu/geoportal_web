<template>
<base-page
  :page-header="pageHeader"
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
        :openModalViewItemContext="openModalViewItemContext"
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
import BasePageParent from '@/components/base/parents/BasePageParent'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  extends: BasePageParent,

  props: {
    pageHeader: {
      type: Object,
      default: () => ({
        title: { type: String, required: true }
      })
    },
    modalMain: {
      type: Object,
      default: () => ({
        storeBase: { type: String, required: true },
        viewComponent: { type: String, required: true },
        folderName: { type: String, required: true }
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
    /**
     * fetching the itemContext by his id
     * set the name of viewComponent as dynamic component
     * on layouts/default.vue & set his visibility state
     *
     * @param {Number} id
     */
    async openModalViewItemContext ({ id }) {
      try {
        await this.getItemContext(id)

        this.setDynamicMainModalComponent(this.modalMain.viewComponent)
      }
      catch (e) {}
    }
  }
}
</script>
