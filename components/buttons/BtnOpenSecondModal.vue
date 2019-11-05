<template>
<el-tooltip :content="modalSecond.tooltip" placement="top">
  <el-button
    icon="el-icon-circle-plus"
    circle
    type="text"
    class="pa-0 pl-1 ma-0"
    style="font-size: 1.7rem;"
    :disabled="$store.state.spinners.processingForm"
    @click="setVisibleModalSecondStateNameAfterDelay()"
  />
</el-tooltip>
</template>

<script>
export default {
  props: {
    modalSecond: { 
      type: Object, 
      default: () => ({
        folderName: { type: String, required: true },
        stateName: { type: String, required: true },
        tooltip: { type: String, required: true }
      })
    }
  },

  methods: {
    /**
     * setting folderName for secondModal
     * seetting secondModal state to be visible
     */
    setVisibleModalSecondStateNameAfterDelay() {
      this.$store.commit('modalsVisibilities/SET_MODAL_SECOND_FOLDER_NAME', this.modalSecond.folderName)
      this.$store.commit('modalsVisibilities/SET_DYNAMIC_SECOND_MODAL', this.modalSecond.stateName)
      setTimeout(() => { this.$_modalVisibilityMixin_open(this.modalSecond.stateName) }, 250);
    }
  }
}
</script>
