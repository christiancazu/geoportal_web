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

    <!-- weburl -->
    <el-form-item
      label="URL"
      prop="webUrl"
    >
      <el-input
        v-model="form.webUrl"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
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
import BaseFormParent from '@/components/base/parents/BaseFormParent'

import { name } from '@/config/form.rules'

export default {
  extends: BaseFormParent,

  data () {
    return {
      dialogTitle: 'Registrar autor WMS',

      storeBase: {
        name: 'WMSAuthors',
        action: 'create'
      },
      messageToast: {
        baseName: 'AUTHOR',
        action: 'REGISTERED'
      },
      form: {
        name: '',
        description: '',
        webUrl: '',
        isPublic: 'True'
      },
      rules: {
        name: name('autor')
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
