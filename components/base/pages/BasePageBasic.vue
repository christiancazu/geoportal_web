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
import BasePage from '@/components/base/pages/BasePage'

import {
  SET_CURRENT_PAGE_ON_TABLE,
  DISABLE_LOADING_TABLE,
  ENABLE_LOADING_TABLE
} from '@/types/mutation-types'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    BasePage
  },

  filters: {
    /**
     * shrink text if is major that 16 characters
     * to prevent long heights of rows on table
     *
     * @param {String} text
     */
    shrinkText (text) {
      if (!text) return ''
      return text.length > 16
        ? `${text.substring(0, 16)}...`
        : text
    }
  },

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

  computed: {
    ...mapState({
      dataContext (state) {
        return state[this.modalMain.storeBase].dataContext
      },
      itemContext (state) {
        return state[this.modalMain.storeBase].itemContext
      }
    }),

    currentPage: {
      get () {
        return this.$store.state[this.modalMain.storeBase].currentPageOnTable
      },
      set (value) {
        this.$store.commit(`${this.modalMain.storeBase}/${SET_CURRENT_PAGE_ON_TABLE}`, value)
      }
    },

    /**
     * filtering data based on @param {Array} filterCriteriaProps
     *
     */
    filteredDataContext () {
      let textToSearchLowerCase = this.textToSearch.toLowerCase()

      const dataContextFiltered = this.dataContext
        .filter(itemContext => {
          for (let index = 0; index < this.criteriaLength; index++) {
            const criteriaParts = this.filterCriteriaProps[index].split('.')

            // used for criterias with format: (ex: author.name)
            if (criteriaParts[1])  {
              if (itemContext[criteriaParts[0]][criteriaParts[1]].toLowerCase().includes(textToSearchLowerCase)) {
                return true
              }
            } else {
              if (itemContext[this.filterCriteriaProps[index]].toLowerCase().includes(textToSearchLowerCase)) {
                return true
              }
            }
          }
        })

      // if have dataContextFiltered set as current page the first
      if (dataContextFiltered < this.dataContext)
        this.$store.commit(`${this.modalMain.storeBase}/${SET_CURRENT_PAGE_ON_TABLE}`, 1)

      return dataContextFiltered
    }
  },

  created () {
    this.initPageSettings()
    this.fetchDataContext()
  },

  methods: {
    ...mapActions({
      async getDataContext () {
        this.$store.commit(`spinners/${ENABLE_LOADING_TABLE}`)
        await this.$store.dispatch(`${this.modalMain.storeBase}/getDataContext`)
        this.$store.commit(`spinners/${DISABLE_LOADING_TABLE}`)

      },
      async getItemContext ({}, id) {
        await this.$store.dispatch(`${this.modalMain.storeBase}/getItemContext`, { id })
      },
      setDynamicMainModalComponent ({}, componentAddName) {
        this.$store.dispatch('modalsVisibilities/openModal', {
          modalType: 'mainModal',
          component: componentAddName,
          folderName: this.modalMain.folderName
        })
      }
    }),

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
    },

    initPageSettings () {
      this.criteriaLength = this.filterCriteriaProps.length
    },

    async fetchDataContext () {
      try {
        await this.getDataContext()
      }
      catch (e) {}
    },

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
