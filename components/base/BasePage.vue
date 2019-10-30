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
        
        <slot name="page-header" 
          :openModalAddItemContext="openModalAddItemContext"
        />
      
      </div>

      <slot name="page-body"
        :openModalEditItemContext="openModalEditItemContext"
        :confirmedActionDeleteItemContext="confirmedActionDeleteItemContext"
        :textToSearch="textToSearchx"
      />

    </el-card>
  
  </div>
</template>

<script>
import { 
  SET_DYNAMIC_MAIN_MODAL,
  SET_CURRENT_PAGE_MODALS_FOLDER_NAME,
  UPDATE_CURRENT_PAGE_ON_TABLE
} from '@/types/mutation-types'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    pageHeaderTitle: {
      type: String, default: ''
    },
    storeBase: {
      type: String, required: true
    },
    messageBaseName: {
      type: String, required: true
    },
    fitContent: {
      type: Boolean, default: false
    },
    textToSearch: {
      type: String, default: ''
    }
  },

  watch: {
    textToSearch (val) {
      console.warn(val);
    }
  },

  methods: {
    ...mapActions({
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
      }
    }),

    textToSearchx (val) {
      console.warn(val)
    },

    /**
     * set the name of modalAddItemContext as dynamic component
     * on layouts/default.vue & set his visibility state
     * 
     * @param {String} modalAddStateName
     */
    openModalAddItemContext (modalAddStateName) {
      this.setDynamicMainModal(modalAddStateName)
      this.setVisibleModalStateNameAfterDelay(modalAddStateName)     
    },

    /**
     * fetching the itemContext by his id
     * set the name of modalEditStateName as dynamic component
     * on layouts/default.vue & set his visibility state
     * 
     * @param {Number} id
     * @param {String} modalEditStateName
     */
    async openModalEditItemContext ({ id }, modalEditStateName) {
      try {
        await this.getItemContext(id)

        this.setDynamicMainModal(modalEditStateName)
        this.setVisibleModalStateNameAfterDelay(modalEditStateName)
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

    /**
     * using little delay to prevent stranger transition when open modal
     * present when using dynamic components & and set visibility state as true

     * @param {String} modalStateName 
     */
    setVisibleModalStateNameAfterDelay(modalStateName) {
      setTimeout(() => this.$_modalVisibilityMixin_open(modalStateName), 250)
    }
  }
}
</script>

<style>
.fit-page-body {
  width: fit-page-body;
}
</style>
