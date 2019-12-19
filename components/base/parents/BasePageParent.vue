<script>
import BasePage from '@/components/base/pages/BasePage'

import {
  SET_CURRENT_PAGE_ON_TABLE,
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

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
    }
  },

  created () {
    this.initPageSettings()
    this.fetchDataContext()
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
        this.$store.dispatch(`${this.storeBase.name}/openModal`, {
          typeModal: 'modalMain',
          component
        })
      }
    }),

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
