<script>
import BaseForm from '@/components/base/BaseForm'

export default {
  components: {
    BaseForm
  },

  created () {
    console.warn('xasda')
    this.$store.commit(`${this.store.name}/SET_DIALOG_TITLE`, this.dialogTitle)
  }
}
</script>