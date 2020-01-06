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

    <template v-if="!customActions">
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
    </template>

    <slot name="form-custom-actions" />

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
      type: Object, default: () => ({})
    },
    /**
     * store settings to apply actions when submiting
     */
    storeBase: {
      type: Object,
      default: () => ({
        name: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    /**
     * TOAST MESSAGE TO SHOW AFTER SUBMIT SUCCESS
     */
    messageToast: {
      type: Object,
      default: () => ({
        baseName: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    /**
     * USED TO SHOW CLOSE MODAL BUTTON IF IS MOUNTED AS PAGE
     */
    isMountedAsPage: {
      type: Boolean, default: false
    },
    /**
     * working on slot:form-custom-actions if the parent have custom actions buttons
     */
    customActions: {
      type: Boolean, default: false
    }
  },

  computed: {
    /**
     * only apply if the itemContext can be published
     */
    canPublish: {
      get () {
        if (typeof this.$store.state[this.storeBase.name].itemContext.isPublished === 'undefined') return false
        return !this.$store.state[this.storeBase.name].itemContext.isPublished && this.storeBase.action === 'updateItemContext'
      },
      set (value) {
        this.$store.commit(`${this.storeBase.name}/${SET_PUBLISHED_ITEM_CONTEXT}`, value)
      }
    }
  },

  methods: {
    ...mapActions({
      /**
       * getting dataContext of the currentPage depeding of storeBase
       */
      async getDataContext () {
        await this.$store.dispatch(`${this.storeBase.name}/getDataContext`)
      },
      /**
       * submit post/update the current ItemContext depeding of storeBase & his action
       */
      async submitItemContext ({}, formData) {
        await this.$store.dispatch(`${this.storeBase.name}/${this.storeBase.action}`, formData)
      },
      /**
       * publish the current ItemContext depeding of storeBase
       */
      async publishItemContext ({}, formData) {
        await this.$store.dispatch(`${this.storeBase.name}/publishItemContext`, formData)
      }
    }),

    /**
     * submitForm will take the current store settings to send the current form as request
     *
     */
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

          if (this.storeBase.action === 'createItemContext') this.resetForm()

          this.$toast.success(this.$SUCCESS[this.messageToast.baseName][this.messageToast.action])

          await this.getDataContext()

          // used when need to apply custom functionality/fix on formData after to be sends
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
