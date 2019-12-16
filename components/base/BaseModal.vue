<template>
<el-dialog
  :title="$store.state[modal.store][modal.type].title"
  :close-on-click-modal="false"
  :visible="$store.state[modal.store][modal.type].visible"
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
        store: { type: String, required: true },
        type: { type: String, required: false }
      })
    },
    dialogTitle: { type: String, default: 'DIALOG TITLE' },
  },

  watch: {
    modal: {
      handler: 'ttt',
      immediate: true
    }
  },

  methods: {
    closeModal () {
      this.$emit('close-modal')
      this.$store.commit(`${this.modal.store}/${CLOSE_MODAL}`, this.modal.type)
    },

    ttt () {
      console.log('CURRENT MODAL', this.$store.state[this.modal.store][this.modal.type])
    },
  }

}
</script>
