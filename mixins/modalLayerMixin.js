import { mapMutations } from "vuex"

export default {
  methods: {
    ...mapMutations({
      CLOSE_MODAL_LAYER: 'modalsManagementLayer/CLOSE_MODAL_LAYER'
    }),

    $_modalLayerMixin_closeModal (modalName) {
      this.CLOSE_MODAL_LAYER(modalName)
      this.$refs.form.resetFields()
    }
  }
}