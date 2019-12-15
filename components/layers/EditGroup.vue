<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
>
  <template v-slot:content>
    <!-- title -->
    <el-form-item
      label="Título"
      prop="title"
    >
      <el-input
        v-model="form.title"
        type="text"
        autocomplete="off"
        :rules="rules.title"
      />
    </el-form-item>
    <el-form-item
      label="Grupo"
      prop="group"
    >
      <el-container>
        <el-select
          v-model="form.categoryGroupId"
          :loading="$store.state.spinners.loadingTable"
          value-key="id"
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in groupLayers" :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-container>
    </el-form-item>
    <!-- Descripción -->
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
import BaseGroup from './BaseGroup'

import { mapState } from 'vuex'

import {
  title,
  order
} from '@/config/form.rules'

export default {
  extends: BaseGroup,

  data () {
    return {
      formTitle: 'Actualizar grupo de capas',

      context: {
        storeBase: 'groupLayers',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'update',
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'UPDATED'
      },
      form: {
        id: null,
        order: 1,
        title: '',
        categoryGroupId: '',
        description: ''
      },
      rules: {
        title,
        order
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
      Object.keys(this.form).forEach(key => this.form[key] = this.itemContext[key])
    }
  }
}
</script>
