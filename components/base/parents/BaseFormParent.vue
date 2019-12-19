<script>
import BaseForm from '@/components/base/BaseForm'

export default {
  components: {
    BaseForm
  },

  props: {
    storeMounted: { type: Object, default: () => ({}) }
  },

  created () {
    if (this.storeMounted)
      this.$store.commit(`${this.storeMounted.name}/SET_DIALOG_TITLE`, {
        typeModal: this.storeMounted.typeModal,
        dialogTitle: this.dialogTitle
      })
  },

  methods: {
    closeModal () {
      this.$store.commit(`${this.storeMounted.name}/CLOSE_MODAL`, this.storeMounted.typeModal)
    }
  }
}
</script>