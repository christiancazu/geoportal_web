<template>
  <el-dialog
    :title="formTitle"
    :close-on-click-modal="false"
    :visible="$store.state.modalsVisibilities[context.mountedOn].visibility"
    @close="closeModal()"
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

    <!-- actions -->
    <div class="text-xs-center">
      <el-button
        size="small"
        @click="closeModal()"
      >
        CANCELAR
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
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { SET_PUBLISHED_ITEM_CONTEXT } from '@/types/mutation-types'

export default {
  props: {
    form: {
      type: Object, required: true
    },
    rules: {
      type: Object
    },
    formTitle: {
      type: String, default: ""
    },

    context: {
      type: Object, 
      default: () => ({
        storeBase: { type: String, required: true },
        mountedOn: { type: String, required: true },
        storeAction: { type: String, required: true }
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
        if (typeof this.$store.state[this.context.storeBase].itemContext.isPublished === 'undefined') return false
        return !this.$store.state[this.context.storeBase].itemContext.isPublished && this.context.storeAction === 'update'
      },
      set (value) {
        this.$store.commit(`${this.context.storeBase}/${SET_PUBLISHED_ITEM_CONTEXT}`, value)
      }
    }
  },

  methods: {
    ...mapActions({
      async getDataContext () {
        await this.$store.dispatch(`${this.context.storeBase}/getDataContext`)
      },
      async submitItemContext (store, form) {
        await this.$store.dispatch(`${this.context.storeBase}/${this.context.storeAction}ItemContext`, { data: form })
      },
      async publishItemContext (store, form) {
        await this.$store.dispatch(`${this.context.storeBase}/publishItemContext`, { data: form })
      },
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)
      if (isFormValid) {
        const formData = this.objectToFormData();
        
        try {
          await this.submitItemContext(formData)

          this.resetForm()
          this.$toast.success(this.$SUCCESS[this.messageToast.baseName][this.messageToast.action])
          
          await this.getDataContext()
          // this.$_modalVisibilityMixin_close(this.context.modalStateName)
        } 
        catch (e) {}
      }
    },

    async submitPublish () {
      try {
        const formData = new FormData()
        formData.append('pk', this.form.id)

        await this.publishItemContext(formData)
        this.$toast.success(this.$SUCCESS[this.messageToast.baseName].PUBLISHED)
        // setting as published the itemContext
        this.canPublish = false

        await this.getDataContext()
        // # consult if is neccesary close modal when is published
        // this.$_modalVisibilityMixin_close(this.context.modalStateName)          
      } 
      catch (e) {}
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
    },

    closeModal () {
      this.$store.commit('modalsVisibilities/CLOSE_MODAL', this.context.mountedOn)
    }
  }
}
</script>
