<template>
<el-tooltip
  :content="modalSecond.tooltip"
  placement="top"
>
  <el-button
    icon="el-icon-circle-plus"
    circle
    type="text"
    class="pa-0 pl-1 ma-0"
    style="font-size: 1.7rem;"
    :disabled="$store.state.spinners.processingForm"
    @click="openSecondModal()"
  />
</el-tooltip>
</template>

<script>
export default {
  props: {
    modalSecond: {
      type: Object,
      default: () => ({
        wrapperBaseModal: { type: Boolean, default: false },
        component: { type: String, default: 'BaseModal' },
        folderRoot: { type: String, default: 'components' },
        folderName: { type: String, default: 'base' },
        tooltip: { type: String, required: true }
      })
    }
  },

  methods: {
    /**
     * setting folderRoot, folderName, component for secondModal
     * setting secondModal state to be visible
     */
    openSecondModal () {
      if (this.modalSecond.wrapperBaseModal) {
        this.setComponentOnBaseModal()

      }
      this.$store.dispatch('modalsVisibilities/openModal', {
        modalType: 'secondModal',
        folderRoot: this.modalSecond.folderRoot,
        folderName: this.modalSecond.folderName,
        component: this.modalSecond.component
      })
    },

    setComponentOnBaseModal () {
      this.$store.commit('modalsVisibilities/SET_COMPONENT_ON_BASE_MODAL', {
        folderRoot: this.modalSecond.folderRoot,
        folderName: this.modalSecond.folderName,
        component: this.modalSecond.component
      })
      this.modalSecond.folderRoot = 'components'
      this.modalSecond.folderName = 'base'
      this.modalSecond.component = 'BaseModal'
    }
  }
}
</script>
