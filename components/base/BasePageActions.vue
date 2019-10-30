<template>
  <div :class="[
    { 'page-body-center': fitContent },
    ['ma-4']
  ]">

    <el-card 
      shadow="always" 
      :class="{ 'fit-page-body': fitContent }"
    >
      <div
        class="space-between"
        slot="header"
      >
        <p class="mt-1 mb-0 font-weight-bold text-uppercase">
          {{ pageHeaderTitle }}
        </p>

        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="openModalAddItemContext()"
        >
          {{ btnAddName }}
        </el-button>
      
      </div>

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
          
        <slot name="page-table" 
          :openModalEditItemContext="openModalEditItemContext"
          :confirmedActionDeleteItemContext="confirmedActionDeleteItemContext"
         />

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

    </el-card>
  
  </div>
</template>

<script>
import { 
  SET_DYNAMIC_MAIN_MODAL,
  SET_CURRENT_PAGE_MODALS_FOLDER_NAME,
  UPDATE_CURRENT_PAGE_ON_TABLE,
} from '@/types/mutation-types'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    pageHeaderTitle: {
      type: String, default: 'set title prop'
    },
    btnAddName: {
      type: String, default: 'set add name btn'
    },
    storeBase: {
      type: String, required: true
    },
    modalAddStateName: {
      type: String, required: true
    },
    modalEditStateName: {
      type: String, required: true
    },
    messageBaseName: {
      type: String, required: true
    },
    filterCriteriaProps: {
      type: Array, default: () => []
    },
    currentPageModalsFolderName: {
      type: String, required: true
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
        return state[this.storeBase].dataContext
      }, 
      itemContext (state) {
        return state[this.storeBase].itemContext
      } 
    }),

    currentPage: {
      get () {
        return this.$store.state[this.storeBase].currentPageOnTable
      },
      set(value) {
        this.$store.commit(`${this.storeBase}/${UPDATE_CURRENT_PAGE_ON_TABLE}`, value)
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
            if (itemContext[this.filterCriteriaProps[index]].includes(textToSearchLowerCase)) {
              return true
            }
          }
        })
      
      // if have dataContextFiltered set as current page the first 
      if (dataContextFiltered < this.dataContext)
        this.$store.commit(`${this.storeBase}/${UPDATE_CURRENT_PAGE_ON_TABLE}`, 1)
      
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
        await this.$store.dispatch(`${this.storeBase}/getDataContext`)
      },
      async getItemContext ({}, id) {
        await this.$store.dispatch(`${this.storeBase}/getItemContext`, { id })
      },
      async deleteItemContext ({}, id) {
        await this.$store.dispatch(`${this.storeBase}/deleteItemContext`, { id })
      }
    }),

    ...mapMutations({
      setDynamicMainModal ({}, modalStateName) {
        this.$store.commit(`modalsVisibilities/${SET_DYNAMIC_MAIN_MODAL}`, modalStateName)
      },
      setCurrentPageModalsFolderName () {
        this.$store.commit(`modalsVisibilities/${SET_CURRENT_PAGE_MODALS_FOLDER_NAME}`, this.currentPageModalsFolderName)
      }
    }),

    /**
     * set the name of modalAddItemContext as dynamic component
     * on layouts/default.vue & set his visibility state
     * 
     * @param {String} modalAddStateName
     */
    openModalAddItemContext () {
      this.setDynamicMainModal(this.modalAddStateName)
      this.setVisibleModalStateNameAfterDelay(this.modalAddStateName)     
    },

    /**
     * fetching the itemContext by his id
     * set the name of modalEditStateName as dynamic component
     * on layouts/default.vue & set his visibility state
     * 
     * @param {Number} id
     * @param {String} modalEditStateName
     */
    async openModalEditItemContext ({ id }) {
      try {
        await this.getItemContext(id)

        this.setDynamicMainModal(this.modalEditStateName)
        this.setVisibleModalStateNameAfterDelay(this.modalEditStateName)
      } 
      catch (e) {}   
    },

    /**
     * receives the selected itemContext from btn-confirm component
     * to be deleted & fetch DataContext again to update everything
     * 
     * @param {Object} itemSelected
     */
    async confirmedActionDeleteItemContext({ itemSelected }) {
      try {
        await this.deleteItemContext(itemSelected.id)
        this.$toast.success(this.$SUCCESS[this.messageBaseName].DELETED)

        // await this.$_pageBodyTableMixin_getDataContext()
        
        // let currentPage = this.$store.state[this.storeBase].currentPageOnTable

        // // if number of pages is minor that the current page, (when delete)
        // if (this.dataContext.length / ROWS_PER_PAGE_ON_TABLE <= (currentPage - 1)) {
        //   currentPage--
        // }
        // // setting currentPage before to submit deleteItemContext and getDataContext
        // // to set it again as currentPage to prevent go to page 1 when fetch the dataContext
        // this.$store.commit(`${this.storeBase}/${UPDATE_CURRENT_PAGE_ON_TABLE}`, currentPage)
      } 
      catch (e) {}
    },

    initPageSettings () {
      this.criteriaLength = this.filterCriteriaProps.length
      this.setCurrentPageModalsFolderName()
    },

    async fetchDataContext () {
      try {
        await this.getDataContext()
      } 
      catch (e) {}
    },

    /**
     * using little delay to prevent stranger transition when open modal
     * present when using dynamic components & and set visibility state as true

     * @param {String} modalStateName 
     */
    setVisibleModalStateNameAfterDelay(modalStateName) {
      setTimeout(() => this.$_modalVisibilityMixin_open(modalStateName), 250)
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

<style>
.fit-page-body {
  width: fit-page-body;
}
</style>
