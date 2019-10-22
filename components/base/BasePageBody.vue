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
            v-model="search"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="Buscar..."
            clearable
            @input="$emit('text-to-search', search)"
          />
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="dataContext"
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
export default {
  props: {
    dataContext: {
      type: Array
    }
  },

  data () {
    return {
      pagesize: 10,
      currentPage: 1,
      search: ''
    }
  },

  methods: {
    // pagination 
    onChangeCurrentPage (currentPage) {
      this.currentPage = currentPage
    },
    onChangePageSize (pagesizex) {
      console.warn(pagesizex);
      this.pagesize = pagesizex
    }
  }
}
</script>
