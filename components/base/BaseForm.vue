<template>
<base-modal
  :dialog-title="dialogTitle"
  :store="store"
  @close-modal="closeModal()"
>
  <template v-slot:modal-content>
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

    </el-form>

    <!-- actions -->
    <div class="text-xs-center">
      <el-button
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
        @click="submitForm"
      >
        GUARDAR
      </el-button>

      <template v-if="canPublish">
        <el-button
          type="success"
          size="small"
          :loading="$store.state.spinners.processingForm"
          @click="submitPublish"
        >
          PUBLICAR
        </el-button>
      </template>

    </div>
  </template>
</base-modal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal'

import { mapActions } from 'vuex'

import {
  SET_PUBLISHED_ITEM_CONTEXT,
  ENABLE_PROCESSING_FORM,
  DISABLE_PROCESSING_FORM,
  CLOSE_MODAL
} from '@/types/mutation-types'

export default {
  components: {
    BaseModal,
  },

  props: {
    form: {
      type: Object, required: true
    },
    rules: {
      type: Object, required: true
    },
    dialogTitle: {
      type: String, default: ''
    },
    store: {
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
    }
  },

  computed: {
    canPublish: {
      get () {
        if (typeof this.$store.state[this.store.name].itemContext.isPublished === 'undefined') return false
        return !this.$store.state[this.store.name].itemContext.isPublished && this.store.action === 'update'
      },
      set (value) {
        this.$store.commit(`${this.store.name}/${SET_PUBLISHED_ITEM_CONTEXT}`, value)
      }
    }
  },

  methods: {
    ...mapActions({
      async getDataContext () {
        await this.$store.dispatch(`${this.store.name}/getDataContext`)
      },
      async submitItemContext ({}, formData) {
        await this.$store.dispatch(`${this.store.name}/${this.store.action}ItemContext`, formData)
      },
      async publishItemContext ({}, formData) {
        await this.$store.dispatch(`${this.store.name}/publishItemContext`, formData)
      },
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)

        const formData = this.objectToFormData()

        // used when need to apply custom functionality/fix on formData before to be sends
        this.$emit('apply-custom-functionality-to-form', formData)
        try {
          await this.submitItemContext(formData)

          if (this.store.action === 'create') {
            this.resetForm()
          }

          this.$toast.success(this.$SUCCESS[this.messageToast.baseName][this.messageToast.action])

          await this.getDataContext()
        }
        catch (e) {}
        this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
      } else {
        this.$toast.error(this.$ERRORS.INVALID_DATA)
      }
    },

    async submitPublish () {
      this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)
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
      this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
    },

    objectToFormData () {
      const formData = new FormData()

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })

      return formData
    },

    closeModal () {
      this.resetForm()
      this.$store.commit(`${this.store.name}/${CLOSE_MODAL}`)
    },

    resetForm () {
      this.$emit('clear-form')
      this.$refs.form.resetFields()
    }
  }
}
</script>
