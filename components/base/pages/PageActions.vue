<template>
<base-page
  :page-header="pageHeader"
  :store-base="storeBase"
  @open-add-modal="openModalAddItemContext()"
>
  <el-container direction="vertical">
    <!-- input filter table -->
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

    <!-- table -->
    <el-table
      v-loading="$store.state.spinners.loadingTable"
      :data="filteredDataContext.slice((currentPage-1) * pagesize, currentPage * pagesize)"
    >

      <slot
        name="page-table"
        :openModalEditItemContext="openModalEditItemContext"
        :deleteItemContext="deleteItemContext"
        :shrinkText="$options.filters.shrinkText"
        :openModalViewItemContext="openModalViewItemContext"
      />

    </el-table>

    <el-pagination
      class="pt-4 text-xs-right"
      :pager-size="100"
      :page-size="pagesize"
      :total="dataContext.length"
      :current-page="currentPage"
      layout="prev, pager, next, sizes"
      small
      @current-change="onChangeCurrentPage"
      @size-change="onChangePageSize"
    />

  </el-container>

  <base-modal
    :modal="$store.state[storeBase.name].modalMain"
    modal-type="modalMain"
  >
    <template v-slot:modal-content>
      <component
        :is="dynamicComponent"
        :store-mounted="{ name: storeBase.name, typeModal: 'modalMain' }"
      />
    </template>
  </base-modal>

</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'
import BaseModal from '@/components/base/BaseModal'

import {
  mapState,
  mapActions
} from 'vuex'

import {
  SET_CURRENT_PAGE_ON_TABLE,
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  components: {
    BasePage,
    BaseModal
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
        ? `${text.substring(0, 16)}…`
        : text
    }
  },

  props: {
    pageHeader: {
      type: Object,
      default: () => ({
        title: { type: String, required: true },
        btnAddName: { type: String, required: false }
      })
    },
    storeBase: {
      type: Object,
      default: () => ({
        name: { type: String, required: true }
      })
    },
    modalMain: {
      type: Object,
      default: () => ({
        addComponent: { type: Object, default: () => ({}) },
        editComponent: { type: Object, default: () => ({}) },
        viewComponent: { type: Object, default: () => ({}) }
      })
    },
    messageToast: {
      type: Object,
      default: () => ({
        baseName: { type: String, required: false }
      })
    },
    filterCriteriaProps: {
      type: Array, default: () => []
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
      dataContext () {
        return this.$store.state[this.storeBase.name].dataContext
      },
      itemContext () {
        return this.$store.state[this.storeBase.name].itemContext
      }
    }),

    currentPage: {
      get () {
        return this.$store.state[this.storeBase.name].currentPageOnTable
      },
      set (value) {
        this.$store.commit(`${this.storeBase.name}/${SET_CURRENT_PAGE_ON_TABLE}`, value)
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
        this.$store.commit(`${this.storeBase.name}/${SET_CURRENT_PAGE_ON_TABLE}`, 1)

      return dataContextFiltered
    },

    dynamicComponent () {
      const { type, folderPath, name } = this.$store.state[this.storeBase.name].modalMain
      return type === 'page'
        ? () => import(`@/pages/${folderPath}/${name}`)
        : () => import(`@/components/${folderPath}/${name}`)
    }
  },

  created () {
    this.init()
  },

  methods: {
    ...mapActions({
      async getDataContext () {
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'loadingTable')
        await this.$store.dispatch(`${this.storeBase.name}/getDataContext`)
        this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'loadingTable')

      },
      async getItemContext ({}, id) {
        await this.$store.dispatch(`${this.storeBase.name}/getItemContext`, id)
      },

      setDynamicComponentAsModalMain ({}, component) {
        this.$store.dispatch(`${this.storeBase.name}/setDynamicModal`, {
          typeModal: 'modalMain',
          component
        })
      }
    }),

    /**
     * set the name of modal.addComponent as dynamic main modal component
     * on layouts/default.vue & set his visibility state
     *
     */
    openModalAddItemContext () {
      this.setDynamicComponentAsModalMain(this.modalMain.addComponent)
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

        this.setDynamicComponentAsModalMain(this.modalMain.editComponent)
      }
      catch (e) {}
    },

    async openModalViewItemContext ({ id }) {
      try {
        await this.getItemContext(id)

        this.setDynamicComponentAsModalMain(this.modalMain.viewComponent)
      }
      catch (e) {}
    },

    /**
     * receives the selected itemContext and destructuring his id from btn-confirm component
     * to be deleted & fetch DataContext again to update everything
     *
     * @param {Object} itemSelected
     */
    async deleteItemContext ({ itemSelected: { id } }) {
      try {
        await this.$store.dispatch(`${this.storeBase.name}/deleteItemContext`, id)

        this.$toast.success(this.$SUCCESS[this.messageToast.baseName].DELETED)

        // getting dataContext again to see updates
        await this.getDataContext()

        let currentPage = this.$store.state[this.storeBase.name].currentPageOnTable

        // if number of pages is minor that the current page, (apply just when delete)
        if (this.dataContext.length / ROWS_PER_PAGE_ON_TABLE <= (currentPage - 1)) {
          currentPage--
        }
        // setting currentPage before to submit deleteItemContext and getDataContext
        // to set it again as currentPage to prevent go to page 1 when fetch the dataContext
        this.$store.commit(`${this.storeBase.name}/${SET_CURRENT_PAGE_ON_TABLE}`, currentPage)
      }
      catch (e) {}
    },

    async init () {
      this.criteriaLength = this.filterCriteriaProps.length
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
