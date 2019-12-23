<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @reset-form="resetForm"
  @close-modal="closeModal"
>
  <template v-slot:form-content>
    <!-- name -->
    <el-form-item
      label="Nombre"
      prop="name"
    >
      <el-input
        v-model="form.name"
        type="text"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item label="Descripción">
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="3"
        :maxlength="300"
        show-word-limit
        autocomplete="off"
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import { name } from '@/config/form.rules'

export default {
  extends: BaseFormSetup,

  data () {
    return {
      dialogTitle: 'Registrar categoría WMS',

      storeBase: {
        name: 'WMSCategories',
        action: 'create',
      },
      messageToast: {
        baseName: 'CATEGORY',
        action: 'REGISTERED'
      },
      form: {
        name: '',
        description: '',
        isPublic: 'True'
      },
      rules: {
        name: name('la categoría')
      }
    }
  },

  methods: {
    resetForm () {
      // reset textarea
      this.form.description = ''
    }
  }
}
</script>
