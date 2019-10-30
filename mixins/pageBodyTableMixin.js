import BasePage from '@/components/base/BasePage'
import BasePageHeader from "@/components/base/BasePageHeader"
import BasePageBodyTable from "@/components/base/BasePageBodyTable"
import BtnConfirm from "@/components/base/BaseBtnConfirm"

import { mapState, mapActions, mapMutations } from 'vuex'

import { 
  SET_DYNAMIC_MAIN_MODAL,
  SET_CURRENT_PAGE_MODALS_FOLDER_NAME,
  UPDATE_CURRENT_PAGE_ON_TABLE
} from '@/types/mutation-types'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  components: {
    BasePage,
    BasePageHeader,
    BasePageBodyTable,
    BtnConfirm
  },

  filters: {
    /**
     * shrink text if is major that 16 characters
     * to prevent long heights of rows on table
     * 
     * @param {String} text 
     */
    $_pageBodyTableMixin_shrinkText (text) {
      return text.length > 16 ? `${text.substring(0, 16)}<i class="fas fa-ellipsis-h"></i>` : text
    }
  },

  data () {
    return {
      pageBodyTableMixin_textToSearch: '',
      pageBodyTableMixin_criteriaLength: 0
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

    /**
     * filtering data based on @param {Array} filterCriteriaProps
     * 
     */
    $_pageBodyTableMixin_filteredDataContext () {
      let textToSearchLowerCase = this.pageBodyTableMixin_textToSearch.toLowerCase()
      
      const dataContextFiltered = this.dataContext
        .filter(itemContext => {
          for (let index = 0; index < this.pageBodyTableMixin_criteriaLength; index++) {
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
      async $_pageBodyTableMixin_getDataContext () {
        await this.$store.dispatch(`${this.storeBase}/getDataContext`)
      },
      async $_pageBodyTableMixin_getItemContext (store, id) {
        await this.$store.dispatch(`${this.storeBase}/getItemContext`, { id })
      },
      async $_pageBodyTableMixin_deleteItemContext (store, id) {
        await this.$store.dispatch(`${this.storeBase}/deleteItemContext`, { id })
      }
    }),

    ...mapMutations({
      $_pageBodyTableMixin_setDynamicMainModal (store, modalStateName) {
        this.$store.commit(`modalsVisibilities/${SET_DYNAMIC_MAIN_MODAL}`, modalStateName)
      },

      $_pageBodyTableMixin_setCurrentPageModalsFolderName () {
        this.$store.commit(`modalsVisibilities/${SET_CURRENT_PAGE_MODALS_FOLDER_NAME}`, this.currentPageModalsFolderName)
      }
    }),

    $_pageBodyTableMixin_onLoadModalAddItemContext () {
      this.$_pageBodyTableMixin_setDynamicMainModal(this.modalAddStateName)
      this.setVisibilityModalStateNameAfterDelay(this.modalAddStateName)     
    },

    initPageSettings () {
      this.pageBodyTableMixin_criteriaLength = this.filterCriteriaProps.length
      this.$_pageBodyTableMixin_setCurrentPageModalsFolderName()
    },

    async fetchDataContext () {
      try {
        await this.$_pageBodyTableMixin_getDataContext()
      } 
      catch (e) {}
    }
  }
}