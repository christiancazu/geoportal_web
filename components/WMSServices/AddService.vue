<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @reset-form="resetForm"
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

            <!-- open modal inner-->
            <btn-open-modal-inner
              tooltip="Agregar Autor"
              @open-modal="openModal('modalAddAuthor')"
            />
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

            <!-- open modal inner -->
            <btn-open-modal-inner
              tooltip="Agregar Categoría"
              @open-modal="openModal('modalAddCategory')"
            />
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
    <base-modal
      :modal="$store.state[storeBase.name].modalInner"
      modal-type="modalInner"
    >
      <template v-slot:modal-content>
        <component
          :is="dynamicComponent"
          :store-mounted="{ name: storeBase.name, typeModal: 'modalInner' }"
        />
      </template>
    </base-modal>

    <!-- <el-dialog
      :title="$store.state['WMSServices'].modalMain.title"
      :close-on-click-modal="false"
      :visible="visible"
      append-to-body
      destroy-on-close
      top="2vh"
      class="dialog-responsive"
      @close="visible = false"
    >
      <component :is="dynamicComponent" />
    </el-dialog> -->

  </template>
</base-form>
</template>

<script>
import BaseService from './BaseService'

import { mapActions } from 'vuex'

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
      dialogTitle: 'Registrar servicio WMS',

      storeBase: {
        name: 'WMSServices',
        action: 'create'
      },
      modalInner: {
        modalAddAuthor: {
          type: 'component',
          folderPath: 'WMSServices',
          name: 'AddAuthor'
        },
        modalAddCategory: {
          type: 'page',
          folderPath: 'managementLayers/groups',
          name: 'index'
        }
      },

      // modalAddAuthor: {
      //   type: 'modalInner',
      //   folderRoot: 'components',
      //   folderName: 'WMSServices',
      //   storeParent: 'WMSServices',
      //   store: 'WMSAuthors',
      //   component: 'AddAuthor',
      //   tooltip: 'Agregar autor'
      // },
      // modalAddCategory: {
      //   title: 'Add foo',
      //   type: 'modal',
      //   folderRoot: 'pages',
      //   folderName: 'managementWMSServices/categories',
      //   storeParent: 'WMSServices',
      //   store: 'WMSCategories',
      //   component: 'index',
      //   tooltip: 'Agregar categoría'
      // },
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
      const { type, folderPath, name } = this.$store.state[this.storeBase.name].modalInner
      return type === 'page'
        ? () => import(`@/pages/${folderPath}/${name}`)
        : () => import(`@/components/${folderPath}/${name}`)
    },
    // dynamicComponent () {
    //   const { store, folderRoot, folderName, component } = this.$store.state[this.store.name].innerComponent
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   // this.currentStore = store
    //   console.warn('add service dynamicComponent', store, folderRoot, folderName, component, this.$store.state[this.store.name].innerComponent)
    //   return folderRoot === 'pages'
    //     ? () => import(`@/pages/${folderName}/${component}`)
    //     : () => import(`@/components/${folderName}/${component}`)
    // },

    // currentModal () {
    //   console.warn('modalAddAuthor> ', this.$store.state[this.store.name].innerComponent)
    //   return this.modalAddAuthor
    // }
  },

  methods: {
    ...mapActions({
      setDynamicComponentAsModalInner ({}, component) {
        this.$store.dispatch(`${this.storeBase.name}/openModal`, {
          typeModal: 'modalInner',
          component
        })
      }
    }),
    openModal (component) {
      this.setDynamicComponentAsModalInner(this.modalInner[component])
    },

    resetForm () {
      // reset textarea
      this.form.description = ''
    }
  }
}
</script>
