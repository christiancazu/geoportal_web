<template>
<base-modal
  title="Editar imagen georeferenciada"
  name-state="modalEditgeoreferencedImage"
  :show-modal="modalEditGeoreferencedImage"
>
  <template v-slot:content>
    <el-form
      ref="form"
      label-position="top"
      status-icon
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="processingForm"
      @submit.prevent="submitForm"
    />
  </template>
  <template v-slot:actions>
    <el-button
      size="small"
      :disabled="processingForm"
      @click="$_modalVisibilityMixin_close('modalEditgeoreferencedImage')"
    >CANCELAR</el-button>
    <el-button
      size="small"
      :loading="processingForm"
      type="primary"
      native-type="submit"
      @click.prevent="submitForm"
    >GUARDAR</el-button>
  </template>
</base-modal>
</template>
<script>
import { mapState } from 'vuex'
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  components: {
    BaseModal
  },

  data () {
    return {
      form: {},
      processingForm: false,

      rules: {}
    }
  },

  computed: {
    ...mapState({
      modalEditGeoreferencedImage: state => state.modalsVisibilities.modalEditGeoreferencedImage
    })
  },

}
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>