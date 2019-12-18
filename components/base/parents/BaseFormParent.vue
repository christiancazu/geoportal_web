<script>
import BaseForm from '@/components/base/BaseForm'

export default {
  components: {
    BaseForm
  },

  props: {
    storeMounted: { type: String, default: '' }
  },

  created () {
    if (this.storeMounted !== '')
      this.$store.commit(`${this.storeMounted}/SET_DIALOG_TITLE`, this.dialogTitle)
  },

  methods: {
    closeModal () {
      this.$store.commit(`${this.storeMounted}/CLOSE_MODAL`)
    }
  }
}
</script>