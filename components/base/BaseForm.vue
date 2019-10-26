<template>
  <el-dialog
    :title="formTitle"
    :close-on-click-modal="false"
    :visible="$store.state.modalsVisibilities[modalStateName]"
    @close="$_modalVisibilityMixin_close(modalStateName)"
    top="2vh"
  >
    <el-form
      ref="form"
      label-position="top"
      status-icon
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="$store.state.spinners.processingForm"
    >

      <slot name="content"/>

    </el-form>

    <el-button
      size="small"
      @click="$_modalVisibilityMixin_close(modalStateName)"
    >
      CANCELAR
    </el-button>
    <el-button
      type="primary"
      size="small"
      native-type="submit"
      :loading="$store.state.spinners.processingForm"
      @click="submit"
    >
      GUARDAR
    </el-button>
  </el-dialog>
</template>

<script>
import objectToFormDataMixin from '@/mixins/objectToFormDataMixin'

import { mapActions } from 'vuex'

export default {
  mixins: [objectToFormDataMixin],

  props: {
    form: {
      type: Object, required: true
    },
    rules: {
      type: Object
    },
    storeBase: {
      type: String,  required: true
    },
    storeAction: {
      type: String,  required: true
    },
    modalStateName: {
      type: String, required: true
    },
    formTitle: {
      type: String, default: ""
    },
    messageToastBaseName: {
      type: String, required: true
    },
    messageToastAction: {
      type: String, required: true
    },
  },

  methods: {
    ...mapActions({
      async createItemContext (store, form) {
        await this.$store.dispatch(`${this.storeBase}/${this.storeAction}ItemContext`, { data: form })
      },
    }),

    async submit () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)
      if (isFormValid) {
        const formData = this.objectToFormData();
        
        try {
          await this.createItemContext(formData)

          this.resetForm()
          this.$toast.success(this.$SUCCESS[this.messageToastBaseName][this.messageToastAction])
          this.getVectorialLayers()
          this.$_modalVisibilityMixin_close(this.modalStateName)
        } 
        catch (e) {}
      }
    },

    objectToFormData () {
      const formData = new FormData();

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })

      return formData
    },

    resetForm () {
      this.$emit('reset-form')
      this.$refs.form.resetFields()
    }
  
  }
}
</script>
