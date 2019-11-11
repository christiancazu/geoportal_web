import Vue from 'vue'
import { mapMutations } from 'vuex'

Vue.mixin({
  methods: {
    ...mapMutations({
      OPEN_MODAL: 'modalsVisibilities/OPEN_MODAL',
      CLOSE_MODAL: 'modalsVisibilities/CLOSE_MODAL'
    }),

    $_modalVisibilityMixin_open (stateName) {
      this.OPEN_MODAL(stateName)
    },

    $_modalVisibilityMixin_close (stateName) {
      this.CLOSE_MODAL(stateName)
    }
  }
})
