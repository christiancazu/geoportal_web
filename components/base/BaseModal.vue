<template>
<el-dialog
  :title="$store.state[modal.store][modalType].title"
  :close-on-click-modal="false"
  :visible="$store.state[modal.store][modalType].visible"
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
    modal: {
      type: Object,
      default: () => ({
        store: { type: String, required: true }
      })
    },
    modalType: { type: String, required: true }
  },

  methods: {
    closeModal () {
      this.$store.commit(`${this.modal.store}/${CLOSE_MODAL}`, this.modalType)
    }
  }

}
</script>
