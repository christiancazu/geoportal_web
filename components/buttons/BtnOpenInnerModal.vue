<template>
<el-tooltip
  :content="modal.tooltip"
  placement="top"
>
  <el-button
    icon="el-icon-circle-plus"
    circle
    type="text"
    class="pa-0 pl-1 ma-0"
    style="font-size: 1.7rem;"
    :disabled="$store.state.spinners.processingForm"
    @click="openModal()"
  />
</el-tooltip>
</template>

<script>
export default {
  props: {
    modal: {
      type: Object,
      default: () => ({
        wrapperBaseModal: { type: Boolean, default: false },
        folderRoot: { type: String, default: 'components' },
        folderName: { type: String, default: 'base' },
        storeParent: { type: String, default: 'base' },
        store: { type: String, default: 'base' },
        component: { type: String, default: 'BaseModal' },
        tooltip: { type: String, required: true }
      })
    }
  },

  methods: {
    /**
     * setting folderRoot, folderName, component for secondModal
     * setting secondModal state to be visible
     */
    openModal () {
      console.warn('gaaaaaa', this.modal)
      if (this.modal.wrapperBaseModal) {
        this.setComponentOnBaseModal()
      }
      else {
        this.$store.dispatch(`${this.modal.storeParent}/openInnerModal`, {
          folderRoot: this.modal.folderRoot,
          folderName: this.modal.folderName,
          component: this.modal.component
        })
        this.$store.dispatch(`${this.modal.store}/openModal`, {
          folderRoot: this.modal.folderRoot,
          folderName: this.modal.folderName,
          component: this.modal.component
        })
      }
    },

    setComponentOnBaseModal () {
      console.warn('setComponentOnBaseModal', this.modal.storeParent)
      this.$store.dispatch(`${this.modal.storeParent}/openInnerModal`, {
        folderRoot: 'components',
        folderName: 'wrappers',
        storeParent: this.modal.storeParent,
        component: 'ModalWrapper'
        // folderRoot: this.modal.folderRoot,
        // folderName: this.modal.folderName,
        // component: this.modal.component
      })
      // this.$store.commit('modalsVisibilities/SET_COMPONENT_ON_BASE_MODAL', {
      //   folderRoot: this.modal.folderRoot,
      //   folderName: this.modal.folderName,
      //   component: this.modal.component
      // })
      // this.modal.folderRoot = 'components'
      // this.modal.folderName = 'base'
      // this.modal.component = 'BaseModal'
    }
  }
}
</script>
