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
import BaseAuthor from './BaseAuthor'

import { name } from '@/config/form.rules'

export default {
  extends: BaseAuthor,

  data () {
    return {
      dialogTitle: 'Registrar autor WMS',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'WMSAuthors',
        action: 'createItemContext'
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
  }
}
</script>
