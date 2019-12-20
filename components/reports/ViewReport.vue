<template>
<div>
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
      Cargando
      <span class="dot">...</span>
    </div>
  </el-image>
</div>
</template>

<script>
import { mapState } from 'vuex'

import {
  SET_MODAL_TITLE
} from '@/types/mutations'

export default {
  props: {
    storeMounted: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      dialogTitle: 'Detalle del reporte',

      storeBase: {
        name: 'reports'
      }
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.storeBase.name].itemContext
      }
    })
  },

  created () {
    if (this.storeMounted)
      this.$store.commit(`${this.storeMounted.name}/${SET_MODAL_TITLE}`, {
        typeModal: this.storeMounted.typeModal,
        dialogTitle: this.dialogTitle
      })
  }
}
</script>
