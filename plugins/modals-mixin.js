import Vue from 'vue'
import { mapMutations } from "vuex"

Vue.mixin({
  methods: {
    ...mapMutations({
      SHOW_MODAL: 'modals/SHOW_MODAL',
      CLOSE_MODAL: 'modals/CLOSE_MODAL'
    }),

    openModal(stateName) {
      this.SHOW_MODAL(stateName)
    },
    closeModal(stateName) {
      this.CLOSE_MODAL(stateName)
    }
  }
})