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
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import { mapState } from 'vuex'

import { name } from '@/config/form.rules'

export default {
  mixins: [modalBaseActionsMixin],

  data () {
    return {
      formTitle: 'Actualizar categoría WMS',

      context: {
        storeBase: 'WMSCategories',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'update'
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
      itemContext (state) {
        return state[this.context.storeBase].itemContext
      }
    })
  },

  watch: {
    itemContext () {
      this.assignFormFields()
    }
  },

  created () {
    this.assignFormFields()
  },

  methods: {
    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.itemContext[key]))
    }
  }
}
</script>
