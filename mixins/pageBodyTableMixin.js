import BasePage from '@/components/base/BasePage'
import BasePageHeader from "@/components/base/BasePageHeader"
import BasePageBodyTable from "@/components/base/BasePageBodyTable"
import BtnConfirm from "@/components/base/BaseBtnConfirm"

import { mapState, mapActions, mapMutations } from 'vuex'

import { 
  SET_DYNAMIC_MAIN_MODAL,
  SET_CURRENT_PAGE_MODALS_FOLDER_NAME
} from '@/types/mutation-types'

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
      
      return this.dataContext
        .filter(itemContext => {
          for (let index = 0; index < this.pageBodyTableMixin_criteriaLength; index++) {
            if (itemContext[this.filterCriteriaProps[index]].includes(textToSearchLowerCase)) {
              return true
            }
          }
        })
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
      $_pageBodyTableMixin_setDynamicMainModal () {
        this.$store.commit(`modalsVisibilities/${SET_DYNAMIC_MAIN_MODAL}`, this.modalEditStateName)
      },

      $_pageBodyTableMixin_setCurrentPageModalsFolderName () {
        this.$store.commit(`modalsVisibilities/${SET_CURRENT_PAGE_MODALS_FOLDER_NAME}`, this.currentPageModalsFolderName)
      }
    }),
    /**
     * fetch the itemContext by his id
     * set state modalEditStateName as true to be displayed
     * 
     * @param {Number} id 
     */
    async $_pageBodyTableMixin_onLoadModalEditItemContext ({ id }) {
      try {
        await this.$_pageBodyTableMixin_getItemContext(id)

        this.$_pageBodyTableMixin_setDynamicMainModal()

        // using little delay to prevent stranger transition when open modal
        // present when using dynamic components
        setTimeout(() => this.$_modalVisibilityMixin_open(this.modalEditStateName), 250)
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
  }
}