<template>
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
            @input="$emit('text-to-search', textToSearch)"
          />
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="dataContext.slice((currentPage-1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      v-loading="$store.state.spinners.loadingTable"
    >
      
    <slot name="table" />

    </el-table>

    <!-- # TODO: need to fix pagination length -->
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
</template>

<script>
import { UPDATE_CURRENT_PAGE_ON_TABLE } from '@/types/mutation-types'
import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  name: 'BasePageBodyTable',

  props: {
    dataContext: {
      type: Array
    },
    storeBase: {
      type: String,
      required: true
    },
  },

  data () {
    return {
      pagesize: ROWS_PER_PAGE_ON_TABLE,
      textToSearch: ''
    }
  },

  computed: {
    currentPage: {
      get () {
        return this.$store.state[this.storeBase].currentPageOnTable
      },
      set(value) {
        this.$store.commit(`${this.storeBase}/${UPDATE_CURRENT_PAGE_ON_TABLE}`, value)
      }
    }
  },

  methods: {
    // pagination 
    onChangeCurrentPage (currentPage) {
      this.currentPage = currentPage
    },
    onChangePageSize (pagesize) {
      this.pagesize = pagesize
    }
  }
}
</script>
