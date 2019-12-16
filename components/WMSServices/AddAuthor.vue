<template>
<base-form
  :dialog-title="dialogTitle"
  :form="form"
  :rules="rules"
  :store="store"
  :message-toast="messageToast"
  @clear-form="clearForm"
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

      store: {
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
    clearForm () {
      // reset textarea
      this.form.description = ''
    }
  }
}
</script>
