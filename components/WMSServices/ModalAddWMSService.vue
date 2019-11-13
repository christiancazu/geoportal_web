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
    <!-- weburl -->
    <el-form-item
      label="URL"
      prop="url"
    >
      <el-input
        v-model="form.url"
        type="text" autocomplete="off"
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

            <!-- open second modal -->
            <btn-open-second-modal :modal-second="modalSecondAuthor" />
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
              filterable value-key="id" placeholder="Select"
            >
              <el-option
                v-for="item in WMSCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <!-- open second modal -->
            <btn-open-second-modal :modal-second="modalSecondCategory" />
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
  </template>
</base-form>
</template>

<script>
import BtnOpenSecondModal from '@/components/buttons/BtnOpenSecondModal'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import {
  mapState,
  mapActions
} from 'vuex'

import {
  url,
  authorId,
  categoryId,
  name
} from '@/config/form.rules'

export default {
  components: {
    BtnOpenSecondModal
  },

  mixins: [modalBaseActionsMixin],

  data () {
    return {
      formTitle: 'Registrar servicio WMS',

      context: {
        storeBase: 'WMSServices',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create'
      },
      modalSecondAuthor: {
        component: 'ModalAddWMSAuthor',
        folderName: 'WMSServices',
        tooltip: 'Agregar autor'
      },
      modalSecondCategory: {
        component: 'ModalAddWMSCategory',
        folderName: 'WMSServices',
        tooltip: 'Agregar categoría'
      },
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
    ...mapState({
      WMSAuthors: state => state.WMSAuthors.dataContext,
      WMSCategories: state => state.WMSCategories.dataContext
    })
  },

  created () {
    this.getWMSAuthors()
    this.getWMSCategories()
  },

  methods: {
    ...mapActions({
      getWMSAuthors: 'WMSAuthors/getDataContext',
      getWMSCategories: 'WMSCategories/getDataContext'
    })
  }
}
</script>
