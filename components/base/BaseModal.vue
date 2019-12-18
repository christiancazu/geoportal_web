<template>
<el-dialog
  :title="$store.state[modalMain.store].modalMain.title"
  :close-on-click-modal="false"
  :visible="$store.state[modalMain.store].modalMain.visible"
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
    modalMain: {
      type: Object,
      default: () => ({
        store: { type: String, required: true },
        // type: { type: String, required: false }
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
      this.$store.commit(`${this.modalMain.store}/${CLOSE_MODAL}`)
    },

    ttt () {
      console.log('CURRENT MODAL', this.$store.state[this.modalMain.store].modalMain)
    },
  }

}
</script>
