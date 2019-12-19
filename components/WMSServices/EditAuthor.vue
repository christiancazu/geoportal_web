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
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <!-- name -->
    <el-form-item
      label="URL"
      prop="url"
    >
      <el-input
        v-model="form.webUrl"
        type="text"
        autocomplete="off"
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
import BaseFormParent from '@/components/base/parents/BaseFormParent'

import { mapState } from 'vuex'

import { name } from '@/config/form.rules'

export default {
  extends: BaseFormParent,

  data () {
    return {
      dialogTitle: 'Actualizar autor WMS',

      storeBase: {
        name: 'WMSAuthors',
        action: 'update'
      },
      messageToast: {
        baseName: 'AUTHOR',
        action: 'UPDATED'
      },
      form: {
        id: null,
        name: '',
        webUrl: '',
        description: '',
      },
      rules: {
        name: name('autor')
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
    itemContext: {
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
