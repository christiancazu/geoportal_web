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

    /**
     * fetch the itemContext by his id
     * set state modalEditStateName as true to be displayed
     * 
     * @param {Number} id 
     */
    async $_pageBodyTableMixin_onLoadModalEditItemContext ({ id }) {
      try {
        await this.$_pageBodyTableMixin_getItemContext(id)

        this.$_pageBodyTableMixin_setDynamicMainModal(this.modalEditStateName)
        this.setVisibilityModalStateNameAfterDelay(this.modalEditStateName)
      } 
      catch (e) {}
    },

    /**
     * receives the selected itemContext from btn-confirm component
     * to be deleted & fetch DataContext again to update everything
     * 
     * @param {Object} itemSelected 
     */
    async $_pageBodyTableMixin_confirmedActionDeleteItemContext ({ itemSelected }) {
      try {
        await this.$_pageBodyTableMixin_deleteItemContext(itemSelected.id)
        this.$toast.success(this.$SUCCESS[this.messageBaseName].DELETED)

        await this.$_pageBodyTableMixin_getDataContext()
        
        let currentPage = this.$store.state[this.storeBase].currentPageOnTable

        // if number of pages is minor that the current page, (when delete)
        if (this.dataContext.length / ROWS_PER_PAGE_ON_TABLE <= (currentPage - 1)) {
          currentPage--
        }
        // setting currentPage before to submit deleteItemContext and getDataContext
        // to set it again as currentPage to prevent go to page 1 when fetch the dataContext
        this.$store.commit(`${this.storeBase}/${UPDATE_CURRENT_PAGE_ON_TABLE}`, currentPage)
      } 
      catch (e) {}
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
    },

    /**
     * using little delay to prevent stranger transition when open modal
     * present when using dynamic components

     * @param {String} modalStateName 
     */
    setVisibilityModalStateNameAfterDelay(modalStateName) {
      setTimeout(() => this.$_modalVisibilityMixin_open(modalStateName), 250)
    }
  }
}