<template>
<el-form
  ref="form"
  label-position="top"
  status-icon
  :model="form"
  :rules="rules"
  label-width="120px"
  class="demo-ruleForm"
  :disabled="$store.state.spinners.processingForm"
  autocomplete="off"
>
  <slot name="form-content" />

  <!-- actions -->
  <div class="text-xs-center">
    <el-button
      v-if="!isMountedAsPage"
      size="small"
      @click="closeModal()"
    >
      CERRAR
    </el-button>
    <el-button
      type="primary"
      size="small"
      native-type="submit"
      :loading="$store.state.spinners.processingForm"
      @click.prevent="submitForm"
    >
      GUARDAR
    </el-button>

    <template v-if="canPublish">
      <el-button
        type="success"
        size="small"
        :loading="$store.state.spinners.processingForm"
        @click.prevent="submitPublish"
      >
        PUBLICAR
      </el-button>
    </template>
  </div>

</el-form>
</template>

<script>
import { mapActions } from 'vuex'

import {
  SET_PUBLISHED_ITEM_CONTEXT,
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

export default {
  props: {
    form: {
      type: Object, required: true
    },
    rules: {
      type: Object, required: true
    },
    storeBase: {
      type: Object,
      default: () => ({
        name: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    messageToast: {
      type: Object,
      default: () => ({
        baseName: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    isMountedAsPage: {
      type: Boolean, default: false
    }
  },

  computed: {
    canPublish: {
      get () {
        if (typeof this.$store.state[this.storeBase.name].itemContext.isPublished === 'undefined') return false
        return !this.$store.state[this.storeBase.name].itemContext.isPublished && this.storeBase.action === 'update'
      },
      set (value) {
        this.$store.commit(`${this.storeBase.name}/${SET_PUBLISHED_ITEM_CONTEXT}`, value)
      }
    }
  },

  methods: {
    ...mapActions({
      async getDataContext () {
        await this.$store.dispatch(`${this.storeBase.name}/getDataContext`)
      },
      async submitItemContext ({}, formData) {
        await this.$store.dispatch(`${this.storeBase.name}/${this.storeBase.action}`, formData)
      },
      async publishItemContext ({}, formData) {
        await this.$store.dispatch(`${this.storeBase.name}/publishItemContext`, formData)
      }
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

        const formData = this.objectToFormData()

        // used when need to apply custom functionality/fix on formData before to be sends
        this.$emit('apply-before-submit-form', formData)
        try {
          await this.submitItemContext(formData)

          if (this.storeBase.action === 'createItemContext') {
            this.resetForm()
          }

          this.$toast.success(this.$SUCCESS[this.messageToast.baseName][this.messageToast.action])

          await this.getDataContext()

          this.$emit('apply-after-submit-form')
        }
        catch (e) {}
        this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
      } else {
        this.$toast.error(this.$ERRORS.INVALID_DATA)
      }
    },

    async submitPublish () {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')
      try {
        const formData = new FormData()
        formData.append('pk', this.form.id)

        await this.publishItemContext(formData)
        this.$toast.success(this.$SUCCESS[this.messageToast.baseName].PUBLISHED)
        // setting as published the itemContext
        this.canPublish = false

        await this.getDataContext()
      }
      catch (e) {}
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    },

    /**
     * parse current object form to FormData
     */
    objectToFormData () {
      const formData = new FormData()

      Object.keys(this.form).forEach(key => formData.append(key, this.form[key]))

      return formData
    },

    closeModal () {
      this.resetForm()
      this.$emit('close-modal')
    },

    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
