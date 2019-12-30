<template>
<el-dialog
  :title="title"
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
import { CLOSE_MODAL } from '@/types/mutations'

export default {
  props: {
    modal: {
      type: Object,
      default: () => ({
        store: { type: String, required: true },
        title: { type: String, default: ' ' }
      })
    },
    modalType: { type: String, required: true }
  },

  computed: {
    title () {
      return this.modal.title !== ' '
        ? this.modal.title
        : this.$store.state[this.modal.store][this.modalType].title
    }
  },

  methods: {
    closeModal () {
      this.$emit('close-modal')
      this.$store.commit(`${this.modal.store}/${CLOSE_MODAL}`, this.modalType)
    }
  }

}
</script>
