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

    <el-form-item label="Descripción">
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
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import { name } from '@/config/form.rules'

export default {
  mixins: [modalBaseActionsMixin],

  data () {
    return {
      formTitle: 'Registrar categoría',

      context: {
        storeBase: 'WMSCategories',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
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
  }
}
</script>
