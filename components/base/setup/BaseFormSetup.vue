<script>
import BaseForm from '@/components/base/BaseForm'

import {
  SET_MODAL_TITLE,
  CLOSE_MODAL
} from '@/types/mutations'

export default {
  components: {
    BaseForm
  },

  props: {
    storeMounted: { type: Object, default: () => ({}) }
  },

  created () {
    /**
     * Setting title on modal if storeMounted prop is passed
     */
    if (this.storeMounted)
      this.$store.commit(`${this.storeMounted.name}/${SET_MODAL_TITLE}`, {
        typeModal: this.storeMounted.typeModal,
        dialogTitle: this.dialogTitle
      })
  },

  methods: {
    /**
     * mutating CLOSE_MODAL on his storeMounted when close btn is clicked
     */
    closeModal () {
      this.$store.commit(`${this.storeMounted.name}/${CLOSE_MODAL}`, this.storeMounted.typeModal)
    }
  }
}
</script>