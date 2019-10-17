import Vue from 'vue'
import { mapMutations } from "vuex"

Vue.mixin({
  methods: {
    ...mapMutations({
      OPEN_MODAL: 'modalsVisibility/OPEN_MODAL',
      CLOSE_MODAL: 'modalsVisibility/CLOSE_MODAL'
    }),

    $_modalsVisibilityMixin_open(stateName) {
      this.OPEN_MODAL(stateName)
    },
    $_modalsVisibilityMixin_close(stateName) {
      this.CLOSE_MODAL(stateName)
    }
  }
})