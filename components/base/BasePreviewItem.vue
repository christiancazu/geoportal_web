<template>
<el-dialog
  :title="formTitle"
  :close-on-click-modal="false"
  :visible="$store.state.modalsVisibilities[context.mountedOn].visibility"
  top="2vh"
  class="dialog-responsive"
  @close="closeModal()"
>
  <slot name="content" />

  <!-- actions -->
  <div class="text-xs-center">
    <el-button
      size="small"
      @click="closeModal()"
    >
      CERRAR
    </el-button>
  </div>

</el-dialog>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String, default: ''
    },
    context: {
      type: Object,
      default: () => ({
        storeBase: { type: String, required: true },
        mountedOn: { type: String, required: true },
        storeAction: { type: String, required: true }
      })
    },
  },

  methods: {
    closeModal () {
      this.$store.commit('modalsVisibilities/CLOSE_MODAL', this.context.mountedOn)
    }
  }

}
</script>
