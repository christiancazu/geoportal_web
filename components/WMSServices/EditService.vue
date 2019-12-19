<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
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
    <!-- weburl -->
    <el-form-item
      label="URL"
      prop="url"
    >
      <el-input
        v-model="form.url"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-row :gutter="10">
      <el-col
        :xs="24" :sm="12"
      >
        <!-- region -->
        <el-form-item
          label="Autores"
          prop="author"
        >
          <el-container>
            <el-select
              v-model="form.authorId"
              :loading="$store.state.spinners.loadingTable"
              value-key="id"
              filterable
              placeholder="Elija un autor"
            >
              <el-option
                v-for="item in WMSAuthors" :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <!-- open inner modal -->
            <btn-open-inner-modal :modal-second="modalAddAuthor" />
          </el-container>
        </el-form-item>
      </el-col>
      <el-col
        :xs="24" :sm="12"
      >
        <!-- category -->
        <el-form-item
          label="Categorías"
          prop="Categories"
        >
          <el-container>
            <el-select
              v-model="form.categoryId"
              filterable
              value-key="id"
              placeholder="Elija una categoría"
            >
              <el-option
                v-for="item in WMSCategories" :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <!-- open inner modal -->
            <btn-open-inner-modal :modal-second="modalAddCategory" />
          </el-container>
        </el-form-item>
      </el-col>
    </el-row>

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
    <el-form-item class="text-xs-right">
      <el-switch
        v-model="form.isEnabled"
        :active-value="true"
        :inactive-value="false"
        :active-text="form.isEnabled ? 'Servicio Activo' : 'Servicio Inactivo'"
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseService from './BaseService'

import { mapState } from 'vuex'

import {
  name,
  url,
  authorId,
  categoryId
} from '@/config/form.rules'

export default {
  extends: BaseService,

  data () {
    return {
      dialogTitle: 'Actualizar servicio WMS',

      storeBase: {
        name: 'WMSServices',
        action: 'update'
      },
      modalAddAuthor: {
        component: 'ModalAddWMSAuthor',
        folderName: 'WMSServices',
        tooltip: 'Agregar autor'
      },
      modalAddCategory: {
        component: 'ModalAddWMSCategory',
        folderName: 'WMSServices',
        tooltip: 'Agregar categoría'
      },
      messageToast: {
        baseName: 'SERVICE',
        action: 'UPDATED'
      },
      form: {
        id: null,
        name: '',
        description: '',
        url: '',
        authorId: null,
        isEnabled: false,
        categoryId: null
      },
      rules: {
        name: name('servicio'),
        url,
        authorId,
        categoryId
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
