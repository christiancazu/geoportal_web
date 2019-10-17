import { mapMutations } from "vuex"

export default {
  methods: {
    ...mapMutations({
      SHOW_MODAL: 'modals/SHOW_MODAL',
      CLOSE_MODAL: 'modals/CLOSE_MODAL'
    }),
    showModal (stateName) {
      this.SHOW_MODAL(stateName)
    },
    closeModal (stateName) {
      this.SHOW_MODAL(stateName)
      this.$refs.form.resetFields()
    }
  }
}