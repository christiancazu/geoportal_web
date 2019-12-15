<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
>
  <template v-slot:content>
    <el-row :gutter="14">
      <el-col
        :xs="24"
        :md="{span:12, offset:12}"
        :sm="24"
        :lg="{span:12, offset:12}"
        class="text-xs-center"
      >
        <el-form-item
          prop="order"
          size="mini"
          :inline-message="true"
        >
          <label
            class="pr-2"
            for=""
          >
            N° de orden:
          </label>
          <el-input-number
            v-model="form.order"
            size="mini"
            controls-position="right"
            :min="1"
            type="number"
          />
        </el-form-item>
      </el-col>
    </el-row>
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
      prop="groupLayerId"
    >
      <el-container>
        <el-select
          v-model="form.groupLayerId"
          value-key="id"
          :loading="$store.state.spinners.loadingTable"
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in groupLayers" :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>

        <!-- open second modal -->
        <btn-open-second-modal :modal-second="modalSecond" />

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
        :show-word-limit="true"
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseRaster from './BaseRaster'

import { mapState} from 'vuex'

import {
  title,
  nameAlpha,
  order
} from '@/config/form.rules'

export default {
  extends: BaseRaster,

  data () {
    return {
      formTitle: 'Actualizar capa raster',

      context: {
        storeBase: 'rasterLayers',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'update',
      },
      modalSecond: {
        component: 'AddGroup',
        folderName: 'layers',
        tooltip: 'Agregar grupo de capas'
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'UPDATED'
      },
      form: {
        id: null,
        order: null,
        title: '',
        name: '',
        groupLayerId: '',
        description: '',
        status: true
      },
      rules: {
        title,
        name: nameAlpha,
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
