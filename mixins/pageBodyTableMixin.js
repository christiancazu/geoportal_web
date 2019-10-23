import BasePage from '@/components/base/BasePage'
import BasePageHeader from "@/components/base/BasePageHeader"
import BasePageBodyTable from "@/components/base/BasePageBodyTable"
import BtnConfirm from "@/components/base/BaseBtnConfirm"

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    BasePage,
    BasePageHeader,
    BasePageBodyTable,
    BtnConfirm
  },

  filters: {
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
      currentItemContext (state) {
        return state[this.storeBase].currentItemContext
      } 
    }),

    $_pageBodyTableMixin_filteredData () {
      let textToSearchLowerCase = this.pageBodyTableMixin_textToSearch.toLowerCase()
      
      return this.dataContext
        .filter(layer => {
          for (let index = 0; index < this.pageBodyTableMixin_criteriaLength; index++) {
            if (layer[this.criteriaProps[index]].includes(textToSearchLowerCase)) {
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
      getDataContext () {
        this.$store.dispatch(`${this.storeBase}/getDataContext`)
      },
      getItemContext (store, id) {
        this.$store.dispatch(`${this.storeBase}/getItemContext`, { id })
      }
    }),

    initPageSettings () {
      this.pageBodyTableMixin_criteriaLength = this.criteriaProps.length
    },

    async fetchDataContext () {
      try {
        await this.getDataContext()
      } 
      catch (e) {}
    },
  }
}