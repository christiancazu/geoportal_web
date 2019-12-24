<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @close-modal="closeModal"
>
  <template v-slot:form-content>
    <!-- name -->
    <el-form-item
      label="Nombres"
      prop="name"
    >
      <el-input
        v-model="form.name"
        type="text" autocomplete="off"
      />
    </el-form-item>
    <!-- description -->
    <el-form-item
      label="Descripción"
      prop="description"
    >
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="3"
        autocomplete="off"
        :maxlength="300"
        show-word-limit
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import { mapState } from 'vuex'

import { name } from '@/config/form.rules'

export default {
  extends: BaseFormSetup,

  data () {
    return {
      dialogTitle: 'Actualizar categoría WMS',

      // base-form component settings
      storeBase: {
        name: 'WMSCategories',
        action: 'updateItemContext'
      },
      messageToast: {
        baseName: 'CATEGORY',
        action: 'UPDATED'
      },
      form: {
        id: null,
        name: '',
        description: '',
      },
      rules: {
        name: name('la categoría')
      }
    }
  },

  computed: {
    ...mapState({
      itemContext () {
        return this.$store.state[this.storeBase.name].itemContext
      }
    })
  },

  watch: {
    itemContext: { // smart watcher
      handler: 'assignFormFields',
      immediate: true
    }
  },

  methods: {
    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.itemContext[key]))
    }
  }
}
</script>
