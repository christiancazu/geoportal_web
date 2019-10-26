<template>
  <el-button
    size="mini"
    type="primary"
    icon="el-icon-plus"
    @click="onLoadFormAddItemContext()"
  >
    {{ btnAddName }}
  </el-button>
</template>

<script>
import { mapMutations } from 'vuex'

import { 
  SET_DYNAMIC_MAIN_MODAL
} from '@/types/mutation-types'

export default {
  props: {
    modalAddStateName: {
      type: String,
      required: true
    },
    btnAddName: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapMutations({
      setDynamicMainModal () {
        this.$store.commit(`modalsVisibilities/${SET_DYNAMIC_MAIN_MODAL}`, this.modalAddStateName)
      },
    }),

    onLoadFormAddItemContext () {
      this.setDynamicMainModal()
      // using little delay to prevent stranger transition when open modal
      // present when using dynamic components
      new Promise(() => setTimeout(() => this.$_modalVisibilityMixin_open(this.modalAddStateName), 250))      
    },
  }
}
</script>
