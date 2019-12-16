<template>
<base-form
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
import BaseFormParent from '@/components/base/parents/BaseFormParent'

import { name } from '@/config/form.rules'

export default {
  extends: BaseFormParent,

  data () {
    return {
      dialogTitle: 'Registrar categoría WMS',

      store: {
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
    clearForm () {
      // reset textarea
      this.form.description = ''
    }
  }
}
</script>
