<script>
import BasePage from '@/components/base/pages/BasePage'

import {
  SET_CURRENT_PAGE_ON_TABLE,
  DISABLE_LOADING_TABLE,
  ENABLE_LOADING_TABLE
} from '@/types/mutation-types'

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
        await this.$store.dispatch(`${this.modalMain.storeBase}/getItemContext`, id)
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