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
          prop="authorId"
        >
          <el-container>
            <el-select
              v-model="form.authorId"
              value-key="id" filterable placeholder="Select"
            >
              <el-option
                v-for="item in WMSAuthors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <!-- open inner modal -->
            <btn-open-inner-modal :modal="modalAddAuthor" />
          </el-container>
        </el-form-item>
      </el-col>
      <el-col
        :xs="24" :sm="12"
      >
        <!-- category -->
        <el-form-item
          label="Categorías"
          prop="categoryId"
        >
          <el-container>
            <el-select
              v-model="form.categoryId"
              filterable value-key="id"
              placeholder="Select"
            >
              <el-option
                v-for="item in WMSCategories" :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <!-- open inner modal -->
            <btn-open-inner-modal :modal="modalAddCategory" />
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
        :show-word-limit="true"
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

    <!-- innerComponent on modal -->
    <base-modal :modal="{ store: 'WMSServices'/*$store.state[store.name].innerComponent.store*/, type: 'innerComponent' }">
      <template v-slot:modal-content>
        <component :is="dynamicComponent" />
      </template>
    </base-modal>

  </template>
</base-form>
</template>

<script>
import BaseService from './BaseService'

import {
  url,
  authorId,
  categoryId,
  name
} from '@/config/form.rules'

export default {
  extends: BaseService,

  data () {
    return {
      currentStore: 'WMSServices',

      dialogTitle: 'Registrar servicio WMS',

      store: {
        name: 'WMSServices',
        action: 'create'
      },
      modalAddAuthor: {
        type: 'modal',
        folderRoot: 'components',
        folderName: 'WMSServices',
        storeParent: 'WMSServices',
        store: 'WMSAuthors',
        component: 'AddAuthor',
        tooltip: 'Agregar autor'
      },
      modalAddCategory: {
        title: 'Add foo',
        type: 'innerComponent',
        folderRoot: 'pages',
        folderName: 'managementWMSServices/categories',
        storeParent: 'WMSServices',
        store: 'WMSCategories',
        component: 'index',
        tooltip: 'Agregar categoría'
      },
      // modalAddCategory: {
      //   wrapperBaseModal: true,
      //   folderRoot: 'components',
      //   folderName: 'WMSServices',
      //   storeParent: 'WMSServices',
      //   store: 'WMSCategories',
      //   component: 'AddCategory',
      //   tooltip: 'Agregar categoría'
      // },
      messageToast: {
        baseName: 'SERVICE',
        action: 'REGISTERED'
      },
      form: {
        name: '',
        description: '',
        url: '',
        authorId: null,
        isEnabled: false,
        categoryId: null,
        isPublic: true
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
    dynamicComponent () {
      const { store, folderRoot, folderName, component } = this.$store.state[this.store.name].innerComponent
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.currentStore = store
      console.warn('add service dynamicComponent', store, folderRoot, folderName, component, this.$store.state[this.store.name].innerComponent)
      return folderRoot === 'pages'
        ? () => import(`@/pages/${folderName}/${component}`)
        : () => import(`@/components/${folderName}/${component}`)
    },

    currentModal () {
      return this.$store.state[this.store.name].innerComponent
    }
  },

  watch: {
    currentModal: {
      handler: 'handd',
      immediate: true
    }
  },

  methods: {
    clearForm () {
      // reset textarea
      this.form.description = ''
    },

    handd () {
      console.log('HANDLER>>', this.$store.state[this.store.name].innerComponent)
    }
  }
}
</script>
