<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
>
  <template v-slot:content>
    <el-form-item
      label="Título"
      prop="title"
    >
      <el-input
        v-model="form.name"
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
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import { title } from '@/config/form.rules'

export default {
  mixins: [modalBaseActionsMixin],

  data () {
    return {
      formTitle: 'Registrar imágen georeferencial',
      context: {
        storeBase: 'georeferencedImages',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
      },
      messageToast: {
        baseName: 'IMAGE',
        action: 'REGISTERED'
      },
      form: {
        title: '',
        description: '',
        // #TODO: imagen
      },
      rules: {
        title,
      }
    }
  }
}
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>