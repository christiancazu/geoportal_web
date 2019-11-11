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
        component: { type: String, required: true },
        folderName: { type: String, required: true },
        tooltip: { type: String, required: true }
      })
    }
  },

  methods: {
    /**
     * setting folderName for secondModal
     * seetting secondModal state to be visible
     */
    openSecondModal () {
      this.$store.dispatch('modalsVisibilities/openModal', {
        modalType: 'secondModal',
        component: this.modalSecond.component,
        folderName: this.modalSecond.folderName
      })
    }
  }
}
</script>
