<template>
<el-dialog
  :title="dialogTitle"
  :close-on-click-modal="false"
  :visible="$store.state[store.name].modal.visible"
  append-to-body
  destroy-on-close
  top="2vh"
  class="dialog-responsive"
  @close="closeModal()"
>
  <slot name="modal-content" />

</el-dialog>
</template>

<script>
import {
  CLOSE_MODAL
} from '@/types/mutation-types'

export default {
  props: {
    store: {
      type: Object,
      default: () => ({
        name: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    dialogTitle: { type: String, default: 'DIALOG TITLE' },
  },

  methods: {
    closeModal () {
      this.$emit('close-modal')
      this.$store.commit(`${this.store.name}/${CLOSE_MODAL}`)
    },
  }

}
</script>
