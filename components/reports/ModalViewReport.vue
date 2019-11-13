<template>
<base-modal
  :form-title="formTitle"
  :context="context"
>
  <template v-slot:content>

    <div class="text-request">
      <label class="text-uppercase">{{ `${itemContext.user}` }}</label>
      <p class="text-uppercase ma-0">{{ `${itemContext.subject}` }}</p>
    </div>
    <div class="my-3 text-request">
      <label class="text-uppercase">Descripción del reporte: </label>
      <p class="text-capitalize ma-0"> {{ `${itemContext.description}` }}</p>
    </div>
    <el-image
      :src="itemContext.image"
      fit="contain"
      class="image-report"
    >
      <div
        slot="placeholder"
        class="image-slot"
      >
        Loading<span class="dot">...</span>
      </div>
    </el-image>

  </template>
</base-modal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue'

import { mapState } from 'vuex'

export default {
  components: {
    BaseModal
  },

  props: {
    // eslint-disable-next-line vue/prop-name-casing
    modalBaseActionsMixin_mountedOn: { type: String, required: true }
  },

  data () {
    return {
      formTitle: 'Detalle del reporte',

      context: {
        mountedOn: this.modalBaseActionsMixin_mountedOn
      },

      storeBase: 'reports'
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.storeBase].itemContext
      }
    })
  }
}
</script>
<style lang="scss">
.text-request {
  line-height: 1.2rem;
  letter-spacing: 0.4px;
}
.d-flex {
  display: flex;
}
</style>