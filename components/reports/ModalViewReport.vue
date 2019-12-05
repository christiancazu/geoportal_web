<template>
<base-preview-item
  :form-title="formTitle"
  :context="context"
>
  <template v-slot:content>

    <div class="text-request">
      <p class="my-2">
        <strong>Usuario: </strong>
        {{ `${itemContext.user}` }}
      </p>
      <p class="my-2">
        <strong>Asunto: </strong>
        {{ `${itemContext.subject}` }}
      </p>
    </div>
    <div class="my-2">
      <p>
        <strong>Descripción del reporte: </strong>
      </p>
      <p class="my-2"> {{ `${itemContext.description}` }}</p>
    </div>
    <el-image
      v-if="itemContext.image"
      :src="itemContext.image"
      fit="contain"
      class="image-report"
    >
      <div
        slot="placeholder"
        class="image-slot"
      >
        Cargando<span class="dot">...</span>
      </div>
    </el-image>

  </template>
</base-preview-item>
</template>

<script>
import BasePreviewItem from '@/components/base/BasePreviewItem.vue'

import { mapState } from 'vuex'

export default {
  components: {
    BasePreviewItem
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
