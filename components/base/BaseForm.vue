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

    <!-- actions -->
    <div class="text-xs-center">
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
        @click="submitForm"
      >
        GUARDAR
      </el-button>

      <template v-if="!publish && storeAction !== 'create'">
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
import { UPDATE_PUBLISHED_ITEM_CONTEXT } from '@/types/mutation-types'

export default {
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
    }
  },

  computed: {
    publish: {
      get () {
        return this.$store.state[this.storeBase].itemContext.isPublished
      },
      set (value) {
        this.$store.commit(`${this.storeBase}/${UPDATE_PUBLISHED_ITEM_CONTEXT}`, value)
      }
    }
  },

  methods: {
    ...mapActions({
      async submitItemContext (store, form) {
        await this.$store.dispatch(`${this.storeBase}/${this.storeAction}ItemContext`, { data: form })
      },
      async publishItemContext (store, form) {
        await this.$store.dispatch(`${this.storeBase}/publishItemContext`, { data: form })
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
          this.$toast.success(this.$SUCCESS[this.messageToastBaseName][this.messageToastAction])
          // this.$_modalVisibilityMixin_close(this.modalStateName)
        } 
        catch (e) {}
      }
    },

    async submitPublish () {
      try {
        const formData = new FormData()
        formData.append('pk', this.form.id)

        await this.publishItemContext(formData)
        this.$toast.success(this.$SUCCESS[this.messageToastBaseName].PUBLISHED)
        // setting as published the itemContext
        this.publish = true
        // # consult if is neccesary close modal when is published
        // this.$_modalVisibilityMixin_close(this.modalStateName)          
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
    }  
  }
}
</script>
