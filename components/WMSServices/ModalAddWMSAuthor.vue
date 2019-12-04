<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
>
  <template v-slot:content>
    <!-- name -->
    <el-form-item
      label="Nombre"
      prop="name"
    >
      <el-input
        v-model="form.name"
        type="text" autocomplete="off"
      />
    </el-form-item>

    <!-- weburl -->
    <el-form-item
      label="URL"
      prop="webUrl"
    >
      <el-input
        v-model="form.webUrl"
        type="text" autocomplete="off"
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
        :show-word-limit="true"
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseWMSAuthor from './BaseWMSAuthor'

import { name } from '@/config/form.rules'

export default {
  extends: BaseWMSAuthor,

  data () {
    return {
      formTitle: 'Registrar autor WMS',

      context: {
        storeBase: 'WMSAuthors',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
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
        name: name('autor'),
      }
    }
  }
}
</script>
